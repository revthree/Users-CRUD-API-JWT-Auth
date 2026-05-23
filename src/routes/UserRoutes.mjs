import { Router } from "express";
import { checkSchema } from "express-validator";
import { UserPatchSchema, UserValidationSchema } from "../../validation.mjs";
import { IsValidId, RoleCheck, TokenCheck, ValidationResultCheck } from "../../middleware.mjs";
import { createUser, getAllUsers, loginUser, logoutUser, profile, removeUser, updatedPassword, updatedRole, updateUsername } from "../controllers/UserControllers.mjs";


const router = Router()


router.post("/api/auth/register", checkSchema(UserValidationSchema), ValidationResultCheck, createUser)
router.post("/api/auth/login", checkSchema(UserValidationSchema), ValidationResultCheck, loginUser)
router.get("/api/auth/logout", logoutUser)
router.get("/api/users/me", TokenCheck, IsValidId, profile)
router.get("/api/users", TokenCheck, RoleCheck("ADMIN"), getAllUsers)
router.delete("/api/users/me", TokenCheck, IsValidId, removeUser)
router.patch("/api/users/:id/role", TokenCheck, RoleCheck("ADMIN"), checkSchema(UserPatchSchema), IsValidId, ValidationResultCheck, updatedRole)
router.patch("/api/users/me/password", TokenCheck, IsValidId, updatedPassword)
router.patch("/api/users/me/username", TokenCheck, IsValidId, updateUsername)


export default router