'use client'
import { useRef, useState } from "react"
import carouselData from '@/public/data/carouselData.json'
import CarouselCard from "./carouselCard"

export default function SliderCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)


    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            const currentProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setProgress(currentProgress)
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setProgress(val)
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current
            scrollRef.current.scrollLeft = (val / 100) * (scrollWidth - clientWidth)
        }
    };


    return (
        <div className="bg-[#1a472a] p-16">
            {/* Container chứa ảnh */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
            >
                {/* Render danh sách ảnh ở đây */}
                <div className="flex">
                    {
                        carouselData.map((each, i) => {
                            return (
                                <CarouselCard imglink={each.imgLink} cardContent={each.cardContent} cardTitle={each.cardTitle} key={i} />
                            )
                        })
                    }
                </div>
            </div>

            {/* Thanh trượt custom bằng Input Range */}
            <div className="relative mt-12 w-full">
                {/* Track giả lập đường kẻ ngang */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 -translate-y-1/2" />

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSliderChange}
                    className="relative w-full h-10 appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-10
            [&::-webkit-slider-thumb]:h-10
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-none"
                // Lưu ý: Phần mũi tên < > trong thumb bạn có thể dùng CSS background-image 
                // hoặc chèn một icon absolute đè lên vị trí thumb.
                />
            </div>
        </div>
    )
}