import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Calendar, ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react-native';

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

export default function AnalyticsScreen() {
  const totalSavings = monthlyData.reduce((sum, month) => sum + month.savings, 0);
  const totalBills = monthlyData.reduce((sum, month) => sum + month.bills, 0);
  const avgSavingsPerBill = totalSavings / totalBills;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Dashboard</Text>
          <Text style={styles.subtitle}>Track your medical billing insights and savings</Text>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <DollarSign size={24} color="#059669" />
                <TrendingUp size={16} color="#059669" />
              </View>
              <Text style={styles.metricValue}>${totalSavings.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Total Savings</Text>
              <Text style={styles.metricChange}>+12% this month</Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <BarChart3 size={24} color="#2563EB" />
                <TrendingUp size={16} color="#2563EB" />
              </View>
              <Text style={styles.metricValue}>{totalBills}</Text>
              <Text style={styles.metricLabel}>Bills Processed</Text>
              <Text style={styles.metricChange}>+8% this month</Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <AlertTriangle size={24} color="#EF4444" />
                <TrendingDown size={16} color="#059669" />
              </View>
              <Text style={styles.metricValue}>18%</Text>
              <Text style={styles.metricLabel}>Error Rate</Text>
              <Text style={styles.metricChange}>-5% this month</Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <CheckCircle size={24} color="#7C3AED" />
              </View>
              <Text style={styles.metricValue}>${avgSavingsPerBill.toFixed(0)}</Text>
              <Text style={styles.metricLabel}>Avg Savings/Bill</Text>
              <Text style={styles.metricChange}>per processed bill</Text>
            </View>
          </View>
        </View>

        {/* Monthly Trends */}
        <View style={styles.trendsContainer}>
          <Text style={styles.sectionTitle}>Monthly Trends</Text>
          
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
          <Text style={styles.sectionTitle}>Bill Categories</Text>
          
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
          <Text style={styles.sectionTitle}>Recommendations</Text>
          
          <View style={styles.recommendationCard}>
            <AlertTriangle size={24} color="#F59E0B" />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>High Error Rate Detected</Text>
              <Text style={styles.recommendationText}>
                Your hospital bills show a 25% error rate. Consider requesting itemized bills for all hospital charges.
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCard}>
            <TrendingUp size={24} color="#059669" />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Savings Opportunity</Text>
              <Text style={styles.recommendationText}>
                Based on your billing history, you could save an additional $200/month by reviewing pharmacy charges more carefully.
              </Text>
            </View>
          </View>
        </View>

        {/* Export Options */}
        <View style={styles.exportContainer}>
          <TouchableOpacity style={styles.exportButton}>
            <Calendar size={20} color="#2563EB" />
            <Text style={styles.exportButtonText}>Export Monthly Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.exportButton}>
            <PieChart size={20} color="#2563EB" />
            <Text style={styles.exportButtonText}>Download Analytics</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 24,
  },
  metricsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#059669',
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
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  categoryStats: {
    alignItems: 'flex-end',
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  categoryPercentage: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  recommendationsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: 12,
  },
  recommendationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 18,
  },
  exportContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  exportButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2563EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  exportButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});