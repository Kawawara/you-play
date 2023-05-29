import { useAxios } from '@/services'
import type { Match } from '@/types'

const getMatches = async(userid: Number) => {
    const { Axios } = useAxios()
    const response = await Axios.get(`matchs?id=${userid}`)
    return response.data.data as [Match]
}

export default getMatches