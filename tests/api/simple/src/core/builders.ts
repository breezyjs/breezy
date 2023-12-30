import { register, HttpRequest, HttpResponse } from "@breezy/dev";
import * as T from "./types";

/** Update an existing pet by Id */
export function updatePet(
  factory: (request: HttpRequest<{
    Params: T.UpdatePetParams;
    Query: T.UpdatePetQuery;
    Body: T.UpdatePetBody;
    Headers: T.UpdatePetHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("put", "/pet", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Add a new pet to the store */
export function addPet(
  factory: (request: HttpRequest<{
    Params: T.AddPetParams;
    Query: T.AddPetQuery;
    Body: T.AddPetBody;
    Headers: T.AddPetHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("post", "/pet", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Multiple status values can be provided with comma separated strings */
export function findPetsByStatus(
  factory: (request: HttpRequest<{
    Params: T.FindPetsByStatusParams;
    Query: T.FindPetsByStatusQuery;
    Body: T.FindPetsByStatusBody;
    Headers: T.FindPetsByStatusHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/pet/findByStatus", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
export function findPetsByTags(
  factory: (request: HttpRequest<{
    Params: T.FindPetsByTagsParams;
    Query: T.FindPetsByTagsQuery;
    Body: T.FindPetsByTagsBody;
    Headers: T.FindPetsByTagsHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/pet/findByTags", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Returns a single pet */
export function getPetById(
  factory: (request: HttpRequest<{
    Params: T.GetPetByIdParams;
    Query: T.GetPetByIdQuery;
    Body: T.GetPetByIdBody;
    Headers: T.GetPetByIdHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/pet/:petId", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

export function updatePetWithForm(
  factory: (request: HttpRequest<{
    Params: T.UpdatePetWithFormParams;
    Query: T.UpdatePetWithFormQuery;
    Body: T.UpdatePetWithFormBody;
    Headers: T.UpdatePetWithFormHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("post", "/pet/:petId", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** delete a pet */
export function deletePet(
  factory: (request: HttpRequest<{
    Params: T.DeletePetParams;
    Query: T.DeletePetQuery;
    Body: T.DeletePetBody;
    Headers: T.DeletePetHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("delete", "/pet/:petId", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

export function uploadFile(
  factory: (request: HttpRequest<{
    Params: T.UploadFileParams;
    Query: T.UploadFileQuery;
    Body: T.UploadFileBody;
    Headers: T.UploadFileHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("post", "/pet/:petId/uploadImage", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Returns a map of status codes to quantities */
export function getInventory(
  factory: (request: HttpRequest<{
    Params: T.GetInventoryParams;
    Query: T.GetInventoryQuery;
    Body: T.GetInventoryBody;
    Headers: T.GetInventoryHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/store/inventory", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Place a new order in the store */
export function placeOrder(
  factory: (request: HttpRequest<{
    Params: T.PlaceOrderParams;
    Query: T.PlaceOrderQuery;
    Body: T.PlaceOrderBody;
    Headers: T.PlaceOrderHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("post", "/store/order", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. */
export function getOrderById(
  factory: (request: HttpRequest<{
    Params: T.GetOrderByIdParams;
    Query: T.GetOrderByIdQuery;
    Body: T.GetOrderByIdBody;
    Headers: T.GetOrderByIdHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/store/order/:orderId", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors */
export function deleteOrder(
  factory: (request: HttpRequest<{
    Params: T.DeleteOrderParams;
    Query: T.DeleteOrderQuery;
    Body: T.DeleteOrderBody;
    Headers: T.DeleteOrderHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("delete", "/store/order/:orderId", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** This can only be done by the logged in user. */
export function createUser(
  factory: (request: HttpRequest<{
    Params: T.CreateUserParams;
    Query: T.CreateUserQuery;
    Body: T.CreateUserBody;
    Headers: T.CreateUserHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("post", "/user", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** Creates list of users with given input array */
export function createUsersWithListInput(
  factory: (request: HttpRequest<{
    Params: T.CreateUsersWithListInputParams;
    Query: T.CreateUsersWithListInputQuery;
    Body: T.CreateUsersWithListInputBody;
    Headers: T.CreateUsersWithListInputHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("post", "/user/createWithList", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

export function loginUser(
  factory: (request: HttpRequest<{
    Params: T.LoginUserParams;
    Query: T.LoginUserQuery;
    Body: T.LoginUserBody;
    Headers: T.LoginUserHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/user/login", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

export function logoutUser(
  factory: (request: HttpRequest<{
    Params: T.LogoutUserParams;
    Query: T.LogoutUserQuery;
    Body: T.LogoutUserBody;
    Headers: T.LogoutUserHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/user/logout", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

export function getUserByName(
  factory: (request: HttpRequest<{
    Params: T.GetUserByNameParams;
    Query: T.GetUserByNameQuery;
    Body: T.GetUserByNameBody;
    Headers: T.GetUserByNameHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("get", "/user/:username", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** This can only be done by the logged in user. */
export function updateUser(
  factory: (request: HttpRequest<{
    Params: T.UpdateUserParams;
    Query: T.UpdateUserQuery;
    Body: T.UpdateUserBody;
    Headers: T.UpdateUserHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("put", "/user/:username", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}

/** This can only be done by the logged in user. */
export function deleteUser(
  factory: (request: HttpRequest<{
    Params: T.DeleteUserParams;
    Query: T.DeleteUserQuery;
    Body: T.DeleteUserBody;
    Headers: T.DeleteUserHeaders;
  }>) => Promise<Partial<HttpResponse>>
): void {
  register("delete", "/user/:username", async (req: Parameters<typeof factory>[0]) => {
    return await factory(req);
  });
}
