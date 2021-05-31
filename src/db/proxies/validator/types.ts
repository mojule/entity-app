export interface ValidateEntity<TEntityMap> {
  <K extends keyof TEntityMap>( key: K & string, entity: TEntityMap[ K ] ):
    Promise<Error|null>
}

export interface ValidateOptions {
  onCreate: boolean
  onSave: boolean
  onLoad: boolean
}
