import express from "express";
import { getProfile,getAllUsers,getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=express.Router();
router.get('/profile',verifyJWT,getProfile)
router.get('/all',verifyJWT,getAllUsers)
router.get('/current',verifyJWT,getCurrentUser)
export default router;