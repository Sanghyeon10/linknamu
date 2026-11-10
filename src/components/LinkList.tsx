"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 서버에서 받은 값. 받기 전에는 비어 있어서 모두 0회로 보입니다.
  const [counts, setCounts] = useState<Counts>({});
  // 이 화면에서 누른 횟수. 서버 값이 늦게 와도 덮어써지지 않도록 따로 둡니다.
  const [added, setAdded] = useState<Counts>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/click", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : null))
      .then((data) => {
        if (data) setCounts(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  // 카드를 누르면 서버 기록과 별개로 화면의 숫자를 바로 1 올립니다.
  const handleClicked = (id: string) => {
    setAdded((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <nav aria-label="링크 목록" className="w-full">
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard
              link={link}
              count={(counts[link.id] ?? 0) + (added[link.id] ?? 0)}
              onClicked={handleClicked}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
