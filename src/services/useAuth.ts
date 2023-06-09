import { ref } from "vue"
import type { User, UserComplet } from '@/types'
import { useAxios, useJWT } from '@/services'
import { useToast } from "vue-toastification"

const user = ref<UserComplet | any>()
const toast = useToast()

const useAuth = async () => {
  
  const { Axios } = useAxios()
  const { jwt, payload } = useJWT()
  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

  const putUser = async (id: number, values: User) => {
    if(values){
      const response = await Axios.put(`users/${id}/`, {
        username: values.username,
        email: values.email,
      })
      user.value = { ...user.value, ...values }
      toast.success('Data updated !')

      if (response.status !== 200 || !response) {
        toast.error('Update failed...')
        return false
      }
    }
  }

  const setUser = async () => {
    if(payload.value?.id != undefined){
      try {
        const response = await Axios.get(`users/${payload.value?.id}/`)
        
        if (response.status !== 200) throw new Error(`Error while fetching user with id: ${payload.value?.id}`)
        const data = response.data.data
        const userData = data[0]
        const pictures = data[1]
        const tags = data[2]

        userData["activities"] = tags
        userData["pictures"] = pictures

        const fetchedUser: UserComplet = userData as UserComplet
        console.log(fetchedUser)
        user.value = fetchedUser
        return true
      } catch(e) {
        console.error(e)
        jwt.value = ''
        return false
      }
    }
    return false
  }

  // Initialisation
  await setUser()

  // Login et set du token dans le local storage
  const login: (data: any) => Promise<boolean> = async (data) => {
    try{
      const response = await Axios.post('/login', data)
      
      if (response.status !== 200){
        toast.warning('Your email or password is incorrect')
        return false 
      }
      const token = response.data.data.token
      jwt.value = token
      payload.value = response.data.data

      if (token) toast.success('Successful connection')

      return await setUser()
    } catch(e) {
      toast.error('Your email or password is incorrect CATCH')
      return false
    }
  }

  const logout = async () => {
    jwt.value = ''
    user.value =""
    toast.info('You have logged out.')
    await sleep(1000)
    location.reload()
  }


  // Register user
  const register = async (data: any) => {
    const response = await Axios.post('/register', data)
    if (response.status !== 200){
      return toast.error('Your registration failed')
    }
    const token = response.data.data.token
    jwt.value = token
    payload.value = response.data.data

    if (token) toast.success('Successful connection')

    await setUser()
    return toast.success('Your registration is done, log in!')
  }

  
  const deleteUser = async (id: number) => {
    const response = await Axios.delete(`users/${id}/`)
    if (response.status !== 200){
      return toast.info('User has not been deleted')
    }
    return toast.success('User has been deleted')
  }

  const updateUserData = async () => {
    console.log(user)
    const response = await Axios.get(`users/${user.value?.id}/`)
        
    if (response.status !== 200) throw new Error(`Error while fetching user with id: ${user.value?.id}`)
    const data = response.data.data
    const userData = data[0]
    const pictures = data[1]
    const tags = data[2]

    userData["activities"] = tags
    userData["pictures"] = pictures

    const fetchedUser: UserComplet = userData as UserComplet
    console.log(fetchedUser)
    user.value = fetchedUser
  }


  return {
    user,
    jwt,
    payload,

    login,
    logout,
    setUser,
    register,
    putUser,
    deleteUser,
    updateUserData
  }
}

export default useAuth