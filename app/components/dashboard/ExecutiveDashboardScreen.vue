<script setup lang="ts">
const { t } = useI18n()

// Executive KPI Data
const kpis = [
  { label: 'ISSUE Count', value: '245' },
  { label: 'WIN Count', value: '182' },
  { label: 'WIN RATE %', value: '74.3%' },
  { label: 'REVENUE YTD', value: '10.37M' },
  { label: 'COST YTD', value: '9.95M' },
  { label: 'GROSS Profit', value: '0.42M', subtext: '(4.4%)' },
  { label: 'NET Profit', value: '0.19M' },
  { label: 'NPM %', value: '1.8%' }
]

// Number of Deals Chart Data
const dealsData = {
  labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    { label: 'Issue', data: [18, 22, 25, 20, 28, 32], color: '#3B82F6' },
    { label: 'Win', data: [14, 18, 20, 16, 22, 26], color: '#10B981' },
    { label: 'Last Year', data: [68, 72, 75, 70, 78, 82], color: '#94A3B8' }
  ]
}

// Revenue vs Plan Data
const revenueData = {
  actual: 10.4,
  plan: 26,
  cumulative: { actual: 10.4, plan: 11.8 },
  variance: 1.4,
  variancePercent: 12,
  status: 'Below Plan'
}

// Net Profit Trend Data
const netProfitData = {
  actual24: 0.2,
  actual25: 0.2,
  plan26: 0.1,
  cumulative: { actual: 0.2, plan: 0.1 },
  variance: 0.1,
  variancePercent: 100,
  status: 'Above Plan'
}

// Achievement Progress
const achievements = [
  { label: 'Revenue Achievement', target: '11.8 MB', progress: 88 },
  { label: 'Expense Incurred', target: '11.7 MB', progress: 85 },
  { label: 'Profit Achievement', target: '0.14 MB', progress: 136 }
]

// Pipeline with conversion rates
const pipeline = [
  { name: 'Leads', count: 45, rate: '71.1%' },
  { name: 'Qualified', count: 32, rate: '87.5%' },
  { name: 'Proposal', count: 28, rate: '64.3%' },
  { name: 'Negotiation', count: 18, rate: '83.3%' },
  { name: 'Closed Won', count: 15, rate: '65.2%' },
  { name: 'Closed Lost', count: 8, rate: null }
]

// Detailed Financial Metrics
const financialMetrics = [
  {
    label: 'REVENUE',
    value: '10.37 MB',
    plan2026: '175 MB',
    actual2025: '121.4 MB',
    change: '-41%',
    status: 'Below',
    statusColor: 'red'
  },
  {
    label: 'COST (VC + FOH)',
    value: '(9.95) MB',
    plan2026: '(166.36) MB',
    actual2025: '(117.3) MB',
    change: '+6%',
    status: 'Above',
    statusColor: 'green'
  },
  {
    label: 'GROSS PROFIT %',
    value: '4.4%',
    plan2026: '4.93%',
    actual2025: '3.3%',
    change: '-0.53%',
    status: 'Below',
    statusColor: 'red'
  },
  {
    label: 'ADMIN',
    value: '(0.23) MB',
    plan2026: '(4.18) MB',
    actual2025: '(1.7) MB',
    change: 'Below Budget',
    status: 'Good',
    statusColor: 'green'
  },
  {
    label: 'NET PROFIT',
    value: '0.19 MB',
    plan2026: '4.45 MB',
    actual2025: '2.1 MB',
    change: '-96%',
    status: 'Below',
    statusColor: 'red'
  },
  {
    label: 'NET PROFIT %',
    value: '1.8%',
    plan2026: '2.54%',
    actual2025: '1.75%',
    change: 'On Track',
    status: 'Track',
    statusColor: 'blue'
  }
]

const maxDealsValue = Math.max(...dealsData.datasets.flatMap(d => d.data))
</script>

