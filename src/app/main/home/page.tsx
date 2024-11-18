import { geistMono } from "@/app/fonts"
import Link from "next/link"

const CreateForm:React.FC = ()=>{
    return(
        <div className={`${geistMono.className} text-xs grow bg-blue-600 p-3`}>
            <p className="text-sm pb-2">Your Forms</p>
            <div className="bg-white flex flex-col h-[200px]">
                <div className="flex grow"></div>
                <div className="p-2 flex items-center gap-2 justify-center">
                    <button className="bg-green-500 p-2 rounded-md text-black shadow-md">View All form</button>
                    <Link href="/main/create" className="p-2 rounded-md bg-black text-white">Create new Form</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateForm