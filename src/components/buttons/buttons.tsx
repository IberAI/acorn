"use client"
import Link from 'next/link';
import { CustomButton as MovingBorderButton } from '../moving-border'; // Ensure this path points to your index.ts
import './styles.css'

const Buttons = () => {
  return (
    <div className="flex gap-4 mt-8 mx-auto">
      <Link href="/live-demo" legacyBehavior>
        <MovingBorderButton className="text-white" containerClassName="hover-smooth">

            LIVE DEMO
          </MovingBorderButton>
      </Link>
      <Link
        href="https://github.com/IberAI/acorn">
        <MovingBorderButton className="text-white" containerClassName="hover-smooth">
          STAR GITHUB REPO
        </MovingBorderButton>
      </Link>
    </div>
  );
};

export default Buttons;
