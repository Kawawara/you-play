import { useAxios } from '@/services'
import type { Conv } from '@/types'

const getConvs = async(userid: Number) => {
    const { Axios } = useAxios()
    const response = await Axios.get(`conversations?idUser=${userid}`)
    return response.data.data as [Conv]
}

export default getConvs