// ✅ PROFESSIONAL DASHBOARD LAYOUT
// Hospital-grade header with real-time indicators

import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Bell, User, Activity, Radio, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockAlerts } from '@/data/mockData';
import { useState } from 'react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Get unread alerts
  const newAlerts = mockAlerts.filter(a => a.status === 'new');
  const criticalAlerts = newAlerts.filter(a => a.severity === 'critical');

  // Format time ago
  const timeAgo = (isoString: string) => {
    const hours = Math.floor((Date.now() - new Date(isoString).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {/* System Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-lg shadow-success/50" />
              <span className="text-sm font-medium text-success">System Active</span>
            </div>
            
            {/* Real-time Monitoring Badge */}
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              <Radio className="w-3 h-3 mr-1.5" />
              Live Monitoring
            </Badge>

            {/* Active Surveillance Count */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span>
                <strong className="text-foreground">24</strong> patients tracked
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Critical Alert Indicator */}
            {criticalAlerts.length > 0 && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-lg animate-pulse">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
                </span>
              </div>
            )}

            {/* Notification Bell */}
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-accent"
                >
                  <Bell className="w-5 h-5" />
                  {newAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center font-semibold animate-pulse">
                      {newAlerts.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {newAlerts.length > 0 ? (
                  <>
                    {newAlerts.slice(0, 4).map((alert) => (
                      <DropdownMenuItem
                        key={alert.id}
                        className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                        onClick={() => {
                          navigate('/alerts');
                          setNotificationsOpen(false);
                        }}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              alert.severity === 'critical' ? 'bg-destructive' :
                              alert.severity === 'high' ? 'bg-warning' : 'bg-primary'
                            }`} />
                            <span className="font-medium text-sm">{alert.type.replace(/_/g, ' ').toUpperCase()}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{timeAgo(alert.createdAt)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {alert.description}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            alert.severity === 'critical' ? 'border-destructive/50 text-destructive' : ''
                          }`}
                        >
                          {alert.ward}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-center text-sm font-medium text-primary cursor-pointer"
                      onClick={() => {
                        navigate('/alerts');
                        setNotificationsOpen(false);
                      }}
                    >
                      View All Alerts
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new alerts
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-3 border-l hover:bg-accent">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground">Dr. Neha Kapoor</p>
                    <p className="text-xs text-muted-foreground">Infection Control</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
                <DropdownMenuItem>System Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => navigate('/login')}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="p-6">
            <Outlet />
          </div>
        </main>

        {/* Footer Status Bar */}
        <footer className="h-10 border-t border-border bg-card px-6 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Last sync: Just now</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">MDR Surveillance System v1.0</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">AIIMS Network</span>
            <span>•</span>
            <span>Secure Connection</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;