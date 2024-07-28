"use client";
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ScrollToTop: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.pathname])

  return <>{children}</>
}

export default ScrollToTop

