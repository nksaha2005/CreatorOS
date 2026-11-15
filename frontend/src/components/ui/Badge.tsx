import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'violet' | 'cyan' | 'green' | 'red' | 'orange' | 'yellow';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/70 border-white/10',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  green: 'bg-green-500/15 text-green-300 border-green-500/20',
  red: 'bg-red-500/15 text-red-300 border-red-500/20',
  orange: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  yellow: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
