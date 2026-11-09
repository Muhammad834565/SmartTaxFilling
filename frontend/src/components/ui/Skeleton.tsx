import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
  theme?: 'light' | 'dark';
}

export function Skeleton({
  variant = 'rect',
  theme = 'light',
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const baseClasses = theme === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer';

  const variantClasses = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style}
      {...props}
    />
  );
}

export function ServiceCardSkeleton({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`rounded-2xl border p-8 space-y-5 flex flex-col justify-between min-h-[320px] ${
        isDark ? 'bg-[#0c1a2e] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <Skeleton theme={theme} className="w-14 h-14 rounded-2xl" />
        <Skeleton theme={theme} className="w-12 h-6 rounded-full" />
      </div>

      <div className="space-y-3">
        <Skeleton theme={theme} className="w-3/4 h-6" />
        <Skeleton theme={theme} className="w-full h-4" />
        <Skeleton theme={theme} className="w-5/6 h-4" />
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Skeleton theme={theme} className="w-24 h-4" />
        <Skeleton theme={theme} className="w-20 h-4" />
      </div>
    </div>
  );
}

export default Skeleton;

