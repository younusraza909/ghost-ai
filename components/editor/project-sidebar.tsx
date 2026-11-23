"use client"

import * as React from "react"
import { Folder, FolderKanban, Pencil, Plus, Trash2, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { type Project } from "@/types/project"

export interface ProjectSidebarProps {
  isOpen: boolean
  onClose?: () => void
  onNewProject?: () => void
  ownedProjects?: Project[]
  sharedProjects?: Project[]
  onRenameProject?: (project: Project) => void
  onDeleteProject?: (project: Project) => void
  onSelectProject?: (project: Project) => void
  activeProjectId?: string | null
  className?: string
  toggleRef?: React.RefObject<HTMLElement | null>
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  ownedProjects = [],
  sharedProjects = [],
  onRenameProject,
  onDeleteProject,
  onSelectProject,
  activeProjectId,
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

  const handleClose = React.useCallback(() => {
    onClose?.()
    restoreFocus()
  }, [onClose, restoreFocus])

  // Restore focus to toggle when closing sidebar
  React.useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      restoreFocus()
    }
    wasOpenRef.current = isOpen
  }, [isOpen, restoreFocus])

  // Keyboard shortcut: Escape closes sidebar
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  return (
    <>
      {/* Mobile Backdrop Scrim: Tapping outside the sidebar closes it on mobile */}
      {isOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={handleClose}
          className="fixed inset-0 top-14 z-30 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Floating Project Sidebar */}
      <aside
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={cn(
          "fixed top-14 bottom-0 left-0 z-40 flex w-80 max-w-[calc(100vw-3rem)] flex-col border-r border-border-default bg-surface/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out text-copy-primary",
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
          <div className="px-4 pt-3 pb-2 shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-subtle">
              <TabsTrigger value="my-projects">
                My Projects ({ownedProjects.length})
              </TabsTrigger>
              <TabsTrigger value="shared">
                Shared ({sharedProjects.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* My Projects Content */}
          <TabsContent
            value="my-projects"
            className="flex flex-1 flex-col overflow-hidden outline-none data-[state=inactive]:hidden m-0"
          >
            {ownedProjects.length > 0 ? (
              <ScrollArea className="flex-1 px-3 py-2">
                <div className="space-y-1">
                  {ownedProjects.map((project) => {
                    const isSelected = activeProjectId === project.id
                    return (
                      <div
                        key={project.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectProject?.(project)}
                        onKeyDown={(e) => {
                          if (e.target !== e.currentTarget) return
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            onSelectProject?.(project)
                          }
                        }}
                        className={cn(
                          "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors cursor-pointer outline-none select-none",
                          isSelected
                            ? "bg-subtle text-copy-primary font-medium"
                            : "text-copy-secondary hover:bg-subtle/80 hover:text-copy-primary"
                        )}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-2">
                          <Folder className="h-4 w-4 shrink-0 text-copy-muted group-hover:text-brand transition-colors" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium leading-snug">
                              {project.name}
                            </p>
                            <p className="truncate text-xs font-mono text-copy-faint">
                              {project.slug}
                            </p>
                          </div>
                        </div>

                        {/* Project Actions: Show actions only for owned projects */}
                        <div className="flex shrink-0 items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-7 w-7 text-copy-muted hover:text-copy-primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              onRenameProject?.(project)
                            }}
                            title="Rename project"
                            aria-label={`Rename ${project.name}`}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-7 w-7 text-copy-muted hover:text-state-error hover:bg-state-error/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDeleteProject?.(project)
                            }}
                            title="Delete project"
                            aria-label={`Delete ${project.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 rounded-2xl bg-subtle p-3 text-copy-muted">
                  <FolderKanban className="h-8 w-8 text-copy-muted" />
                </div>
                <p className="text-sm font-medium text-copy-primary">No projects yet</p>
                <p className="mt-1 text-xs text-copy-muted">
                  Create a new project to start designing system architectures.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Shared Content: Actions are strictly hidden for shared projects */}
          <TabsContent
            value="shared"
            className="flex flex-1 flex-col overflow-hidden outline-none data-[state=inactive]:hidden m-0"
          >
            {sharedProjects.length > 0 ? (
              <ScrollArea className="flex-1 px-3 py-2">
                <div className="space-y-1">
                  {sharedProjects.map((project) => {
                    const isSelected = activeProjectId === project.id
                    return (
                      <div
                        key={project.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectProject?.(project)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            onSelectProject?.(project)
                          }
                        }}
                        className={cn(
                          "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors cursor-pointer outline-none select-none",
                          isSelected
                            ? "bg-subtle text-copy-primary font-medium"
                            : "text-copy-secondary hover:bg-subtle/80 hover:text-copy-primary"
                        )}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2.5">
                          <Users className="h-4 w-4 shrink-0 text-copy-muted group-hover:text-brand transition-colors" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium leading-snug">
                              {project.name}
                            </p>
                            <p className="truncate text-xs font-mono text-copy-faint">
                              {project.slug}
                            </p>
                          </div>
                        </div>
                        {/* No actions shown for shared projects */}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 rounded-2xl bg-subtle p-3 text-copy-muted">
                  <Users className="h-8 w-8 text-copy-muted" />
                </div>
                <p className="text-sm font-medium text-copy-primary">No shared projects</p>
                <p className="mt-1 text-xs text-copy-muted">
                  Projects shared with you will appear here.
                </p>
              </div>
            )}
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
    </>
  )
}
