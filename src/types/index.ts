export type User = {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  isOnline: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
};

export type Conversation = {
  id: string;
  type: 'direct' | 'group';
  name: string;
  imageUrl?: string;
  users: User[];
  messages: Message[];
  unreadCount?: number;
  lastMessageTimestamp: number;
};
