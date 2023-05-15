
import { useAxios } from '@/services'
import type { UserComplet, Picture } from '@/types'
const { Axios } = useAxios()

const useSearch =  async() =>
{
    const getUsers = async() => {
    
        const response = await Axios.get(`users/`)
        console.log(response.data.data)
        return response.data.data as [UserComplet]
    }
    const getUser = async(id :Number) => {
        const response = await Axios.get(`users/${id}`)
        return response.data.data[0] as UserComplet
      }
    const getPictures = async(id: Number) => {
        const response = await Axios.get(`photos?idUser=${id}`)
        return response.data.data as [Picture]
    }
return {
    getUsers,
    getPictures,
    getUser
}
}

export default useSearch