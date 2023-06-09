<script setup lang="ts">
import { AppLayout, ParametresMenu, ProfileCard, PromotionsMenu, Spinner } from '@/components';
import { useAuth, useSearch } from '@/services'
import type { UserComplet } from '@/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const { user } = await useAuth();
const { getUser } = await useSearch()

var logedIn = false
if (user?.value) {
  logedIn = true
}
if (!logedIn) {
  const router = useRouter()
  router.push({ name: 'login' })
}

const tabs = [
  {
    name: 'Promotions',
    label: 'Promotions',
    component: PromotionsMenu,
    props: {}
  },
  {
    name: 'Paramètres',
    label: 'Paramètres',
    component: ParametresMenu,
    props: {}
  }
]

// const User = ref<UserComplet>(await getUser(user.value.id))
// const userId = ref<Number>(User.value.id)

// const updateUser = async() => {
//   console.log("UPDATED")
//   User.value = await getUser(userId.value)
// }
const User = ref<{
  data: UserComplet | null;
  status: 'loading' | 'error' | 'success'
}>({
  data: null,
  status: 'loading'
})

type MutateOverload = {
  (status: 'loading' | 'error'): void
  (status: 'success', user: UserComplet): void
}

const mutate: MutateOverload = (status: 'loading' | 'error' | 'success', user?: UserComplet) => {
  User.value = {
    data: user || null,
    status: status
  }
}

const fetchUser = async () => {
  mutate('loading')
  const { user } = await useAuth()
  if (user.value) {
    user.value = await getUser(user.value.id)
    mutate('success', user.value)
  } else {
    mutate('error')
  }
  console.log(user.value)
}
await fetchUser()

const detailView = ref(false)
const profileModification = ref(false)
function updateUserModificationBoolean() {
  profileModification.value = !profileModification.value
  // TODO sync with back-end when profile modification is done ?
}
function updateDetailView() {
  detailView.value = !detailView.value
  // TODO sync with back-end when profile modification is done ?
}



</script>

<template>
  <AppLayout :tabs="tabs" :profile="true">
    <ProfileCard v-if="User.status === 'success'&& User.data" :user="User.data" :other-user="User.data" :profileModification="profileModification" :detailView="detailView" @update="fetchUser" @modif="updateUserModificationBoolean" @detail="updateDetailView"/>
    <div v-else-if="User.status === 'loading'">
      <div class="flex justify-center items-center">
        <Spinner />
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center">
        <p class="text-2xl text-gray-500">Aucun utilisateur trouvé</p>
      </div>
    </div>
  </AppLayout>
</template>
