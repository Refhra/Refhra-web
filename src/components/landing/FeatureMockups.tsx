// components/landing/FeatureMockups.tsx
// Pure presentational — no 'use client' needed here.
// The parent FeaturesSection is already a client component.

/* ── Shared card wrapper ── */
function MockCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-3xl shadow-card-lg p-[22px] w-full max-w-[360px] ${className}`}>
      {children}
    </div>
  )
}
function MockHeader({ title, meta, metaColor = 'text-slate-400' }: { title: string; meta: string; metaColor?: string }) {
  return (
    <div className="flex items-center justify-between mb-[18px]">
      <span className="font-display text-[14px] font-bold text-slate-800 tracking-tight">{title}</span>
      <span className={`text-[12px] font-mono-dm ${metaColor}`}>{meta}</span>
    </div>
  )
}

/* ── 1. Schedule (bar chart) ── */
const BAR_DATA = [
  { day: 'Mon', g: 55, d: 40 }, { day: 'Tue', g: 80, d: 70 },
  { day: 'Wed', g: 40, d: 55 }, { day: 'Thu', g: 65, d: 60 },
  { day: 'Fri', g: 30, d: 45 }, { day: 'Sat', g: 20, d: 20 },
  { day: 'Sun', g: 15, d: 10 },
]

export function ScheduleMockup() {
  return (
    <MockCard>
      <MockHeader title="This Week at a Glance" meta="Mar 3–9" />
      <div className="flex items-end gap-2 h-[120px]">
        {BAR_DATA.map((b) => (
          <div key={b.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <div className="w-full flex flex-col gap-0.5">
              <div className="w-full rounded-t" style={{ height: `${b.g * 0.9}px`, backgroundColor: '#BFDBFE' }} />
              <div className="w-full rounded-t" style={{ height: `${b.d * 0.9}px`, backgroundColor: '#2563EB' }} />
            </div>
            <span className="text-[9px] text-slate-400 font-mono-dm">{b.day}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100">
        {[{ c: '#BFDBFE', l: 'Goals set' }, { c: '#2563EB', l: 'Completed' }].map((x) => (
          <div key={x.l} className="flex items-center gap-1.5 text-[12px] text-slate-500">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: x.c }} />{x.l}
          </div>
        ))}
      </div>
    </MockCard>
  )
}

/* ── 2. Skills ── */
const SKILLS = [
  { name: '🐍 Python Programming', pct: 68 },
  { name: '🎨 UI/UX Design',        pct: 42 },
  { name: '📊 Data Analysis',        pct: 21 },
]

export function SkillsMockup() {
  return (
    <MockCard>
      <MockHeader title="Active Skills" meta="3 active" metaColor="text-violet-600 font-semibold" />
      {SKILLS.map((s) => (
        <div key={s.name} className="mb-3.5 last:mb-0">
          <div className="flex justify-between mb-1.5">
            <span className="text-[13px] font-semibold text-slate-700">{s.name}</span>
            <span className="text-[12px] text-violet-600 font-mono-dm">{s.pct}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg,#8b5cf6,#a78bfa)' }} />
          </div>
        </div>
      ))}
      <div className="mt-[18px] pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[12.5px] text-slate-500">Next: Complete Module 4 of Python</span>
        <button className="bg-violet-50 text-violet-600 text-[11px] font-semibold px-2.5 py-1 rounded-full hover:bg-violet-100 transition-colors">
          + Schedule
        </button>
      </div>
    </MockCard>
  )
}

/* ── 3. Mood / Mental health ── */
const MOOD_WEEK = [
  { d: 'Mon', e: '😴', bg: '#fce7f3' }, { d: 'Tue', e: '😐', bg: '#f3f4f6' },
  { d: 'Wed', e: '🙂', bg: '#fce7f3' }, { d: 'Thu', e: '🙂', bg: '#fce7f3' },
  { d: 'Fri', e: '😊', bg: '#fce7f3' }, { d: 'Sat', e: '🔥', bg: '#fce7f3' },
  { d: 'Sun', e: '😊', bg: '#fce7f3' },
]

export function MoodMockup() {
  return (
    <MockCard>
      <MockHeader title="Your mood this week" meta="Trending up ↑" metaColor="text-pink-500 font-semibold" />
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {MOOD_WEEK.map((m) => (
          <div key={m.d} className="text-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mx-auto mb-1"
                 style={{ backgroundColor: m.bg }}>{m.e}</div>
            <span className="text-[9px] text-slate-400 font-mono-dm">{m.d}</span>
          </div>
        ))}
      </div>
      <div className="bg-pink-50 rounded-xl p-3.5 border border-pink-100">
        <p className="text-[12px] font-semibold text-pink-700 mb-1.5">💭 Today&apos;s journal prompt</p>
        <p className="text-[13px] text-slate-600 leading-relaxed italic">
          &ldquo;What&apos;s one thing you handled well this week that you didn&apos;t expect to?&rdquo;
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-400">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Your journal is private and encrypted
      </div>
    </MockCard>
  )
}

/* ── 4. Gamification ── */
const BADGES = [
  { e: '🔥', n: 'Streak King',    bg: '#FFFBEB', locked: false },
  { e: '📚', n: 'Study Pro',      bg: '#EFF6FF', locked: false },
  { e: '💪', n: 'Wellness Star',  bg: '#FDF2F8', locked: false },
  { e: '🏆', n: 'Balance Master', bg: '#f3f4f6', locked: true  },
  { e: '🚀', n: 'Skill Builder',  bg: '#f3f4f6', locked: true  },
]

export function GamificationMockup() {
  return (
    <MockCard>
      <MockHeader title="Your Achievements" meta="Lvl 7" metaColor="text-amber-500 font-semibold font-mono-dm" />
      <div className="flex gap-2.5 flex-wrap mb-4">
        {BADGES.map((b) => (
          <div key={b.n} className={`flex flex-col items-center gap-1.5 ${b.locked ? 'grayscale opacity-35' : ''}`}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[22px]"
                 style={{ backgroundColor: b.bg }}>{b.e}</div>
            <span className="text-[10px] text-slate-500 font-medium text-center leading-tight"
                  style={{ whiteSpace: 'pre-line' }}>
              {b.n.replace(' ', '\n')}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3.5 py-3">
        <div>
          <div className="font-display text-[22px] font-extrabold text-blue-600 tracking-tightest leading-none">4,280</div>
          <div className="text-[12px] text-slate-500 mt-0.5">Total points earned</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[12px] font-semibold text-emerald-500">+120 today</div>
          <div className="text-[11px] text-slate-400 mt-0.5">720 to next badge</div>
        </div>
      </div>
    </MockCard>
  )
}
