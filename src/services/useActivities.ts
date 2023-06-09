import { useAxios } from '@/services'
import type { Activity } from '@/types'

const { Axios } = useAxios()

const useActivities = () => {
    
    const x = "x"

    const getActivities = async(type :Number|null = null) => {
        if(type) {
            const response = await Axios.get(`/api/activities`)
            return response.data.data as [Activity]
        }
    }
    const getActivitiesByType = (type :Number, activities:Activity[]) => {
        return activities.filter(activity => {activity.type == type})
    }

    return {
        getActivities,
        getActivitiesByType
    }
}

export default useActivities
