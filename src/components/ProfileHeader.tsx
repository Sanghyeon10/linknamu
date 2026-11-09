import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={160}
        height={160}
        priority
        className="h-36 w-36 rounded-full sm:h-40 sm:w-40 border border-black/10 object-cover dark:border-white/15"
      />
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{profile.bio}</p>
    </header>
  );
}
