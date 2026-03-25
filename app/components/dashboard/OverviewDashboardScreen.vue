<template>
  <div class="p-6 space-y-6">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
            <UIcon name="i-lucide-dollar-sign" class="h-4 w-4 text-gray-400" />
          </div>
        </template>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          +20.1% from last month
        </p>
      </UCard>
      
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Subscriptions</h3>
            <UIcon name="i-lucide-users" class="h-4 w-4 text-gray-400" />
          </div>
        </template>
        <div class="text-2xl font-bold">+2350</div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          +180.1% from last month
        </p>
      </UCard>
      
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Sales</h3>
            <UIcon name="i-lucide-credit-card" class="h-4 w-4 text-gray-400" />
          </div>
        </template>
        <div class="text-2xl font-bold">+12,234</div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          +19% from last month
        </p>
      </UCard>
      
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Now</h3>
            <UIcon name="i-lucide-activity" class="h-4 w-4 text-gray-400" />
          </div>
        </template>
        <div class="text-2xl font-bold">+573</div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          +201 since last hour
        </p>
      </UCard>
    </div>
  </div>
</template>
