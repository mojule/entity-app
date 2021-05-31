export type Role = 'admin' | 'user' | 'currentUser' | 'public'

export type PropertyAccess = 'create' | 'read' | 'update'

export type EntityAccess = PropertyAccess | 'delete'
