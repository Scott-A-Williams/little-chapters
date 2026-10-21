import React from 'react';
import {
  Award,
  Sparkles,
  Heart,
  Milk,
  Moon,
  Baby,
  Utensils,
  Ruler,
  Activity,
  Pill,
  AlertCircle,
  Quote,
  Smile,
  Droplets,
  Compass,
  Camera,
  Calendar,
  Bookmark,
  FileQuestion,
} from 'lucide-react';
import { MomentCategory } from '../../types/moment';
import { CATEGORY_MAP } from '../../services/categoryMeta';

interface MomentCategoryIconProps {
  category: MomentCategory;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const MomentCategoryIcon: React.FC<MomentCategoryIconProps> = ({
  category,
  size = 20,
  color,
  style,
}) => {
  const meta = CATEGORY_MAP[category];
  const iconColor = color || meta?.color || 'var(--lc-primary)';

  const iconProps = {
    size,
    color: iconColor,
    style: { display: 'inline-block', verticalAlign: 'middle', ...style },
  };

  switch (meta?.iconName) {
    case 'Award':
      return <Award {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Heart':
      return <Heart {...iconProps} />;
    case 'Milk':
      return <Milk {...iconProps} />;
    case 'Moon':
      return <Moon {...iconProps} />;
    case 'Baby':
      return <Baby {...iconProps} />;
    case 'Utensils':
      return <Utensils {...iconProps} />;
    case 'Ruler':
      return <Ruler {...iconProps} />;
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'Pill':
      return <Pill {...iconProps} />;
    case 'AlertCircle':
      return <AlertCircle {...iconProps} />;
    case 'Quote':
      return <Quote {...iconProps} />;
    case 'Smile':
      return <Smile {...iconProps} />;
    case 'Droplets':
      return <Droplets {...iconProps} />;
    case 'Compass':
      return <Compass {...iconProps} />;
    case 'Camera':
      return <Camera {...iconProps} />;
    case 'Calendar':
      return <Calendar {...iconProps} />;
    case 'Bookmark':
      return <Bookmark {...iconProps} />;
    default:
      return <FileQuestion {...iconProps} />;
  }
};
