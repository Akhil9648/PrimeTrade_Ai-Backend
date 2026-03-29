import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo, getTodos } from "../controllers/todo.controller.js";
const router=express.Router();
router.post('/addTodo',verifyJWT,createTodo);
router.delete('/deleteTodo/:id',verifyJWT,deleteTodo);
router.get('/getTodos', verifyJWT, getTodos);
export default router;