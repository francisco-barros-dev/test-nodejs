export interface HttpResponse<T = unknown> {
  statusCode: number
  data: T
}

export const ok = <T = unknown> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
})

export const created = <T = unknown> (data: T): HttpResponse<T> => ({
  statusCode: 201,
  data,
})

export const noContent = <T = unknown> (data: T): HttpResponse<T> => ({
  statusCode: 204,
  data,
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
})

export const unprocessableEntity = (error: Error): HttpResponse<Error> => ({
  statusCode: 422,
  data: error,
})

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: error,
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: error,
})
