
import { useAxios } from '@/services'
import type { UserComplet, Picture } from '@/types'

const useSearch =  async() =>
{
    const getUsers = async() => {
        const { Axios } = useAxios()
    
        const response = await Axios.get(`users/`)
        console.log(response.data.data)
        return response.data.data as [UserComplet]
    }
    
    const getPictures = async(userid: Number) => {
        const { Axios } = useAxios()
        const response = await Axios.get(`photos?idUser=${userid}`)
        return response.data.data as [Picture]
    }
return {
    getUsers,
    getPictures
}
}

export default useSearch