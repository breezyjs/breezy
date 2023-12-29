import { fastify } from "./bootstrap"
import { transformRequest, sendResponse } from "./helpers"
import * as T from "./types"

/** Update an existing pet by Id */
export function updatePet(
  factory: (request: T.Request<{
    Params: T.UpdatePetParams;
    Query: T.UpdatePetQuery;
    Body: T.UpdatePetBody;
    Headers: T.UpdatePetHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.put("/pet", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Add a new pet to the store */
export function addPet(
  factory: (request: T.Request<{
    Params: T.AddPetParams;
    Query: T.AddPetQuery;
    Body: T.AddPetBody;
    Headers: T.AddPetHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.post("/pet", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Multiple status values can be provided with comma separated strings */
export function findPetsByStatus(
  factory: (request: T.Request<{
    Params: T.FindPetsByStatusParams;
    Query: T.FindPetsByStatusQuery;
    Body: T.FindPetsByStatusBody;
    Headers: T.FindPetsByStatusHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/pet/findByStatus", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
export function findPetsByTags(
  factory: (request: T.Request<{
    Params: T.FindPetsByTagsParams;
    Query: T.FindPetsByTagsQuery;
    Body: T.FindPetsByTagsBody;
    Headers: T.FindPetsByTagsHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/pet/findByTags", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Returns a single pet */
export function getPetById(
  factory: (request: T.Request<{
    Params: T.GetPetByIdParams;
    Query: T.GetPetByIdQuery;
    Body: T.GetPetByIdBody;
    Headers: T.GetPetByIdHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/pet/:petId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function updatePetWithForm(
  factory: (request: T.Request<{
    Params: T.UpdatePetWithFormParams;
    Query: T.UpdatePetWithFormQuery;
    Body: T.UpdatePetWithFormBody;
    Headers: T.UpdatePetWithFormHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.post("/pet/:petId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** delete a pet */
export function deletePet(
  factory: (request: T.Request<{
    Params: T.DeletePetParams;
    Query: T.DeletePetQuery;
    Body: T.DeletePetBody;
    Headers: T.DeletePetHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.delete("/pet/:petId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function uploadFile(
  factory: (request: T.Request<{
    Params: T.UploadFileParams;
    Query: T.UploadFileQuery;
    Body: T.UploadFileBody;
    Headers: T.UploadFileHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.post("/pet/:petId/uploadImage", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Returns a map of status codes to quantities */
export function getInventory(
  factory: (request: T.Request<{
    Params: T.GetInventoryParams;
    Query: T.GetInventoryQuery;
    Body: T.GetInventoryBody;
    Headers: T.GetInventoryHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/store/inventory", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Place a new order in the store */
export function placeOrder(
  factory: (request: T.Request<{
    Params: T.PlaceOrderParams;
    Query: T.PlaceOrderQuery;
    Body: T.PlaceOrderBody;
    Headers: T.PlaceOrderHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.post("/store/order", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. */
export function getOrderById(
  factory: (request: T.Request<{
    Params: T.GetOrderByIdParams;
    Query: T.GetOrderByIdQuery;
    Body: T.GetOrderByIdBody;
    Headers: T.GetOrderByIdHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/store/order/:orderId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors */
export function deleteOrder(
  factory: (request: T.Request<{
    Params: T.DeleteOrderParams;
    Query: T.DeleteOrderQuery;
    Body: T.DeleteOrderBody;
    Headers: T.DeleteOrderHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.delete("/store/order/:orderId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** This can only be done by the logged in user. */
export function createUser(
  factory: (request: T.Request<{
    Params: T.CreateUserParams;
    Query: T.CreateUserQuery;
    Body: T.CreateUserBody;
    Headers: T.CreateUserHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.post("/user", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Creates list of users with given input array */
export function createUsersWithListInput(
  factory: (request: T.Request<{
    Params: T.CreateUsersWithListInputParams;
    Query: T.CreateUsersWithListInputQuery;
    Body: T.CreateUsersWithListInputBody;
    Headers: T.CreateUsersWithListInputHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.post("/user/createWithList", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function loginUser(
  factory: (request: T.Request<{
    Params: T.LoginUserParams;
    Query: T.LoginUserQuery;
    Body: T.LoginUserBody;
    Headers: T.LoginUserHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/user/login", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function logoutUser(
  factory: (request: T.Request<{
    Params: T.LogoutUserParams;
    Query: T.LogoutUserQuery;
    Body: T.LogoutUserBody;
    Headers: T.LogoutUserHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/user/logout", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function getUserByName(
  factory: (request: T.Request<{
    Params: T.GetUserByNameParams;
    Query: T.GetUserByNameQuery;
    Body: T.GetUserByNameBody;
    Headers: T.GetUserByNameHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.get("/user/:username", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** This can only be done by the logged in user. */
export function updateUser(
  factory: (request: T.Request<{
    Params: T.UpdateUserParams;
    Query: T.UpdateUserQuery;
    Body: T.UpdateUserBody;
    Headers: T.UpdateUserHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.put("/user/:username", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** This can only be done by the logged in user. */
export function deleteUser(
  factory: (request: T.Request<{
    Params: T.DeleteUserParams;
    Query: T.DeleteUserQuery;
    Body: T.DeleteUserBody;
    Headers: T.DeleteUserHeaders;
  }>) => Promise<Partial<T.Response>>
): void {
  fastify.delete("/user/:username", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}
