'use client'

import React, { useState } from "react"
import { geistSans } from "../../fonts";
import {EyeIcon,EyeClosedIcon} from 'lucide-react'

const Reset:React.FC = ()=>{
    const[showPassword,setShowPassword] = useState(false)

    return (
        <div className={`text-black ${geistSans.className}`}>
            <h3 className={`text-center text-xl ${geistSans.className} pt-4 font-medium`}>Reset your account password</h3>
            <form className="">
                <article className="flex flex-col my-3">
                    <label>Username/Email</label>
                    <input type="text" disabled value={'vivekyadav3133@gmail.com'} alt="" className="input" />
                </article>
                <article className="flex flex-col my-3">
                    <label>New Password</label>
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
                <article className="flex flex-col my-3">
                    <label>Confirm new Password</label>
                    <input type={showPassword?"text":"password"} alt="" className="input" />
                </article>
                <button type="submit" className="text-center bg-green-500 w-full p-2 mt-3 rounded-md shadow-md">Reset Password</button>
            </form>
        </div>
    )
}

export default Reset

