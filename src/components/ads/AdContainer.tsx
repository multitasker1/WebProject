import { ReactNode } from 'react';

interface AdContainerProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

const AdContainer = ({ children, className = '', label = 'Advertisement' }: AdContainerProps) => {
  return (
    <div className={`my-8 ${className}`}>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
        {label}
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex justify-center items-center min-h-[100px]">
        {children}
      </div>
    </div>
  );
};

export default AdContainer;
