import { NextFunction, RequestHandler, Response } from "express";
import { IGetUserAuthInfoRequest } from "../interfaces/get-user-id-req.interface";
import HttpError from "../models/http-error";
import todosServices from "../services/todos-services";

class TodosController {
  getTodosByUserId: RequestHandler = async (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId!;
    let todos;
    try {
      todos = await TodoServices.getTodosByUserId(userId);
    } catch (error) {
      return next(
        new HttpError("Could not find todo for the provided user id", 404)
      );
    }

    res.json(todos || {});
  };

  createTodo: RequestHandler = async (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId!;
    const { title, description, sort, dueDate, state } = req.body;
    let todo: any = {
      id: "",
      userId,
      title,
      description,
      state,
      sort,
      dueDate,
    };
    try {
      todo = (await todosServices.createTodo(todo))[0];
    } catch (err) {
      return next(new HttpError("creating todo failed", 500));
    }
    res.json({ todo });
  };

  updateTodo: RequestHandler = async (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId!;
    const { id, title, description, sort, dueDate, state } = req.body;
    let todo: any = {
      id,
      userId,
      title,
      description,
      state,
      sort,
      dueDate,
    };

    try {
      todo = (await todosServices.updateTodo(todo))[0];
    } catch (err) {
      return next(new HttpError("updating todo failed", 500));
    }

    res.json({ todo });
  };

  deleteTodo: RequestHandler = async (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId!;
    const id = req.params.id;

    try {
      await todosServices.deleteTodo(id, userId);
    } catch (err) {
      return next(new HttpError("deleting todo failed", 500));
    }
    res.status(200).json({ message: "Deleted todo." });
  };
}

export default new TodosController();
