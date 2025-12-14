'use client';

import { Phone, Video, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Conversation, Message, User } from '@/types';
import { SummarizeDialog } from './summarize-dialog';

type ChatHeaderProps = {
  conversation: Conversation;
  loggedInUser: User;
  messages: Message[];
};

export function ChatHeader({ conversation, loggedInUser, messages }: ChatHeaderProps) {
    const getChatPartner = (convo: Conversation) => {
        return convo.users.find(user => user.id !== loggedInUser.id);
    }
    
    const partner = conversation.type === 'direct' ? getChatPartner(conversation) : null;
    const displayName = partner ? partner.name : conversation.name;
    const avatarUrl = conversation.type === 'group' ? conversation.imageUrl : partner?.avatarUrl;
    const fallback = displayName.charAt(0).toUpperCase();

    const getOnlineStatusText = () => {
        if (conversation.type === 'group') {
            return `${conversation.users.length} members`;
        }
        if (partner?.isOnline) {
            return 'Online';
        }
        return 'Offline';
    }

  return (
    <header className="flex items-center p-4 border-b bg-card">
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{displayName}</p>
          <p className={cn("text-xs", partner?.isOnline ? "text-green-500" : "text-muted-foreground")}>
            {getOnlineStatusText()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <SummarizeDialog messages={messages} users={conversation.users} />
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
