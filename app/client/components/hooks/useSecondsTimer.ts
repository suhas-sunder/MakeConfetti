import { useEffect, useState } from "react";

function useSecondsTimer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  useEffect(() => {
    if (startTimer) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTimer]);

  return { seconds, setStartTimer };
}

export default useSecondsTimer;
