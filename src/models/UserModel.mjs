import mongoose from "mongoose"
import { UserRole } from "../../enums.mjs"


const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : UserRole,
        default : UserRole[0]
    }
},
{
    timestamps : true
})

export default mongoose.model("UserInformationDetail", UserSchema)