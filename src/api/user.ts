router.post('/signup',async(req,res,next)=>{
    try{
        const {password,fname,lname,email} = req.body
        const existingUser = await userModel.findOne({$or:[{email}]})
        console.log(req.body);
        
        let token,otp;
        if(existingUser){
            res.statusCode = 409
            throw new Error("User alreasy exists")
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            token = jwt.sign({fname,lname,password:hashedPassword,email},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
            let name = fname + " " + lname||''
            await sendVerificationMail(email,name,token)
        }
        return res.status(201).json({message:"please check your email for verification link"})
    }
    catch(err){
        next(err)
    }
})

router.post('/forgot',async(req,res,next)=>{
    try{
        const {username} = req.body
        const user = await userModel.findOne({$or:[{email:username},{username}]})
        if(!user){
            console.log("user not found");
            return res.json({message:"Please check the mobile for the otp code"})
        }
        const token = jwt.sign({id:user._id,mode:'resetPassword'},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
        user.token = token;
        await user.save()
        await sendForgotEmail(user.email,user.username,token)
        return res.json({message:`check your email for reset link`,token:token})
    }
    catch(err){
        next(err)
    }
})

router.post('/verifyOtp',parser.single('profilePic'),async(req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        const {otp} = req.body
        const {id,mode} = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        console.log(id,mode,otp);
        const user = await userModel.findById(id)
        if(!user){
            res.statusCode = 400
            throw new Error("User not found!")
        }
        if(user.otp!=otp){
            res.statusCode = 400
            throw new Error("Invalid Otp Code")
        }
        if(mode==='verifyUser'){
            user.otp = ''
            user.verfied = true
            await user.save()
            const messageResponse = await createMessage(user.mobile,`Your UserId is ${user.userId}.`) 
            return res.json({message:`Your User Id is ${user.userId}`})
        }else{
            const resettoken = jwt.sign({id},process.env.JWT_SECRET_TEMP)
            return res.json({message:"Otp Verified Successfullt",token:resettoken})
        }
    }catch(err){
        console.log(err.name);
        if (err.name === 'JsonWebTokenError') {
            res.status(401).send({ message: 'Session expired, please log in again.' });
        } else {
            next(err);
        }
    }
})

router.post('/create',async(req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        console.log("token:",token);
        const data = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const {username,profilePic} = req.body;
        const existingUser = await userModel.findOne({$or:[{email:username},{username}]})
        if(existingUser){
            res.statusCode = 409
            throw new Error("User alreasy exists or username is taken")
        }
        const user = await userModel.create({...data,username,profilePic:''})
        return res.json({message:"User Created Successfully",user})
    }catch(err){
        next(err)
    }
})

router.get('/verifyToken',async(req,res,next)=>{
    try{
        console.log(req.headers.authorization);
        
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const payload = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        return res.json({message:"Token Verified Successfully"})
    }catch(err){
        switch(err.name){
            case 'JsonWebTokenError':
                err.message = "Invalid Token"
                break;
            default:
                err.message = "Session Expired"
                break;
        }
        next(err)
    }
})

router.post('/reset',async(req,res,next)=>{
    try{
        const {password} = req.body
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        const {id} = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const user = await userModel.findById(id)
        if(user.token!=token){
            res.statusCode = 403
            throw new Error("session expired or Invalid token")
        }
        if(!user){
            res.statusCode = 403
            throw new Error("Session Expired. Please try again!!")
        }
        user.password = await bcrypt.hash(password,10)
        await user.save()
        return res.json({message:`Password reset sucessfully`})
    }catch(err){
        next(err)
    }
})

router.get('/reset/:token',async(req,res,next)=>{
    try{
        const token = req.params.token
        const success = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        return res.json({message:'correct token'})
    }
    catch(err){
        res.statusCode = 403
        err.message = 'Session Expired or invalid token'
        next(err)
    }
})


module.exports = router