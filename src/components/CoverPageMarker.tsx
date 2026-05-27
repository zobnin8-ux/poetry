"use client";

import { useEffect } from "react";

export function CoverPageMarker() {
  useEffect(() => {
    document.body.classList.add("page-cover");
    return () => document.body.classList.remove("page-cover");
  }, []);

  return null;
}
