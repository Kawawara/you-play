export type Like = {
    id: number
    idUserWhoLiked: number
    idUserWhoBeLiked: number
    secondUserName: string
    secondUserPhoto: string
    created_at: Date
} & Iterable<Like>;