"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EditorDialog } from "@/components/editor/editor-dialog"

export interface RenameProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  name: string
  onNameChange: (name: string) => void
  onSubmit: (e?: React.FormEvent) => void
  isLoading?: boolean
}

export function RenameProjectDialog({
  isOpen,
  onClose,
  projectName,
  name,
  onNameChange,
  onSubmit,
  isLoading = false,
}: RenameProjectDialogProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Auto-focus and select all text when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && !isLoading) {
      onSubmit(e)
    }
  }

  return (
    <EditorDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Rename Project"
      description={`Rename "${projectName}". Enter a new name for your project below.`}
      footerActions={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleSubmit}
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? "Saving..." : "Rename"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="rename-project-name"
            className="text-xs font-medium text-copy-secondary"
          >
            Project Name
          </label>
          <Input
            id="rename-project-name"
            ref={inputRef}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Project name"
            autoFocus
            disabled={isLoading}
            className="text-white"
          />
        </div>
      </form>
    </EditorDialog>
  )
}
