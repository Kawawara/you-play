export type Subscription = {
    id: number
    idUser: number
    timestamp: Date
    nextCost: Date
    idAvantage: number
    created_at: Date
} & Iterable<Subscription>;