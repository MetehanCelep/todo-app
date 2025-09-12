import { NextApiRequest, NextApiResponse } from "next";

interface Todo {
  id: number;
  text: string;
}

let todos: Todo[] = [];
let id = 1;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id: todoId } = req.query;

    if (todoId) {
      if (isNaN(Number(todoId))) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const todo = todos.find((t) => t.id === Number(todoId));
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
    const newTodo: Todo = { id: id++, text };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  } else if (req.method === "DELETE") {
    const { id: todoId } = req.query;
    if (!todoId || isNaN(Number(todoId))) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const beforeLength = todos.length;
    todos = todos.filter((t) => t.id !== Number(todoId));
    if (todos.length === beforeLength) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Deleted" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
