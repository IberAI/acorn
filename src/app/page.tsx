
import { FC } from "react";
import Some from "@/components/server/example";
import { cn } from "@/utils/cn";
const Home: FC = () => {
  return (
    <main>
      <Some isLoggedIn={true} data={"helo"} title="HElo">

      </Some>

      <p className={cn("bg-red-200")}>
        wowuwuwowow
      </p>
      {/* Use Tailwindscss with cn please Add your content here */}
    </main>
  );
};

export default Home;

