"use client";
import dynamic from 'next/dynamic'

const MenuItem = dynamic(() => import('./menu-item'), { ssr: false })
const MENU_ITEMS = [
  { name: 'Contact', to: '/contact' },
]

function Menu({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {MENU_ITEMS.map((link) => (
        <MenuItem key={link.name} to={link.to} name={link.name} />
      ))}
    </ul>
  )
}

export default Menu
