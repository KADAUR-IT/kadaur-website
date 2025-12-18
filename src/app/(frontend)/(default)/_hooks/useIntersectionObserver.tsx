"use client";

import { useEffect, useState } from "react";

export default function useIntersectionObserver(selectors : (React.RefObject<HTMLElement>)[], options = {}) {
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    const elements = selectors.map((sel) =>
      typeof sel === "string" ? document.querySelector(sel) : sel.current
    );

    const observer = new IntersectionObserver((entries) => {
      setVisibleIds((prev) => {
        const currentlyVisible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        // fusionner avec l’état précédent pour suivre plusieurs
        const newVisible = [...new Set([...prev, ...currentlyVisible])];

        // retirer ceux qui sortent du viewport
        const stillVisible = newVisible.filter((id) =>
          entries.some((e) => e.target.id === id && e.isIntersecting)
        );

        return stillVisible;
      });
    }, options);

    elements.forEach((el) => el && observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, [selectors, options]);

  return visibleIds;
}
