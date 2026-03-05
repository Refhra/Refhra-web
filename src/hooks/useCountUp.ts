// hooks/useCountUp.ts
'use client'

import { useEffect, useRef, useState } from 'react'

interface Options {
  target: number
  duration?: number
  suffix?: string
}

export function useCountUp({ target, duration = 1600, suffix = '' }: Options) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(el)

        let startTime: number | null = null

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          const value = Math.floor(ease * target)
          setDisplay(value.toLocaleString() + suffix)
          if (progress < 1) requestAnimationFrame(step)
          else setDisplay(target.toLocaleString() + suffix)
        }

        requestAnimationFrame(step)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, suffix])

  return { ref, display }
}
