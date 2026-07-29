export type UserGrade = 'junior' | 'middle' | 'senior'

export type UserSpecialization = 'frontend' | 'backend' | 'fullstack'

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string

  grade: UserGrade
  specialization: UserSpecialization
  about: string
  links: string[]

  address: {
    street: string
    suite: string
    city: string
    zipcode: string

    geo: {
      lat: string
      lng: string
    }
  }

  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type EditableUserFields = Pick<
  User,
  'name' | 'username' | 'email' | 'phone' | 'website' | 'grade' | 'specialization' | 'about' | 'links'
>

export interface UpdateUserRequest {
  id: number
  changes: Partial<EditableUserFields>
}
