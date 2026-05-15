'use client'
import { motion, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import carouselData from '@/public/data/carouselData.json'

export const ExperiencesCarousel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const constraintRef = useRef<HTMLDivElement>(null); // Giới hạn vùng kéo của nút 
    const [activeIndex, setActiveIndex] = useState(0)
    // Giá trị vị trí của nút tròn (x)
    const handleX = useMotionValue(0);

    // Chuyển đổi vị trí của nút (ví dụ từ 0 -> 300px) sang vị trí cuộn của ảnh
    // Chúng ta sẽ cập nhật giá trị này dựa trên chiều rộng thực tế của thanh bar
    useEffect(() => {
        const updateScroll = () => {
            if (!containerRef.current || !constraintRef.current) return;
            // console.log(containerRef.current.scrollWidth)

            const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            const trackWidth = constraintRef.current.clientWidth - 40; // 40 là chiều rộng nút tròn

            const itemWidth = 535 + 32; // Chiều rộng ảnh (535px) + gap (32px)

            // Lắng nghe sự thay đổi của handleX để cuộn ảnh
            const unsubscribe = handleX.on("change", (latest) => {
                const percentage = latest / trackWidth;
                if (containerRef.current) {
                    containerRef.current.scrollLeft = percentage * scrollWidth;
                }

                const index = Math.round(percentage * scrollWidth / itemWidth)
                setActiveIndex(index)
            });
            return () => unsubscribe();

        };

        updateScroll();
        window.addEventListener('resize', updateScroll);
        return () => window.removeEventListener('resize', updateScroll);
    }, [handleX]);

    return (
        <div className="bg-main-bg p-16 text-white ">
            <div className='max-w-7xl mx-auto'>
                <div className=' font-bold uppercase text-8xl/30'>
                    Experiences <br />
                    We Offer
                </div>
                <div className='flex text-2xl'>
                    <div className='w-1/2 space-y-24 py-12'>
                        <p>
                            At Pù Luông’s Paths, experiences are not performances. <br />
                            They are everyday moments — shared, slow, and deeply local.
                        </p>
                        <p>
                            Instead of scripted attractions, we invite travelers to take part in real activities that shape daily life in Pù Luông:
                        </p>
                        <div>
                            <Image src={'/arrow4.png'} alt='' height={40} width={425} className="w-auto"></Image>
                        </div>
                    </div>

                    {/* 1. Vùng hiển thị ảnh (Tắt scroll smooth để tránh bị delay khi kéo tay) */}
                    <div className='w-1/2 ml-auto'>
                        <div
                            ref={containerRef}
                            className="flex gap-8 overflow-x-hidden mb-16 pb-10"
                        >
                            {carouselData.map((e, i) => (
                                <div
                                    key={i}
                                    className=" w-[535px] h-[431px] flex-shrink-0 relative"
                                >
                                    <Image
                                        src={e.imgLink}
                                        className="w-full h-full object-cover rounded-sm shadow-2xl"
                                        alt="Experience"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: activeIndex === i ? 'auto' : 50,
                                            opacity: activeIndex === i ? 1 : 0.7
                                        }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className={`bg-white p-4 text-green-900 bottom-0 absolute z-10 w-4/5 mx-auto shadow-lg transition-colors `}>
                                        <p className="text-xl font-bold uppercase">
                                            {e.cardTitle}
                                        </p>
                                        {activeIndex === i && <motion.p
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className='text-sm'
                                        >
                                            {e.cardContent}
                                        </motion.p>}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* 2. Thanh trượt Custom */}
            <div className="relative max-w-7xl mx-auto w-full h-[2px] bg-white" ref={constraintRef}>
                <motion.div
                    drag="x"
                    dragConstraints={constraintRef} // Không cho kéo ra ngoài thanh bar
                    dragElastic={0} // Không cho kéo giãn ra ngoài biên
                    dragMomentum={false} // Tắt đà để nút dừng chính xác nơi thả tay
                    whileTap={{ scale: 0.9 }} // thu nhỏ khi active 
                    style={{ x: handleX }}
                    className="absolute -top-5 w-10 h-10 bg-white rounded-full flex items-center justify-between px-2 text-green-900 cursor-grab active:cursor-grabbing z-20 shadow-xl"
                >
                    <span className="text-[10px] font-bold">{"<"}</span>
                    <span className="text-[10px] font-bold">{">"}</span>
                </motion.div>
            </div>
        </div>
    );
};