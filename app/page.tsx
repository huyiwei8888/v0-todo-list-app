"use client"

import { useState } from "react"
import { TodoList } from "@/components/todo-list"
import { TodoInput } from "@/components/todo-input"

export default function Home() {
  const [todos, setTodos] = useState<Array<{ id: string; text: string; completed: boolean }>>([])

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-2">Tasks</h1>
          <p className="text-muted-foreground text-lg">Stay organized and productive</p>
        </div>

        <div className="mb-8">
          <TodoInput onAdd={addTodo} />
        </div>

        {todos.length > 0 && (
          <div className="mb-6 flex items-center justify-between rounded-lg bg-accent/10 px-4 py-3 border border-accent/20">
            <span className="text-sm font-medium text-foreground">
              {completedCount} of {todos.length} completed
            </span>
            <div className="h-2 w-32 rounded-full bg-accent/20 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(completedCount / todos.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {todos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No tasks yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </main>
  )
}
