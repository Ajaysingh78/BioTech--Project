import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import KPICard from '@/components/KPICard';
import { mockWards, dailyExposureData, mockAlerts } from '@/data/mockData';
import { Activity, Users, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const totalActiveAlerts = mockAlerts.filter(a => a.status === 'new').length;
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical').length;
  const avgDetectionTime = 2.3;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time monitoring of MDR pathogens and contact tracing</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active MDR Cases"
          value={criticalAlerts}
          change="+2 last 24h"
          changeType="negative"
          icon={Activity}
        />
        <KPICard
          title="Suspected Chains"
          value="8"
          change="3 resolved today"
          changeType="positive"
          icon={Users}
        />
        <KPICard
          title="Unacknowledged Alerts"
          value={totalActiveAlerts}
          change="Requires attention"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="bg-destructive/10"
        />
        <KPICard
          title="Avg. Detection Time"
          value={`${avgDetectionTime}h`}
          change="-0.8h vs last week"
          changeType="positive"
          icon={Clock}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Exposure Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Daily Suspected Exposures
            </CardTitle>
            <CardDescription>Contact events flagged for review (last 15 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyExposureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="exposures" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ward Status */}
        <Card>
          <CardHeader>
            <CardTitle>Ward Risk Status</CardTitle>
            <CardDescription>Current occupancy and risk levels by ward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWards.map((ward) => (
                <div key={ward.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getRiskColor(ward.riskLevel)}>
                        {ward.riskLevel.toUpperCase()}
                      </Badge>
                      <div>
                        <p className="font-medium text-foreground">{ward.name}</p>
                        <p className="text-xs text-muted-foreground">Floor {ward.floor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {ward.currentOccupancy}/{ward.capacity}
                      </p>
                      {ward.activeAlerts > 0 && (
                        <p className="text-xs text-destructive">{ward.activeAlerts} alerts</p>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(ward.currentOccupancy / ward.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ward Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Ward Heatmap - Risk Distribution</CardTitle>
          <CardDescription>Visual representation of pathogen risk across hospital wards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockWards.map((ward) => (
              <div
                key={ward.id}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                  ward.riskLevel === 'high'
                    ? 'bg-destructive/10 border-destructive/30 hover:border-destructive'
                    : ward.riskLevel === 'medium'
                    ? 'bg-warning/10 border-warning/30 hover:border-warning'
                    : 'bg-success/10 border-success/30 hover:border-success'
                }`}
              >
                <h3 className="font-bold text-foreground mb-1">{ward.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">Floor {ward.floor}</p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Occupancy:</span> {ward.currentOccupancy}/{ward.capacity}
                  </p>
                  {ward.activeAlerts > 0 && (
                    <p className="text-sm font-semibold text-destructive">
                      ⚠️ {ward.activeAlerts} Active Alert{ward.activeAlerts > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
