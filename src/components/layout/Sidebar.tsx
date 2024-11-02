import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  FileText,
  DollarSign,
  Database,
  BarChart2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  path: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className='h-5 w-5' />,
    path: '/',
  },
  {
    title: 'Laporan Keuangan',
    icon: <FileText className='h-5 w-5' />,
    path: '/laporan',
    submenu: [
      { title: 'Neraca', path: '/laporan/neraca' },
      { title: 'Laporan Aktivitas', path: '/laporan/aktivitas' },
      { title: 'Laporan Arus Kas', path: '/laporan/arus-kas' },
      {
        title: 'Budget vs Realisasi',
        path: '/laporan/budget-realisasi',
        icon: <BarChart2 className='h-5 w-5' />,
      },
    ],
  },
  {
    title: 'Input Data',
    icon: <DollarSign className='h-5 w-5' />,
    path: '/input',
    submenu: [
      { title: 'Input Transaksi', path: '/input/transaksi' },
      { title: 'Pemasukan', path: '/input/pemasukan' },
      { title: 'Pengeluaran', path: '/input/pengeluaran' },
    ],
  },
  {
    title: 'Master Data',
    icon: <Database className='h-5 w-5' />,
    path: '/master',
    submenu: [
      { title: 'Akun', path: '/master/akun' },
      { title: 'Program/Kegiatan', path: '/master/program' },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path)
        ? prev.filter((item) => item !== path)
        : [...prev, path]
    );
  };

  const handleNavigation = (path: string, hasSubmenu: boolean) => {
    if (!hasSubmenu) {
      navigate(path);
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasSubmenu = Boolean(item.submenu && item.submenu.length > 0);
    const isExpanded = expandedItems.includes(item.path);
    const isActive = location.pathname === item.path;

    return (
      <div key={item.path} className='relative'>
        <button
          onClick={() => {
            if (hasSubmenu) {
              toggleExpand(item.path);
            }
            handleNavigation(item.path, hasSubmenu);
          }}
          className={cn(
            'w-full flex items-center px-3 py-2 text-sm rounded-lg sidebar-item',
            isActive && !hasSubmenu && 'bg-blue-50 text-blue-600',
            collapsed && 'justify-center',
            level > 0 && 'pl-9'
          )}
        >
          {item.icon && (
            <span className={cn('text-gray-500', isActive && 'text-blue-600')}>
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <>
              <span
                className={cn(
                  'ml-3 flex-1 text-left text-gray-700',
                  isActive && 'text-blue-600 font-medium'
                )}
              >
                {item.title}
              </span>
              {hasSubmenu && (
                <span className='ml-auto text-gray-400'>
                  {isExpanded ? (
                    <ChevronDown className='h-4 w-4' />
                  ) : (
                    <ChevronRight className='h-4 w-4' />
                  )}
                </span>
              )}
            </>
          )}
        </button>
        {hasSubmenu && isExpanded && !collapsed && (
          <div className='mt-1 space-y-1'>
            {item.submenu?.map((subItem) => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className='flex items-center justify-between h-16 px-3 border-b border-gray-200'>
        {!collapsed && (
          <span className='text-lg font-semibold text-gray-900'>
            Al Muhajirin
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            'p-2 rounded-lg hover:bg-gray-100 text-gray-500',
            collapsed && 'mx-auto'
          )}
        >
          <Menu className='h-5 w-5' />
        </button>
      </div>
      <nav className='flex-1 overflow-y-auto p-3 space-y-1'>
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </div>
  );
}
