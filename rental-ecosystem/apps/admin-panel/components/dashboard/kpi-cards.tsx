import { Users, Building2, Key, Home, CheckCircle2, AlertCircle } from 'lucide-react';
import { DashboardKPIs } from '@/lib/types';

interface KPICardsProps {
  kpis: DashboardKPIs;
}

export function KPICards({ kpis }: KPICardsProps) {
  const cards = [
    {
      title: 'Total Users',
      value: kpis.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Properties',
      value: kpis.totalProperties.toLocaleString(),
      icon: Building2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total Units',
      value: kpis.totalUnits.toLocaleString(),
      icon: Key,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Active Tenancies',
      value: kpis.activeTenancies.toLocaleString(),
      icon: Home,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Pending Verifications',
      value: kpis.pendingVerifications.toLocaleString(),
      icon: CheckCircle2,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Open Disputes',
      value: kpis.openDisputes.toLocaleString(),
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{card.value}</p>
              </div>
              <div className={`rounded-lg ${card.bgColor} p-3`}>
                <Icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
