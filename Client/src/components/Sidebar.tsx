// ✅ PREMIUM NAVIGATION SIDEBAR
// Hospital-grade navigation with active states and icons

import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  Bell, 
  FlaskConical, 
  Radio,
  Settings,
  Shield,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const navigationItems = [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Patient Tracker',
      href: '/patients',
      icon: Users
    },
    {
      title: 'Contact Graph',
      href: '/contacts',
      icon: Network,
      badge: 'New'
    },
    {
      title: 'Alerts',
      href: '/alerts',
      icon: Bell,
      badge: '3'
    },
    {
      title: 'Lab Integration',
      href: '/lab',
      icon: FlaskConical
    },
    {
      title: 'Devices',
      href: '/devices',
      icon: Radio
    },
    {
      title: 'Admin',
      href: '/admin',
      icon: Settings
    }
  ];

  return (
    <div className="w-64 border-r border-border bg-card h-screen flex flex-col shadow-sm">
      {/* Logo Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">MediShield AI</h1>
            <p className="text-xs text-muted-foreground">MDR Surveillance</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={cn(
                    'w-5 h-5 transition-transform group-hover:scale-110',
                    isActive ? 'text-primary-foreground' : ''
                  )} 
                />
                <span className="font-medium flex-1">{item.title}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? 'secondary' : 'outline'}
                    className="text-xs px-2 py-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 border-t border-border">
        <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">System Active</p>
          </div>
          <p className="text-xs text-green-600 dark:text-green-300">All monitoring systems online</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;