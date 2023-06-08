import { useToast } from "vue-toastification"
import { useAxios, useSearch } from '@/services'
import { ref } from "vue"
import type { Picture, UserComplet } from "@/types"
import { MatchOverlay } from "@/components"
import { renderOverlay } from '@overlays/vue'

const toast = useToast()
const { Axios } = useAxios()
const { getUsers } = await useSearch();

enum Actions {LIKE = "like",DISLIKE = "dislike",GOBACK = "goback", SUPERLIKE = "superlike"}
type LastAction = {
    action: Actions,
    id: Number
}

const lastAction = ref<LastAction>()
const users = ref<UserComplet[]>()
const lastUser = ref<UserComplet>()

const useActions =  async() =>
{
    const postLike = async(userid: Number, likedId :Number, likedUser :UserComplet, profilePic :Picture) => {
        const data = {
            idUserWhoLiked   : userid,
            idUserWhoBeLiked : likedId
        }
        const response = await Axios.post(`likes/`, data)
        if (response.status == 200) {
            const res = response.data.data
            if (res.length > 1 && Array.isArray(res)) {
                saveLastAction(Actions.LIKE, res[0].id)
            }
            saveLastAction(Actions.LIKE, res.id)
            checkMatch(res, likedUser, profilePic)
            nextUser()
            initService(userid)
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
            initService(userid)
        } else {
            toast.error("Une erreur c'est produite")
        }
    }
    const postSuperlike = async(userid: Number, likedId :Number, likedUser :UserComplet, profilePic :Picture) => {
        const data = {
            idUserWhoLiked   : userid,
            idUserWhoBeLiked : likedId
        }
        const response = await Axios.post(`superLikes/`, data)
        if (response.status == 200) {
            saveLastAction(Actions.SUPERLIKE, response.data.data.id)
            checkMatch(response.data.data, likedUser, profilePic)
            nextUser()
            initService(userid)
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
        lastUser.value = users.value.shift()
    }
    const previousUser = () => {
        if (lastUser.value != undefined) {
            users.value.unshift(lastUser.value)
            lastUser.value = undefined
        }
    }
    const checkMatch = async(data :any, likedUser :UserComplet, profilePic :Picture) => {
        let match = false
        if (Array.isArray(data)) {
            data.forEach((element: any)  => {
                if (element.hasOwnProperty('idUser2') ) {
                    match = true
                }
            });
        }
        if (match || lastAction.value?.action == Actions.SUPERLIKE) {
            toast.success("Nouveau match")
            renderOverlay(MatchOverlay, {
                title: 'Nouveau match',
                visible: true,
                data: data,
                likedUser,
                profilePic
            }).then(() => {
                console.log("redirect to message")
                // TODO redirect to chat
            }).catch((err) => {
                // do nothing, continu browsing
            })
        }
    }
    const initService = async(id: Number) => {
        if (users.value == undefined || users.value.length == 0) {
                users.value = await getUsers(id)
        }
    }

    return {
        postLike,
        postDislike,
        postSuperlike,
        goback,
        initService,

        users
    }
}

export default useActions