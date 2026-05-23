import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const dbconnect = async () => {
    await mongoose.connect(process.env.DB_URI)
    console.log(`connected ${mongoose.connection.host} at ${mongoose.connection.name}`)
}