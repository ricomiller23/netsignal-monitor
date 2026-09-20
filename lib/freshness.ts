"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface FreshnessState {
  lastRefreshed: Date;
  isStale: boolean;
  timeSinceRefresh: string;
  refresh: () => void;
}

export function useRefreshOnOpen(onRefreshCallback?: () => void): FreshnessState {
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isStale, setIsStale] = useState<boolean>(false);
  const [timeSinceRefresh, setTimeSinceRefresh] = useState<string>("just now");

  const lastFetchRef = useRef<number>(Date.now());
  const hiddenTimestampRef = useRef<number>(0);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const executeRefresh = useCallback((force = false) => {
    const now = Date.now();
    const elapsed = now - lastFetchRef.current;

    if (!force && elapsed < 30000) {
      return;
    }

    lastFetchRef.current = now;
    const newDate = new Date();
    setLastRefreshed(newDate);
    setIsStale(false);

    try {
      sessionStorage.setItem("last_seen_at", newDate.toISOString());
    } catch {}

    if (onRefreshCallback) {
      onRefreshCallback();
    }
  }, [onRefreshCallback]);

  useEffect(() => {
    executeRefresh(true);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenTimestampRef.current = Date.now();
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
        }
      } else if (document.visibilityState === "visible") {
        const hiddenDuration = Date.now() - hiddenTimestampRef.current;
        if (hiddenDuration > 120000) {
          executeRefresh(true);
        } else {
          executeRefresh(false);
        }
        startPoll();
      }
    };

    const startPoll = () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      pollTimerRef.current = setInterval(() => {
        if (document.visibilityState === "visible") {
          executeRefresh();
        }
      }, 90000); // 90s active tab poll
    };

    const handleFocus = () => executeRefresh(false);
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) executeRefresh(true);
      else executeRefresh(false);
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);
    startPoll();

    const interval = setInterval(() => {
      const now = Date.now();
      const diffSec = Math.floor((now - lastFetchRef.current) / 1000);
      if (diffSec < 60) setTimeSinceRefresh("just now");
      else if (diffSec < 3600) setTimeSinceRefresh(`${Math.floor(diffSec / 60)}m ago`);
      else setTimeSinceRefresh(`${Math.floor(diffSec / 3600)}h ago`);
      if (diffSec > 7200) setIsStale(true); // >2h stale threshold
    }, 5000);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      clearInterval(interval);
    };
  }, [executeRefresh]);

  return {
    lastRefreshed,
    isStale,
    timeSinceRefresh,
    refresh: () => executeRefresh(true)
  };
}