<template>
  <div class="space-y-6">
    <!-- Last Updated -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          Executive Dashboard - Full Business Overview
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Last Updated: 20 Feb 2026
        </p>
      </div>
    </div>

    <!-- Key Performance Indicators -->
    <CommonCard title="Key Performance Indicators" :is-background="true" body="p-5">
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <div 
          v-for="(kpi, index) in kpis" 
          :key="index"
          class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ kpi.label }}</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ kpi.value }}</p>
          <p v-if="kpi.subtext" class="text-xs text-gray-500">{{ kpi.subtext }}</p>
        </div>
      </div>
    </CommonCard>

    <!-- Sales & Revenue Analysis -->
    <CommonCard title="Sales & Revenue Analysis" :is-background="true" body="p-5">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Number of Deals -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Number of Deals</h4>
          <div class="flex items-end justify-between h-48 gap-2">
            <div
              v-for="(label, index) in dealsData.labels"
              :key="index"
              class="flex-1 flex flex-col items-center gap-2"
            >
              <div class="w-full flex items-end justify-center gap-1 h-40">
                <div
                  v-for="(dataset, dIndex) in dealsData.datasets"
                  :key="dIndex"
                  class="w-3 rounded-t"
                  :style="{
                    height: `${(dataset.data[index] / maxDealsValue) * 100}%`,
                    backgroundColor: dataset.color,
                  }"
                />
              </div>
              <span class="text-xs text-gray-500">{{ label }}</span>
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-4 mt-4">
            <div
              v-for="(dataset, index) in dealsData.datasets"
              :key="index"
              class="flex items-center gap-2"
            >
              <div class="w-3 h-3 rounded" :style="{ backgroundColor: dataset.color }" />
              <span class="text-xs text-gray-600">{{ dataset.label }}</span>
            </div>
          </div>
        </div>

        <!-- Revenue (Actual vs Plan) -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Revenue (Actual vs Plan)</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-16">Actual</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  class="h-full bg-blue-500 rounded-lg flex items-center justify-end px-2"
                  :style="{ width: `${(revenueData.actual / revenueData.plan) * 100}%` }"
                >
                  <span class="text-white text-sm font-bold">{{ revenueData.actual }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-16">Plan</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div class="h-full bg-gray-400 rounded-lg flex items-center justify-end px-2 w-full">
                  <span class="text-white text-sm font-bold">{{ revenueData.plan }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="text-red-500">⚠️</span>
              <span class="text-sm text-red-600 dark:text-red-400">
                {{ revenueData.status }} by {{ revenueData.variance }} MB ({{ revenueData.variancePercent }}%)
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Cumulative: Actual: {{ revenueData.cumulative.actual }} MB vs Plan: {{ revenueData.cumulative.plan }} MB
            </p>
          </div>
        </div>
      </div>
    </CommonCard>

    <!-- Profitability Analysis -->
    <CommonCard title="Profitability Analysis" :is-background="true" body="p-5">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Net Profit Trend -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Net Profit Trend</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-20">Actual 24</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div class="h-full bg-green-500 rounded-lg flex items-center justify-end px-2 w-3/4">
                  <span class="text-white text-sm font-bold">{{ netProfitData.actual24 }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-20">Actual 25</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div class="h-full bg-green-500 rounded-lg flex items-center justify-end px-2 w-3/4">
                  <span class="text-white text-sm font-bold">{{ netProfitData.actual25 }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-600 w-20">Plan 26</span>
              <div class="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div class="h-full bg-gray-400 rounded-lg flex items-center justify-end px-2 w-1/3">
                  <span class="text-white text-sm font-bold">{{ netProfitData.plan26 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="text-green-500">✅</span>
              <span class="text-sm text-green-600 dark:text-green-400">
                {{ netProfitData.status }} by {{ netProfitData.variance }} MB ({{ netProfitData.variancePercent }}%)
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Actual: {{ netProfitData.cumulative.actual }} MB vs Plan: {{ netProfitData.cumulative.plan }} MB
            </p>
          </div>
        </div>

        <!-- Achievement Progress -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Achievement Progress (YTD)</h4>
          <div class="space-y-4">
            <div v-for="(item, index) in achievements" :key="index">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">{{ item.label }}</span>
                <span class="text-gray-500">Target: {{ item.target }}</span>
              </div>
              <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :class="{
                    'bg-blue-500': item.label.includes('Revenue'),
                    'bg-orange-500': item.label.includes('Expense'),
                    'bg-green-500': item.label.includes('Profit')
                  }"
                  :style="{ width: `${Math.min(item.progress, 100)}%` }"
                />
              </div>
              <p class="text-right text-xs text-gray-500 mt-1">{{ item.progress }}%</p>
            </div>
          </div>
        </div>
      </div>
    </CommonCard>

    <!-- Sales Pipeline Status -->
    <CommonCard title="Sales Pipeline Status" :is-background="true" body="p-5">
      <div class="flex items-center justify-between overflow-x-auto pb-2">
        <template v-for="(stage, index) in pipeline" :key="index">
          <div class="flex flex-col items-center min-w-[100px]">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2"
              :class="{
                'bg-blue-500': index === 0,
                'bg-cyan-500': index === 1,
                'bg-teal-500': index === 2,
                'bg-emerald-500': index === 3,
                'bg-green-500': index === 4,
                'bg-red-500': index === 5
              }"
            >
              {{ stage.count }}
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{{ stage.name }}</span>
            <span v-if="stage.rate" class="text-xs text-gray-500 mt-1">→ {{ stage.rate }}</span>
          </div>
          <div v-if="index < pipeline.length - 1" class="text-gray-400 px-2">
            →
          </div>
        </template>
      </div>
    </CommonCard>

    <!-- Detailed Financial Metrics -->
    <CommonCard title="Detailed Financial Metrics" :is-background="true" body="p-5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(metric, index) in financialMetrics" 
          :key="index"
          class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ metric.label }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metric.value }}</p>
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
