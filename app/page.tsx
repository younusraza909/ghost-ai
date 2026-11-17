"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { EditorDialog } from "@/components/editor/editor-dialog"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-base text-copy-primary">
      {/* Editor Navbar */}
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        title={
          <span className="text-xs font-semibold tracking-wider text-copy-muted uppercase">
            Workspace Preview
          </span>
        }
      />

      {/* Floating Project Sidebar */}
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewProject={() => setIsDialogOpen(true)}
      />

      {/* Main Canvas / Content Surface */}
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-brand" />
            <h1 className="text-2xl font-bold tracking-tight">Ghost AI Editor Chrome</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand" />
                Editor Chrome &amp; Design System
              </CardTitle>
              <CardDescription>
                Top navbar, floating project sidebar with tabs, and reusable dialog pattern.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="default"
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                >
                  {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                </Button>
                <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
                  Test Dialog Pattern
                </Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="space-y-2">
                <Input placeholder="Architecture prompt or project name..." />
                <Textarea placeholder="Describe the system architecture..." />
              </div>

              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="canvas">Canvas</TabsTrigger>
                  <TabsTrigger value="spec">Spec</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-2">
                  <ScrollArea className="h-24 rounded-lg border p-3">
                    <div className="space-y-1 text-sm text-copy-muted">
                      <p>Ghost AI is a real-time collaborative system design workspace.</p>
                      <p>Designed with a dark technical workspace visual language.</p>
                      <p>Verified cn merge helper: {cn("p-2", "p-4")}</p>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="canvas" className="pt-2">
                  <p className="text-sm text-copy-secondary">Canvas tab active.</p>
                </TabsContent>
                <TabsContent value="spec" className="pt-2">
                  <p className="text-sm text-copy-secondary">Spec tab active.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                Open Dialog Pattern
              </Button>
              <span className="text-xs text-copy-faint">v0.2.0</span>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Editor Dialog Pattern */}
      <EditorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="New Project Dialog Pattern"
        description="Verify dialog pattern styled with dark theme tokens, supporting title, description, and footer actions."
        footerActions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => setIsDialogOpen(false)}
            >
              Confirm
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input placeholder="Project title..." />
          <Textarea placeholder="Project description..." />
        </div>
      </EditorDialog>
    </div>
  )
}
