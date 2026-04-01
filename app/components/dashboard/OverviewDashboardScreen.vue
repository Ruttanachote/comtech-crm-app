<script setup lang="ts">
const { t } = useI18n()

// Stats data for Overview Dashboard - matching Figma exactly
const stats = [
  {
    label: 'ISSUE',
    sublabel: 'Count',
    value: '245',
    percent: null,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-100 dark:border-blue-800',
    valueColor: 'text-blue-600 dark:text-blue-400',
    labelColor: 'text-gray-500 dark:text-gray-400'
  },
  {
    label: 'WIN',
    sublabel: 'Count',
    value: '182',
    percent: '(74.1%)',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-100 dark:border-orange-800',
    valueColor: 'text-orange-500 dark:text-orange-400',
    labelColor: 'text-gray-500 dark:text-gray-400'
  },
  {
    label: 'ISSUE',
    sublabel: 'Value',
    value: '1,250M',
    percent: null,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-100 dark:border-blue-800',
    valueColor: 'text-blue-600 dark:text-blue-400',
    labelColor: 'text-gray-500 dark:text-gray-400'
  },
  {
    label: 'WIN',
    sublabel: 'Value',
    value: '980M',
    percent: '(78.4%)',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-100 dark:border-orange-800',
    valueColor: 'text-orange-500 dark:text-orange-400',
    labelColor: 'text-gray-500 dark:text-gray-400'
  },
  {
    label: 'Actual',
    sublabel: 'Revenue',
    value: '875M',
    percent: '(89.3%)',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-100 dark:border-emerald-800',
    valueColor: 'text-emerald-600 dark:text-emerald-400',
    labelColor: 'text-gray-500 dark:text-gray-400'
  }
]

// Number of Project chart data - combined bar + line
const projectMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const projectIssueData = [22, 18, 32, 28, 38, 25, 28, 26, 33, 22, 18, 16]
const projectWinData = [18, 14, 22, 20, 28, 18, 22, 20, 28, 16, 14, 12]
const projectLastYearData = [78, 74, 82, 86, 92, 78, 86, 82, 90, 74, 70, 68]

// REVENUE chart data - combined bar + line
const revenueIssueData = [950, 900, 1050, 950, 1300, 1100, 1150, 1050, 1400, 950, 900, 850]
const revenueWinData = [700, 650, 800, 750, 1000, 850, 900, 800, 1050, 700, 650, 600]
const revenueActualData = [650, 600, 750, 700, 950, 800, 850, 750, 1000, 650, 600, 550]
const revenueLastYearData = [850, 800, 950, 900, 1050, 900, 950, 900, 1100, 850, 800, 750]

