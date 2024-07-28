"use client";
import dynamic from 'next/dynamic';
import { FC } from "react";

const Hero = dynamic(() => import('@/components/hero').then(mod => mod.Hero), {
  ssr: false,
});
const HeroIllustration = dynamic(() => import('@/components/hero').then(mod => mod.HeroIllustration), {
  ssr: false,
});

const Home: FC = () => {
  return (
    <Hero
      title="Get started with Acorn."
      content="Skip the lengthy documentation—get concise summaries and start developing faster."
      illustration={<HeroIllustration />}
    />
  );
};

export default Home;

