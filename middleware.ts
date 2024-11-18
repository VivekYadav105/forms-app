import { NextResponse,NextRequest } from "next/server";

export function middleware(req:NextRequest){
    
    return NextResponse.redirect(new URL('/auth/login',req.url))
}

export const config = {
    matcher:"/main/"
}