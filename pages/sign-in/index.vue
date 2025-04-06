<template>
  <div class="flex min-h-svh flex-col items-center justify-center p-6 md:ps-10 bg-gray-50 dark:bg-slate-900">
    <div class="flex lg:max-w-3xl max-w-md rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border-2 dark:border-primary-600">
      <div class="bg-primary-50/70 dark:bg-slate-800 px-8 pb-10 pt-12 flex-1 w-[500px] min-h-[480px]">
        <UForm 
          class="flex flex-col gap-3"
          :schema="formLoginSchema"
          :state="loginForm"
          @submit="onSubmitLoginForm"  
        >
          <div class="text-center pb-6">
            <h1 class="font-bold text-2xl text-gray-800 dark:text-white">Welcome back</h1>
            <h3 class="font-medium text-md text-gray-600 dark:text-primary-200">Login to your <span class="text-primary-500">Chummy</span> account</h3>
          </div>
          <UFormField
            label="Email"
            name="email"
          >
            <UInput
              class="w-full focus:ring-2 focus:ring-primary-500/50"
              size="lg"
              v-model="loginForm.email"
            />
          </UFormField>
          <UFormField
            label="Password"
            name="password"
          >
            <UInput
              class="w-full focus:ring-2 focus:ring-primary-500/50"
              size="lg"
              v-model="loginForm.password"
              type="password"
            />
          </UFormField>
          <UButton
            class="flex items-center justify-center bg-primary-600 text-white rounded-md py-2 text-sm font-semibold dark:text-white active:bg-primary-800 dark:bg-primary-500"
            type="submit"
          >
            Login
          </UButton>
        </UForm>
        <!-- <div class="relative flex py-5 items-center">
            <div class="flex-grow border-t border-gray-400/50"></div>
            <span class="flex-shrink mx-3 mb-1 text-gray-400 text-sm">Or continue with</span>
            <div class="flex-grow border-t border-gray-400/50"></div>
        </div> -->
        <div class="pt-6 text-center">
          <p class="text-gray-800 dark:text-white">Don't have an account? <ULink class="text-primary-500 hover:text-primary-600 dark:text-secondary-400 hover:underline dark:hover:text-secondary-500" to="/sign-up">Sign up</ULink></p>
        </div>
      </div>
      <div class="lg:block lg:w-1/2 lg:flex-shrink-0 hidden">
        <img 
          src="https://images.pexels.com/photos/16858626/pexels-photo-16858626/free-photo-of-leaf-of-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Fern Leaf"
          class="w-full h-full object-cover aspect-square md:max-w-md lg:max-w-md xl:max-w-md"
        >
      </div>
    </div>
    <div class="pt-2">
      <p class="text-gray-500 text-sm">By clicking continue, you agree to our <ULink to="#" class="dark:text-gray-400 underline">Terms of Service</ULink> and <ULink to="#" class="dark:text-gray-400 underline">Privacy Policy</ULink>.</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { FormLogin } from '~/types/form'
import type { FormSubmitEvent } from '@nuxt/ui'
import { formLoginSchema } from '~/types/form'

definePageMeta({
  middleware: ['guest']
})

const toast = useToast()
const authStore = useAuthStore()

const loginForm = reactive<FormLogin>({
  email: '',
  password: ''
})

const onSubmitLoginForm = async (_: FormSubmitEvent<FormLogin>) => {
  const formData = {
    email: loginForm.email,
    password: loginForm.password
  }
  const { error } = await authStore.post(formData)

  if (!loginForm.email || !loginForm.password) {
    toast.add({ 
      title: 'Invalid Login',
      description: 'Missing credentials.',
      color: 'error'
    })
    return
  }

  if (error) {
    toast.add({ 
      title: 'Account does not exist',
      description: 'Invalid credentials',
      color: 'error'
    })
  } else {
    await navigateTo('/home')
  }
}

</script>
