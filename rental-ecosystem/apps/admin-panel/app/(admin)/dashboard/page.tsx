import { KPICards } from '@/components/dashboard/kpi-cards';
import { DashboardCharts } from '@/components/dashboard/charts';
import { DashboardWidgets } from '@/components/dashboard/widgets';
import { generateAllMockData } from '@/lib/mock-data';

export const metadata = {
  title: 'Dashboard - RentFlow Admin',
  description: 'Admin dashboard for RentFlow property management system',
};

export default function DashboardPage() {
  const {
    tenants,
    landlords,
    agents,
    properties,
    units,
    tenancies,
    kpis,
    userGrowth,
    propertyGrowth,
    verificationTrend,
    disputes,
    activityFeed,
  } = generateAllMockData();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back to RentFlow Admin</p>
      </div>

      {/* KPI Cards */}
      <KPICards kpis={kpis} />

      {/* Charts */}
      <DashboardCharts
        userGrowth={userGrowth}
        propertyGrowth={propertyGrowth}
        verificationTrend={verificationTrend}
      />

      {/* Widgets */}
      <DashboardWidgets
        tenants={tenants}
        landlords={landlords}
        disputes={disputes}
        activityFeed={activityFeed}
      />
    </div>
  );
}
