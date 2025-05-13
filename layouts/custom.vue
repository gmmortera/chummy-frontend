<template>
  <div class="flex min-h-screen">
    <aside class="flex flex-col justify-between sticky top-0 h-screen">
      <div class="flex flex-col gap-5">
        <header>
          <!-- LOGO -->
            CHUMMY
        </header>
        <nav>
          <UNavigationMenu
            class="w-full data-[orientation=vertical]:w-48 text-9xl"
            orientation="vertical"
            highlight
            :items="navItems"
          />
        </nav>
      </div>
      <UDropdownMenu
        arrow
        size="xl"
        :items="menuItems"
        :content="{
          align: 'center',
          side: 'top',
          sideOffset: 10
        }"
        :ui="{
          content: 'w-44'
        }"
      >
        <UButton 
          class="w-full py-3"
          size="xl"
          :avatar="{
            src: 'https://github.com/benjamincanac.png'
          }"
        >
          Profile
        </UButton>
      </UDropdownMenu>
    </aside>
    <div class="flex-1">
      <header></header>
      <slot />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Tabs } from '~/types/navigation'
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

const navItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: `/${Tabs.Home}`
    },
    {
      label: 'Notifications',
      icon: 'i-heroicons-bell',
      to: `/${Tabs.Notifications}`
    }
  ]
])

const menuItems = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Log Out',
    icon: 'i-lucide-power'
  }
])
</script>
