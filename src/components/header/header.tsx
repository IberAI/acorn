"use client";
import { Logo } from '@/components/logo'
import Link from 'next/link'

interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="relative py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h1 className="m-0 text-xl font-bold uppercase leading-none">
            <Link href="/" passHref>
              <button className="flex items-center gap-2 no-underline">
                <Logo />
                <span>{title}</span>
              </button>
            </Link>
          </h1>
        </div>
      </div>
    </header>
  )
}

export default Header

