'use server'

import {z} from 'zod'

const loginSchema = z.object({
    email:z.string().email({message:"Invalid email address"}).trim(),
    password:z.string().min(8,{message:"Password must include atleast 8 letters"}).trim()
})

export async function Login(){
    
}