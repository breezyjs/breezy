type PreparedResponse = {
  contentType: string;
  body: any
}

export function prepareResponse(body: any): PreparedResponse {
  if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
    return {
      contentType: "text/plain",
      body: String(body)
    };
  }
  if (Array.isArray(body) || typeof body === "object") {
    return {
      contentType: "application/json",
      body: JSON.stringify(body)
    };
  }
  if (Buffer.isBuffer(body)) {
    return {
      contentType: "application/octet-stream",
      body
    };
  }

  return {
    contentType: "text/plain",
    body: String(body)
  };
}
