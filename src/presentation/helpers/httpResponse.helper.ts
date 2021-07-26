import { HttpResponse } from '../protocols/http.protocol'

export const badRequest = (body: any): HttpResponse => ({
  status: 400,
  body
})
export const conflict = (body: any): HttpResponse => ({
  status: 409,
  body
})
export const serverError = (body: any): HttpResponse => ({
  status: 500,
  body
})
export const created = (body: any): HttpResponse => ({
  status: 201,
  body
})
