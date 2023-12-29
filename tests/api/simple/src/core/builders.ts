import { fastify } from "./bootstrap"
import { transformRequest, sendResponse } from "./helpers"
import * as T from "./types"

/** Update an existing pet by Id */
export function updatePet(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.put("/pet", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Add a new pet to the store */
export function addPet(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.post("/pet", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Multiple status values can be provided with comma separated strings */
export function findPetsByStatus(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/pet/findByStatus", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
export function findPetsByTags(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/pet/findByTags", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Returns a single pet */
export function getPetById(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/pet/:petId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function updatePetWithForm(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.post("/pet/:petId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** delete a pet */
export function deletePet(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.delete("/pet/:petId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function uploadFile(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.post("/pet/:petId/uploadImage", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Returns a map of status codes to quantities */
export function getInventory(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/store/inventory", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Place a new order in the store */
export function placeOrder(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.post("/store/order", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. */
export function getOrderById(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/store/order/:orderId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors */
export function deleteOrder(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.delete("/store/order/:orderId", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** This can only be done by the logged in user. */
export function createUser(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.post("/user", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** Creates list of users with given input array */
export function createUsersWithListInput(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.post("/user/createWithList", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function loginUser(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/user/login", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function logoutUser(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/user/logout", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

export function getUserByName(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.get("/user/:username", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** This can only be done by the logged in user. */
export function updateUser(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.put("/user/:username", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}

/** This can only be done by the logged in user. */
export function deleteUser(factory: (request: T.Request) => Promise<T.Response>): void {
  fastify.delete("/user/:username", async (request, reply) => {
    return sendResponse(await factory(transformRequest(request)), reply);
  });
}
