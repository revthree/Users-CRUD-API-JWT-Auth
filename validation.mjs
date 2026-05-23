import { UserRole } from "./enums.mjs";


export const UserValidationSchema = {
    username : {
        notEmpty : {
            errorMessage : "username cannot be empty "
        }
    },
    password : {
        notEmpty : {
            errorMessage : "Password cannot be empty"
        },
        isLength : {
            options : {
                min : 8,
                max : 15
            },
            errorMessage : "Must be bw 8-15"
            
        }
    },
    role : {
        notEmpty : {
            errorMessage : " role cannot be empty"
        },
        isIn : {
            options : [UserRole],
            errorMessage : "must have a valid role"
        },
        optional : true
    }
}

export const UserPatchSchema = {
        username : {
            optional : true,
            notEmpty : {
            errorMessage : "username cannot be empty "
        }
    },
    password : {
        optional : true,
        notEmpty : {
            errorMessage : "Password cannot be empty"
        },
        isLength : {
            options : {
                min : 8,
                max : 15
            },
            errorMessage : "Must be bw 8-15"
            
        }
    },
    role : {
        notEmpty : {
            errorMessage : " role cannot be empty"
        },
        isIn : {
            options : [UserRole],
            errorMessage : "must have a valid role"
        },
        optional : true
    }
}