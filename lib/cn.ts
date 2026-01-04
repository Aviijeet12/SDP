// Helper to combine glass utilities with additional classes
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

// Glass morphism class combinations
export const glassClasses = {
  base: "backdrop-blur-lg border border-white/15 bg-white/10",
  card: "backdrop-blur-lg border border-white/15 bg-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/20 hover:border-white/25",
  button:
    "backdrop-blur-lg border border-white/15 bg-white/10 rounded-xl px-6 py-3 font-medium transition-all duration-300 active:scale-95 hover:bg-white/20 hover:shadow-lg",
  input:
    "backdrop-blur-lg border border-white/15 bg-white/10 rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-white/25",
  pill: "backdrop-blur-lg border border-white/15 bg-white/10 rounded-full",
  small: "backdrop-blur-lg border border-white/15 bg-white/10 rounded-lg",
}
