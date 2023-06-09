<script setup lang="ts">
import { ref } from 'vue'
import { useActivities } from '@/services';
import { IconLike } from '@/components';
import type { UserComplet, Activity } from '@/types';

interface Emits {
    (e: 'refresh'): void
}
const emits = defineEmits<Emits>();

const selectedTag = ref<number>(0)

const props = defineProps({
    user : {
        type : Object as () => UserComplet,
        required : true
    },
    userTags : {
        type : Object as () => Activity[],
        required : true
    },
    tagCategory : {
        type : Object as () => any,
        required : true
    }
})

const { addTagToUser, verifyActivity, getActivitiesByType } = useActivities()

const submit = () => {
    if (getActivitiesByType(props.tagCategory, props.userTags).length < 5) {
        addTagToUser(props.user.id, selectedTag.value)
        emits('refresh')
    }
}

</script>

<template>
  <div>
    <div class="flex w-1/2 m-auto items-center">
        <select v-model="selectedTag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="tag in tagCategory.activities" :disabled="verifyActivity(tag, userTags)" v-bind:value="tag.id"> {{ tag.name ?? `tag n°${tag.id}` }}</option>
        </select>
        <div class="close-button-modal ml-1">
            <IconLike @click="submit()" />
        </div>
    </div>
  </div>
</template>