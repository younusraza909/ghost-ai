"use client"

import * as React from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EditorNavbarProps {
  isOpen?: boolean
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
  onCloseSidebar?: () => void
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
  toggleRef?: React.Ref<HTMLButtonElement>
}

export function EditorNavbar({
  isOpen,
  isSidebarOpen,
  onToggleSidebar,
  title,
  children,
  className,
  toggleRef,
}: EditorNavbarProps) {
  // Support either isOpen or isSidebarOpen prop
  const sidebarOpen = isSidebarOpen ?? isOpen ?? false

  return (
    <header
      className={cn(
        "flex h-14 w-full shrink-0 items-center justify-between border-b border-border-default bg-surface px-4 text-copy-primary",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <Button
          ref={toggleRef}
          data-slot="sidebar-toggle"
          data-sidebar-toggle="true"
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="text-copy-secondary hover:text-copy-primary"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
        {title && (
          <div className="text-sm font-medium text-copy-primary">
            {title}
          </div>
        )}
      </div>

      {/* Center section */}
      <div className="flex flex-1 items-center justify-center">
        {children}
      </div>

      {/* Right section (stays empty for now) */}
      <div className="flex items-center justify-end" />
    </header>
  )
}
