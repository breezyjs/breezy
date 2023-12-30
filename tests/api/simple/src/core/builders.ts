import { HttpRequest, HttpResponse, RequestGenericInterface, ResponseGenericInterface } from "@breezy/dev";
import { server } from "./bootstrap";
import * as Types from "./types";

/** Update an existing pet by Id */
export function updatePet<
  TReq extends RequestGenericInterface = {
    Query: Types.UpdatePetQuery;
    Body: Types.UpdatePetBody;
    Headers: Types.UpdatePetHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("put", "/pet", async (req) => {
    return await factory(req);
  });
}

/** Add a new pet to the store */
export function addPet<
  TReq extends RequestGenericInterface = {
    Query: Types.AddPetQuery;
    Body: Types.AddPetBody;
    Headers: Types.AddPetHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("post", "/pet", async (req) => {
    return await factory(req);
  });
}

/** Multiple status values can be provided with comma separated strings */
export function findPetsByStatus<
  TReq extends RequestGenericInterface = {
    Query: Types.FindPetsByStatusQuery;
    Headers: Types.FindPetsByStatusHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/pet/findByStatus", async (req) => {
    return await factory(req);
  });
}

/** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
export function findPetsByTags<
  TReq extends RequestGenericInterface = {
    Query: Types.FindPetsByTagsQuery;
    Headers: Types.FindPetsByTagsHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/pet/findByTags", async (req) => {
    return await factory(req);
  });
}

/** Returns a single pet */
export function getPetById<
  TReq extends RequestGenericInterface = {
    Params: Types.GetPetByIdParams;
    Query: Types.GetPetByIdQuery;
    Headers: Types.GetPetByIdHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/pet/:petId", async (req) => {
    return await factory(req);
  });
}

export function updatePetWithForm<
  TReq extends RequestGenericInterface = {
    Params: Types.UpdatePetWithFormParams;
    Query: Types.UpdatePetWithFormQuery;
    Headers: Types.UpdatePetWithFormHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("post", "/pet/:petId", async (req) => {
    return await factory(req);
  });
}

/** delete a pet */
export function deletePet<
  TReq extends RequestGenericInterface = {
    Params: Types.DeletePetParams;
    Query: Types.DeletePetQuery;
    Headers: Types.DeletePetHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("delete", "/pet/:petId", async (req) => {
    return await factory(req);
  });
}

export function uploadFile<
  TReq extends RequestGenericInterface = {
    Params: Types.UploadFileParams;
    Query: Types.UploadFileQuery;
    Body: Types.UploadFileBody;
    Headers: Types.UploadFileHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("post", "/pet/:petId/uploadImage", async (req) => {
    return await factory(req);
  });
}

/** Returns a map of status codes to quantities */
export function getInventory<
  TReq extends RequestGenericInterface = {
    Query: Types.GetInventoryQuery;
    Headers: Types.GetInventoryHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/store/inventory", async (req) => {
    return await factory(req);
  });
}

/** Place a new order in the store */
export function placeOrder<
  TReq extends RequestGenericInterface = {
    Query: Types.PlaceOrderQuery;
    Body: Types.PlaceOrderBody;
    Headers: Types.PlaceOrderHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("post", "/store/order", async (req) => {
    return await factory(req);
  });
}

/** For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. */
export function getOrderById<
  TReq extends RequestGenericInterface = {
    Params: Types.GetOrderByIdParams;
    Query: Types.GetOrderByIdQuery;
    Headers: Types.GetOrderByIdHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/store/order/:orderId", async (req) => {
    return await factory(req);
  });
}

/** For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors */
export function deleteOrder<
  TReq extends RequestGenericInterface = {
    Params: Types.DeleteOrderParams;
    Query: Types.DeleteOrderQuery;
    Headers: Types.DeleteOrderHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("delete", "/store/order/:orderId", async (req) => {
    return await factory(req);
  });
}

/** This can only be done by the logged in user. */
export function createUser<
  TReq extends RequestGenericInterface = {
    Query: Types.CreateUserQuery;
    Body: Types.CreateUserBody;
    Headers: Types.CreateUserHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("post", "/user", async (req) => {
    return await factory(req);
  });
}

/** Creates list of users with given input array */
export function createUsersWithListInput<
  TReq extends RequestGenericInterface = {
    Query: Types.CreateUsersWithListInputQuery;
    Body: Types.CreateUsersWithListInputBody;
    Headers: Types.CreateUsersWithListInputHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("post", "/user/createWithList", async (req) => {
    return await factory(req);
  });
}

export function loginUser<
  TReq extends RequestGenericInterface = {
    Query: Types.LoginUserQuery;
    Headers: Types.LoginUserHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/user/login", async (req) => {
    return await factory(req);
  });
}

export function logoutUser<
  TReq extends RequestGenericInterface = {
    Query: Types.LogoutUserQuery;
    Headers: Types.LogoutUserHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/user/logout", async (req) => {
    return await factory(req);
  });
}

export function getUserByName<
  TReq extends RequestGenericInterface = {
    Params: Types.GetUserByNameParams;
    Query: Types.GetUserByNameQuery;
    Headers: Types.GetUserByNameHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("get", "/user/:username", async (req) => {
    return await factory(req);
  });
}

/** This can only be done by the logged in user. */
export function updateUser<
  TReq extends RequestGenericInterface = {
    Params: Types.UpdateUserParams;
    Query: Types.UpdateUserQuery;
    Body: Types.UpdateUserBody;
    Headers: Types.UpdateUserHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("put", "/user/:username", async (req) => {
    return await factory(req);
  });
}

/** This can only be done by the logged in user. */
export function deleteUser<
  TReq extends RequestGenericInterface = {
    Params: Types.DeleteUserParams;
    Query: Types.DeleteUserQuery;
    Headers: Types.DeleteUserHeaders;
  },
  TRes extends ResponseGenericInterface = Record<string, unknown>
>(
  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>
): void {
  server.register<{ Req: TReq, Res: TRes }>("delete", "/user/:username", async (req) => {
    return await factory(req);
  });
}
