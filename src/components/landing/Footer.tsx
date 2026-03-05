// components/landing/Footer.tsx
// RSC — no motion needed here

import Link from 'next/link'
import { RefhraLogo } from './RefhraLogo'

const LINKS = {
  Product: [
    { label: 'Features',    href: '#features'   },
    { label: 'Templates',   href: '#templates'  },
    { label: 'Pricing',     href: '/pricing'    },
    { label: 'Changelog',   href: '/changelog'  },
    { label: 'Roadmap',     href: '/roadmap'    },
  ],
  Company: [
    { label: 'About',       href: '/about'      },
    { label: 'Blog',        href: '/blog'       },
    { label: 'Careers',     href: '/careers'    },
    { label: 'Press',       href: '/press'      },
  ],
  Support: [
    { label: 'Help Centre',       href: '/help'     },
    { label: 'Privacy Policy',    href: '/privacy'  },
    { label: 'Terms of Service',  href: '/terms'    },
    { label: 'Contact',           href: '/contact'  },
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-8">

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <RefhraLogo width={32} height={28} />
              <span className="font-display font-extrabold text-[20px] text-white tracking-tightest">
                Refhra
              </span>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-5 max-w-[240px]">
              Your all-in-one student life platform. Smart scheduling, ready-to-use tasks,
              and real balance.
            </p>
            <div className="flex gap-2">
              {['𝕏', 'in', 'ig'].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 text-[15px]
                             flex items-center justify-center hover:bg-blue-600 hover:text-white
                             transition-colors duration-200 cursor-pointer border-0"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[13px] font-semibold text-white mb-4 tracking-snug">
                {heading}
              </h4>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-slate-500 hover:text-white no-underline
                                 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-[13px] text-slate-600">
          <span>© 2026 Refhra. All rights reserved.</span>
          <span>Made for students, by people who care. 🖤</span>
        </div>
      </div>
    </footer>
  )
}
