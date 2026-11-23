"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EditorDialog } from "@/components/editor/editor-dialog"

export interface CreateProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  name: string
  slug: string
  onNameChange: (name: string) => void
  onSubmit: (e?: React.FormEvent) => void
  isLoading?: boolean
}

export function CreateProjectDialog({
  isOpen,
  onClose,
  name,
  slug,
  onNameChange,
  onSubmit,
  isLoading = false,
}: CreateProjectDialogProps) {
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
      title="Create Project"
      description="Start a new architecture workspace for your system design."
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
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="create-project-name"
            className="text-xs font-medium text-copy-secondary"
          >
            Project Name
          </label>
          <Input
            id="create-project-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Distributed Payment Processor"
            autoFocus
            disabled={isLoading}
            className="text-white"
          />
          <div className="flex items-center gap-2 rounded-xl border border-border-default bg-base/60 px-3 py-2 text-xs">
            <span className="text-copy-muted shrink-0">Slug preview:</span>
            <span className="font-mono text-brand truncate font-medium">
              {slug ? slug : "project-slug"}
            </span>
          </div>
        </div>
      </form>
    </EditorDialog>
  )
}
