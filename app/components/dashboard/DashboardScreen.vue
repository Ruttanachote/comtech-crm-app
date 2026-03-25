<script setup lang="ts">
import { ref } from 'vue'
import OverviewDashboardScreen from './OverviewDashboardScreen.vue'
import HCPDashboardScreen from './HCPDashboardScreen.vue'
import ExecutiveDashboardScreen from './ExecutiveDashboardScreen.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const { t } = useI18n()
const timeRange = ref('30')

const timeRanges = [
  { label: t('dashboard.time_range.last_7_days'), value: '7' },
  { label: t('dashboard.time_range.last_30_days'), value: '30' },
  { label: t('dashboard.time_range.last_90_days'), value: '90' }
]

const items = [{
  label: t('dashboard.overview'),
  icon: 'i-lucide-bar-chart-3',
  slot: 'overview'
}, {
  label: t('dashboard.hcp'),
  icon: 'i-lucide-pie-chart',
  slot: 'hcp'
}, {
  label: t('dashboard.executive'),
  icon: 'i-lucide-trending-up',
  slot: 'executive'
}]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('dashboard.title') }}</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {{ t('dashboard.subtitle') }}
          </p>
        </div>
        
        <!-- Header Actions Teleport -->
        <ClientOnly>
          <Teleport to="#header-actions">
            <div class="flex items-center gap-3">
              <USelect
                v-model="timeRange"
                :options="timeRanges"
                option-attribute="label"
                class="min-w-[140px]"
              />
              <LanguageSwitcher />
            </div>
          </Teleport>
        </ClientOnly>
      </div>

      <!-- Tabs -->
      <UTabs :items="items" class="w-full">
        <template #overview>
          <OverviewDashboardScreen />
        </template>
        <template #hcp>
          <HCPDashboardScreen />
        </template>
        <template #executive>
          <ExecutiveDashboardScreen />
        </template>
      </UTabs>
    </div>
  </div>
</template>
