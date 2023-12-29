/** Update an existing pet by Id */
export function updatePet(factory: (request: any) => Promise<void>): void {
}

/** Add a new pet to the store */
export function addPet(factory: (request: any) => Promise<void>): void {
}

/** Multiple status values can be provided with comma separated strings */
export function findPetsByStatus(factory: (request: any) => Promise<void>): void {
}

/** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
export function findPetsByTags(factory: (request: any) => Promise<void>): void {
}

/** Returns a single pet */
export function getPetById(factory: (request: any) => Promise<void>): void {
}

export function updatePetWithForm(factory: (request: any) => Promise<void>): void {
}

/** delete a pet */
export function deletePet(factory: (request: any) => Promise<void>): void {
}

export function uploadFile(factory: (request: any) => Promise<void>): void {
}

/** Returns a map of status codes to quantities */
export function getInventory(factory: (request: any) => Promise<void>): void {
}

/** Place a new order in the store */
export function placeOrder(factory: (request: any) => Promise<void>): void {
}

/** For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. */
export function getOrderById(factory: (request: any) => Promise<void>): void {
}

/** For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors */
export function deleteOrder(factory: (request: any) => Promise<void>): void {
}

/** This can only be done by the logged in user. */
export function createUser(factory: (request: any) => Promise<void>): void {
}

/** Creates list of users with given input array */
export function createUsersWithListInput(factory: (request: any) => Promise<void>): void {
}

export function loginUser(factory: (request: any) => Promise<void>): void {
}

export function logoutUser(factory: (request: any) => Promise<void>): void {
}

export function getUserByName(factory: (request: any) => Promise<void>): void {
}

/** This can only be done by the logged in user. */
export function updateUser(factory: (request: any) => Promise<void>): void {
}

/** This can only be done by the logged in user. */
export function deleteUser(factory: (request: any) => Promise<void>): void {
}
