import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <main className='flex-1 p-6 overflow-y-auto bg-gray-50'>{children}</main>
    </div>
  );
}
