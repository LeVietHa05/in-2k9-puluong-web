'use client'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

interface NavProps {
    isTransparent?: boolean
}

export default function Nav({ isTransparent }: NavProps) {
    const path = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        //tranh leak bo nho khi thoat. cleanup
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navbg = !isTransparent
        ? (!isScrolled ? 'bg-main-bg shadow-md text-white ' : 'bg-black/30 backdrop-blur-md  text-white')
        : 'bg-transparent text-white '

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 uppercase flex px-16 py-2 justify-between items-center transition-all duration-500  ${navbg}`}>
            <Link href={'/'} className=" text-[32px] font-bold hover:underline">
                pulong&apos;s
                <div>path</div>
            </Link>
            <div className="text-xl w-132 border-2 rounded-full py-4 px-12 flex justify-between items-center ">
                <div className={`${path == 'booking' ? "font-bold underline" : ""} hover:font-bold hover:cursor-pointer`}>
                    <Link href={'https://divi.travel/discover-the-beauty-of-pu-luong-ninh-binh-3-days-2-nights'}>booking</Link>
                </div>
                <div className={`${path.includes('event') ? "font-bold underline" : ""} hover:font-bold hover:cursor-pointer`}>
                    <Link href={'/event'}>event</Link>
                </div>
                <div className={`${path.includes('feedback') ? "font-bold underline" : ""} hover:font-bold hover:cursor-pointer`}>
                    <Link href={'feedback'}>feedback</Link>
                </div>
            </div>
        </div>
    )
} 