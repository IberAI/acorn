
import dynamic from 'next/dynamic';
import { SOCIAL_LINKS } from '@/components/social-links/constants';
import { cn } from '@/utils/cn';

// Dynamic import for SocialLink component
const SocialLink = dynamic(() => import('@/components/social-links/social-link'), {
  ssr: false,
});

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex gap-4', className)}>
      {SOCIAL_LINKS.map((link) => (
        <SocialLink key={link.name} link={link} />
      ))}
    </ul>
  );
}

export default SocialLinks;

