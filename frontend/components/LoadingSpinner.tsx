export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent`}></div>
    </div>
  );
}

export function ButtonSpinner() {
  return (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
  );
}
