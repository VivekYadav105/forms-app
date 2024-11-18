'use client'

import React, { useState } from "react"
import { geistSans } from "../../fonts";
import Link from "next/link";
import {EyeIcon,EyeClosedIcon} from 'lucide-react'

const Signup:React.FC = ()=>{
    const[showPassword,setShowPassword] = useState(false)

    return (
        <div className={`text-black ${geistSans.className}`}>
            <h3 className={`text-center text-xl ${geistSans.className} pt-4 font-medium`}>Login using your credentials</h3>
            <form className="">
                <article className="flex flex-col my-3">
                    <label>Username/Email</label>
                    <input type="text" alt="" className="input" />
                </article>
                <article className="flex flex-col my-3">
                    <label>Password</label>
                    <article className="flex w-full">
                        <input type={showPassword?"text":"password"} alt="" className="input flex-1"/>
                        <button 
                        onClick={()=>setShowPassword(prev=>!prev)}
                        type="button"
                        className="p-2 px-3 duration-300 rounded-md hover:bg-gray-500/40">
                            {showPassword&&<EyeIcon size={16}/>}
                            {!showPassword&&<EyeClosedIcon size={16}/>}
                        </button>
                    </article>
                </article>

               
                <hr className="my-3"/>
                <article className="flex text-xs justify-center">
                    Already have an account?
                    <Link className="hover:text-violet-700 text-blue-600 duration-200" href={"/auth/signup"}>Login</Link>
                </article>
            </form>
        </div>
    )
}

export default Signup

