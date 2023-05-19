import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
      const messageInput = ref<HTMLInputElement>()
  
      const submit = () => {
      const message = messageInput.value?.value
      }
  
      return {
        messageInput,
        submit,
      }
    },
})