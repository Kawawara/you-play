import { useAxios } from '@/services'
import type { Subscription } from '@/types'

const getSubscriptions = async(userid: Number) => {
    try {
        const { Axios } = useAxios()
        const response = await Axios.get(`subscriptions?idUser=${userid}`)
        return response.data.data as [Subscription]
    } catch(error) {
        return [];
    }
}

export default getSubscriptions