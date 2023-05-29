export type Match = {
    id: number
    idUser: number
    idUser2: number
    secondUserName: string
    secondUserPhoto: string
    idConversation: number
    created_at: Date
} & Iterable<Match>;