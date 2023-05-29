export type Photo = {
    id: number
    fileName: string
    position: number
    idUser: number
    created_at: Date
} & Iterable<Photo>;