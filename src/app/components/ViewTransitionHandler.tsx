// app/view-transition.tsx  (coloque isto dentro de /app ou /components e importe no _app_ ou layout)
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ViewTransitionHandler() {
  const router = useRouter()

  useEffect(() => {
    if (!document.startViewTransition) return

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a')
      if (!a) return
      const href = (a as HTMLAnchorElement).href
      // só intercepta links internos
      if (!href.startsWith(window.location.origin)) return

      e.preventDefault()
      document.startViewTransition(() => {
        // navega do jeito “Next”
        router.push(href.replace(window.location.origin, ''))
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return null
}
