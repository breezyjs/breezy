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
  if (body instanceof URLSearchParams) {
    return {
      contentType: "application/x-www-form-urlencoded",
      body: body.toString()
    };
  }

  return {
    contentType: "text/plain",
    body: String(body)
  };
}
