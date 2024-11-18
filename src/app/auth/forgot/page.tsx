'use client'

import React  from "react"
import { geistSans } from "../../fonts";
import Link from "next/link";

const Reset:React.FC = ()=>{
    return (
        <div className={`text-black ${geistSans.className}`}>
            <h3 className={`text-center text-xl ${geistSans.className} pt-4 font-medium`}>Verify your account to Reset password</h3>
            <form className="">
                <article className="flex flex-col my-3">
                    <label>Username/Email</label>
                    <input type="text"  alt="" className="input" />
                </article>
                <article className="flex mt-3 gap-2 items-center">
                    <button type="submit" className="text-center bg-green-500 p-2 rounded-md shadow-md">Send Verification mail</button>
                    <Link href="/auth/login" className="bg-black text-white rounded-md shadow-md p-2">Back to Login</Link>
                </article>
            </form>
        </div>
    )
}

export default Reset

