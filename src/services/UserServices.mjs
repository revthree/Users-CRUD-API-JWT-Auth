import UserDB from "../models/UserModel.mjs"
import bcrypt from "bcrypt"
import { UserResponseDTO } from "../DTO/UserDTO.mjs"
import jwt from "jsonwebtoken"
import { UserRole } from "../../enums.mjs"

const createUser = async (userInfo) => {
    const existingUser = await UserDB.findOne({username : userInfo.username})

    if(!existingUser){
        const encrypted = await bcrypt.hash(userInfo.password, 10)
        userInfo.password = encrypted
        const saved = await UserDB.create(userInfo)
        return UserResponseDTO(saved, "REGISTERED")
    }
    throw new Error("DuplicateKey")
}

const loginUser = async (userInfo) => {
    const savedUser = await UserDB.findOne({username : userInfo.username})

    if(!savedUser){
        throw new Error("UserNotFound")
    }

    const isTrue = await bcrypt.compare(userInfo.password, savedUser.password)

    if(!isTrue){
        throw new Error("Unauthorised")
    }
    const token = jwt.sign({username : savedUser.username, role : savedUser.role, id : savedUser.id}, process.env.JWT_KEY, {expiresIn : "1h"})
    return token
}

const profile = async (id) => {
    const savedUser = await UserDB.findById(id)  
    if(!savedUser){
        throw new Error("UserNotFound")
    }
    return UserResponseDTO(savedUser, "PROFILEINFO")
}

const getAllUsers = async () => {
    const savedUsers = await UserDB.find()
    const abstractUsers = savedUsers.map( (user) => UserResponseDTO(user))
    return abstractUsers
}


const removeUser = async (id) => {
    const deleted = await UserDB.findByIdAndDelete(id)
        //  console.log("inside service")
    if(!deleted){
        throw new Error("UserNotFound")
    }
    return deleted
}

const updatedRole = async (id) => {
    const saved = await UserDB.findById(id)
    if(!saved){
            throw new Error("UserNotFound")
    }
    if(saved.role === UserRole[1]){
        saved.role = UserRole[0]
    }else{
        saved.role = UserRole[1]
    }
    await saved.save()
    return UserResponseDTO(saved, "UPDATED")   
    
}


const updatedPassword = async (id, oldPass, newPass) => {
    const saved = await UserDB.findById(id)
    if(!saved){
        throw new Error("UserNotFound")
    }
    const isTrue = await bcrypt.compare(oldPass, saved.password)
    if(!isTrue){
        throw new Error("Unauthorised")
    }
    saved.password = await bcrypt.hash(newPass, 10)
    await saved.save()
    return UserResponseDTO(saved, "PASSWORD UPDATED")
}

const updateUsername = async (id, newUsername) => {
    const saved = await UserDB.findById(id)
    if(!saved){
        throw new Error("UserNotFound")
    }

    const existingUser = await UserDB.findOne({username: newUsername})
      
    if(!existingUser){
        saved.username = newUsername
        saved.save()
        return UserResponseDTO(saved, "USERNAME UPDATED")
    }
      throw new Error("DuplicateKey")

    
}

export default {createUser, loginUser, profile, getAllUsers, removeUser, updatedRole, updatedPassword, updateUsername}