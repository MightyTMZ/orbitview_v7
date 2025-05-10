"use client";

import { useTheme } from "next-themes";

export function DisoverPageHeader() {
  const { resolvedTheme } = useTheme();

  const textClass = resolvedTheme == "dark"? "text-white" : 'text-dark';

  return (
    <>
      <h1 className={`text-4xl font-bold mb-4 ${textClass}`}>
        Discover Your Next Opportunity
      </h1>
      <p className={`text-lg ${textClass}/80 mb-8`}>
        (Coming soon!) Use natural language to find events, competitions, and
        programs that match your interests and goals.
      </p>
    </>
  );
}
