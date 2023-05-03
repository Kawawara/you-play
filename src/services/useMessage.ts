import { useAxios } from '@/services'
import type { Message } from '@/types'

const getMessage = async(convid: Number) => {
    const { Axios } = useAxios()

    const response = await Axios.get(`messages/`, { params: { convid }})
    return response.data.data.data as [Message]
}

export default getMessage