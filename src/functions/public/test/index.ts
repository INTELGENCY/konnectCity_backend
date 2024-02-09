import { Request,Response } from "express";

export const test=function(req:Request,res:Response){
    return res.json({test: "test public api"}).status(200)
}