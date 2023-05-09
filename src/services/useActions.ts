
import { useAxios } from '@/services'
import type { UserComplet, Picture } from '@/types'

const useActions =  async() =>
{
    const postLike = async() => {
        const { Axios } = useAxios()
        // const response = await Axios.get(`users/`)
    }
    
    const postDislike = async(userid: Number) => {
        const { Axios } = useAxios()
        // const response = await Axios.get(`photos?idUser=${userid}`)
    }
    const postSuperlike = async() => {
        const { Axios } = useAxios()
        // const response = await Axios.get(`users/`)
    }
    
    const postGoback = async(userid: Number) => {
        const { Axios } = useAxios()
        // const response = await Axios.get(`photos?idUser=${userid}`)
    }
return {
    postLike,
    postDislike,
    postSuperlike,
    postGoback,
}
}

export default useActions