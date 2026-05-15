import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Hàm hỗ trợ chuyển đổi file thành Buffer và đẩy lên Cloudinary (Dạng Promise)
const uploadToCloudinary = (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            cloudinary.uploader.upload_stream(
                { folder: "user_feedbacks" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url || "");
                }
            ).end(buffer);
        } catch (err) {
            reject(err);
        }
    });
};

export async function POST(req: NextRequest) {
    try {
        // Lấy dữ liệu FormData từ Client gửi lên
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const vote = formData.get("vote") as string;
        const feedback = formData.get("feedback") as string;
        const imageFiles = formData.getAll("image") as File[];

        if (!name || !vote || !feedback) {
            return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
        }

        let uploadedUrls: string[] = [];

        // Lọc bỏ các file rỗng (trường hợp người dùng click nút submit nhưng không chọn ảnh)
        const validFiles = imageFiles.filter(file => file.size > 0);
        console.log(validFiles.length)
        if (validFiles.length > 0) {
            // Chạy upload song song tất cả các ảnh lên Cloudinary để tối ưu thời gian phản hồi
            uploadedUrls = await Promise.all(
                validFiles.map((file) => uploadToCloudinary(file))
            );
        }

        //co \n trong dep hon tren ggsheet
        const imageUrlsString = uploadedUrls.join("\n");


        // 3. Khởi tạo kết nối với Google Sheets API
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        const sheets = google.sheets({ version: "v4", auth });

        // 4. Định dạng dữ liệu và thêm một dòng mới vào Sheet (Append)
        const currentDate = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:E", // Thay "Sheet1" bằng tên tab sheet thực tế của bạn
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [currentDate, name, vote, feedback, imageUrlsString] // Các cột: Thời gian, Tên, Vote, Nội dung, Link ảnh
                ],
            },
        });

        // 5. Trả về kết quả thành công  
        return NextResponse.json({ success: true, message: "Thank you for your feedback" });

    } catch (error) {
        console.error("Lỗi API Feedback:", error);
        return NextResponse.json({ error: "Có lỗi xảy ra tại hệ thống" }, { status: 500 });
    }
}