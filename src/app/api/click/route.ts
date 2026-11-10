import { connection } from "next/server";
import { getDb } from "@/lib/mongodb";
import { links } from "@/data/profile";

type ClickDoc = { _id: string; count: number };

const validIds = new Set(links.map((link) => link.id));

// 링크 클릭 1회를 기록합니다. body: { "id": "github" }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return Response.json(
      { error: "MONGODB_URI가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  await db
    .collection<ClickDoc>("clicks")
    .updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });

  return new Response(null, { status: 204 });
}

// 링크별 클릭 수를 조회합니다.
export async function GET() {
  // 빌드 때 미리 만들어 두지 않고 요청마다 최신 값을 읽도록 합니다.
  await connection();
  const db = await getDb();
  if (!db) {
    return Response.json(
      { error: "MONGODB_URI가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const docs = await db.collection<ClickDoc>("clicks").find().toArray();
  const counts = Object.fromEntries(
    links.map((link) => [
      link.id,
      docs.find((doc) => doc._id === link.id)?.count ?? 0,
    ]),
  );

  return Response.json(counts);
}
