import { useAxios } from '@/services'
import type { Message } from '@/types'

const getMessage = async() => {
    const { Axios } = useAxios()

    const response = await Axios.get(`messages/`)
    return response.data.data.data as [Message]
}

export default getMessage