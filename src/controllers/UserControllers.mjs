import { matchedData } from "express-validator"
import UserServices from "../services/UserServices.mjs"
import { token } from "morgan"

export const createUser = async (req, res) => {
    try{
        const saved = await UserServices.createUser(matchedData(req))
        return res.status(201).json(saved)
    }catch(e){
        if(e.message === "DuplicateKey"){
            return res.status(400).json({
                msg : "username alreadye exists"
            })
        } 
        return res.status(500).json({
            msg : " internal server error",
            error : e.message
        })
    }
}

export const loginUser = async (req, res) => {
    try{
        const token = await UserServices.loginUser(matchedData(req))
        res.cookie("authToken", token, {maxAge: 60*60*1000})
        return res.status(200).json({
            msg : "login success!"
        })
    }catch(e){
        if(e.message === "UserNotFound"){
            return res.status(404).json({
                msg : e.message
            })
        }
        if(e.message === "Unauthorised"){
            return res.status(401).json({
                msg : e.message
            })
        }
         return res.status(500).json({
            msg : " internal server error",
            error : e.message
        })
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie("authToken")
    return res.status(200).json({
        msg : "logged out"
    })
}

export const profile = async (req, res) => {
    try{
        
    const saved = await UserServices.profile(req.user.id)  
    return res.status(200).json({
        msg : "my profile",
        ...saved
    })

    }catch(e){
            if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
            return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })
    }

}}

export const getAllUsers = async (req, res) => {
    const saved = await UserServices.getAllUsers()
    return res.status(200).json(saved)
}


export const removeUser = async (req, res) => {
    try{
        await UserServices.removeUser(req.user.id)
        res.clearCookie("authToken")
        //   console.log("inside controller")
        return res.sendStatus(204)      
    }catch (e){
        if(e.message === "UserNotFound"){
            return res.status(404).json({
                msg : e.message
        })
        return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })
    }
}}

export const updatedRole = async (req, res) => {
    const {id} = req.params
    try{
        const updated = await UserServices.updatedRole(id)
        return res.status(200).json(updated)

    }catch (e){
        if(e.message === "UserNotFound"){
            return res.status(404).json({
                msg : e.message
        })
        return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })

    }
    
}}

export const updatedPassword = async (req, res) => {
    const {oldPass, newPass} = req.body
    try{
        const updated = await UserServices.updatedPassword(req.user.id, oldPass, newPass)
        return res.status(200).json(updated)
    }catch (e){
        if(e.message === "UserNotFound"){
            return res.status(404).json({
                msg : e.message
        })
        }
        if(e.message === "Unauthorised"){
            return res.status(401).json({
                msg : e.message
        })
        }
        return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })

    }
}

export const updateUsername = async (req, res) => {
    const {newUsername} = req.body
    const id = req.user.id
    try{
        const updated = await UserServices.updateUsername(id, newUsername)
        return res.status(200).json(updated)
    }catch(e){
        if(e.message === "UserNotFound"){
            return res.status(404).json({
                msg : e.message
        })
        }
        if(e.message === "DuplicateKey"){
            return res.status(400).json({
                msg : e.message
        })
        }
        return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })
    }
    
}