"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface CategoryManagerProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onAddCategory: (category: string) => void
  onDeleteCategory: (category: string) => void
}

export function CategoryManager({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
}: CategoryManagerProps) {
  const [showInput, setShowInput] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim())
      setNewCategory("")
      setShowInput(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCategory()
    } else if (e.key === "Escape") {
      setShowInput(false)
      setNewCategory("")
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-accent/50 transition-all group cursor-pointer"
            onClick={() => onSelectCategory(category)}
          >
            <div
              className={`flex-1 text-sm font-medium transition-all ${
                selectedCategory === category ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </div>
            {categories.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteCategory(category)
                }}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1"
                aria-label="Delete category"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {showInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="New category..."
              autoFocus
              className="px-3 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
            />
            <Button
              onClick={handleAddCategory}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add
            </Button>
          </div>
        ) : (
          <Button onClick={() => setShowInput(true)} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
        )}
      </div>

      {selectedCategory && (
        <div className="mt-3 text-xs text-muted-foreground">
          Currently viewing: <span className="font-semibold text-foreground">{selectedCategory}</span>
        </div>
      )}
    </div>
  )
}
