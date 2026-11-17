"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-base text-copy-primary">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-brand" />
          <h1 className="text-2xl font-bold tracking-tight">Ghost AI Design System</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand" />
              UI Primitives Showcase
            </CardTitle>
            <CardDescription>
              Verifying shadcn/ui primitives with dark technical styling tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
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
                  <div className="space-y-1 text-copy-muted text-sm">
                    <p>Ghost AI is a real-time collaborative system design workspace.</p>
                    <p>Designed with a dark technical workspace visual language.</p>
                    <p>Verified cn merge helper: {cn("p-2", "p-4")}</p>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="canvas" className="pt-2">
                <p className="text-copy-secondary text-sm">Canvas tab active.</p>
              </TabsContent>
              <TabsContent value="spec" className="pt-2">
                <p className="text-copy-secondary text-sm">Spec tab active.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" size="sm">Open Dialog</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Preview</DialogTitle>
                  <DialogDescription>
                    This is a modal dialog styled with dark theme tokens.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-2 text-sm text-copy-secondary">
                  Dark theme dialog content verification.
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="secondary">Cancel</Button>} />
                  <Button variant="default">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <span className="text-copy-faint text-xs">v0.1.0</span>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
