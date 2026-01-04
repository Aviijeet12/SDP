"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fade-in" | "slide-in-right" | "slide-in-left" | "scale-in"
  delay?: number
}

export function ScrollAnimation({ children, animation = "fade-in", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.style.opacity = "0"
          ref.current.classList.add(`animate-${animation}`)
          ref.current.style.animation = `${animation} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
          if (delay > 0) {
            ref.current.style.animationDelay = `${delay}ms`
          }
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animation, delay])

  return <div ref={ref}>{children}</div>
}
