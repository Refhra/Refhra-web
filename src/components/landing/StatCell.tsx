'use client'

// components/landing/StatCell.tsx

import { useCountUp } from '@/hooks/useCountUp'

interface Props {
  target: number
  suffix?: string
  label: string
}

export function StatCell({ target, suffix = '', label }: Props) {
  const { ref, display } = useCountUp({ target, suffix })

  return (
    <div className="bg-white px-6 py-7 text-center">
      <span
        ref={ref}
        className="font-display block text-[36px] font-extrabold text-blue-600
                   tracking-tightest leading-none mb-1"
      >
        {display}
      </span>
      <span className="text-[13px] text-slate-500">{label}</span>
    </div>
  )
}
