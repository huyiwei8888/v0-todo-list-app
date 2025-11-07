"use client"

import { Button } from "@/components/ui/button"
import { Check, Trash2 } from "lucide-react"

interface TodoItemProps {
  todo: {
    id: string
    text: string
    completed: boolean
  }
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 hover:bg-card/50 transition-all">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
          todo.completed ? "bg-accent border-accent" : "border-border hover:border-accent"
        }`}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && <Check className="w-4 h-4 text-accent-foreground" />}
      </button>
      <span
        className={`flex-1 text-foreground transition-all ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.text}
      </span>
      <Button
        onClick={() => onDelete(todo.id)}
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
