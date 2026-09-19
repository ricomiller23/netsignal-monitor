import { useEffect, useRef, useState } from 'react';

export function useRefreshOnOpen(callback: () => void, throttleMs = 30000, pollIntervalMs = 90000) {
  const lastCallRef = useRef<number>(0);
  const hiddenTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const trigger = (force = false) => {
      const now = Date.now();
      if (force || now - lastCallRef.current >= throttleMs) {
        lastCallRef.current = now;
        callback();
      }
    };

    // 1. Initial mount
    trigger(true);

    // 2. visibilitychange: pause polling when hidden, resume & check when visible
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeHidden = Date.now() - hiddenTimeRef.current;
        trigger(timeHidden > 120000); // force if hidden > 2 mins
        startPolling();
      } else {
        hiddenTimeRef.current = Date.now();
        stopPolling();
      }
    };

    const startPolling = () => {
      stopPolling();
      timerRef.current = setInterval(() => {
        if (document.visibilityState === 'visible') {
          trigger();
        }
      }, pollIntervalMs);
    };

    const stopPolling = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const onFocus = () => trigger();
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) trigger(true);
      else trigger();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('focus', onFocus);
    window.addEventListener('pageshow', onPageShow);
    startPolling();

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('pageshow', onPageShow);
      stopPolling();
    };
  }, [callback, throttleMs, pollIntervalMs]);
}
