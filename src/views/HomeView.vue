<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import MessageComponent from '../components/messages/MessageComponent.vue'
import { AppLayout, LikesMenu, ConversationsMenu } from '@/components';
import { useAuth } from '@/services'
import { useRouter } from 'vue-router'
import store from '@/components/messages/store';
import { onMounted, ref } from 'vue';

const {user} = await useAuth();

var logedIn = false
if (user?.value) {
  logedIn=true
}
if (!logedIn) {
  const router = useRouter()
  router.push({ name: 'login' })
}

const tabs = [
  {
    name: 'Likes',
    label: 'Likes',
    component: LikesMenu,
    props: {    }
  },
  {
    name: 'Messages',
    label: 'Messages',
    component: ConversationsMenu,
    props: {    }
  }
]

const showWelcome = ref(store.state.showWelcome);
const refreshData = () => {
    showWelcome.value = store.state.showWelcome
};

onMounted(() => {
    setInterval(refreshData, 500);
});

</script>

<template>
    <AppLayout :tabs="tabs" :profile="false" >

      <TheWelcome v-if="showWelcome"></TheWelcome>
      <MessageComponent v-else></MessageComponent>

    </AppLayout>
</template>