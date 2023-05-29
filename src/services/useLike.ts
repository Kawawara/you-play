import { useAxios } from '@/services'
import type { Like } from '@/types'

const getLikes = async(userid: Number) => {
    const { Axios } = useAxios()
    const response = await Axios.get(`likes?idUserWhoBeLiked=${userid}`)
    return response.data.data as [Like]
}

export default getLikes