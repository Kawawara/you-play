<script setup lang="ts">
import type { Activity,  UserComplet, InputField } from '@/types';
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import { VeeField, IconDislike, TagFormComponnent } from '@/components'
import { useActivities } from '@/services';
import { ref } from 'vue';

enum ActitiesType {
    NIGHTACTIVITY = 6, 
    ACTIVITY = 5,
    OFFLINEGAME = 4, 
    ONLINEGAME = 3,
    SPORTS = 2,
    MOVIETYPE = 1
}

const props = defineProps({
    user : {
        type : Object as () => UserComplet,
        required : true
    }
})

interface Emits {
    (e: 'updateuser'): void
}
const emits = defineEmits<Emits>();


const { getActivitiesByType, getActivities, verifyActivity, removeTagFromUser } = useActivities()

const userTags :Activity[] = props.user.activities
const testList = ref<Activity[]>(await getActivities())
    console.log(props.user)

const tags: string | any[] = []
tags[ActitiesType.MOVIETYPE] = {type: ActitiesType.MOVIETYPE , name:"Genres de films", activities: getActivitiesByType(ActitiesType.MOVIETYPE, testList.value)}
tags[ActitiesType.OFFLINEGAME] = {type: ActitiesType.OFFLINEGAME , name:"Jeux vidéos offline", activities: getActivitiesByType(ActitiesType.OFFLINEGAME, testList.value)}
tags[ActitiesType.ONLINEGAME] = {type: ActitiesType.ONLINEGAME , name:"Jeux vidéos", activities: getActivitiesByType(ActitiesType.ONLINEGAME, testList.value)}
tags[ActitiesType.SPORTS] = {type: ActitiesType.SPORTS , name:"Sports", activities: getActivitiesByType(ActitiesType.SPORTS, testList.value)}
tags[ActitiesType.ACTIVITY] = {type: ActitiesType.ACTIVITY , name:"Sorties", activities: getActivitiesByType(ActitiesType.ACTIVITY, testList.value)}
tags[ActitiesType.NIGHTACTIVITY] = {type: ActitiesType.NIGHTACTIVITY , name:"Sorties nocturnes", activities: getActivitiesByType(ActitiesType.NIGHTACTIVITY, testList.value)}
tags.shift()

const fields: InputField[] = [
    {
        label: 'Ville',
        name: 'city',
        type: 'text',
        required: true,
        placeholder: "Votre ville",
    }
]

const initialValues = {
    city: props.user.city,
}

const schema = object().shape({
    city: string().required('Veuillez renseigner une ville.'),
    description: string().required('Veuillez renseigner quelques mots sur vous.')
})

const verifyAll = (x :Activity, i: any) => {
    const isSameType = i.type == x.type
    const isSameActivity = verifyActivity(x, getActivitiesByType(i.type, userTags))
    if (isSameType && isSameActivity) {
        return true
    }
    return false
}

const refreshDatas = async () => {
    // console.log("refresh")
    // await updateUserData()
}

</script>

<template>
        <Form 
        :validation-schema="schema"
        :initial-values="initialValues"
        >
        <div class="-space-y-px rounded-md shadow-sm modification-profile">
            <VeeField v-for="field in fields" :key="field.name" :field="field"/>

            <label class="label">
                <span class="label-text">Déscription</span>
            </label>
            <textarea id="description" class=" rounded-md shadow-sm w-full mt-2 description-field p-2 input" placeholder="Donnez quelques mots sur vous" :value="props.user.description"></textarea>
        </div>
        <div class="-space-y-px rounded-md shadow-sm modification-profile">
            <div class="flex flex-col" 
            v-for="i in tags">
                <label class="label">
                    <span class="label-text">Tags {{ i.name }}</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black p-1">
                    <div class="flex flex-wrap">
                        <div class="rounded-md shadow-sm bg-black/50 p-1 w-fit mx-1 flex  m-2"
                        v-for="tag in userTags?.filter(x => verifyAll(x, i))">
                            <div class="flex justify-between align-middle ">
                                <span>{{ tag.name ?? `tag n°${tag.id}` }}</span>
                                <div class="close-button-modal ml-1">
                                    <IconDislike @click="async() => {await removeTagFromUser(props.user.id, tag.id);$emit('updateuser')}" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <TagFormComponnent v-model:user="props.user" :tag-category="i" :user-tags="userTags" @updateuser="$emit('updateuser')"/>
                    
                </div>
            </div>
        </div>
        </Form>
</template>

<style>
.modification-profile, .label-text {
    color: azure;
}
.input {
    color: black;
}
.description-field {
    height: 200px;
}
</style>