
import Image from "next/image"

interface cardProps {
    imglink: string,
    cardTitle: string,
    cardContent: string,
}

export default function CarouselCard({ imglink, cardContent, cardTitle }: cardProps) {
    return (
        <div className="w-[535px] h-[431px] relative">
            <Image src={imglink} alt={cardContent} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"></Image>
            <div className="absolute z-1 bg-white shadow-lg bottom-0 left-0 w-8/10 p-8">
                <div className="text-xl font-bold uppercase">{cardTitle}</div>
                <div className="text-sm ">{cardContent}</div>
            </div>
        </div>
    )
}