import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MESSAGE = '編集内容がリセットされます、本当にページ遷移しますか？';

export default function useSystem(startTime: Date | null) {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);
  useEffect(() => {
    if (startTime !== null) {
      router.events.on('routeChangeStart', pageChangeHandler);
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        router.events.off('routeChangeStart', pageChangeHandler);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [startTime]);

  const pageChangeHandler = () => {
    const answer = window.confirm(MESSAGE);
    if (!answer) {
      throw 'routeChange aborted.';
    }
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = MESSAGE;
  };

  return {
    isClient,
  };
}
