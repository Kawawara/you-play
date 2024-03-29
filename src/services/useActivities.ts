import { useAxios } from '@/services'
import type { Activity } from '@/types'
import { useToast } from 'vue-toastification'

const { Axios } = useAxios()
const toast = useToast()

const useActivities = () => {
    
    const x = "x"

    const getActivities = async(type :Number|null = null) => {
        if(type == null) {
            const response = await Axios.get(`/activities`)
            if (response.status !== 200){
                toast.warning('Une erreur c\'est produite lors de la récupération des tags')
            } else {
                const retArray = response?.data?.data.map((tag: { id: number; type: number; name?: string }) => ({
                    id: tag.id,
                    type: tag.type,
                    name: tag.name
                }));
                return retArray ?? [] as Activity[]
            }        
        } else {
            const response = await Axios.get(`/activities?type=${type}`)
            if (response.status !== 200){
                toast.warning('Une erreur c\'est produite lors de la récupération des tags')
            } else {
                const retArray = response?.data?.data.map((tag: { id: number; type: number; name?: string }) => ({
                    id: tag.id,
                    type: tag.type,
                    name: tag.name
                }));
                return retArray ?? [] as Activity[]
            }        
        }
        return [] as Activity[]
    }
    const getActivitiesByType = (type :Number, activities:Activity[]) => {
        const activitiesReturn = activities?.filter(activity => activity.type == type) ?? []
        return activitiesReturn
    }

    const verifyActivity = (activitie1:Activity, activitiesList:Activity[]) => {
        if (activitiesList?.length != undefined) {
            if (activitiesList.length > 0) {
                const sameActivity = activitiesList.some( x => x.id == activitie1.id)
                //activitie1.id == activitiesList.id
                if (sameActivity) {
                    return true
                } else {
                    return false
                }
            }
        }
        return false
    }

    const removeTagFromUser = async(userId: Number, tagId:number) => {
        const response = await Axios.delete(`/usersActivities/1?idUser=${userId}&idActivity=${tagId}`)
    }
    
    const addTagToUser = async(userId: Number, tagId:number) => {
        const data = {
            idUser: userId,
            idActivity: tagId
        }
        const response = await Axios.post('/usersActivities', data)
        
    }


    return {
        getActivities,
        getActivitiesByType,
        verifyActivity,
        removeTagFromUser,
        addTagToUser
    }
}

export default useActivities
