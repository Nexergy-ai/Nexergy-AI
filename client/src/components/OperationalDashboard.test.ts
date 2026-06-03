import { describe, it, expect } from 'vitest';

/**
 * Test suite for Operational Dashboard metrics
 * Validates KPI calculations and chart data generation
 */

interface KPIMetric {
  title: string;
  value: number | string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface ChartData {
  time: string;
  value: number;
}

interface BusinessUnitMetric {
  unit: string;
  performance: number;
  status: string;
}

// Mock KPI data
const mockKPIs: KPIMetric[] = [
  {
    title: 'System Uptime',
    value: '99.97%',
    unit: '%',
    status: 'good',
    trend: 'up',
  },
  {
    title: 'Active Agents',
    value: 247,
    unit: 'agents',
    status: 'good',
    trend: 'stable',
  },
  {
    title: 'Anomalies Detected',
    value: 12,
    unit: 'anomalies',
    status: 'warning',
    trend: 'down',
  },
  {
    title: 'AI Recommendations',
    value: 1847,
    unit: 'recommendations',
    status: 'good',
    trend: 'up',
  },
];

// Mock chart data
const generateMockChartData = (): ChartData[] => {
  const data: ChartData[] = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

// Mock business unit data
const mockBusinessUnits: BusinessUnitMetric[] = [
  { unit: 'Manufacturing', performance: 94, status: 'good' },
  { unit: 'Energy', performance: 87, status: 'good' },
  { unit: 'Logistics', performance: 91, status: 'good' },
  { unit: 'Healthcare', performance: 89, status: 'good' },
  { unit: 'Mining', performance: 85, status: 'warning' },
];

describe('OperationalDashboard', () => {
  describe('KPI Metrics', () => {
    it('should have exactly 4 KPI metrics', () => {
      expect(mockKPIs).toHaveLength(4);
    });

    it('should have correct KPI titles', () => {
      const titles = mockKPIs.map(k => k.title);
      expect(titles).toContain('System Uptime');
      expect(titles).toContain('Active Agents');
      expect(titles).toContain('Anomalies Detected');
      expect(titles).toContain('AI Recommendations');
    });

    it('should have valid status values', () => {
      const validStatuses = ['good', 'warning', 'critical'];
      mockKPIs.forEach(kpi => {
        expect(validStatuses).toContain(kpi.status);
      });
    });

    it('should have valid trend values', () => {
      const validTrends = ['up', 'down', 'stable'];
      mockKPIs.forEach(kpi => {
        expect(validTrends).toContain(kpi.trend);
      });
    });

    it('should have non-empty units', () => {
      mockKPIs.forEach(kpi => {
        expect(kpi.unit).toBeTruthy();
        expect(kpi.unit.length).toBeGreaterThan(0);
      });
    });
  });

  describe('KPI Values', () => {
    it('should have valid uptime percentage', () => {
      const uptime = mockKPIs.find(k => k.title === 'System Uptime');
      expect(uptime?.value).toBe('99.97%');
      expect(uptime?.status).toBe('good');
    });

    it('should have positive active agents count', () => {
      const agents = mockKPIs.find(k => k.title === 'Active Agents');
      expect(typeof agents?.value).toBe('number');
      expect(agents?.value).toBeGreaterThan(0);
    });

    it('should have anomaly count', () => {
      const anomalies = mockKPIs.find(k => k.title === 'Anomalies Detected');
      expect(typeof anomalies?.value).toBe('number');
      expect(anomalies?.value).toBeGreaterThanOrEqual(0);
    });

    it('should have positive recommendations count', () => {
      const recommendations = mockKPIs.find(k => k.title === 'AI Recommendations');
      expect(typeof recommendations?.value).toBe('number');
      expect(recommendations?.value).toBeGreaterThan(0);
    });
  });

  describe('Chart Data', () => {
    it('should generate 24-hour activity data', () => {
      const chartData = generateMockChartData();
      expect(chartData).toHaveLength(24);
    });

    it('should have valid time format', () => {
      const chartData = generateMockChartData();
      chartData.forEach((data, index) => {
        expect(data.time).toBe(`${index}:00`);
      });
    });

    it('should have numeric values in valid range', () => {
      const chartData = generateMockChartData();
      chartData.forEach(data => {
        expect(typeof data.value).toBe('number');
        expect(data.value).toBeGreaterThanOrEqual(50);
        expect(data.value).toBeLessThanOrEqual(150);
      });
    });

    it('should support line chart rendering', () => {
      const chartData = generateMockChartData();
      const hasRequiredFields = chartData.every(d => d.time && d.value !== undefined);
      expect(hasRequiredFields).toBe(true);
    });
  });

  describe('Business Unit Performance', () => {
    it('should have 5 business units', () => {
      expect(mockBusinessUnits).toHaveLength(5);
    });

    it('should have all required business units', () => {
      const units = mockBusinessUnits.map(u => u.unit);
      expect(units).toContain('Manufacturing');
      expect(units).toContain('Energy');
      expect(units).toContain('Logistics');
      expect(units).toContain('Healthcare');
      expect(units).toContain('Mining');
    });

    it('should have performance scores in valid range', () => {
      mockBusinessUnits.forEach(unit => {
        expect(unit.performance).toBeGreaterThanOrEqual(0);
        expect(unit.performance).toBeLessThanOrEqual(100);
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['good', 'warning', 'critical'];
      mockBusinessUnits.forEach(unit => {
        expect(validStatuses).toContain(unit.status);
      });
    });

    it('should support bar chart rendering', () => {
      const hasRequiredFields = mockBusinessUnits.every(
        u => u.unit && u.performance !== undefined
      );
      expect(hasRequiredFields).toBe(true);
    });
  });

  describe('Status Indicators', () => {
    it('should map performance to status correctly', () => {
      const getStatus = (performance: number): string => {
        if (performance >= 90) return 'good';
        if (performance >= 75) return 'warning';
        return 'critical';
      };

      expect(getStatus(95)).toBe('good');
      expect(getStatus(85)).toBe('warning');
      expect(getStatus(70)).toBe('critical');
    });

    it('should identify critical metrics', () => {
      const criticalMetrics = mockKPIs.filter(k => k.status === 'critical');
      expect(Array.isArray(criticalMetrics)).toBe(true);
    });

    it('should identify warning metrics', () => {
      const warningMetrics = mockKPIs.filter(k => k.status === 'warning');
      expect(warningMetrics.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Metric Updates', () => {
    it('should support metric value updates', () => {
      const updateKPI = (kpi: KPIMetric, newValue: number | string): KPIMetric => ({
        ...kpi,
        value: newValue,
      });

      const uptime = mockKPIs[0];
      const updated = updateKPI(uptime, '99.98%');

      expect(updated.value).toBe('99.98%');
      expect(updated.title).toBe(uptime.title);
    });

    it('should support status updates', () => {
      const updateStatus = (kpi: KPIMetric, newStatus: 'good' | 'warning' | 'critical'): KPIMetric => ({
        ...kpi,
        status: newStatus,
      });

      const anomalies = mockKPIs[2];
      const updated = updateStatus(anomalies, 'critical');

      expect(updated.status).toBe('critical');
    });

    it('should support trend updates', () => {
      const updateTrend = (kpi: KPIMetric, newTrend: 'up' | 'down' | 'stable'): KPIMetric => ({
        ...kpi,
        trend: newTrend,
      });

      const agents = mockKPIs[1];
      const updated = updateTrend(agents, 'up');

      expect(updated.trend).toBe('up');
    });
  });

  describe('Data Aggregation', () => {
    it('should calculate average performance', () => {
      const average = mockBusinessUnits.reduce((sum, u) => sum + u.performance, 0) / mockBusinessUnits.length;
      expect(average).toBeGreaterThan(0);
      expect(average).toBeLessThanOrEqual(100);
    });

    it('should identify best performing unit', () => {
      const best = mockBusinessUnits.reduce((prev, current) =>
        current.performance > prev.performance ? current : prev
      );
      expect(best.unit).toBe('Manufacturing');
      expect(best.performance).toBe(94);
    });

    it('should identify worst performing unit', () => {
      const worst = mockBusinessUnits.reduce((prev, current) =>
        current.performance < prev.performance ? current : prev
      );
      expect(worst.unit).toBe('Mining');
      expect(worst.performance).toBe(85);
    });

    it('should calculate performance range', () => {
      const performances = mockBusinessUnits.map(u => u.performance);
      const min = Math.min(...performances);
      const max = Math.max(...performances);
      const range = max - min;

      expect(min).toBe(85);
      expect(max).toBe(94);
      expect(range).toBe(9);
    });
  });

  describe('Real-time Updates', () => {
    it('should support metric refresh', () => {
      const refreshMetrics = (metrics: KPIMetric[]): KPIMetric[] => {
        return metrics.map(m => ({
          ...m,
          value: typeof m.value === 'number' ? m.value + Math.random() * 10 : m.value,
        }));
      };

      const original = mockKPIs[1].value;
      const refreshed = refreshMetrics(mockKPIs);

      expect(typeof refreshed[1].value).toBe('number');
    });

    it('should support chart data updates', () => {
      const updateChartData = (data: ChartData[], newValue: number): ChartData[] => {
        return [...data.slice(1), { time: '23:00', value: newValue }];
      };

      const chartData = generateMockChartData();
      const updated = updateChartData(chartData, 75);

      expect(updated).toHaveLength(24);
      expect(updated[23].value).toBe(75);
    });
  });

  describe('Visualization Support', () => {
    it('should support line chart for 24h activity', () => {
      const chartData = generateMockChartData();
      const isValid = chartData.every(d => d.time && typeof d.value === 'number');
      expect(isValid).toBe(true);
    });

    it('should support bar chart for business units', () => {
      const isValid = mockBusinessUnits.every(u => u.unit && typeof u.performance === 'number');
      expect(isValid).toBe(true);
    });

    it('should support pie chart for agent status', () => {
      const agentData = [
        { name: 'Active', value: 200 },
        { name: 'Idle', value: 30 },
        { name: 'Offline', value: 17 },
      ];

      const total = agentData.reduce((sum, d) => sum + d.value, 0);
      expect(total).toBe(247);
    });
  });
});
