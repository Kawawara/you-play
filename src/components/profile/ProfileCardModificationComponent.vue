<script setup lang="ts">
import { Activity, type UserComplet } from '@/types';
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import type { InputField } from '@/types';
import { VeeField } from '@/components'
import { useActivities } from '@/services';

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

const { getActivitiesByType, getActivities, verifyActivity } = useActivities()

const userTags :Activity[] = [{id: 1, type:1, name:undefined}]
const testList :Activity[] = await getActivities()

const tags_offline_video_games = getActivitiesByType(ActitiesType.OFFLINEGAME, testList)
const tags_movies_type = getActivitiesByType(ActitiesType.MOVIETYPE, testList)
const tags_video_games = getActivitiesByType(ActitiesType.ONLINEGAME, testList)
const tags_sports = getActivitiesByType(ActitiesType.SPORTS, testList)
const tags_activities = getActivitiesByType(ActitiesType.ACTIVITY, testList)
const tags_night_activities = getActivitiesByType(ActitiesType.NIGHTACTIVITY, testList)

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
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Jeux vidéos</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black">
                    <select>
                        <option v-for="tag in tags_video_games" :disabled="verifyActivity(tag, userTags)" :value="tag.id"> TEST {{ tag.id }}{{ tag.name }}</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Sports</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black">
                    <select>
                        <option v-for="tag in tags_sports" :disabled="verifyActivity(tag, userTags)" :value="tag.id"> TEST {{ tag.id }}{{ tag.name }}</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Jeux vidéos offline</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black">
                    <select>
                        <option v-for="tag in tags_offline_video_games" :disabled="verifyActivity(tag, userTags)" :value="tag.id"> TEST {{ tag.id }}{{ tag.name }}</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Genres de films</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black">
                    <select>
                        <option v-for="tag in tags_movies_type" :disabled="verifyActivity(tag, userTags)" :value="tag.id"> TEST {{ tag.id }}{{ tag.name }}</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Sorties</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black">
                    <select>
                        <option v-for="tag in tags_activities" :disabled="verifyActivity(tag, userTags)" :value="tag.id"> TEST {{ tag.id }}{{ tag.name }}</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Sorties nocturnes</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black">
                    <select>
                        <option v-for="tag in tags_night_activities" :disabled="verifyActivity(tag, userTags)" :value="tag.id"> TEST {{ tag.id }}{{ tag.name }}</option>
                    </select>
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