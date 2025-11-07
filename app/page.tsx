"use client"

import { useState } from "react"
import { TodoList } from "@/components/todo-list"
import { TodoInput } from "@/components/todo-input"
import { CategoryManager } from "@/components/category-manager"

interface Todo {
  id: string
  text: string
  completed: boolean
  category: string
}

const DEFAULT_CATEGORIES = ["今天的任务", "学习任务", "工作任务"]
const name = 'huyiwei-local';

export default function Home() {
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0])
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category: selectedCategory,
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addCategory = (categoryName: string) => {
    if (categoryName.trim() && !categories.includes(categoryName.trim())) {
      setCategories([...categories, categoryName.trim()])
    }
  }

  const deleteCategory = (categoryName: string) => {
    const updated = categories.filter((cat) => cat !== categoryName)
    setCategories(updated)
    if (selectedCategory === categoryName && updated.length > 0) {
      setSelectedCategory(updated[0])
    }
  }

  const categoryTodos = todos.filter((todo) => todo.category === selectedCategory)
  const completedCount = categoryTodos.filter((t) => t.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-2">Tasks</h1>
          <p className="text-muted-foreground text-lg">Stay organized and productive</p>
        </div>

        <div className="mb-8">
          <CategoryManager
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        </div>

        <div className="mb-8">
          <TodoInput onAdd={addTodo} />
        </div>

        {categoryTodos.length > 0 && (
          <div className="mb-6 flex items-center justify-between rounded-lg bg-accent/10 px-4 py-3 border border-accent/20">
            <span className="text-sm font-medium text-foreground">
              {completedCount} of {categoryTodos.length} completed
            </span>
            <div className="h-2 w-32 rounded-full bg-accent/20 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(completedCount / categoryTodos.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <TodoList todos={categoryTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {categoryTodos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No tasks in this category. Add one to get started!</p>
          </div>
        )}
      </div>
    </main>
  )
}
