'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface LinkViewProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function LinkView({ href, children, ...props }: LinkViewProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        router.push(href, { scroll: false })
      })
    } else {
      router.push(href)
    }
  }

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  )
}
