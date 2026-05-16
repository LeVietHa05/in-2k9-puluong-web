import Image from "next/image";

interface SummaryData {
    totalReviews: number;
    averageRating: number;
    distribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}

interface FeedbackSummaryProps {
    summary: SummaryData | null;
    isLoading: boolean;
}

export default function FeedbackSummary({ summary, isLoading }: FeedbackSummaryProps) {
    // 1. GIAO DIỆN SKELETON KHI ĐANG TẢI DỮ LIỆU
    if (isLoading || !summary) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="flex items-end gap-2">
                    <div className="h-16 w-24 bg-gray-200 rounded"></div>
                    <div className="flex gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} className="size-8 bg-gray-200 rounded-sm"></div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                            <div className="w-4 h-6 bg-gray-200 rounded"></div>
                            <div className="size-6 bg-gray-200 rounded-sm"></div>
                            <div className="w-4/5 bg-gray-200 rounded-full h-4"></div>
                            <div className="w-4 h-6 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const { averageRating, totalReviews, distribution } = summary;

    return (
        <div>
            {/* Điểm số trung bình và số sao tổng quan */}
            <div className="flex items-end gap-2">
                <div className="text-8xl/30 font-bold text-gray-800">
                    {averageRating.toFixed(1)}
                </div>
                <div className="flex pb-6">
                    {/* Vẽ số sao đặc dựa theo điểm làm tròn */}
                    {Array.from({ length: Math.round(averageRating) }).map((_, i) => (
                        <Image key={i} src={'/star.svg'} width={33} height={33} alt="star" className="mr-0.5" />
                    ))}
                    {/* Vẽ sao mờ cho phần điểm còn thiếu */}
                    {Array.from({ length: 5 - Math.round(averageRating) }).map((_, i) => (
                        <Image key={i} src={'/star.svg'} width={33} height={33} alt="star" className="opacity-20 mr-0.5" />
                    ))}
                </div>
            </div>

            {/* Chi tiết tỷ lệ phân bố các mức sao từ 5 xuống 1 */}
            <div className="space-y-4 mt-6">
                {([5, 4, 3, 2, 1] as const).map((starLevel) => {
                    const count = distribution[starLevel];
                    // Tính phần trăm để lấp đầy thanh Progress Bar
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                    return (
                        <div key={starLevel} className="flex items-center gap-2">
                            <div className="text-2xl font-medium w-4">{starLevel}</div>
                            <div>
                                <Image src={'/star2.svg'} width={23} height={23} alt="star" />
                            </div>
                            {/* Thanh thước đo tỷ lệ */}
                            <div className="w-4/5 bg-gray-100 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-[#FBC924] h-full rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            {/* Số lượng bài đánh giá thực tế của mức sao này */}
                            <div className="text-2xl text-gray-500 min-w-[1rem]">
                                {count}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Hiển thị tổng số bài review phía dưới cùng */}
            <div className="text-sm text-gray-400 mt-2 pl-1">
                Dựa trên {totalReviews} đánh giá từ người dùng
            </div>
        </div>
    );
}
