<script setup lang="ts">
  import { LoginPage, SignInPage } from '@/components';
  import { MultiTabs } from '@/components';


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