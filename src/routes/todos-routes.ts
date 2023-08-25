import { Router } from "express";
import checkAuth from "../middlewares/check-auth";
import todosControllers from "../controellers/todos-controllers";

const router = Router();
router.use(checkAuth);


router.get("", todosControllers.getTodosByUserId);
router.post("", todosControllers.createTodo);
router.put("", todosControllers.updateTodo);
router.delete("/:id", todosControllers.deleteTodo);

export default router;
