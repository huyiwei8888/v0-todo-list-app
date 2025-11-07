"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface TodoInputProps {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all leading-3 px-4 py-2"
      />
      <Button
        type="submit"
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg flex gap-2 font-medium transition-all items-center"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Add</span>
      </Button>
    </form>
  )
}
