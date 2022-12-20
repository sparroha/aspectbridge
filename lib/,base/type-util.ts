
export type Cast<Req, Act> = Act extends Req ? Act : never
export type CastNot<Req, Act> = Act extends Req ? never : Act

export type Values<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never

/** Exclude keys, remaining optional */
export type ExcludeO<X, O> = ExcludeKeysRemainingOptional<X, O>
/** can use {@link ExcludeO} for short */
export type ExcludeKeysRemainingOptional<X, O> = { [key in Exclude<keyof O, X>]?: O[key] }

export type AllAbsent<O> = { [key in keyof O]?: never }

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown
} ? U : T

export type PromiseResolve<T> = T extends Promise<infer U> ? U : never
export type PromiseReturn<T extends (...args: any[]) => Promise<any>> = PromiseResolve<ReturnType<T>>
