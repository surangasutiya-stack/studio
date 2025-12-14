'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Conversation, Message, User } from '@/types';
import { format } from 'date-fns';

type ChatMessagesProps = {
  messages: Message[];
  loggedInUser: User;
  conversation: Conversation;
};

export function ChatMessages({ messages, loggedInUser, conversation }: ChatMessagesProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const getUserById = (id: string) => conversation.users.find(u => u.id === id);

  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef}>
      <div className="p-4 md:p-6 space-y-6">
        {messages.map((message, index) => {
          const sender = getUserById(message.senderId);
          const isSender = message.senderId === loggedInUser.id;
          const showAvatar = !isSender && (index === 0 || messages[index - 1].senderId !== message.senderId);

          return (
            <div
              key={message.id}
              className={cn('flex items-end gap-2 animate-message-in', isSender ? 'justify-end' : 'justify-start')}
            >
              {!isSender && (
                <div className="w-8">
                  {showAvatar && sender && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sender.avatarUrl} alt={sender.name} />
                      <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2.5 text-sm shadow-md',
                  isSender
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none'
                )}
              >
                {!isSender && conversation.type === 'group' && showAvatar && (
                    <p className="text-xs font-semibold text-accent mb-1">{sender?.name}</p>
                )}
                <p className="whitespace-pre-wrap">{message.text}</p>
                 <p className={cn("text-xs mt-1.5", isSender ? "text-primary-foreground/70" : "text-muted-foreground/80")}>
                  {format(new Date(message.timestamp), "HH:mm")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
