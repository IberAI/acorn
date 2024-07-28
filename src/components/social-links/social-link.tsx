"use client";
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SocialLinkProps {
  link: {
    name: string;
    url: string;
    icon: IconDefinition;
  };
}

const SocialLink: React.FC<SocialLinkProps> = ({ link }) => {
  return (
    <li>
      <Link href={link.url} passHref>
        <span className="social-link">
          <span className="sr-only">{link.name}</span>
          <FontAwesomeIcon icon={link.icon} className="text-white" />
        </span>
      </Link>
    </li>
  );
};

export default SocialLink;

