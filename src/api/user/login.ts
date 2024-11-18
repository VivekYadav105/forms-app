import { NextResponse } from "next/server";

export default async function POST(req:Request,res:Response){
    const data = await req.json()
    const {username,password,mode} = data
    console.log(mode);
    const user = await employeeModel.findOne({$or:[{email:username},{username}]}).lean()

    if(!user) throw new Error("Invalid Credentials!!")
    
    const hashedPassword = await bcrypt.compare(password,user.password)
    if(!hashedPassword){
        throw new Error("Credentials doesn't match")
    }
    const {password:userPassword,...userDoc} = user
    const token = jwt.sign(userDoc,process.env.JWT_SECRET_MAIN,{expiresIn:'1h'})
    return NextResponse.json({message:"User Logged In succssfully",token:token})
}