export type Conv = {
    id: number
    idFirstUser: number
    idSecondUser: number
}

export type Message = {
    id: number
    idConversation: number
    idUser: number
    content: string
}