import { geistMono } from "@/app/fonts"
import Image from "next/image"
import { User, ArrowDownLeftFromCircle } from "lucide-react"

const Header:React.FC = ()=>{
    return(
        <nav className="w-full bg-white shadow-lg">
            <header className="max-w-[1000px] m-auto text-black py-3 flex items-center justify-between ">
                <article className="flex items-center">
                    <Image src={"/logo.png"} alt="" width={30} height={30}/>
                    <span className={`${geistMono.className}`}>Formic</span>
                </article>
                <div className={`${geistMono.className}`}>
                    <button className="rounded-full p-1 text-xs font-medium flex border-2 border-black">
                        <span>VY</span>
                    </button>
                </div>
            </header>
        </nav>
    )
}

export default Header