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

export type UpdatePetPutParams = {
}

export type UpdatePetPutQuery = {
}

export type UpdatePetPutBody = {
}

export type UpdatePetPutHeaders = {
}

export type AddPetPostParams = {
}

export type AddPetPostQuery = {
}

export type AddPetPostBody = {
}

export type AddPetPostHeaders = {
}

export type FindPetsByStatusGetParams = {
}

export type FindPetsByStatusGetQuery = {
}

export type FindPetsByStatusGetBody = {
}

export type FindPetsByStatusGetHeaders = {
}

export type FindPetsByTagsGetParams = {
}

export type FindPetsByTagsGetQuery = {
}

export type FindPetsByTagsGetBody = {
}

export type FindPetsByTagsGetHeaders = {
}

export type GetPetByIdGetParams = {
  petId: string
}

export type GetPetByIdGetQuery = {
}

export type GetPetByIdGetBody = {
}

export type GetPetByIdGetHeaders = {
}

export type UpdatePetWithFormPostParams = {
  petId: string
}

export type UpdatePetWithFormPostQuery = {
}

export type UpdatePetWithFormPostBody = {
}

export type UpdatePetWithFormPostHeaders = {
}

export type DeletePetDeleteParams = {
  petId: string
}

export type DeletePetDeleteQuery = {
}

export type DeletePetDeleteBody = {
}

export type DeletePetDeleteHeaders = {
}

export type UploadFilePostParams = {
  petId: string
}

export type UploadFilePostQuery = {
}

export type UploadFilePostBody = {
}

export type UploadFilePostHeaders = {
}

export type GetInventoryGetParams = {
}

export type GetInventoryGetQuery = {
}

export type GetInventoryGetBody = {
}

export type GetInventoryGetHeaders = {
}

export type PlaceOrderPostParams = {
}

export type PlaceOrderPostQuery = {
}

export type PlaceOrderPostBody = {
}

export type PlaceOrderPostHeaders = {
}

export type GetOrderByIdGetParams = {
  orderId: string
}

export type GetOrderByIdGetQuery = {
}

export type GetOrderByIdGetBody = {
}

export type GetOrderByIdGetHeaders = {
}

export type DeleteOrderDeleteParams = {
  orderId: string
}

export type DeleteOrderDeleteQuery = {
}

export type DeleteOrderDeleteBody = {
}

export type DeleteOrderDeleteHeaders = {
}

export type CreateUserPostParams = {
}

export type CreateUserPostQuery = {
}

export type CreateUserPostBody = {
}

export type CreateUserPostHeaders = {
}

export type CreateUsersWithListInputPostParams = {
}

export type CreateUsersWithListInputPostQuery = {
}

export type CreateUsersWithListInputPostBody = {
}

export type CreateUsersWithListInputPostHeaders = {
}

export type LoginUserGetParams = {
}

export type LoginUserGetQuery = {
}

export type LoginUserGetBody = {
}

export type LoginUserGetHeaders = {
}

export type LogoutUserGetParams = {
}

export type LogoutUserGetQuery = {
}

export type LogoutUserGetBody = {
}

export type LogoutUserGetHeaders = {
}

export type GetUserByNameGetParams = {
  username: string
}

export type GetUserByNameGetQuery = {
}

export type GetUserByNameGetBody = {
}

export type GetUserByNameGetHeaders = {
}

export type UpdateUserPutParams = {
  username: string
}

export type UpdateUserPutQuery = {
}

export type UpdateUserPutBody = {
}

export type UpdateUserPutHeaders = {
}

export type DeleteUserDeleteParams = {
  username: string
}

export type DeleteUserDeleteQuery = {
}

export type DeleteUserDeleteBody = {
}

export type DeleteUserDeleteHeaders = {
}
