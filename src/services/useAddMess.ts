import { useAxios } from '@/services'
import { useToast } from "vue-toastification"

const addMess = async (content: string, idConversation: number, idUser: number) => {
    const { Axios } = useAxios()
    const toast = useToast()

    const response = await Axios.post('/messages', {
      content: content,
      idConversation: idConversation,
      idUser: idUser
    })
  
    if (response.status !== 200){
      return toast.error('Failed to create new message')
    }
    return toast.success('New message created')
}

export default addMess