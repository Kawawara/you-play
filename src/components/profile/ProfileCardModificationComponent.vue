<script setup lang="ts">
import type { UserComplet } from '@/types';
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import type { InputField } from '@/types';
import { VeeField } from '@/components'

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
                    betedg
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Sports</span>
                </label>
                <div class="rounded-md shadow-sm bg-slate-50 text-black"></div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Musique</span>
                </label>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags films</span>
                </label>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text">Tags Langues</span>
                </label>
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