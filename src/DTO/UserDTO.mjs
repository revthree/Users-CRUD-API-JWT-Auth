export const UserResponseDTO = (userInfo, message) => {
    return {
        username : userInfo.username,
        role : userInfo.role,
        id : userInfo._id,
        msg : message
    }    
}