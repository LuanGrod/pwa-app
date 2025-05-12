// components/ViewTransitionLink.tsx
'use client'
import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export function ViewTransitionLink(props: LinkProps & { children: React.ReactNode, className?: string }) {
  const router = useRouter()
  const { href, children, className = "", ...rest } = props

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Se o browser suportar:
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href as string)
      })
    } else {
      // fallback normal
      router.push(href as string)
    }
  }

  return (
    <Link href={href} {...rest} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}
