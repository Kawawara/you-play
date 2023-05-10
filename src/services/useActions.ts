import { useToast } from "vue-toastification"
import { useAxios, useSearch } from '@/services'
import { ref } from "vue"
import type { UserComplet } from "@/types"

const toast = useToast()
const { Axios } = useAxios()
const { getUsers } = await useSearch();

enum Actions {LIKE = "like",DISLIKE = "dislike",GOBACK = "goback", SUPERLIKE = "superlike"}
type LastAction = {
    action: Actions,
    id: Number
}

const lastAction = ref<LastAction>()
const users = ref(await getUsers())
const lastUser = ref<UserComplet>()

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
                saveLastAction(Actions.LIKE, res[0].id)
            }
            saveLastAction(Actions.LIKE, res.id)
            nextUser()
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
        if (response.status == 200) {
            saveLastAction(Actions.DISLIKE, response.data.data.id)
            nextUser()
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
        if (response.status == 200) {
            toast.success("Nouveau match")
            nextUser()
        } else {
            toast.error("Une erreur c'est produite")
        }
    }
    const goback = async(userid :Number, id :Number) => {
        if (lastAction.value?.action === "goback" || lastAction.value?.action === "superlike" || lastAction.value === undefined) {
            toast.error("Aucun profil n'a pu être retrouvé")
        } else {
            if (lastAction.value.action === "like") {
                removeLike(lastAction.value.id)
            } else if (lastAction.value.action === "dislike") {
                removeDislike(lastAction.value.id)
            }
            previousUser()
        }
        saveLastAction(Actions.GOBACK, id)
    }

    const removeLike = async(id :Number) => {
        const response = await Axios.delete(`likes/${id}`)
        if (response.status !== 200) {
            toast.error("Une erreur c'est produite")
        }
    }
    const removeDislike = async(id :Number) => {
        const response = await Axios.delete(`dislikes/${id}`)
        if (response.status !== 200)  {
            toast.error("Une erreur c'est produite")
        }
    }
    const saveLastAction = (action :Actions, id :Number) => {
        lastAction.value = {
            action,
            id
        }
    }
    const nextUser = () => {
        // pop the user of the list of users we have in SearchComponent
        lastUser.value = users.value.shift()
    }
    const previousUser = () => {
        if (lastUser.value != undefined) {
            users.value.unshift(lastUser.value)
            lastUser.value = undefined
        }
    }

    return {
        postLike,
        postDislike,
        postSuperlike,
        goback,

        users
    }
}

export default useActions