"use client"

import * as React from "react"
import { FolderKanban, Plus, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface ProjectSidebarProps {
  isOpen: boolean
  onClose?: () => void
  onNewProject?: () => void
  className?: string
  toggleRef?: React.RefObject<HTMLElement | null>
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  className,
  toggleRef,
}: ProjectSidebarProps) {
  const wasOpenRef = React.useRef(isOpen)

  const restoreFocus = React.useCallback(() => {
    if (toggleRef?.current) {
      toggleRef.current.focus()
    } else {
      const toggle = document.querySelector<HTMLElement>(
        '[data-slot="sidebar-toggle"], [data-sidebar-toggle="true"], button[aria-label*="sidebar"]'
      )
      toggle?.focus()
    }
  }, [toggleRef])

  const handleClose = () => {
    onClose?.()
    restoreFocus()
  }

  React.useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      restoreFocus()
    }
    wasOpenRef.current = isOpen
  }, [isOpen, restoreFocus])

  return (
    <aside
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
      className={cn(
        "fixed top-14 bottom-0 left-0 z-40 flex w-80 flex-col border-r border-border-default bg-surface/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out text-copy-primary",
        isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-default px-4">
        <h2 className="text-base font-semibold tracking-tight text-copy-primary">
          Projects
        </h2>
        {onClose && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClose}
            aria-label="Close sidebar"
            className="text-copy-muted hover:text-copy-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden">
        <div className="px-4 pt-3 pb-1">
          <TabsList className="grid w-full grid-cols-2 bg-subtle">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
        </div>

        {/* My Projects Content - Empty placeholder state */}
        <TabsContent
          value="my-projects"
          className="flex flex-1 flex-col items-center justify-center p-6 text-center outline-none"
        >
          <div className="mb-3 rounded-2xl bg-subtle p-3 text-copy-muted">
            <FolderKanban className="h-8 w-8 text-copy-muted" />
          </div>
          <p className="text-sm font-medium text-copy-primary">No projects yet</p>
          <p className="mt-1 text-xs text-copy-muted">
            Create a new project to start designing system architectures.
          </p>
        </TabsContent>

        {/* Shared Content - Empty placeholder state */}
        <TabsContent
          value="shared"
          className="flex flex-1 flex-col items-center justify-center p-6 text-center outline-none"
        >
          <div className="mb-3 rounded-2xl bg-subtle p-3 text-copy-muted">
            <Users className="h-8 w-8 text-copy-muted" />
          </div>
          <p className="text-sm font-medium text-copy-primary">No shared projects</p>
          <p className="mt-1 text-xs text-copy-muted">
            Projects shared with you will appear here.
          </p>
        </TabsContent>
      </Tabs>

      {/* Footer action - Full-width New Project button */}
      <div className="mt-auto border-t border-border-default bg-surface/50 p-4">
        <Button
          variant="default"
          className="w-full gap-2"
          onClick={onNewProject}
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>
    </aside>
  )
}
