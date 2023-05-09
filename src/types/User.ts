export type User = {
  id: number
  username: string
  email: string
  prefs?: Prefs[] 
}

export type UserComplet = {
  id: number
  username: string
  email: string,
  name: string,
  lastName: string,
  gender: string,
  city: string,
  age: number,
  description: string
}

export type Prefs = {
  name: string,
}