'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Conversation, User } from '@/types';
import { format } from 'date-fns';

type ChatListProps = {
  conversations: Conversation[];
  loggedInUser: User;
};

export function ChatList({ conversations, loggedInUser }: ChatListProps) {
  const params = useParams();
  const currentChatId = params.slug?.[0];

  const getDirectChatPartner = (convo: Conversation) => {
    return convo.users.find(user => user.id !== loggedInUser.id);
  }

  const formatTimestamp = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    if (now.toDateString() === messageDate.toDateString()) {
      return format(messageDate, 'HH:mm');
    } else {
      return format(messageDate, 'MMM d');
    }
  };

  return (
    <nav className="p-2 space-y-1">
      {conversations.map((convo) => {
        const lastMessage = convo.messages[convo.messages.length - 1];
        const partner = convo.type === 'direct' ? getDirectChatPartner(convo) : null;
        const displayName = partner ? partner.name : convo.name;
        const avatarUrl = convo.type === 'group' ? convo.imageUrl : partner?.avatarUrl;
        const fallback = displayName.charAt(0).toUpperCase();

        return (
          <Link
            key={convo.id}
            href={`/chat/${convo.id}`}
            className={cn(
              'flex items-start gap-3 rounded-lg p-3 text-sm transition-all hover:bg-secondary',
              currentChatId === convo.id && 'bg-secondary'
            )}
          >
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <p className="font-semibold truncate">{displayName}</p>
                {lastMessage && (
                   <p className="text-xs text-muted-foreground">{formatTimestamp(lastMessage.timestamp)}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate">
                  {lastMessage?.text}
                </p>
                {convo.unreadCount && convo.unreadCount > 0 ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {convo.unreadCount}
                  </span>
                ) : null}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
