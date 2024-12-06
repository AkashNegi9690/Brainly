declare global{
    namespace Express {
        export interface Request {
            userId?:string;
        }
    }
}
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Z, { any } from "zod"
import bcrypt from "bcrypt"
import { shareModel, userModel } from "./db";
import { contentModel } from "./db";
import { userSecret } from "./config";
import { userMiddleware } from "./middleware";
import { nanoid } from "nanoid";
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://akashnegi9690:akashnegi9690@cluster0.a1dkp.mongodb.net/Brainly")

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const requiredBody = Z.object({
        username: Z.string().min(3).max(30),
        password: Z.string()
            .min(8,"Password must be at least 8 characters long")
            .max(20,"Password must be less than 20 characters long")
            .regex(/[a-z]/,"Password must contain at least one lowercase letter")
            .regex(/[A-Z]/,"Password must contain at least one lowercase letter")
            .regex(/\d/,"Password must contain at least one number")
            .regex(/[\W]/,"Password must contain at least one special character")
    })
    const parsedSuccessfully = requiredBody.safeParse(req.body)
    if (parsedSuccessfully.success) {
        const hashedPassword = await bcrypt.hash(password, 5)
        try {
            await userModel.create({
                username,
                password:hashedPassword
            })
            res.json({
                message:"user created"
            })
        } catch (error:unknown) {
            if(error instanceof Error)
            // if (error.code === 11000) { 
                // res.status(403).json({ message: "Username already exists" });
            // } else {
                res.status(500).json({ message: "Server error", error: error.message });
            // }
        }
    }
    else {
        res.status(411).json({
            message: parsedSuccessfully.error
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user= await userModel.findOne({username})
    if(user){
        const passwordMatched =await bcrypt.compare(password,user.password)
        if(passwordMatched){
            const token = jwt.sign({
                id:user._id
            },userSecret)
            res.json({
                token
            })
        }
        else{
            res.json({
                message:"wrong password"
            })
        }

    }
    else{
        res.json({
            message:"wrong email"
        })
    }


})

app.post("/api/v1/content",userMiddleware, async (req, res) => {
const {link,type,title}=req.body
await contentModel.create({
    link,type,
    tags:[],
   title,
    userId:req.userId
})
res.json({
    messgae:"content added"
})
})

app.get("/api/v1/content",userMiddleware,async (req, res) => {
   
    const userId=req.userId
    const content=await contentModel.find({
        userId
    }).populate("userId","username")
    res.json({
        content
    })
})

app.delete("/api/v1/content",userMiddleware, async (req, res) => {
//@ts-ignore
    const userId=req.userId
    const contentId=req.body.contentId;
    await contentModel.deleteMany({
        contentId,
        userId
    })
    res.json({
        message:"deleted"
    })
})

app.post("/api/v1/brain/share",userMiddleware,async (req, res) => {
    const share=req.body.share;
    
    if(share){
            const existingShareableLink=await shareModel.findOne({
                userId:req.userId
            })
            if(existingShareableLink){
                res.json({
                    shareableLInk:existingShareableLink.hash
                })
                return;
            }
        const shareableLinkPin=nanoid(10)
        await shareModel.create({
            userId:req.userId,
            hash:shareableLinkPin
        })
        res.json({
            shareablelink:shareableLinkPin
        })
    }
    else{
            await shareModel.deleteOne({
                userId:req.userId
            })
            res.json({
                message:"shareable Link Updated"
            })
    }
})

app.get("/api/v1/brain/:shareLink",async (req, res) => {
    const shareableLinkPin=req.params.shareLink
    const linkExists= await shareModel.findOne({hash:shareableLinkPin})
    if(!linkExists){
        res.json({
            message:"link does not exists"
        })
        return;
    }
    const content=await contentModel.find({userId:linkExists.userId})
    const user =await userModel.findOne({_id:linkExists.userId})
    if(!user){
        res.json({
            message:"user does not exists"
        })
        return;
    }
    res.json({
        usename:user.username,
        content
    })
        
})

app.listen(3000)