// Sales Pipeline Status cards - matching Figma
const pipelineCards = [
  { stage: 'Leads', count: 45, bgColor: 'bg-gray-100 dark:bg-gray-800', borderColor: 'border-gray-200 dark:border-gray-700', valueColor: 'text-gray-700 dark:text-gray-300', labelColor: 'text-gray-500 dark:text-gray-400' },
  { stage: 'Qualified', count: 32, bgColor: 'bg-blue-50 dark:bg-blue-900/20', borderColor: 'border-blue-100 dark:border-blue-800', valueColor: 'text-blue-600 dark:text-blue-400', labelColor: 'text-blue-500 dark:text-blue-400' },
  { stage: 'Proposal', count: 28, bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', borderColor: 'border-yellow-100 dark:border-yellow-800', valueColor: 'text-yellow-600 dark:text-yellow-400', labelColor: 'text-yellow-500 dark:text-yellow-400' },
  { stage: 'Negotiation', count: 18, bgColor: 'bg-orange-50 dark:bg-orange-900/20', borderColor: 'border-orange-100 dark:border-orange-800', valueColor: 'text-orange-500 dark:text-orange-400', labelColor: 'text-orange-500 dark:text-orange-400' },
  { stage: 'Closed Won', count: 15, bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', borderColor: 'border-emerald-100 dark:border-emerald-800', valueColor: 'text-emerald-600 dark:text-emerald-400', labelColor: 'text-emerald-500 dark:text-emerald-400' },
  { stage: 'Closed Lost', count: 8, bgColor: 'bg-rose-50 dark:bg-rose-900/20', borderColor: 'border-rose-100 dark:border-rose-800', valueColor: 'text-rose-600 dark:text-rose-400', labelColor: 'text-rose-500 dark:text-rose-400' }
]
</script>

<template>
  <div class="space-y-4 md:space-y-6">
    <!-- Stats Cards Row - Responsive Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label + stat.sublabel"
        class="rounded-xl border p-3 md:p-5 text-center"
        :class="[stat.bgColor, stat.borderColor]"
      >
        <p class="text-xs font-medium uppercase tracking-wide" :class="stat.labelColor">
          {{ stat.label }}
        </p>
        <p class="text-xs font-medium uppercase tracking-wide" :class="stat.labelColor">
          {{ stat.sublabel }}
        </p>
        <p class="mt-1 md:mt-2 text-xl md:text-3xl font-bold" :class="stat.valueColor">
          {{ stat.value }}
        </p>
        <p v-if="stat.percent" class="text-xs mt-1" :class="stat.valueColor">
          {{ stat.percent }}
        </p>
      </div>
    </div>

    <!-- Charts Row - Responsive Stack on Mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Number of Project Chart -->
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-5">
        <h3 class="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
          Number of Project
        </h3>
        <!-- Legend -->
        <div class="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <div class="flex items-center gap-1.5 md:gap-2">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-blue-500"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Issue</span>
          </div>
          <div class="flex items-center gap-1.5 md:gap-2">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-orange-500"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Win</span>
          </div>
          <div class="flex items-center gap-1.5 md:gap-2">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-purple-500"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
          </div>
        </div>
        <!-- Chart -->
        <div class="relative h-40 md:h-52 overflow-x-auto">
          <svg class="w-full min-w-[400px] h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <!-- Grid lines -->
            <line x1="40" y1="20" x2="480" y2="20" stroke="#e5e7eb" stroke-width="1" />
            <line x1="40" y1="60" x2="480" y2="60" stroke="#e5e7eb" stroke-width="1" />
            <line x1="40" y1="100" x2="480" y2="100" stroke="#e5e7eb" stroke-width="1" />
            <line x1="40" y1="140" x2="480" y2="140" stroke="#e5e7eb" stroke-width="1" />
            <!-- Y-axis labels -->
            <text x="35" y="25" text-anchor="end" font-size="10" fill="#9ca3af">100</text>
            <text x="35" y="65" text-anchor="end" font-size="10" fill="#9ca3af">75</text>
            <text x="35" y="105" text-anchor="end" font-size="10" fill="#9ca3af">50</text>
            <text x="35" y="145" text-anchor="end" font-size="10" fill="#9ca3af">25</text>
            <text x="35" y="165" text-anchor="end" font-size="10" fill="#9ca3af">0</text>
            <!-- Bars - Issue (blue) -->
            <g v-for="(val, i) in projectIssueData" :key="'issue-'+i">
              <rect
                :x="45 + i * 36"
                :y="160 - (val / 100) * 140"
                width="12"
                :height="(val / 100) * 140"
                fill="#3b82f6"
                rx="2"
              />
            </g>
            <!-- Bars - Win (orange) -->
            <g v-for="(val, i) in projectWinData" :key="'win-'+i">
              <rect
                :x="59 + i * 36"
                :y="160 - (val / 100) * 140"
                width="12"
                :height="(val / 100) * 140"
                fill="#f97316"
                rx="2"
              />
            </g>
            <!-- Line - Last Year (purple) -->
            <polyline
              :points="projectLastYearData.map((val, i) => `${51 + i * 36},${160 - (val / 100) * 140}`).join(' ')"
              fill="none"
              stroke="#a855f7"
              stroke-width="2"
              stroke-dasharray="4,4"
            />
            <!-- Line points -->
            <circle
              v-for="(val, i) in projectLastYearData"
              :key="'point-'+i"
              :cx="51 + i * 36"
              :cy="160 - (val / 100) * 140"
              r="3"
              fill="#a855f7"
            />
            <!-- X-axis labels -->
            <text
              v-for="(month, i) in projectMonths"
              :key="'month-'+i"
              :x="56 + i * 36"
              y="185"
              text-anchor="middle"
              font-size="10"
              fill="#9ca3af"
            >{{ month }}</text>
          </svg>
        </div>
      </div>

      <!-- REVENUE Chart -->
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-5">
        <h3 class="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
          REVENUE
        </h3>
        <!-- Legend -->
        <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div class="flex items-center gap-1 md:gap-1.5">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-blue-500"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Issue</span>
          </div>
          <div class="flex items-center gap-1 md:gap-1.5">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-orange-500"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Win</span>
          </div>
          <div class="flex items-center gap-1 md:gap-1.5">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-emerald-500"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Actual</span>
          </div>
          <div class="flex items-center gap-1 md:gap-1.5">
            <div class="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-gray-400"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
          </div>
        </div>
        <!-- Chart -->
        <div class="relative h-40 md:h-52 overflow-x-auto">
          <svg class="w-full min-w-[400px] h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <!-- Grid lines -->
            <line x1="40" y1="20" x2="480" y2="20" stroke="#e5e7eb" stroke-width="1" />
            <line x1="40" y1="60" x2="480" y2="60" stroke="#e5e7eb" stroke-width="1" />
            <line x1="40" y1="100" x2="480" y2="100" stroke="#e5e7eb" stroke-width="1" />
            <line x1="40" y1="140" x2="480" y2="140" stroke="#e5e7eb" stroke-width="1" />
            <!-- Y-axis labels -->
            <text x="35" y="25" text-anchor="end" font-size="10" fill="#9ca3af">1400</text>
            <text x="35" y="65" text-anchor="end" font-size="10" fill="#9ca3af">1050</text>
            <text x="35" y="105" text-anchor="end" font-size="10" fill="#9ca3af">700</text>
            <text x="35" y="145" text-anchor="end" font-size="10" fill="#9ca3af">350</text>
            <text x="35" y="165" text-anchor="end" font-size="10" fill="#9ca3af">0</text>
            <!-- Bars - Issue (blue) -->
            <g v-for="(val, i) in revenueIssueData" :key="'rev-issue-'+i">
              <rect
                :x="43 + i * 36"
                :y="160 - (val / 1400) * 140"
                width="7"
                :height="(val / 1400) * 140"
                fill="#3b82f6"
                rx="1"
              />
            </g>
            <!-- Bars - Win (orange) -->
            <g v-for="(val, i) in revenueWinData" :key="'rev-win-'+i">
              <rect
                :x="51 + i * 36"
                :y="160 - (val / 1400) * 140"
                width="7"
                :height="(val / 1400) * 140"
                fill="#f97316"
                rx="1"
              />
            </g>
            <!-- Bars - Actual (green) -->
            <g v-for="(val, i) in revenueActualData" :key="'rev-actual-'+i">
              <rect
                :x="59 + i * 36"
                :y="160 - (val / 1400) * 140"
                width="7"
                :height="(val / 1400) * 140"
                fill="#10b981"
                rx="1"
              />
            </g>
            <!-- Bars - Last Year (gray) -->
            <g v-for="(val, i) in revenueLastYearData" :key="'rev-ly-'+i">
              <rect
                :x="67 + i * 36"
                :y="160 - (val / 1400) * 140"
                width="7"
                :height="(val / 1400) * 140"
                fill="#9ca3af"
                rx="1"
              />
            </g>
            <!-- X-axis labels -->
            <text
              v-for="(month, i) in projectMonths"
              :key="'rev-month-'+i"
              :x="56 + i * 36"
              y="185"
              text-anchor="middle"
              font-size="10"
              fill="#9ca3af"
            >{{ month }}</text>
          </svg>
        </div>
      </div>
    </div>

    <!-- Sales Pipeline Status Cards - Responsive Grid -->
    <div>
      <h3 class="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
        Sales Pipeline Status
      </h3>
      <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        <div
          v-for="card in pipelineCards"
          :key="card.stage"
          class="rounded-xl border p-3 md:p-5 text-center"
          :class="[card.bgColor, card.borderColor]"
        >
          <p class="text-xs md:text-sm font-medium" :class="card.labelColor">
            {{ card.stage }}
          </p>
          <p class="mt-2 md:mt-3 text-xl md:text-3xl font-bold" :class="card.valueColor">
            {{ card.count }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
