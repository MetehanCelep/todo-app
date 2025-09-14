import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id: todoId } = req.query;

    if (todoId) {
      if (typeof todoId !== 'string') {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      const todo = todos.find((t) => t.id === todoId);
      if (todo) {
        return res.status(200).json(todo);
      } else {
        return res.status(404).json({ message: "Todo not found" });
      }
    } else {
      return res.status(200).json(todos);
    }
  } else if (req.method === "POST") {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }
 
    const newTodo: Todo = { 
      id: uuidv4(),
      text 
    };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  } else if (req.method === "DELETE") {
    const { id: todoId } = req.query;
    if (!todoId || typeof todoId !== 'string') {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const beforeLength = todos.length;
    todos = todos.filter((t) => t.id !== todoId);
    if (todos.length === beforeLength) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Deleted" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}