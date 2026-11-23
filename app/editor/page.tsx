"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  const {
    ownedProjects,
    sharedProjects,
    isCreateOpen,
    isRenameOpen,
    isDeleteOpen,
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
  } = useProjectDialogs()

  return (
    <div className="flex min-h-screen flex-col bg-base text-copy-primary">
      {/* Editor Navbar */}
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        title={
          <span className="text-xs font-semibold tracking-wider text-copy-muted uppercase">
            Ghost AI
          </span>
        }
      />

      {/* Floating Project Sidebar */}
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewProject={openCreateDialog}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />

      {/* Editor Home: Minimal center layout without cards */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="flex max-w-lg flex-col items-center space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-copy-primary sm:text-3xl">
            Create a project or open an existing one
          </h1>
          <p className="text-sm text-copy-muted leading-relaxed">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
          <div className="pt-3">
            <Button
              variant="default"
              size="lg"
              onClick={openCreateDialog}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        isOpen={isCreateOpen}
        onClose={closeDialog}
        name={createName}
        slug={createSlug}
        onNameChange={setCreateName}
        onSubmit={handleCreateProject}
        isLoading={isLoading}
      />

      {/* Rename Project Dialog */}
      <RenameProjectDialog
        isOpen={isRenameOpen}
        onClose={closeDialog}
        projectName={selectedProject?.name ?? ""}
        name={renameName}
        onNameChange={setRenameName}
        onSubmit={handleRenameProject}
        isLoading={isLoading}
      />

      {/* Delete Project Dialog */}
      <DeleteProjectDialog
        isOpen={isDeleteOpen}
        onClose={closeDialog}
        projectName={selectedProject?.name ?? ""}
        onConfirm={handleDeleteProject}
        isLoading={isLoading}
      />
    </div>
  )
}
