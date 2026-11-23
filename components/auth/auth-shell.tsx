import * as React from "react"
import { Sparkles, Share2, FileText } from "lucide-react"

export interface AuthShellProps {
  children: React.ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen w-full bg-base font-sans text-copy-primary">
      {/* Left panel - 50% width on large screens with subtle dark surface tint */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between border-r border-[#1e222d] bg-[#0c0f17] p-12 lg:p-16">
        {/* Top: Compact Logo */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-brand" />
          <span className="text-base font-semibold tracking-tight text-white">
            Ghost AI
          </span>
        </div>

        {/* Center: Headline, Tagline, & 3 Feature Items */}
        <div className="my-auto max-w-xl py-12">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-[1.16]">
            Design systems at the<br />speed of thought.
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#808090]">
            Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
          </p>

          <div className="mt-10 space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">
                  AI Architecture Generation
                </h2>
                <p className="mt-0.5 text-xs text-[#808090] leading-relaxed">
                  Describe your system, AI maps it to nodes and edges on a live canvas.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                <Share2 className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Real-time Collaboration
                </h2>
                <p className="mt-0.5 text-xs text-[#808090] leading-relaxed">
                  Live cursors, presence indicators, and shared node editing across your team.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Instant Spec Generation
                </h2>
                <p className="mt-0.5 text-xs text-[#808090] leading-relaxed">
                  Export a complete Markdown technical spec directly from the canvas graph.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-xs text-[#505060]">
          &copy; 2026 Ghost AI. All rights reserved.
        </div>
      </div>

      {/* Right panel - 50% width on large screens, centered Clerk form */}
      <div className="flex flex-1 lg:w-1/2 items-center justify-center bg-base p-6 sm:p-12">
        <div className="w-full max-w-[440px] flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
