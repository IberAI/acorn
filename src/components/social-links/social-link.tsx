"use client";
import { SOCIAL_LINKS } from '@/components/social-links/constants'
import Link from 'next/link'

interface SocialLinkProps {
  link: (typeof SOCIAL_LINKS)[number]
}

const SocialLink: React.FC<SocialLinkProps> = ({ link }) => {
  return (
    <li>
      <Link href={link.url} passHref>
        <span className="sr-only">{link.name}</span>
        <div dangerouslySetInnerHTML={{ __html: link.svg }} />
      </Link>
    </li>
  )
}

export default SocialLink

