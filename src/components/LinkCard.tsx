"use client";

import type { LinkItem } from "@/data/profile";

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // 페이지를 떠나도 요청이 끝까지 전송되도록 sendBeacon을 우선 사용합니다.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/click",
      new Blob([body], { type: "application/json" }),
    );
  } else {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="flex min-h-16 w-full items-center justify-center rounded-2xl border border-black/15 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-white/15 dark:bg-zinc-900"
    >
      {link.title}
    </a>
  );
}
