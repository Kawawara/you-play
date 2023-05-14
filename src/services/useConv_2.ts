import { useAxios } from '@/services'
import type { Conv } from '@/types'

const getConv = async(userid: Number) => {
    const { Axios } = useAxios()
    const response = await Axios.get(`conversations/${userid}`)
    return response.data.data as Conv
}

export default getConv