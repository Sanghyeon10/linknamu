import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile, links } from "@/data/profile";

// 와이어프레임 구성: 위쪽에 원형 프로필, 아래쪽에 세로로 쌓인 링크 카드
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-10 px-4 py-12 sm:py-20">
      <ProfileHeader profile={profile} />
      <LinkList links={links} />
    </main>
  );
}
