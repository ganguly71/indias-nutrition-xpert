
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor?: string;
  onClick?: () => void;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  iconBgColor = "bg-xd-green",
  onClick
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-6 shadow-md card-hover",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className={`${iconBgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
