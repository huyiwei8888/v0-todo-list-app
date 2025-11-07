"use client"

import { TodoItem } from "./todo-item"

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return null
  }

  const activeTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)

  return (
    <div className="space-y-3">
      {activeTodos.length > 0 && (
        <div className="space-y-2">
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="space-y-2 mt-6 pt-6 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3">Completed</h3>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
