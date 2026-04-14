export const runtime = "edge";

let count = 0;

export async function GET() {
  count++;
  return Response.json({ count });
}
