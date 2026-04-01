import { useApi } from '~/composables/useApi';

export interface DashboardStats {
  issueCount: number;
  winCount: number;
  winPercentage: number;
  issueValue: number;
  winValue: number;
  winValuePercentage: number;
  actualRevenue: number;
  revenuePercentage: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

export interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats;
  projectChart: ChartData;
  revenueChart: ChartData;
  pipeline: PipelineStage[];
}

export const dashboardService = {
  // Get dashboard stats
  async getStats(period: string = '30'): Promise<DashboardStats> {
    const { api } = useApi();
    const response = await api.get(`/dashboard/stats?period=${period}`);
    return response.data;
  },

  // Get project chart data
  async getProjectChart(period: string = '30'): Promise<ChartData> {
    const { api } = useApi();
    const response = await api.get(`/dashboard/charts/project?period=${period}`);
    return response.data;
  },

  // Get revenue chart data
  async getRevenueChart(period: string = '30'): Promise<ChartData> {
    const { api } = useApi();
    const response = await api.get(`/dashboard/charts/revenue?period=${period}`);
    return response.data;
  },

  // Get pipeline data
  async getPipeline(): Promise<PipelineStage[]> {
    const { api } = useApi();
    const response = await api.get('/dashboard/pipeline');
    return response.data;
  },

  // Get all dashboard data at once
  async getDashboardData(period: string = '30'): Promise<DashboardData> {
    const { api } = useApi();
    const response = await api.get(`/dashboard?period=${period}`);
    return response.data;
  },
};
