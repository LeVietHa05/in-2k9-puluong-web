



import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";


export default function Event() {
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
                        <div className="bg-main-bg text-white uppercase font-bold text-xl text-center p-4">WRITE REVIEW</div>
                        <div className="p-4 text-center text-xl font-bold border-2">ADD PHOTOS</div>
                    </div>
                </div>

                <div className="pl-12">
                    <div>
                        <div className="mt-8 flex gap-6">
                            <div className="size-12 rounded-full bg-main-bg">

                            </div>
                            <div className="capitalize">
                                <div>
                                    bún Đậu
                                </div>
                                <div className="flex pb-6">
                                    <Image src={'/star.svg'} width={20} height={20} alt="star"></Image>
                                    <Image src={'/star.svg'} width={20} height={20} alt="star"></Image>
                                    <Image src={'/star.svg'} width={20} height={20} alt="star"></Image>
                                    <Image src={'/star.svg'} width={20} height={20} alt="star"></Image>
                                    <Image src={'/star.svg'} width={20} height={20} alt="star"></Image>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-justify">
                            On 31/1/26, Pu Luong took the first step on Pu Luong, with our high spirit to engage directly with the local community through organized service. The project took place with the aid of various donors and aimed to extend the tourists’ insights on not only Pu Luong’s but also Vietnam’s culture. From the planning stage to real-time implementation, the project was driven by a mutual desire to contribute directly and positively.....
                        </div>
                        <div className="animate-pulse flex gap-2 mt-8">
                            <div className="w-2/5 h-40 bg-gray-200"></div>
                            <div className="w-1/5 h-40 bg-gray-200"></div>
                            <div className="w-2/5 h-40 bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}