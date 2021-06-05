import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
    });

    const newTodo: ITodo = await todo.save();

    res.status(201).json({
      message: "Todo added",
      todo: newTodo,
    });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );

    res.status(200).json({
      message: "Todo deleted",
      todo: deleteTodo,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
