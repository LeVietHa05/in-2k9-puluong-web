import Image from "next/image";
import Link from "next/link";
import Nav from "./components/nav";
import SliderCarousel from "./components/slider";
import CarouselCard from "./components/carouselCard";
import { ExperiencesCarousel } from "./components/test";


export default async function Home() {

  return (
    <div className=" text-main-bg">
      <Nav isTransparent={false} />
      <div className="pt-[112px]">

      </div>
      <Image className="w-full" src={'/home-placeholder.png'} width={1280} height={714} alt="placeholder" loading="eager"></Image>

      {/* header */}
      <div className="bg-main-bg">
        <div className="max-w-7xl mx-auto px-21 py-10 text-white flex items-center">
          <div className="uppercase w-1/2 text-8xl/28 font-bold line">
            <div>
              puluong&apos;s
            </div>
            <div>path</div>
          </div>
          <div className="text-justify w-1/2 text-[24px] pl-12">
            Founded in 2026, Pù Luông&apos;s Paths was born from quiet mornings in rice fields and long conversations by campfires. With this in mind, we hope to create journeys that leave behind shared understanding and a quiet sense of belonging — for both those who come, and those who call this place home.
          </div>
        </div>
      </div>

      <div className="border-b-1 border-black">
        <div className="w-lg mx-auto  font-bold text-5xl uppercase   space-y-10 py-16">
          <div className="flex justify-between items-center">
            <Link href={'https://divi.travel/discover-the-beauty-of-pu-luong-ninh-binh-3-days-2-nights'}>
              booking
            </Link>
            {/* arrow */}
            <div>
              <Image src={'/arrow1.png'} alt="" height={40} width={217} className="w-auto"></Image>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link href={'/event'}>
              event
            </Link>
            {/* arrow */}
            <div>
              <Image src={'/arrow2.png'} alt="" height={40} width={307} className="w-auto"></Image>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link href={'/feedback'}>
              feedback
            </Link>
            {/* arrow */}
            <div>
              <Image src={'/arrow3.png'} alt="" height={40} width={186} className="w-auto"></Image>
            </div>
          </div>
        </div>
      </div>

      {/* our mission */}
      <div className="mt-16">
        <div className="w-[646px] mx-auto text-8xl font-bold text-center   uppercase">
          our mission
        </div>
        <div className="w-[636px] mx-auto text-[24px] text-justify  ">
          We exist to create sustainable, positive impact through  community-based experiences.
        </div>

        <div className="grid grid-cols-2 mx-auto max-w-7xl gap-22 mt-12 text-justify text-[24px]">
          <div className="">
            <div className="mb-6 font-bold uppercase">
              Create meaningful <br />
              cultural exchange for <br />
              international traveler
            </div>
            <div>
              We offer hands-on, everyday experiences that allow visitors to live within local rhythms rather than observe from a distance. Through shared meals, farm work, traditions, and conversations, travelers gain a deeper understanding of Pù Luông’s culture while approaching it with respect and humility
            </div>
          </div>
          <div className="">
            <div className="mb-6 font-bold uppercase">
              Empower local <br />
              communities through <br />
              language and confidence building
            </div>
            <div>
              We offer hands-on, everyday experiences that allow visitors to live within local rhythms rather than observe from a distance. Through shared meals, farm work, traditions, and conversations, travelers gain a deeper understanding of Pù Luông’s culture while approaching it with respect and humility
            </div>
          </div>
          <div className="">
            <div className="mb-6 font-bold uppercase">
              Connect volunteers with real, <br /> community-led needs
            </div>
            <div>
              We organize trips to Pù Luông for volunteers who wish to contribute their time, skills, and care directly to the community. These journeys are designed to support local initiatives, encourage knowledge exchange, and foster long-term relationships rather than short-term aid.
            </div>
          </div>
          <div className="">
            <div className="mb-6 font-bold uppercase text-left">
              Ensure tourism grows with the community, not at its expense
            </div>
            <div>
              All activities are developed in collaboration with local people, ensuring fair value, cultural preservation, and shared ownership. Our goal is to create a cycle where tourism supports livelihoods, strengthens community bonds, and protects the spirit of Pù Luông for future generations.
            </div>
          </div>
        </div>
      </div>

      {/* experience we offer - carousel */}
      <div className="mt-16">
        <ExperiencesCarousel />
      </div>

      {/* the gap we saw */}
      <div className=" ">
        <div className="max-w-7xl mx-auto border-b-1 text-main-bg py-8">
          <div className="uppercase text-8xl/30 font-bold text-center">
            The Gaps We Saw
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-b-1 text-main-bg py-12 flex justify-between items-center gap-8 text-2xl">
          <div className="space-y-8">
            <div className="uppercase font-bold">Travellers</div>
            <div>
              <ul className="list-disc list-outside ml-5">
                <li>Struggle to communicate, miss authentic local experiences</li>
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div className="uppercase font-bold ">Youngsters</div>
            <div>
              <ul className="list-disc list-outside ml-5">
                <li>Lack real-world exposure, practical skills, and confidence</li>
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div className="uppercase font-bold">Local communities</div>
            <div>
              <ul className="list-disc list-outside ml-5">
                <li>Language barriers limit connection and cultural exchange</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl  mx-auto border-b-1 text-main-bg  py-12">
          <div className="w-fit mx-auto space-y-12">
            <ul className="list-disc ml-5  mx-auto">
              <li className="text-2xl ">
                At the intersection of these gaps, we saw not a problem — but a purpose.
              </li>
            </ul>
            <div className="w-fit mx-auto bg-main-bg rounded-full px-12 py-1 flex gap-12  items-center text-white uppercase text-2xl hover:scale-105 hover:bg-[#1a472a] transition-all duration-300 hover:cursor-pointer">
              <div>
                <Link href={'https://accomplishments.northeastern.edu/#_ga=2.13041009.773277243.1692905027-2099924813.1692729368'}>
                  Learn more about our impact
                </Link>
              </div>
              <div>
                <Image src={'/arrow5.png'} width={42} height={40} alt="" className="w-auto"></Image>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-main-bg text-white">
        <div className="max-w-7xl mx-auto flex">
          <div className="w-1/3 flex-shrink-0">
            <Image src={'/home-footer.png'} width={536} height={741} alt="" ></Image>
          </div>
          <div>
            <div>
              Meet <br />
              the Founder <br />
              & Our Team <br />
            </div>
            <div>
              Behind Pù Luông’s Paths is a small but committed team — young people, locals, volunteers, and collaborators who believe that impact doesn’t require scale, but sincerity. <br />
              Founder : <br />
              Truong Nam Anh: With a strong desire to travel, experience new places, and understand Vietnam beyond the surface, our founder is especially curious about how local economies - particularly tourism - truly work. This project grew from that curiosity, turning personal exploration into an opportunity for learning, cultural exchange, and shared growth.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
