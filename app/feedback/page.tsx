

'use client'

import Image from "next/image";
import Nav from "../components/nav";
import FeedbackList from "../components/feedback-view";

import { useState, useRef, useEffect } from "react";

export default function Event() {
    const [isWritingForm, setIsWritingForm] = useState(false)
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages((prev) => [...prev, ...filesArray])
        }
    };

    // Xóa một ảnh khỏi danh sách chờ
    const removeImage = (indexToRemove: number) => {
        setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const closeModal = () => {
        if (status === "loading") return; // Không cho đóng khi đang upload
        setIsWritingForm(false);
        setSelectedImages([]);
        setStatus("idle");
        setMessage("");
    };

    const handleClick = () => {
        setIsWritingForm(true);
    }

    const handldeSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn trang bị reload mặc định
        setStatus("loading");
        setMessage("");
        const form = e.currentTarget

        const formData = new FormData(form);

        // Xóa dữ liệu file mặc định cũ để tránh trùng lặp
        formData.delete("image");
        // Đưa danh sách file ảnh thực tế từ state vào FormData
        selectedImages.forEach((file) => formData.append("image", file));
        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                form.reset(); // Xóa sạch dữ liệu các ô nhập liệu
                setTimeout(() => {
                    setStatus("success");
                    setMessage(data.message);
                    setSelectedImages([]); // Xóa danh sách ảnh cũ
                }, 10)

                // Tự động đóng modal sau 3 giây khi thành công
                setTimeout(() => {
                    setIsWritingForm(false);
                    setStatus("idle");
                    setMessage("");
                }, 3000);
            } else {
                setStatus("error");
                setMessage(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (e) {
            console.log(e)
            setStatus("error");
            setMessage("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.");
        }
    }

    useEffect(() => {
        if (isWritingForm) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0)
        }
    }, [isWritingForm]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsWritingForm(false);
            }
        };

        if (isWritingForm) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isWritingForm]);

    return (
        <div className="text-main-bg">
            <Nav isTransparent={true} />
            <div className=" relative w-full aspect-336/100">
                <Image src={'/feedback-0.png'} fill alt="" sizes=""></Image>
            </div>
            <div className="max-w-7xl mx-auto px-22 py-12 flex">
                <div className="pr-24 border-r-2 min-w-2/5">
                    <div className="text-[32px] font-bold capitalize">
                        feedbacks
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="text-8xl/30 font-bold">
                            5.0
                        </div>
                        <div className="flex pb-6">
                            <Image src={'/star.svg'} width={33} height={33} alt="star"></Image>
                            <Image src={'/star.svg'} width={33} height={33} alt="star"></Image>
                            <Image src={'/star.svg'} width={33} height={33} alt="star"></Image>
                            <Image src={'/star.svg'} width={33} height={33} alt="star"></Image>
                            <Image src={'/star.svg'} width={33} height={33} alt="star"></Image>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className=" flex items-center gap-2">
                            <div className="text-2xl">5</div>
                            <div>
                                <Image src={'/star2.svg'} width={23} height={23} alt="star"></Image>
                            </div>
                            <div className="w-4/5 bg-[#FBC924] rounded-full h-4">

                            </div>
                            <div className="text-2xl">
                                1
                            </div>
                        </div>
                        <div className=" flex items-center gap-2">
                            <div className="text-2xl">4</div>
                            <div>
                                <Image src={'/star2.svg'} width={23} height={23} alt="star"></Image>
                            </div>
                            <div className="w-4/5 bg-[#D9D9D9] rounded-full h-4">

                            </div>
                            <div className="text-2xl">
                                0
                            </div>
                        </div>
                        <div className=" flex items-center gap-2">
                            <div className="text-2xl">3</div>
                            <div>
                                <Image src={'/star2.svg'} width={23} height={23} alt="star"></Image>
                            </div>
                            <div className="w-4/5 bg-[#D9D9D9] rounded-full h-4">

                            </div>
                            <div className="text-2xl">
                                0
                            </div>
                        </div>
                        <div className=" flex items-center gap-2">
                            <div className="text-2xl">2</div>
                            <div>
                                <Image src={'/star2.svg'} width={23} height={23} alt="star"></Image>
                            </div>
                            <div className="w-4/5 bg-[#D9D9D9] rounded-full h-4">

                            </div>
                            <div className="text-2xl">
                                0
                            </div>
                        </div>
                        <div className=" flex items-center gap-2">
                            <div className="text-2xl">1</div>
                            <div>
                                <Image src={'/star2.svg'} width={23} height={23} alt="star"></Image>
                            </div>
                            <div className="w-4/5 bg-[#D9D9D9] rounded-full h-4">

                            </div>
                            <div className="text-2xl">
                                0
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div
                            onClick={handleClick}
                            className="bg-main-bg text-white uppercase font-bold text-xl text-center p-4"
                        >
                            WRITE REVIEW
                        </div>

                        {/*  Modal Overlay */}
                        <div
                            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isWritingForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                                }`}
                            onClick={closeModal} // Bấm ra ngoài vùng form để đóng modal
                        >
                            {/* Modal chính (Bọc form) */}
                            <div
                                className={`bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isWritingForm ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                                    }`}
                                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click bị lan ra ngoài gây đóng modal nhầm
                            >
                                {/* Tiêu đề Modal */}
                                <div className="bg-main-bg text-white p-4 flex justify-between items-center">
                                    <h3 className="font-bold text-lg uppercase tracking-wide">Write a review</h3>
                                    {/* X */}
                                    <button
                                        onClick={closeModal}
                                        disabled={status === "loading"}
                                        className="text-white hover:text-gray-200 text-2xl font-semibold leading-none focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* HIỂN THỊ THÔNG BÁO KHI THÀNH CÔNG HOẶC LỖI HỆ THỐNG */}
                                {status === "success" && (
                                    <div className="p-8 text-center animate-fade-in">
                                        <div className="text-5xl mb-4">Success</div>
                                        <p className="text-emerald-600 font-medium text-lg">{message}</p>
                                        <p className="text-gray-400 text-sm mt-2">Cửa sổ sẽ tự động đóng sau vài giây...</p>
                                    </div>
                                )}

                                {/* Modal   */}
                                {status !== "success" && (
                                    <form
                                        onSubmit={handldeSubmit}
                                        encType="multipart/form-data"
                                        className="p-6 max-h-[80vh] overflow-y-auto"
                                    >
                                        {status === "error" && (
                                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm font-medium">
                                                {message}
                                            </div>
                                        )}
                                        {/*  Name */}
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                id="name"
                                                name="name"
                                                required disabled={status === "loading"}
                                                className="p-2.5 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1"
                                            />
                                        </div>

                                        {/* Vote */}
                                        <div className="mb-4">
                                            <label htmlFor="vote" className="block text-sm font-medium text-gray-700 mb-1">Vote:</label>
                                            <select id="vote" name="vote" required disabled={status === "loading"} className="p-2.5 block w-full border border-gray-300 rounded-md">
                                                <option value="5">5 ★★★★★</option>
                                                <option value="4">4 ★★★★</option>
                                                <option value="3">3 ★★★</option>
                                                <option value="2">2 ★★</option>
                                                <option value="1">1 ★</option>
                                            </select>
                                        </div>

                                        {/*  Feedback */}
                                        <div className="mb-4">
                                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Feedback:</label>
                                            <textarea id="feedback" name="feedback" rows={4} required disabled={status === "loading"} className="p-2.5 block w-full border border-gray-300 rounded-md"></textarea>
                                        </div>

                                        {/*  Ảnh */}
                                        <div className="mb-6">
                                            <label htmlFor="image" className={`p-4 text-center text-lg font-bold border-2 border-dashed border-gray-300 block rounded-md transition-all duration-300 ${status === 'loading' ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:bg-main-bg hover:text-white cursor-pointer'}`}>
                                                ADD PHOTOS
                                            </label>
                                            <input type="file" multiple id="image" name="image" accept="image/*" className="hidden" onChange={handleImageChange} disabled={status === "loading"} />
                                        </div>

                                        {/* Khu vực hiển thị danh sách ảnh xem trước (Preview Grid) */}
                                        {selectedImages.length > 0 && (
                                            <div className="grid grid-cols-4 gap-2 mb-6 p-2 border rounded-md bg-gray-50">
                                                {selectedImages.map((file, index) => {
                                                    const previewUrl = URL.createObjectURL(file);
                                                    return (
                                                        <div key={index} className="relative aspect-square rounded overflow-hidden border bg-white group">
                                                            <Image
                                                                src={previewUrl}
                                                                alt="preview"
                                                                fill
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {/* Nút xóa ảnh nhỏ ở góc */}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow-md"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Sumit-cancel  */}
                                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                            <button
                                                disabled={status === "loading"}
                                                type="button"
                                                onClick={() => setIsWritingForm(false)}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="bg-main-bg text-white uppercase font-bold py-2 px-6 rounded-md shadow-md disabled:opacity-70 flex items-center gap-2">
                                                {status === "loading" ? (
                                                    <>
                                                        {/* Hiệu ứng Spinner quay tròn khi đang gửi */}
                                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : "Submit"}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* hien thi feedback */} 
                <FeedbackList />
            </div>
        </div>
    )
}