
import { useAxios } from '@/services'
import type { UserComplet, Picture } from '@/types'
const { Axios } = useAxios()

const useSearch =  async() =>
{
    const getUsers = async(id :Number) => {
        if(id) {
            const response = await Axios.get(`simpleSearch?idUser=${id}`)
            var users: [UserComplet] = [{
                id: 1,
                username: "a",
                email:"a",
                name: "a",
                lastName: "a", 
                gender: "a", 
                city :"a", 
                age: 21,
                description: "a",
                activities: [{id:1, type:2}],
                pictures: [{id:1, fileName:"a", position:1}]
            }]
            if (response.data.data.length() <= 1) {
                users.shift()
            }
            response.data.data.forEach((element: any) => {
                const userComplet = element[0]
                console.log(element[1])
                userComplet["activities"] = element[1]
                users.push(userComplet as UserComplet)
            });
            return users as [UserComplet]
        } else {
            return [{
                id: 1,
                username: "a",
                email:"a",
                name: "a",
                lastName: "a", 
                gender: "a", 
                city :"a", 
                age: 21,
                description: "a",
                activities: [{id:1, type:2}],
                pictures: [{id:1, fileName:"a", position:1}]
            }] as [UserComplet]
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