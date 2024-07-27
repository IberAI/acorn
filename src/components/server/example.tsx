
import {FC} from "react";
import { GetServerSideProps } from 'next';
import type { SomeProps } from '@/types/props';

// example server side component responsible for getting data from our api endpoint on the fly. 
// Need todisplay something while this operation is taking time.
// Use env variables
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.DOMAIN}/api/process`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Some: FC<SomeProps> = ({ data }) => {
  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
};

export default Some;
