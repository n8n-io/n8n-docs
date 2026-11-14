import { createServer, type IncomingHttpHeaders, type Server } from "node:http";
import type { AddressInfo } from "node:net";

/** خادم HTTP محلي يحاكي webhook في n8n، ويسجل كل طلب كما وصل فعلًا عبر الشبكة. */
export interface ReceivedRequest {
  method: string;
  path: string;
  headers: IncomingHttpHeaders;
  body: string;
}

export async function startFakeN8n(respond: (req: ReceivedRequest) => { status: number; body: unknown } = () => ({ status: 200, body: { message: "Workflow was started" } })) {
  const received: ReceivedRequest[] = [];
  const server: Server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => {
      const r = { method: req.method ?? "", path: req.url ?? "", headers: req.headers, body: Buffer.concat(chunks).toString("utf8") };
      received.push(r);
      const out = respond(r);
      res.writeHead(out.status, { "content-type": "application/json" });
      res.end(JSON.stringify(out.body));
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return { baseUrl: `http://127.0.0.1:${port}`, received, close: () => new Promise<void>((r) => server.close(() => r())) };
}
