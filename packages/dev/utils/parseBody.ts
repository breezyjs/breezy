export default function parseBody(rawBody: Buffer, contentType?: string): any {
  if (contentType === "text/plain") {
    return rawBody.toString("utf-8");
  }
  if (contentType === "application/json") {
    return JSON.parse(rawBody.toString("utf-8"));
  }

  return rawBody;
}
