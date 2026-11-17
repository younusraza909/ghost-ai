"use client"

import * as React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export interface EditorDialogProps {
  open?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  footerActions?: React.ReactNode
  trigger?: React.ReactNode
  children?: React.ReactNode
  className?: string
  showCloseButton?: boolean
}

/**
 * EditorDialog implements the standard dialog pattern for Ghost AI editor screens.
 * Uses color tokens from `globals.css` (bg-elevated, border-border-default, rounded-3xl)
 * and supports title, description, and footer actions.
 */
export function EditorDialog({
  open,
  isOpen,
  onOpenChange,
  onClose,
  title,
  description,
  footerActions,
  trigger,
  children,
  className,
  showCloseButton = true,
}: EditorDialogProps) {
  const isControlled = open !== undefined || isOpen !== undefined
  const resolvedOpen = open ?? isOpen

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen)
    if (!nextOpen) {
      onClose?.()
    }
  }

  return (
    <Dialog
      {...(isControlled ? { open: resolvedOpen } : {})}
      onOpenChange={handleOpenChange}
    >
      {trigger && (
        <DialogTrigger
          render={React.isValidElement(trigger) ? trigger : <span>{trigger}</span>}
        />
      )}
      <DialogContent
        className={cn(
          "rounded-3xl border border-border-default bg-elevated p-6 text-copy-primary shadow-2xl sm:max-w-md",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {(title || description) && (
          <DialogHeader className="space-y-1.5 pb-2 text-left">
            {title && (
              <DialogTitle className="text-base font-semibold tracking-tight text-copy-primary">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-sm text-copy-muted leading-relaxed">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {children && (
          <div className="py-2 text-sm text-copy-secondary">
            {children}
          </div>
        )}

        {footerActions && (
          <DialogFooter className="mt-4 flex flex-row items-center justify-end gap-2 border-t border-border-default bg-transparent pt-4 -mx-6 -mb-6 px-6 pb-6 rounded-b-3xl">
            {footerActions}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Re-export compound primitives and aliases for flexibility
export {
  Dialog as EditorDialogRoot,
  DialogTrigger as EditorDialogTrigger,
  DialogContent as EditorDialogContent,
  DialogHeader as EditorDialogHeader,
  DialogTitle as EditorDialogTitle,
  DialogDescription as EditorDialogDescription,
  DialogFooter as EditorDialogFooter,
  DialogClose as EditorDialogClose,
}

export const DialogPattern = EditorDialog
