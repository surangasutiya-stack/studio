import { Logo } from '@/components/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Logo />
      </div>
      {children}
    </div>
  );
}
