'use client';

import * as React from 'react';
import type { Conversation, Message, User } from '@/types';
import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';

type ChatViewProps = {
  conversation: Conversation;
  loggedInUser: User;
};

export function ChatView({ conversation: initialConversation, loggedInUser }: ChatViewProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialConversation.messages);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: loggedInUser.id,
      text,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader conversation={initialConversation} loggedInUser={loggedInUser} messages={messages} />
      <ChatMessages messages={messages} loggedInUser={loggedInUser} conversation={initialConversation} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
