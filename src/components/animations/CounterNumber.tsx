import React, { useEffect, useRef, useState } from 'react';

interface CounterNumberProps {
  end: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CounterNumber: React.FC<CounterNumberProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out expo curve
            const easeOutProgress = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOutProgress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
};
