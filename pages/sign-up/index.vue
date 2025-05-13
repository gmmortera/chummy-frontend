<template>
  <div class="flex min-h-svh flex-col items-center justify-center p-6 md:ps-10">
    <div class="flex lg:max-w-3xl max-w-md rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border-2 dark:border-primary-600">
      <div class="lg:block lg:w-1/2 lg:flex-shrink-0 hidden">
        <img 
          src="https://images.pexels.com/photos/16858626/pexels-photo-16858626/free-photo-of-leaf-of-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Fern Leaf"
          class="w-full h-full object-cover aspect-square md:max-w-md lg:max-w-md xl:max-w-md"
        >
      </div>
      <div class="bg-primary-50/70 dark:bg-slate-800 px-8 pb-10 pt-12 flex-1 w-[500px] min-h-[480px]">
        <LazyUForm 
          class="flex flex-col gap-3"
          :schema="formRegisterSchema"
          :state="formRegister"
          @submit="onSubmitFormRegister"  
        >
          <div class="text-center pb-6">
            <h1 class="font-bold text-2xl text-gray-800 dark:text-white">Welcome to Chummy</h1>
            <h3 class="font-medium text-md text-gray-600 dark:text-primary-200">Create your <span class="text-primary-500">Chummy</span> account</h3>
          </div>
          <LazyUFormField
            label="Username"
            name="username"
          >
            <LazyUInput
              class="w-full focus:ring-2 focus:ring-primary-500/50"
              size="lg"
              v-model="formRegister.username"
            />
          </LazyUFormField>
          <LazyUFormField
            label="Email"
            name="email"
          >
            <LazyUInput
              class="w-full focus:ring-2 focus:ring-primary-500/50"
              size="lg"
              v-model="formRegister.email"
            />
          </LazyUFormField>
          <LazyUFormField
            label="Password"
            name="password"
          >
            <LazyUInput
              class="w-full focus:ring-2 focus:ring-primary-500/50"
              size="lg"
              v-model="formRegister.password"
              type="password"
            />
          </LazyUFormField>
          <LazyUButton
            class="flex items-center justify-center bg-primary-600 text-white rounded-md py-2 text-sm font-semibold dark:text-white active:bg-primary-800 dark:bg-primary-500"
            type="submit"
          >
            Sign Up
          </LazyUButton>
        </LazyUForm>
        <div class="pt-6 text-center">
          <p class="text-gray-800 dark:text-white">Already have an account? <LazyULink class="text-primary-500 hover:text-primary-600 dark:text-secondary-400 hover:underline dark:hover:text-secondary-500" to="/sign-in">Sign in</LazyULink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { FormRegister } from '~/types/form'
import type { FormSubmitEvent } from '@nuxt/ui'
import { formRegisterSchema } from '~/types/form'

definePageMeta({
  middleware: ['guest']
})

const toast = useToast()
const userStore = useUserStore()

const formRegister = ref<FormRegister>({
  username: '',
  email: '',
  password: ''
})

const onSubmitFormRegister = async (_: FormSubmitEvent<FormRegister>) => {
  const formData = {
    username: formRegister.value.username,
    email: formRegister.value.email,
    password: formRegister.value.password
  }
  const { error } = await userStore.post(formData)

  if (!formRegister.value.username ||
      !formRegister.value.email ||
      !formRegister.value.password) {
    toast.add({ 
      title: 'Invalid registration',
      description: 'Missing credentials.',
      color: 'error'
    })
    return
  }

  if (error) {
    toast.add({ 
      title: 'Account already exist',
      description: 'Invalid email',
      color: 'error'
    })
  } else {
    toast.add({ 
      title: 'Registration successful',
      description: 'Account created.',
      color: 'success'
    })
    await navigateTo('/sign-in')
  }
}

</script>
