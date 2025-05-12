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
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        // aguarda o push terminar antes de iniciar a animação
        await router.push(href as string)
      })
    } else {
      router.push(href as string)
    }
  }

  return (
    <Link href={href} {...rest} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}
