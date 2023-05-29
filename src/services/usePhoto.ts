import { useAxios } from '@/services'
import type { Photo } from '@/types'

const getPhotos = async(userid: Number) => {
    const { Axios } = useAxios()
    const response = await Axios.get(`photos?idUser=${userid}`)
    return response.data.data as [Photo]
}

export default getPhotos