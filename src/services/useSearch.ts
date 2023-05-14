import { useAxios } from '@/services'
import type { UserComplet } from '@/types'

const getUsers = async() => {
    const { Axios } = useAxios()

    const response = await Axios.get(`users/`)
    
    return response.data.data as [UserComplet]
}

export default getUsers