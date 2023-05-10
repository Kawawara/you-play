import { useToast } from "vue-toastification"
import { useAxios } from '@/services'
import { ref } from "vue"

const toast = useToast()
const { Axios } = useAxios()

enum Actions {LIKE = "like",DISLIKE = "dislike",GOBACK = "goback"}
type LastAction = {
    action: Actions,
    id: Number
}

const lastAction = ref<LastAction>()

const useActions =  async() =>
{
    const postLike = async(userid: Number, likedId :Number) => {
        const data = {
            idUserWhoLiked   : userid,
            idUserWhoBeLiked : likedId
        }
        const response = await Axios.post(`likes/`, data)
        if (response.status == 200) {
            const res = response.data.data
            if (res.length > 1 && Array.isArray(res)) {
                toast.success("Nouveau match")
            }
            // TODO display next user
            saveLastAction(Actions.LIKE, likedId)
        } else {
            toast.error("Une erreur c'est produite")
        }
    }
    const postDislike = async(userid: Number, dislikedId :Number) => {
        const data = {
            idWhoDisliked   : userid,
            idWhoBeDisliked : dislikedId
        }
        const response = await Axios.post(`dislikes/`, data)
        console.log(response)
        if (response.status == 200) {
            saveLastAction(Actions.DISLIKE, dislikedId)
            // TODO display next user
        } else {
            toast.error("Une erreur c'est produite")
        }
    }
    const postSuperlike = async(userid: Number, likedId :Number) => {
        const data = {
            idUserWhoLiked   : userid,
            idUserWhoBeLiked : likedId
        }
        const response = await Axios.post(`superLikes/`, data)
        console.log(response)
        if (response.status == 200) {
            toast.success("Nouveau match")
            // TODO display next user
        } else {
            toast.error("Une erreur c'est produite")
        }
    }
    
    const goback = async(userid: Number, likedId :Number) => {
        if (lastAction.value?.action === "goback" || lastAction.value === undefined) {
            toast.error("Aucun profils avant")
        } else {
            // TODO call remove like/dislike
            // TODO retrieve last user datas and dispaly them
        }
        saveLastAction(Actions.GOBACK, likedId)

    }
    const removeLike = async(userid :Number, likedId :Number) => {
        // TODO delete the like with both ids
    }
    const removeDislike = async(userId :Number, dislikedId :Number) => {
        // TODO remove the dislike for both users
    }
    const saveLastAction = (action :Actions, likedId :Number) => {
        lastAction.value = {
            action,
            id: likedId
        }
    }

    return {
        postLike,
        postDislike,
        postSuperlike,
        goback,

        lastAction
    }
}

export default useActions