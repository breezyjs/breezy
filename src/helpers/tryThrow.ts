import throwErr from "./throwErr"

export default function tryThrow<T>(wrapper: () => T, handler: (err: any) => string): T {
  try {
    return wrapper()
  } catch (err) {
    throwErr(handler(err))
  }

  throw new Error();
}