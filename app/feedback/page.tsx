

'use client'

import Image from "next/image";
import Nav from "../components/nav";
import FeedbackList, { FeedbackItem } from "../components/feedback-view";
import FeedbackSummary, { SummaryData } from "../components/feedback-sumary";
import ImagePreviewItem from "../components/fb-image-preview";

import { useState, useRef, useEffect } from "react";

export default function Event() {
    const [isWritingForm, setIsWritingForm] = useState(false)
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1); // Quản lý số trang hiện tại
    const [hasMore, setHasMore] = useState(false); // Cờ hiệu còn bài để tải không
    const [isMoreLoading, setIsMoreLoading] = useState(false);

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

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
                    handleFeedbackAdded(data.newFeedback)
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

    //focus on click
    useEffect(() => {
        if (isWritingForm) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0)
        }
    }, [isWritingForm]);

    //key event
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (isWritingForm) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isWritingForm]);

    //init loading
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const res = await fetch("/api/feedback?page=1&limit=5");
                const result = await res.json();
                if (res.ok && result.success) {
                    setFeedbacks(result.data);
                    setSummary(result.summary); // Lưu cục thống kê 
                    setHasMore(result.hasMore)
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    //state syncing (local sync)
    const handleFeedbackAdded = (newFeedback: FeedbackItem) => {
        // 1. Đẩy bài viết mới lên đầu danh sách hiển thị
        setFeedbacks((prev) => [newFeedback, ...prev]);

        // 2. Tính toán lại cục summary dựa trên dữ liệu cũ có sẵn
        setSummary((prevSummary) => {
            if (!prevSummary) return null;

            const nextTotalReviews = prevSummary.totalReviews + 1;
            const starLevel = newFeedback.vote as 1 | 2 | 3 | 4 | 5;

            // Cộng thêm 1 vào mức sao tương ứng
            const nextDistribution = {
                ...prevSummary.distribution,
                [starLevel]: prevSummary.distribution[starLevel] + 1
            };

            // Tính lại điểm số trung bình mới
            // Công thức: ((Điểm cũ * Tổng số bài cũ) + Điểm bài mới) / Tổng số bài mới
            const nextAverageRating = ((prevSummary.averageRating * prevSummary.totalReviews) + newFeedback.vote) / nextTotalReviews;

            return {
                totalReviews: nextTotalReviews,
                averageRating: +Number(nextAverageRating).toFixed(1),
                distribution: nextDistribution
            };
        });
    };

    const fetchFeedbacks = async (pageNumber: number) => {
        try {
            if (pageNumber === 1) return;
            setIsMoreLoading(true);
            const res = await fetch(`/api/feedback?page=${pageNumber}&limit=5`);
            const result = await res.json();
            if (res.ok && result.success) {
                setFeedbacks((prev) => prev.concat(result.data));
                setHasMore(result.hasMore);
            }
        } catch (error) {
            console.error("Lỗi khi fetch danh sách feedback:", error);
        } finally {
            setIsMoreLoading(false);
        }
    };

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
                    <FeedbackSummary isLoading={isLoading} summary={summary} />

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
                                        onSubmit={handleSubmit}
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
                                                {selectedImages.map((file, index) => (
                                                    <ImagePreviewItem
                                                        file={file}
                                                        onRemove={() => { removeImage(index) }}
                                                        status={status}
                                                        key={`${file.name}-${index}`}
                                                    />
                                                ))}
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
                <FeedbackList feedbacks={feedbacks} hasMore={hasMore} isLoading={isLoading} isMoreLoading={isMoreLoading} onLoadMore={() => { const next = page + 1; setPage(next); fetchFeedbacks(next); }} />
            </div>
        </div>
    )
}