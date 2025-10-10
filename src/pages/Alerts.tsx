import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAlerts } from '@/data/mockData';
import { AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-warning/70 text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'mdr_detected': return '🦠';
      case 'high_risk_contact': return '🔗';
      case 'outbreak_suspected': return '⚠️';
      case 'isolation_required': return '🚨';
      default: return '📋';
    }
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, status: 'acknowledged', assignedTo: 'Dr. Emily Roberts' } : a
    ));
    toast.success('Alert acknowledged and assigned');
  };

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, status: 'resolved' } : a
    ));
    toast.success('Alert marked as resolved');
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const newAlerts = alerts.filter(a => a.status === 'new');
  const acknowledgedAlerts = alerts.filter(a => a.status === 'acknowledged');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  const AlertCard = ({ alert }: { alert: typeof alerts[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-2xl">{getAlertIcon(alert.type)}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">{alert.ward}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{alert.description}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{alert.patientNames.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDateTime(alert.createdAt)}</span>
                </div>
              </div>
              {alert.assignedTo && (
                <p className="text-sm text-muted-foreground mt-2">
                  Assigned to: <span className="font-medium text-foreground">{alert.assignedTo}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {alert.status === 'new' && (
            <>
              <Button
                onClick={() => acknowledgeAlert(alert.id)}
                size="sm"
                variant="outline"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Acknowledge
              </Button>
              <Button
                onClick={() => resolveAlert(alert.id)}
                size="sm"
              >
                Resolve
              </Button>
            </>
          )}
          {alert.status === 'acknowledged' && (
            <Button
              onClick={() => resolveAlert(alert.id)}
              size="sm"
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alerts Console</h1>
        <p className="text-muted-foreground mt-1">Real-time alerts for MDR detection and high-risk contacts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{newAlerts.length}</p>
                <p className="text-sm text-muted-foreground">New Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{acknowledgedAlerts.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{resolvedAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">New ({newAlerts.length})</TabsTrigger>
          <TabsTrigger value="acknowledged">In Progress ({acknowledgedAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          {newAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="acknowledged" className="space-y-4">
          {acknowledgedAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;
