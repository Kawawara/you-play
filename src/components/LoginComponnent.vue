<script setup lang="ts">
  import { useAuth } from '@/services'
  import { LoginPage, SignInPage } from '@/components';
  import { MultiTabs } from '@/components';
  import { useRouter } from 'vue-router'


  const {user, logout} = await useAuth();

  var logedIn = false
  if (user?.value) {
    logedIn=true
  }
  if (logedIn) {
  const router = useRouter()
  router.push({ name: 'home' })
  }
  
  const tabs = [
  {
    name: 'Login',
    label: 'Login',
    component: LoginPage,
    props: {    }
  },
  {
    name: 'Register',
    label: 'Register',
    component: SignInPage,
    props: {    }
  }
]

</script>

<template>
  <div id="login-container">
    <MultiTabs :tabs="tabs"/>
  </div>
</template>

<style>
#login-container{
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>