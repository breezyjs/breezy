export type OrderSchema = {
}

export type CustomerSchema = {
}

export type AddressSchema = {
}

export type CategorySchema = {
}

export type UserSchema = {
}

export type TagSchema = {
}

export type PetSchema = {
}

export type ApiResponseSchema = {
}

export type UpdatePetQuery = {
}

export type UpdatePetBody = {
}

export type UpdatePetHeaders = {
}

export type AddPetQuery = {
}

export type AddPetBody = {
}

export type AddPetHeaders = {
}

export type FindPetsByStatusQuery = {
  status?: string;
}

export type FindPetsByStatusHeaders = {
}

export type FindPetsByTagsQuery = {
  tags?: string;
}

export type FindPetsByTagsHeaders = {
}

export type GetPetByIdParams = {
  petId: string;
}

export type GetPetByIdQuery = {
}

export type GetPetByIdHeaders = {
}

export type UpdatePetWithFormParams = {
  petId: string;
}

export type UpdatePetWithFormQuery = {
  name?: string;
  status?: string;
}

export type UpdatePetWithFormHeaders = {
}

export type DeletePetParams = {
  petId: string;
}

export type DeletePetQuery = {
}

export type DeletePetHeaders = {
  api_key?: string;
}

export type UploadFileParams = {
  petId: string;
}

export type UploadFileQuery = {
  additionalMetadata?: string;
}

export type UploadFileBody = {
}

export type UploadFileHeaders = {
}

export type GetInventoryQuery = {
}

export type GetInventoryHeaders = {
}

export type PlaceOrderQuery = {
}

export type PlaceOrderBody = {
}

export type PlaceOrderHeaders = {
}

export type GetOrderByIdParams = {
  orderId: string;
}

export type GetOrderByIdQuery = {
}

export type GetOrderByIdHeaders = {
}

export type DeleteOrderParams = {
  orderId: string;
}

export type DeleteOrderQuery = {
}

export type DeleteOrderHeaders = {
}

export type CreateUserQuery = {
}

export type CreateUserBody = {
}

export type CreateUserHeaders = {
}

export type CreateUsersWithListInputQuery = {
}

export type CreateUsersWithListInputBody = {
}

export type CreateUsersWithListInputHeaders = {
}

export type LoginUserQuery = {
  username?: string;
  password?: string;
}

export type LoginUserHeaders = {
}

export type LogoutUserQuery = {
}

export type LogoutUserHeaders = {
}

export type GetUserByNameParams = {
  username: string;
}

export type GetUserByNameQuery = {
}

export type GetUserByNameHeaders = {
}

export type UpdateUserParams = {
  username: string;
}

export type UpdateUserQuery = {
}

export type UpdateUserBody = {
}

export type UpdateUserHeaders = {
}

export type DeleteUserParams = {
  username: string;
}

export type DeleteUserQuery = {
}

export type DeleteUserHeaders = {
}
