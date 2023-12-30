import contentType from "content-type";

export default function parseBody<T extends Record<string, unknown> | string | Buffer>(rawBody: Buffer, rawContentType?: string): T {
  if (rawContentType) {
    const { parameters, type } = contentType.parse(rawContentType);
    const charset = (parameters["charset"]?.toLowerCase() || "utf-8") as BufferEncoding;

    if (type.startsWith("text/") || type.includes("xml")) {
      return rawBody.toString(charset) as T;
    }
    if (type.includes("+xml")) {
      return rawBody.toString(charset) as T;
    }
    if (type === "application/json") {
      return JSON.parse(rawBody.toString(charset)) as T;
    }
    if (type === "application/x-www-form-urlencoded") {
      return Object.fromEntries(new URLSearchParams(rawBody.toString(charset))) as T;
    }
    if (type === "multipart/form-data") {
      // TODO:
      return rawBody as T;
    }
  }

  return rawBody as T;
}
