import { NextFunction, Request, Response } from "express";
import { userSecret } from "./config";
import Jwt, { JwtPayload }  from "jsonwebtoken";

export const userMiddleware=(req:Request,res:Response,next:NextFunction )=>{
    const header=req.headers["authorization"]
    const decoded =Jwt.verify(header as string,userSecret)
    if(decoded){
       
        req.userId=(decoded as JwtPayload).id;
        next()
    }
    else{
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}