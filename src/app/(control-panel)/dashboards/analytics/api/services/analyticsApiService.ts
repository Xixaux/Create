import { api } from '@/utils/api';
import { AnalyticsDashboardWidgetType } from '../types';

export const analyticsApiService = {
    getWidgets: async (): Promise<Record<string, AnalyticsDashboardWidgetType>> => {
        return await api.get('live/analytics-dashboard/widgets').json();
    }
};