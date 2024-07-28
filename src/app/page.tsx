import { Hero, HeroIllustration } from '@/components/hero'
import { FC } from "react";

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

