import type React from "react"

export function GlassDiv({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`backdrop-blur-lg border border-white/15 bg-white/10 ${className || ""}`} {...props} />
}

export function GlassCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`backdrop-blur-lg border border-white/15 bg-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/20 hover:border-white/25 ${className || ""}`}
      {...props}
    />
  )
}

export function GlassButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`backdrop-blur-lg border border-white/15 bg-white/10 rounded-xl px-6 py-3 font-medium transition-all duration-300 active:scale-95 hover:bg-white/20 hover:shadow-lg ${className || ""}`}
      {...props}
    />
  )
}

export function GlassInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`backdrop-blur-lg border border-white/15 bg-black/40 rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none focus:border-white/25 focus:shadow-lg ${className || ""}`}
      {...props}
    />
  )
}
