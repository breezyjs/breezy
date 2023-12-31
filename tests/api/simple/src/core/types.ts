export type OrderSchema = {
  /**
   * @type integer
   * @format int64
   * @example 10
   */
  id?: number;
  /**
   * @type integer
   * @format int64
   * @example 198772
   */
  petId?: number;
  /**
   * @type integer
   * @format int32
   * @example 7
   */
  quantity?: number;
  /**
   * @type string
   * @format date-time
   */
  shipDate?: string;
  /**
   * Order Status
   * @type string
   * @example approved
   */
  status?: "placed" | "approved" | "delivered";
  /**
   * @type boolean
   */
  complete?: boolean;
}

export type CustomerSchema = {
  /**
   * @type integer
   * @format int64
   * @example 100000
   */
  id?: number;
  /**
   * @type string
   * @example fehguy
   */
  username?: string;
  /**
   * @type array
   */
  address?: AddressSchema[];
}

export type AddressSchema = {
  /**
   * @type string
   * @example 437 Lytton
   */
  street?: string;
  /**
   * @type string
   * @example Palo Alto
   */
  city?: string;
  /**
   * @type string
   * @example CA
   */
  state?: string;
  /**
   * @type string
   * @example 94301
   */
  zip?: string;
}

export type CategorySchema = {
  /**
   * @type integer
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * @type string
   * @example Dogs
   */
  name?: string;
}

export type UserSchema = {
  /**
   * @type integer
   * @format int64
   * @example 10
   */
  id?: number;
  /**
   * @type string
   * @example theUser
   */
  username?: string;
  /**
   * @type string
   * @example John
   */
  firstName?: string;
  /**
   * @type string
   * @example James
   */
  lastName?: string;
  /**
   * @type string
   * @example john@email.com
   */
  email?: string;
  /**
   * @type string
   * @example 12345
   */
  password?: string;
  /**
   * @type string
   * @example 12345
   */
  phone?: string;
  /**
   * User Status
   * @type integer
   * @format int32
   * @example 1
   */
  userStatus?: number;
}

export type TagSchema = {
  /**
   * @type integer
   * @format int64
   */
  id?: number;
  /**
   * @type string
   */
  name?: string;
}

export type PetSchema = {
  /**
   * @type integer
   * @format int64
   * @example 10
   */
  id?: number;
  /**
   * @type string
   * @example doggie
   */
  name: string;
  category?: CategorySchema;
  /**
   * @type array
   */
  photoUrls: string[];
  /**
   * @type array
   */
  tags?: TagSchema[];
  /**
   * pet status in the store
   * @type string
   */
  status?: "available" | "pending" | "sold";
}

export type ApiResponseSchema = {
  /**
   * @type integer
   * @format int32
   */
  code?: number;
  /**
   * @type string
   */
  type?: string;
  /**
   * @type string
   */
  message?: string;
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
  /** Status values that need to be considered for filter */
  status?: string;
}

export type FindPetsByStatusHeaders = {
}

export type FindPetsByTagsQuery = {
  /** Tags to filter by */
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
  /** Name of pet that needs to be updated */
  name?: string;
  /** Status of pet that needs to be updated */
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
  /** Additional Metadata */
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
  /** The user name for login */
  username?: string;
  /** The password for login in clear text */
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
