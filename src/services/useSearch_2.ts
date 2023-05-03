import { useAxios } from '@/services'
import type { UserComplet } from '@/types'

const getUser = async(userid: Number) => {
    const { Axios } = useAxios()

    const response = await Axios.get(`users/`, { params: { iduser: userid } })
    
    return response.data.data.data as [UserComplet]
}

export default getUser