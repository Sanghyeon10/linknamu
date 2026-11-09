export type Profile = {
  name: string;
  bio: string;
  image: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

// TODO: 보여 주기용 더미 값입니다. 실제 프로필과 링크로 바꿔 주세요.
export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  // placehold.co는 기본으로 SVG를 주므로, next/image 최적화를 위해 .png를 명시
  image: "https://placehold.co/160x160/orange/white.png",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://example.com/" },
];
