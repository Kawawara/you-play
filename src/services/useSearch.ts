
import { useAxios } from '@/services'

const getUsers = async() => {
    const { Axios } = useAxios()

    const response = await Axios.get(`users/`)
    // console.log(response)
    return response.data.data.data
}

export default getUsers