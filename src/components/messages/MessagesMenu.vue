<script setup lang="ts">
import { useAuth } from '@/services';

const {user} = await useAuth();

console.log(user)
</script>

<template>
    <p>Messages</p>
    <p>{{user.username}}</p>

        <slot></slot>
</template>