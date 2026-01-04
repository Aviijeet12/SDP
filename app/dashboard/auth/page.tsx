"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, LogIn, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    if (!email || !password) return
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard/main")
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="text-sm font-medium text-primary">Enterprise Access</span>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-base">Access your blockchain workspace securely</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-6">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-12 w-full px-4 py-2.5 rounded-lg bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 w-full px-4 py-2.5 rounded-lg bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border border-primary accent-primary" />
                  <span>Remember me</span>
                </label>
                <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2.5 rounded-lg border border-primary bg-transparent text-primary font-medium transition-all duration-300 hover:bg-primary/10">
                Google
              </button>
              <button className="px-4 py-2.5 rounded-lg border border-primary bg-transparent text-primary font-medium transition-all duration-300 hover:bg-primary/10">
                MetaMask
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <button className="text-primary hover:text-primary/80 font-semibold transition-colors">Sign up</button>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Enterprise Grade Security
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Bank Encryption</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
