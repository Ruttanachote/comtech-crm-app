import { defineStore } from 'pinia';
import { dashboardService, type DashboardStats, type ChartData, type PipelineStage } from '~/services/dashboard.service';

export interface DashboardState {
  stats: DashboardStats | null;
  projectChart: ChartData | null;
  revenueChart: ChartData | null;
  pipeline: PipelineStage[];
  period: string;
  isLoading: boolean;
  error: string | null;
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    stats: null,
    projectChart: null,
    revenueChart: null,
    pipeline: [],
    period: '30',
    isLoading: false,
    error: null,
  }),

  getters: {
    // Get formatted stats for display
    formattedStats: (state) => {
      if (!state.stats) return [];
      
      return [
        {
          title: 'ISSUE Count',
          value: state.stats.issueCount,
          color: 'blue' as const,
          icon: 'i-lucide-file-text',
        },
        {
          title: 'WIN Count',
          value: state.stats.winCount,
          change: state.stats.winPercentage,
          changeLabel: '%',
          trend: 'up' as const,
          color: 'green' as const,
          icon: 'i-lucide-check-circle',
        },
        {
          title: 'ISSUE Value',
          value: (state.stats.issueValue / 1000000).toFixed(0),
          suffix: 'M',
          color: 'orange' as const,
          icon: 'i-lucide-wallet',
        },
        {
          title: 'WIN Value',
          value: (state.stats.winValue / 1000000).toFixed(0),
          suffix: 'M',
          change: state.stats.winValuePercentage,
          changeLabel: '%',
          trend: 'up' as const,
          color: 'purple' as const,
          icon: 'i-lucide-trending-up',
        },
        {
          title: 'Actual Revenue',
          value: (state.stats.actualRevenue / 1000000).toFixed(0),
          suffix: 'M',
          change: state.stats.revenuePercentage,
          changeLabel: '%',
          trend: 'up' as const,
          color: 'green' as const,
          icon: 'i-lucide-dollar-sign',
        },
      ];
    },

    // Check if data is loaded
    hasData: (state) => {
      return state.stats !== null && state.pipeline.length > 0;
    },
  },

  actions: {
    // Set period
    setPeriod(period: string) {
      this.period = period;
      // Fetch new data when period changes
      this.fetchDashboardData();
    },

    // Fetch all dashboard data
    async fetchDashboardData() {
      this.isLoading = true;
      this.error = null;

      try {
        const data = await dashboardService.getDashboardData(this.period);
        this.stats = data.stats;
        this.projectChart = data.projectChart;
        this.revenueChart = data.revenueChart;
        this.pipeline = data.pipeline;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch dashboard data';
        console.error('Dashboard fetch error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch stats only
    async fetchStats() {
      this.isLoading = true;
      this.error = null;

      try {
        const stats = await dashboardService.getStats(this.period);
        this.stats = stats;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch stats';
        console.error('Stats fetch error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch charts only
    async fetchCharts() {
      this.isLoading = true;
      this.error = null;

      try {
        const [projectChart, revenueChart] = await Promise.all([
          dashboardService.getProjectChart(this.period),
          dashboardService.getRevenueChart(this.period),
        ]);
        this.projectChart = projectChart;
        this.revenueChart = revenueChart;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch charts';
        console.error('Charts fetch error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch pipeline only
    async fetchPipeline() {
      this.isLoading = true;
      this.error = null;

      try {
        const pipeline = await dashboardService.getPipeline();
        this.pipeline = pipeline;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch pipeline';
        console.error('Pipeline fetch error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    // Reset store
    reset() {
      this.stats = null;
      this.projectChart = null;
      this.revenueChart = null;
      this.pipeline = [];
      this.period = '30';
      this.error = null;
    },
  },
});
