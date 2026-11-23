"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { EditorDialog } from "@/components/editor/editor-dialog"

export interface DeleteProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteProjectDialog({
  isOpen,
  onClose,
  projectName,
  onConfirm,
  isLoading = false,
}: DeleteProjectDialogProps) {
  return (
    <EditorDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project"
      description={`Are you sure you want to delete "${projectName}"? This action cannot be undone and will permanently remove this project.`}
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
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Project"}
          </Button>
        </>
      }
    />
  )
}
