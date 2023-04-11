export type User = {
  id: number
  username: string
  email: string
  prefs?: Prefs[] 
}

export type Prefs = {
  name: string,
}