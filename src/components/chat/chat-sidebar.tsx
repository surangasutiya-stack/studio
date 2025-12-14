'use client';

import * as React from 'react';
import { Search, PenSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';
import { ChatList } from '@/components/chat/chat-list';
import type { Conversation, User } from '@/types';
import { Logo } from '../logo';

type ChatSidebarProps = {
  conversations: Conversation[];
  loggedInUser: User;
};

export function ChatSidebar({ conversations, loggedInUser }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-xs flex flex-col h-full bg-card border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserAvatar user={loggedInUser} />
            <span className="font-semibold">{loggedInUser.name}</span>
          </div>
          <Button variant="ghost" size="icon">
            <PenSquare className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <ChatList conversations={filteredConversations} loggedInUser={loggedInUser} />
      </ScrollArea>
       <div className="p-4 border-t mt-auto">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
}
