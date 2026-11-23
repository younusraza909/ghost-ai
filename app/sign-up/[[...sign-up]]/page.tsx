import { SignUp } from "@clerk/nextjs"
import { Suspense } from "react"
import { AuthShell } from "@/components/auth/auth-shell"

export default function SignUpPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="text-sm text-copy-muted">Loading sign up...</div>}>
        <SignUp
          fallbackRedirectUrl="/editor"
          appearance={{
            elements: {
              card: "border border-[#23232a] shadow-2xl bg-[#111115] rounded-2xl w-full max-w-[440px]",
              cardBox: "border border-[#23232a] shadow-2xl bg-[#111115] rounded-2xl",
              headerTitle: "text-white text-xl font-bold tracking-tight",
              headerSubtitle: "text-[#808090] text-sm",
              socialButtonsBlockButton:
                "border border-[#2a2a32] bg-[#16161b] hover:bg-[#1f1f26] text-white rounded-xl h-10 transition-colors",
              socialButtonsBlockButtonText: "text-sm text-white font-medium",
              dividerLine: "bg-[#23232a]",
              dividerText: "text-xs text-[#808090]",
              formFieldLabel: "text-xs font-medium text-[#c0c0cc]",
              formFieldInput:
                "bg-[#18181c] border border-[#2a2a32] text-white rounded-xl h-10 px-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand placeholder:text-[#505060]",
              formButtonPrimary:
                "bg-brand text-[#080809] hover:bg-brand/90 font-semibold rounded-xl text-sm h-10 shadow-none transition-colors",
              footerActionText: "text-xs text-[#808090]",
              footerActionLink: "text-brand hover:text-brand/80 font-medium",
              badge: "bg-[#18181c] text-[#808090] border border-[#2a2a32] rounded-md text-[10px] px-1.5 py-0.5",
            },
          }}
        />
      </Suspense>
    </AuthShell>
  )
}
