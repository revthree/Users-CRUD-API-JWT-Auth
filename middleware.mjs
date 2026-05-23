import { validationResult } from "express-validator";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

export const ValidationResultCheck = (req, res, next) => {
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).json(result.array())
    }
    next()
}


export const TokenCheck = (req, res, next) => {
    const token = req.cookies.authToken
    if(!token){
        return res.status(401).json({
            msg : "token not found"
        })
    }
    const Decoded = jwt.verify(token, process.env.JWT_KEY)
    if(!Decoded){
        return res.status(403).json({
            msg : "token expired, login again"
        })
    }
    req.user = Decoded
    next()

}

export  const IsValidId = (req, res, next) => {
    const id = req.user.id
    if(!id){
        return res.status(401).json({
            msg : "enter a valid id"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            msg : "not a valid object ID"
        })

    }
    next()

}

export const RoleCheck = (...allowedRoles) => {
    return (req, res, next) => {
        const UserRole = req.user.role
        if(!allowedRoles.includes(UserRole)){
            return res.status(403).json({
                msg : "not allowed to access"
            })
        }
        next()
    }
}