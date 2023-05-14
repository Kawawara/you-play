import { useAxios } from '@/services'
import type { UserComplet } from '@/types'

const getUser = async(userid: Number) => {
    const { Axios } = useAxios()

    const response = await Axios.get(`users/${userid}`)
    return response.data.data[0] as UserComplet
}

export default getUser