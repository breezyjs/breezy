export type BootstrapOptions = {
  port?: number;
  host?: string;
  onListen?: (err: Error | null, address: string) => void;
  onClose?: () => void;
}

export type Response<TBody = any> = {
  headers: Record<string, string>;
  status: number;
  body: TBody;
}

export type RequestBodyDefault = unknown;
export type RequestQueryDefault = {};
export type RequestParamsDefault = {};
export type RequestHeadersDefault = {};
export type RequestCookieDefault = {};

interface RequestGenericInterface {
  Body?: RequestBodyDefault;
  Query?: RequestQueryDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
  Cookie?: RequestCookieDefault;
}

export type Request<T extends RequestGenericInterface = {}> = {
  method: string;
  uri: string;
  version: string;
  path: string;
  host: string;
  scheme: string;
  peerAddr?: string;
  realIpRemoteAddr?: string;
  body: T["Body"];
  query: T["Query"];
  params: T["Params"];
  headers: T["Headers"];
  cookie: T["Cookie"];
  store: any;
  extensions: any;
}

export type UpdatePetParams = {
}

export type UpdatePetQuery = {
}

export type UpdatePetBody = {
}

export type UpdatePetHeaders = {
}

export type AddPetParams = {
}

export type AddPetQuery = {
}

export type AddPetBody = {
}

export type AddPetHeaders = {
}

export type FindPetsByStatusParams = {
}

export type FindPetsByStatusQuery = {
  status?: string;
}

export type FindPetsByStatusBody = {
}

export type FindPetsByStatusHeaders = {
}

export type FindPetsByTagsParams = {
}

export type FindPetsByTagsQuery = {
  tags?: string;
}

export type FindPetsByTagsBody = {
}

export type FindPetsByTagsHeaders = {
}

export type GetPetByIdParams = {
  petId: string;
}

export type GetPetByIdQuery = {
}

export type GetPetByIdBody = {
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

export type UpdatePetWithFormBody = {
}

export type UpdatePetWithFormHeaders = {
}

export type DeletePetParams = {
  petId: string;
}

export type DeletePetQuery = {
}

export type DeletePetBody = {
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

export type GetInventoryParams = {
}

export type GetInventoryQuery = {
}

export type GetInventoryBody = {
}

export type GetInventoryHeaders = {
}

export type PlaceOrderParams = {
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

export type GetOrderByIdBody = {
}

export type GetOrderByIdHeaders = {
}

export type DeleteOrderParams = {
  orderId: string;
}

export type DeleteOrderQuery = {
}

export type DeleteOrderBody = {
}

export type DeleteOrderHeaders = {
}

export type CreateUserParams = {
}

export type CreateUserQuery = {
}

export type CreateUserBody = {
}

export type CreateUserHeaders = {
}

export type CreateUsersWithListInputParams = {
}

export type CreateUsersWithListInputQuery = {
}

export type CreateUsersWithListInputBody = {
}

export type CreateUsersWithListInputHeaders = {
}

export type LoginUserParams = {
}

export type LoginUserQuery = {
  username?: string;
  password?: string;
}

export type LoginUserBody = {
}

export type LoginUserHeaders = {
}

export type LogoutUserParams = {
}

export type LogoutUserQuery = {
}

export type LogoutUserBody = {
}

export type LogoutUserHeaders = {
}

export type GetUserByNameParams = {
  username: string;
}

export type GetUserByNameQuery = {
}

export type GetUserByNameBody = {
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

export type DeleteUserBody = {
}

export type DeleteUserHeaders = {
}
