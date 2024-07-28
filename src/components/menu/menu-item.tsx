
"use client";
import Link from 'next/link';

interface MenuItemProps {
  name: string;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, to }) => {
  const isActive = true

  return (
    <li>
      <Link href={to} passHref>
        <button className={isActive ? 'border-b text-white' : 'text-white hover:border-b'}>
          {name}
        </button>
      </Link>
    </li>
  );
};

export default MenuItem;

