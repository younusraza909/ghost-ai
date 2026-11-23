"use client"

import * as React from "react"
import { type Project, type DialogType } from "@/types/project"
import { slugify } from "@/lib/utils"

export const INITIAL_MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "E-Commerce Microservices",
    slug: "e-commerce-microservices",
    isOwner: true,
    updatedAt: "2 hours ago",
  },
  {
    id: "proj-2",
    name: "Payment Gateway Core",
    slug: "payment-gateway-core",
    isOwner: true,
    updatedAt: "Yesterday",
  },
  {
    id: "proj-3",
    name: "Notification Engine",
    slug: "notification-engine",
    isOwner: true,
    updatedAt: "3 days ago",
  },
  {
    id: "proj-4",
    name: "Auth Service v2",
    slug: "auth-service-v2",
    isOwner: false,
    updatedAt: "5 days ago",
  },
  {
    id: "proj-5",
    name: "Analytics Pipeline",
    slug: "analytics-pipeline",
    isOwner: false,
    updatedAt: "Last week",
  },
]

export interface UseProjectDialogsReturn {
  // Mock projects
  projects: Project[]
  ownedProjects: Project[]
  sharedProjects: Project[]

  // Dialog state
  activeDialog: DialogType
  isCreateOpen: boolean
  isRenameOpen: boolean
  isDeleteOpen: boolean
  selectedProject: Project | null

  // Open / Close actions
  openCreateDialog: () => void
  openRenameDialog: (project: Project) => void
  openDeleteDialog: (project: Project) => void
  closeDialog: () => void

  // Form state
  createName: string
  setCreateName: (name: string) => void
  createSlug: string

  renameName: string
  setRenameName: (name: string) => void

  // Loading state
  isLoading: boolean

  // Form submission / confirmations
  handleCreateProject: (e?: React.FormEvent) => void
  handleRenameProject: (e?: React.FormEvent) => void
  handleDeleteProject: () => void
}

/**
 * Dedicated hook to manage project dialog state, form state, and loading state.
 * Uses mock project data only (no API calls or persistence).
 */
export function useProjectDialogs(
  initialProjects: Project[] = INITIAL_MOCK_PROJECTS
): UseProjectDialogsReturn {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects)
  const [activeDialog, setActiveDialog] = React.useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)

  // Form states
  const [createName, setCreateNameState] = React.useState("")
  const [createSlug, setCreateSlug] = React.useState("")
  const [renameName, setRenameName] = React.useState("")

  // Loading state
  const [isLoading, setIsLoading] = React.useState(false)

  // Derived project lists
  const ownedProjects = React.useMemo(
    () => projects.filter((p) => p.isOwner),
    [projects]
  )
  const sharedProjects = React.useMemo(
    () => projects.filter((p) => !p.isOwner),
    [projects]
  )

  // Update name and auto-derive live slug preview
  const setCreateName = React.useCallback((name: string) => {
    setCreateNameState(name)
    setCreateSlug(slugify(name))
  }, [])

  // Openers
  const openCreateDialog = React.useCallback(() => {
    setCreateNameState("")
    setCreateSlug("")
    setSelectedProject(null)
    setIsLoading(false)
    setActiveDialog("create")
  }, [])

  const openRenameDialog = React.useCallback((project: Project) => {
    setSelectedProject(project)
    setRenameName(project.name)
    setIsLoading(false)
    setActiveDialog("rename")
  }, [])

  const openDeleteDialog = React.useCallback((project: Project) => {
    setSelectedProject(project)
    setIsLoading(false)
    setActiveDialog("delete")
  }, [])

  const closeDialog = React.useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
    setCreateNameState("")
    setCreateSlug("")
    setRenameName("")
    setIsLoading(false)
  }, [])

  // Submission handlers
  const handleCreateProject = React.useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }
      const trimmed = createName.trim()
      if (!trimmed || isLoading) return

      setIsLoading(true)

      const generatedSlug = createSlug || slugify(trimmed) || "project"
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        name: trimmed,
        slug: generatedSlug,
        isOwner: true,
        updatedAt: "Just now",
      }

      setProjects((prev) => [newProject, ...prev])
      setIsLoading(false)
      closeDialog()
    },
    [createName, createSlug, isLoading, closeDialog]
  )

  const handleRenameProject = React.useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }
      const trimmed = renameName.trim()
      if (!trimmed || !selectedProject || isLoading) return

      setIsLoading(true)

      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? {
              ...p,
              name: trimmed,
              slug: slugify(trimmed) || p.slug,
              updatedAt: "Just now",
            }
            : p
        )
      )

      setIsLoading(false)
      closeDialog()
    },
    [renameName, selectedProject, isLoading, closeDialog]
  )

  const handleDeleteProject = React.useCallback(() => {
    if (!selectedProject || isLoading) return

    setIsLoading(true)

    setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id))

    setIsLoading(false)
    closeDialog()
  }, [selectedProject, isLoading, closeDialog])

  return {
    projects,
    ownedProjects,
    sharedProjects,

    activeDialog,
    isCreateOpen: activeDialog === "create",
    isRenameOpen: activeDialog === "rename",
    isDeleteOpen: activeDialog === "delete",
    selectedProject,

    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,

    createName,
    setCreateName,
    createSlug,

    renameName,
    setRenameName,

    isLoading,

    handleCreateProject,
    handleRenameProject,
    handleDeleteProject,
  }
}
