

import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";


export default function Event() {
    return (
        <div className="text-main-bg">
            <Nav isTransparent={false} />
            <div className="pt-[112px]">

            </div>
            <div className="max-w-7xl mx-auto py-24">
                <div className="font-bold text-[40px] underline uppercase mb-12">
                    event
                </div>
                <div className="flex gap-12 items-start">
                    <Link href={'/event/1'} className="w-[346px] h-auto hover:shadow-lg hover:bg-gray-100 transition-all duration-200 hover:rounded-2xl pb-4">
                        <div className="pb-6">
                            <Image src={`/event-0.png`} alt="" width={346} height={204} loading="eager" className="w-auto"></Image>
                        </div>
                        <div className="font-bold uppercase pb-8">
                            #1st Trip Volunteer at Pu Luong, <br />
                            Ba Thuoc Thanh Hoa.
                        </div>
                        <div className="text-justify text-sm">
                            On 31/1/26, Pu Luong took the first step on Pu Luong, with our high spirit to engage directly with the local community through organized service. The project took place with the aid of various donors and aimed to extend the tourists’ insights on not only Pu Luong’s but also Vietnam’s culture. From the planning stage to real-time implementation, the project was driven by a mutual desire to contribute directly and positively.....
                        </div>
                    </Link>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8  md:flex flex-col items-start w-[346px] h-auto">
                        <div className="flex items-center justify-center w-full h-51 bg-gray-200 rounded-base ">
                            <svg className="w-11 h-11 text-fg-disabled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                        </div>
                        <div className="w-full">
                            <div className="h-5 bg-gray-200 rounded-full w-64 mt-8"></div>
                            <div className="h-5 bg-gray-200 rounded-full w-48 mb-8 mt-1"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[360px]"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8  md:flex flex-col items-start w-[346px] h-auto">
                        <div className="flex items-center justify-center w-full h-51 bg-gray-200 rounded-base ">
                            <svg className="w-11 h-11 text-fg-disabled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                        </div>
                        <div className="w-full">
                            <div className="h-5 bg-gray-200 rounded-full w-64 mt-8"></div>
                            <div className="h-5 bg-gray-200 rounded-full w-48 mb-8 mt-1"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                            <div className="h-4 bg-gray-200 rounded-full max-w-[360px]"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

        </div>
    )
}