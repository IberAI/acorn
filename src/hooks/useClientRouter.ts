
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useClientRouter = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? router : null;
};

export default useClientRouter;
