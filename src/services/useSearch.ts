
import { useAxios } from '@/services'
import type { UserComplet, Picture } from '@/types'
const { Axios } = useAxios()

const useSearch =  async() =>
{
    const getUsers = async(id :Number) => {
        if(id) {
            const response = await Axios.get(`simpleSearch?idUser=${id}`)
            return response.data.data as [UserComplet]
        }
    }
    const getUser = async(id :Number) => {
        const response = await Axios.get(`users/${id}`)
        if (response.status !== 200) throw new Error(`Error while fetching user with id: ${id}`)
        const data = response.data.data
        const userData = data[0]
        const pictures = data[1]
        const tags = data[2]

        userData["activities"] = tags
        userData["pictures"] = pictures

        const fetchedUser: UserComplet = userData as UserComplet

        return fetchedUser
      }
    const getPictures = async(id: Number) => {
        const response = await Axios.get(`photos?idUser=${id}`)
        return response.data.data as [Picture]
    }
return {

    getUsers,
    getPictures,
    getUser,
}
}

export default useSearch