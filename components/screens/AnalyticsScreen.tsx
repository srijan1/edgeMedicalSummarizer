import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Calendar, ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react-native';
import MetricCard from '@/components/ui/MetricCard';
import RecommendationCard from '@/components/cards/RecommendationCard';
import ActionButton from '@/components/ui/ActionButton';
import SectionHeader from '@/components/layout/SectionHeader';
import { TabType } from '../navigation/TabNavigator';
const monthlyData = [
  { month: 'Jan', bills: 8, amount: 2100, savings: 150 },
  { month: 'Feb', bills: 6, amount: 1850, savings: 120 },
  { month: 'Mar', bills: 10, amount: 2750, savings: 340 },
  { month: 'Apr', bills: 7, amount: 1900, savings: 200 },
  { month: 'May', bills: 9, amount: 2400, savings: 280 },
  { month: 'Jun', bills: 5, amount: 1200, savings: 90 },
];

const categoryData = [
  { category: 'Hospital', count: 15, percentage: 35, color: '#2563EB' },
  { category: 'Clinic', count: 12, percentage: 28, color: '#059669' },
  { category: 'Pharmacy', count: 8, percentage: 19, color: '#7C3AED' },
  { category: 'Lab/Imaging', count: 5, percentage: 12, color: '#F59E0B' },
  { category: 'Specialist', count: 3, percentage: 6, color: '#EF4444' },
];

interface AnalyticsScreenProps {
  onNavigate: (tab: TabType, data?: any) => void;
}

export default function AnalyticsScreen({ onNavigate }: AnalyticsScreenProps) {
  const totalSavings = monthlyData.reduce((sum, month) => sum + month.savings, 0);
  const totalBills = monthlyData.reduce((sum, month) => sum + month.bills, 0);
  const avgSavingsPerBill = totalSavings / totalBills;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <SectionHeader
          title="Analytics Dashboard"
          subtitle="Track your medical billing insights and savings"
        />
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <SectionHeader title="Key Insights" />

        <View style={styles.metricsGrid}>
          <MetricCard
            value={`$${totalSavings.toLocaleString()}`}
            label="Total Savings"
            change="+12% this month"
            icon={DollarSign}
            trendIcon={TrendingUp}
            iconColor="#059669"
            trendColor="#059669"
          />

          <MetricCard
            value={totalBills.toString()}
            label="Bills Processed"
            change="+8% this month"
            icon={BarChart3}
            trendIcon={TrendingUp}
            iconColor="#2563EB"
            trendColor="#2563EB"
          />

          <MetricCard
            value="18%"
            label="Error Rate"
            change="-5% this month"
            icon={AlertTriangle}
            trendIcon={TrendingDown}
            iconColor="#EF4444"
            trendColor="#059669"
          />

          <MetricCard
            value={`$${avgSavingsPerBill.toFixed(0)}`}
            label="Avg Savings/Bill"
            change="per processed bill"
            icon={CheckCircle}
            trendIcon={CheckCircle}
            iconColor="#7C3AED"
            trendColor="#64748B"
          />
        </View>
      </View>

      {/* Monthly Trends */}
      <View style={styles.trendsContainer}>
        <SectionHeader title="Monthly Trends" />

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Bills & Savings Over Time</Text>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                <Text style={styles.legendText}>Bills</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
                <Text style={styles.legendText}>Savings</Text>
              </View>
            </View>
          </View>

          <View style={styles.chartGrid}>
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.chartBars}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: (data.bills / 10) * 80,
                        backgroundColor: '#2563EB',
                        marginRight: 4
                      }
                    ]}
                  />
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: (data.savings / 340) * 80,
                        backgroundColor: '#059669'
                      }
                    ]}
                  />
                </View>
                <Text style={styles.chartLabel}>{data.month}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Category Breakdown */}
      <View style={styles.categoryContainer}>
        <SectionHeader title="Bill Categories" />

        <View style={styles.categoryChart}>
          {categoryData.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryInfo}>
                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                <Text style={styles.categoryName}>{category.category}</Text>
              </View>
              <View style={styles.categoryStats}>
                <Text style={styles.categoryCount}>{category.count} bills</Text>
                <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsContainer}>
        <SectionHeader title="Recommendations" />

        <RecommendationCard
          title="High Error Rate Detected"
          description="Your hospital bills show a 25% error rate. Consider requesting itemized bills for all hospital charges."
          icon={AlertTriangle}
          iconColor="#F59E0B"
        />

        <RecommendationCard
          title="Savings Opportunity"
          description="Based on your billing history, you could save an additional $200/month by reviewing pharmacy charges more carefully."
          icon={TrendingUp}
          iconColor="#059669"
        />
      </View>

      {/* Export Options */}
      <View style={styles.exportContainer}>
        <ActionButton
          title="Export Monthly Report"
          onPress={() => console.log('Export monthly report')}
          icon={Calendar}
          variant="outline"
        />

        <View style={styles.buttonSpacing} />

        <ActionButton
          title="Download Analytics"
          onPress={() => console.log('Download analytics')}
          icon={PieChart}
          variant="outline"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  metricsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trendsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  chartLegend: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748B',
  },
  chartGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  categoryContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryChart: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  categoryStats: {
    alignItems: 'flex-end',
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748B',
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  recommendationsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  exportContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  buttonSpacing: {
    height: 12,
  },
});