import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

type UserAvatarProps = {
  user: User;
  className?: string;
  showOnlineIndicator?: boolean;
};

export function UserAvatar({ user, className, showOnlineIndicator = true }: UserAvatarProps) {
  const fallback = user.name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <Avatar className={cn('border-2 border-background', className)}>
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {showOnlineIndicator && user.isOnline && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
      )}
    </div>
  );
}
