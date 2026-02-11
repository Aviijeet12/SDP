"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Mail, Lock, LogIn } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Lazy load the wallet component to avoid SSR issues
const WalletConnect = lazy(() => import('./components/wallet-connect').then(mod => ({ default: mod.WalletConnect })))

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEmailLogin = async () => {
    if (!email || !password) return
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard/main")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError("")
    try {
      await signIn("google", { callbackUrl: "/dashboard/main" })
    } catch (err) {
      setError("Google sign-in failed. Please ensure Google OAuth is configured.")
      setIsLoading(false)
    }
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
            {/* Web3 Wallet Connect - Only render on client */}
            {mounted && (
              <Suspense fallback={
                <div className="mb-6">
                  <div className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary/50 to-accent/50 text-primary-foreground font-medium flex items-center justify-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Loading Wallet...
                  </div>
                </div>
              }>
                <WalletConnect onError={setError} />
              </Suspense>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-card border-2 border-border text-foreground font-medium transition-all duration-300 hover:border-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">or use email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {error}
              </div>
            )}

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
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailLogin()}
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
                onClick={handleEmailLogin}
                disabled={isLoading || !email || !password}
                className="px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In with Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
