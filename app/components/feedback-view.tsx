'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu cho Feedback (nếu bạn xài TypeScript)
interface FeedbackItem {
    id: number;
    time: string;
    name: string;
    vote: number;
    feedback: string;
    images: string[];
}

export default function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [page, setPage] = useState(1); // Quản lý số trang hiện tại
    const [hasMore, setHasMore] = useState(false); // Cờ hiệu còn bài để tải không
    const [isInitialLoading, setIsInitialLoading] = useState(true); // Loading lần đầu (hiện skeleton)
    const [isMoreLoading, setIsMoreLoading] = useState(false); // Loading khi bấm xem thêm (hiện spinner nhỏ)


    const fetchFeedbacks = async (pageNumber: number) => {
        try {
            if (pageNumber === 1) setIsInitialLoading(true);
            else setIsMoreLoading(true);

            const res = await fetch(`/api/feedback?page=${pageNumber}&limit=5`);
            const result = await res.json();

            if (res.ok && result.success) {
                if (pageNumber === 1) {
                    setFeedbacks(result.data);
                } else {
                    // Cộng dồn dữ liệu mới vào danh sách cũ đang hiển thị
                    setFeedbacks((prev) => prev.concat(result.data));
                }
                setHasMore(result.hasMore);
            }
        } catch (error) {
            console.error("Lỗi khi fetch danh sách feedback:", error);
        } finally {
            setIsInitialLoading(false);
            setIsMoreLoading(false);
        }
    };
    // Fetch dữ liệu từ API khi trang được tải
    useEffect(() => {
        const loadInitialFeedbacks = async () => {
            await fetchFeedbacks(1);
        };
        loadInitialFeedbacks();
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchFeedbacks(nextPage);
    };


    // 1. COMPONENT SKELETON LOADING (Hiển thị 3 hàng mẫu khi đang tải dữ liệu)
    if (isInitialLoading) {
        return (
            <div className="pl-12 space-y-12">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="animate-pulse">
                        <div className="mt-8 flex gap-6">
                            {/* Avatar placeholder */}
                            <div className="size-12 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-3 py-1">
                                {/* Name placeholder */}
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                {/* Stars placeholder */}
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <div key={s} className="size-4 bg-gray-200 rounded-sm"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Feedback text placeholder */}
                        <div className="space-y-2 mt-4">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                        </div>
                        {/* Image grid placeholder đúng Layout của bạn */}
                        <div className="flex gap-2 mt-8">
                            <div className="w-2/5 h-40 bg-gray-200 rounded-md"></div>
                            <div className="w-1/5 h-40 bg-gray-200 rounded-md"></div>
                            <div className="w-2/5 h-40 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Trường hợp không có dữ liệu nào
    if (feedbacks.length === 0) {
        return <div className="pl-12 text-gray-400 text-center py-8">No feedback. Be the first</div>;
    }

    // 2. GIAO DIỆN HIỂN THỊ DỮ LIỆU THẬT
    return (
        <div className="pl-12 space-y-12">
            {feedbacks.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-8 last:border-none">
                    <div className="mt-8 flex gap-6">
                        {/* User's profile image placeholder */}
                        <div className="size-12 rounded-full bg-main-bg flex items-center justify-center text-white font-bold text-lg select-none">
                            {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="capitalize">
                            {/* Name & Time */}
                            <div className="font-semibold text-gray-800 flex items-center gap-2">
                                {item.name}
                                <span className="text-xs text-gray-400 normal-case font-normal">({item.time.split(" ")[0]})</span>
                            </div>
                            {/* Dynamic Vote Stars */}
                            <div className="flex pt-2">
                                {Array.from({ length: item.vote }).map((_, i) => (
                                    <Image key={i} src={'/star.svg'} width={20} height={20} alt="star" className="mr-0.5" />
                                ))}
                                {Array.from({ length: 5 - item.vote }).map((_, i) => (
                                    // Hiện sao xám/mờ nếu người dùng đánh giá dưới 5 sao (Tùy chọn)
                                    <Image key={i} src={'/star.svg'} width={20} height={20} alt="star" className="opacity-20 mr-0.5" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Feedback Content */}
                    <div className="text-sm text-justify text-gray-600 mt-4 leading-relaxed">
                        {item.feedback}
                    </div>

                    {/* Images List (Chỉ render nếu bài review có ảnh) */}
                    {item.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {item.images.map((imgUrl, idx) => (
                                <div
                                    key={idx}
                                    className="relative h-40 border rounded-md overflow-hidden bg-gray-50"
                                    style={{
                                        // Tự động chia bố cục linh hoạt dựa trên số lượng ảnh giống cấu trúc mẫu của bạn
                                        width: item.images.length === 1 ? "100%" : idx % 3 === 0 || idx % 3 === 2 ? "38%" : "20%"
                                    }}
                                >
                                    <Image
                                        src={imgUrl}
                                        fill
                                        alt={`feedback-img-${idx}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}


            {/* KHU VỰC ĐIỀU KHIỂN NÚT LOAD MORE */}
            {hasMore && (
                <div className="pt-4 text-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={isMoreLoading}
                        className="px-6 py-2.5 border-2 border-main-bg text-main-bg font-bold rounded-md hover:bg-main-bg hover:text-white transition-all duration-300 disabled:opacity-50 inline-flex items-center gap-2"
                    >
                        {isMoreLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </>
                        ) : (
                            "LOAD MORE REVIEWS"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
