import Todo from "../models/todo.model.js";
export const createTodo=async(req,res,next)=>{
    try{
        const {title,description,status}=req.body;
        const todo=await Todo.create({
            title,
            description,
            status,
            user:req.user.id
        });
        return res.status(201).json({message:"Todo Created Successfully",todo});
    }catch(error){
        next(error);
    }
}
export const deleteTodo=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const todo=await Todo.findByIdAndDelete(id);
        return res.status(200).json({message:"Todo Deleted Successfully",todo});
    }catch(error){
        next(error);
    }
}

export const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        next(error);
    }
}