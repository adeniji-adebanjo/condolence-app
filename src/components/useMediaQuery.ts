"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // Start with `false` on both server and client to ensure no hydration mismatch.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run this logic on the client, after initial render.
    const media = window.matchMedia(query);
    // Update state to the correct value.
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
