
import { useAxios } from '@/services'
import type { UserComplet } from '@/types'

const getUsers = async() => {
    const { Axios } = useAxios()

    const response = await Axios.get(`users/`)
    console.log(response.data.data)
    return response.data.data as [UserComplet]
}

export default getUsers