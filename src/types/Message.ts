export type Conv = {
    id: number
    idFirstUser: number
    idSecondUser: number
    secondUserName: string
    secondUserPhoto: string
    nameLastMessage: string
    contentLastMessage : string
    timeLastMessage: string
} & Iterable<Conv>;

export type Message = {
    id: number
    idConversation: number
    idUser: number
    content: string
    created_at: Date
} & Iterable<Message>;