import { useAxios } from '@/services'
import type { Message } from '@/types'

const getMessages = async(userid: Number, conversationid: Number) => {
    const { Axios } = useAxios()
    const response = await Axios.get(`messages?idUser=${userid}&idConversation=${conversationid}`)
    return response.data.data as Message
}

export default getMessages