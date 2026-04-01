<script setup lang="ts">
const { t } = useI18n()

// HCP Financial Data
const financialData = {
  statusDate: '10 Feb 2026',
  revenue: {
    actual: 10.4,
    plan: 18,
    variance: -1.45,
    variancePercent: -12,
    status: 'Lower than plan'
  },
  netProfit: {
    actual: 0.2,
    plan: 0.1,
    variance: 0.05,
    variancePercent: 33,
    status: 'Better than plan'
  },
  ytd: {
    revenuePlan: 11.8,
    expenseBudget: 11.7,
    profitTarget: 0.14
  }
}

const detailedMetrics = [
  {
    label: 'REVENUE',
    actual: '10.37',
    plan2026: '175 MB',
    actual2025: '121.4 MB',
    change: '-41%',
    status: 'Below',
    statusColor: 'red'
  },
  {
    label: 'COST (VC + FOH)',
    actual: '(9.95)',
    plan2026: '(166.36) MB',
    actual2025: '(117.3) MB',
    change: '+6%',
    status: 'Above',
    statusColor: 'green'
  },
  {
    label: 'GROSS PROFIT %',
    actual: '4.4%',
    plan2026: '4.93%',
    actual2025: '3.3%',
    change: '-0.53%',
    status: 'Below',
    statusColor: 'red'
  },
  {
    label: 'ADMIN',
    actual: '(0.23)',
    plan2026: '(4.18) MB',
    actual2025: '(1.7) MB',
    change: 'Below Budget',
    status: 'Good',
    statusColor: 'green'
  },
  {
    label: 'NET PROFIT',
    actual: '0.19',
    plan2026: '4.45 MB',
    actual2025: '2.1 MB',
    change: '-96%',
    status: 'Below',
    statusColor: 'red'
  },
  {
    label: 'NET PROFIT %',
    actual: '1.8%',
    plan2026: '2.54%',
    actual2025: '1.75%',
    change: 'On Track',
    status: 'Track',
    statusColor: 'blue'
  }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Status Header -->
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Status: {{ financialData.statusDate }}
        </p>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-1">
          Financial Projection
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
          Revenue is below plan as newly onboarded customers are small accounts, 
          coupled with fewer working days in January.
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
          The net profit shown below differs from accounting figures due to prior-year 
          bonus accrual reversals and operating expense adjustments.
        </p>
      </div>
    </div>

    <!-- Main Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <CommonCard title="Revenue (MB)" :is-background="true" body="p-5">
        <div class="space-y-4">
          <!-- Actual vs Plan Bars -->
          <div class="space-y-3">
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-16">Actual</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  class="h-full bg-blue-500 rounded-lg flex items-center justify-end px-2"
                  :style="{ width: `${(financialData.revenue.actual / financialData.revenue.plan) * 100}%` }"
                >
                  <span class="text-white text-sm font-bold">{{ financialData.revenue.actual }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-16">Plan</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  class="h-full bg-gray-400 rounded-lg flex items-center justify-end px-2"
                  :style="{ width: '100%' }"
                >
                  <span class="text-white text-sm font-bold">{{ financialData.revenue.plan }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Variance Info -->
          <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div class="text-sm">
              <span class="text-gray-500">P:</span>
              <span class="font-medium">{{ financialData.revenue.plan }} MB</span>
              <span class="text-gray-500 mx-2">|</span>
              <span class="text-gray-500">A:</span>
              <span class="font-medium">{{ financialData.revenue.actual }} MB</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-red-500 font-medium">{{ financialData.revenue.status }}</span>
              <span class="text-red-500 text-sm">
                ({{ financialData.revenue.variance }}) MB ({{ financialData.revenue.variancePercent }}%)
              </span>
            </div>
          </div>
        </div>
      </CommonCard>

      <!-- Net Profit Chart -->
      <CommonCard title="Net Profit (MB)" :is-background="true" body="p-5">
        <div class="space-y-4">
          <!-- Actual vs Plan Bars -->
          <div class="space-y-3">
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-16">Actual</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  class="h-full bg-green-500 rounded-lg flex items-center justify-end px-2"
                  :style="{ width: '80%' }"
                >
                  <span class="text-white text-sm font-bold">{{ financialData.netProfit.actual }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-16">Plan</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  class="h-full bg-gray-400 rounded-lg flex items-center justify-end px-2"
                  :style="{ width: '40%' }"
                >
                  <span class="text-white text-sm font-bold">{{ financialData.netProfit.plan }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Variance Info -->
          <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div class="text-sm">
              <span class="text-gray-500">P:</span>
              <span class="font-medium">{{ financialData.netProfit.plan }} MB</span>
              <span class="text-gray-500 mx-2">|</span>
              <span class="text-gray-500">A:</span>
              <span class="font-medium">{{ financialData.netProfit.actual }} MB</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500 font-medium">{{ financialData.netProfit.status }}</span>
              <span class="text-green-500 text-sm">
                {{ financialData.netProfit.variance }} MB ({{ financialData.netProfit.variancePercent }}%)
              </span>
            </div>
          </div>
        </div>
      </CommonCard>
    </div>

    <!-- YTD Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CommonCard :is-background="true" body="p-4">
        <div class="text-center">
          <p class="text-sm text-gray-500 mb-1">% Revenue Achievement</p>
          <p class="text-xs text-gray-400">YTD Plan 2025:</p>
          <p class="text-2xl font-bold text-blue-600">{{ financialData.ytd.revenuePlan }} MB</p>
        </div>
      </CommonCard>
      <CommonCard :is-background="true" body="p-4">
        <div class="text-center">
          <p class="text-sm text-gray-500 mb-1">% Expense Incurred</p>
          <p class="text-xs text-gray-400">YTD Plan 2025:</p>
          <p class="text-2xl font-bold text-orange-600">{{ financialData.ytd.expenseBudget }} MB</p>
        </div>
      </CommonCard>
      <CommonCard :is-background="true" body="p-4">
        <div class="text-center">
          <p class="text-sm text-gray-500 mb-1">% Profit Achievement</p>
          <p class="text-xs text-gray-400">YTD Plan 2025:</p>
          <p class="text-2xl font-bold text-green-600">{{ financialData.ytd.profitTarget }} MB</p>
        </div>
      </CommonCard>
    </div>

    <!-- Detailed Financial Metrics -->
    <CommonCard title="Detailed Financial Metrics" :is-background="true" body="p-5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(metric, index) in detailedMetrics" 
          :key="index"
          class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ metric.label }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metric.actual }}</p>
          <div class="mt-2 space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-500">Plan 2026:</span>
              <span class="font-medium">{{ metric.plan2026 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Actual 2025:</span>
              <span class="font-medium">{{ metric.actual2025 }}</span>
            </div>
            <div class="flex justify-between items-center pt-1 border-t border-gray-200 dark:border-gray-700">
              <span class="font-medium" :class="{
                'text-red-500': metric.statusColor === 'red',
                'text-green-500': metric.statusColor === 'green',
                'text-blue-500': metric.statusColor === 'blue'
              }">{{ metric.change }}</span>
              <span class="px-2 py-0.5 rounded text-xs font-medium" :class="{
                'bg-red-100 text-red-700': metric.statusColor === 'red',
                'bg-green-100 text-green-700': metric.statusColor === 'green',
                'bg-blue-100 text-blue-700': metric.statusColor === 'blue'
              }">{{ metric.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </CommonCard>
  </div>
</template>
