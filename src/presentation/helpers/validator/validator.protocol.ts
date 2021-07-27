export interface Validator {
  validate: (inpit: any) => Error | undefined
}
