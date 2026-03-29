import express from "express";
import { getProfile, loginUser, registerUser,deleteUser,getAllUsers,updateUser,getUserById,addUser,getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateUserSettings } from "../controllers/auth.controller.js";
const router=express.Router();
router.post("/register",registerUser)
router.post('/login',loginUser)
router.get('/profile',verifyJWT,getProfile)
router.delete('/delete/:id',verifyJWT,deleteUser)
router.get('/all',verifyJWT,getAllUsers)
router.put('/update/:id',verifyJWT,updateUserSettings)
router.get('/:id',verifyJWT,getUserById)
router.post('/add',verifyJWT,addUser)
router.get('/current',verifyJWT,getCurrentUser)
export default router;