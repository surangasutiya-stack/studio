import type { User, Conversation, Message } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const users: User[] = [
  { id: '1', name: 'You', phone: '111-111-1111', avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar1')?.imageUrl || '', isOnline: true },
  { id: '2', name: 'Alice', phone: '222-222-2222', avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar2')?.imageUrl || '', isOnline: true },
  { id: '3', name: 'Bob', phone: '333-333-3333', avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar3')?.imageUrl || '', isOnline: false },
  { id: '4', name: 'Charlie', phone: '444-444-4444', avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar4')?.imageUrl || '', isOnline: true },
  { id: '5', name: 'Diana', phone: '555-555-5555', avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar5')?.imageUrl || '', isOnline: false },
  { id: '6', name: 'Eve', phone: '666-666-6666', avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar6')?.imageUrl || '', isOnline: true },
];

const conversations: Conversation[] = [
  {
    id: 'chat-1',
    type: 'direct',
    name: 'Alice',
    users: [users[0], users[1]],
    messages: [
      { id: 'msg-1', senderId: '2', text: 'Hey, how is it going?', timestamp: Date.now() - 1000 * 60 * 60 * 24 },
      { id: 'msg-2', senderId: '1', text: 'Hey Alice! I am doing great. How about you?', timestamp: Date.now() - 1000 * 60 * 50 },
      { id: 'msg-3', senderId: '2', text: 'Pretty good, working on the new project.', timestamp: Date.now() - 1000 * 60 * 30 },
      { id: 'msg-4', senderId: '1', text: 'Awesome! Let me know if you need any help.', timestamp: Date.now() - 1000 * 60 * 10 },
      { id: 'msg-5', senderId: '2', text: 'Sure, will do. Thanks!', timestamp: Date.now() - 1000 * 5 },
    ],
    unreadCount: 2,
    lastMessageTimestamp: Date.now() - 1000 * 5,
  },
  {
    id: 'chat-2',
    type: 'group',
    name: 'Project Team',
    imageUrl: PlaceHolderImages.find(img => img.id === 'group1')?.imageUrl || '',
    users: [users[0], users[2], users[3]],
    messages: [
      { id: 'msg-6', senderId: '3', text: 'Hi team, any updates on the design mockups?', timestamp: Date.now() - 1000 * 60 * 120 },
      { id: 'msg-7', senderId: '4', text: 'I have pushed the latest version to Figma.', timestamp: Date.now() - 1000 * 60 * 90 },
      { id: 'msg-8', senderId: '1', text: 'Looks great, Charlie! Good job.', timestamp: Date.now() - 1000 * 60 * 85 },
    ],
    unreadCount: 1,
    lastMessageTimestamp: Date.now() - 1000 * 60 * 85,
  },
  {
    id: 'chat-3',
    type: 'direct',
    name: 'Bob',
    users: [users[0], users[2]],
    messages: [
      { id: 'msg-9', senderId: '3', text: 'Lunch tomorrow?', timestamp: Date.now() - 1000 * 60 * 60 * 5 },
      { id: 'msg-10', senderId: '1', text: 'Sounds good! Usual place?', timestamp: Date.now() - 1000 * 60 * 60 * 4 },
    ],
    unreadCount: 0,
    lastMessageTimestamp: Date.now() - 1000 * 60 * 60 * 4,
  },
    {
    id: 'chat-4',
    type: 'direct',
    name: 'Charlie',
    users: [users[0], users[3]],
    messages: [
      { id: 'msg-11', senderId: '4', text: 'Can you review my PR?', timestamp: Date.now() - 1000 * 60 * 60 * 48 },
    ],
    unreadCount: 1,
    lastMessageTimestamp: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: 'chat-5',
    type: 'group',
    name: 'Weekend Plans',
    imageUrl: PlaceHolderImages.find(img => img.id === 'group2')?.imageUrl || '',
    users: [users[0], users[4], users[5]],
    messages: [
      { id: 'msg-12', senderId: '5', text: 'Hey everyone! Any plans for the weekend?', timestamp: Date.now() - 1000 * 60 * 180 },
      { id: 'msg-13', senderId: '6', text: 'I was thinking of going for a hike.', timestamp: Date.now() - 1000 * 60 * 170 },
      { id: 'msg-14', senderId: '1', text: 'I am in! Where are we going?', timestamp: Date.now() - 1000 * 60 * 165 },
      { id: 'msg-15', senderId: '5', text: 'Maybe the national park? It\'s a long conversation with many messages to test the summarization feature. Let\'s add more text to make it longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', timestamp: Date.now() - 1000 * 60 * 150 },
    ],
    unreadCount: 0,
    lastMessageTimestamp: Date.now() - 1000 * 60 * 150,
  }
];

export const getConversations = async (userId: string = '1'): Promise<Conversation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return conversations.filter(c => c.users.some(u => u.id === userId)).sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
};

export const getConversationById = async (conversationId: string, userId: string = '1'): Promise<Conversation | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  const conversation = conversations.find(c => c.id === conversationId);
  if (conversation && conversation.users.some(u => u.id === userId)) {
    return conversation;
  }
  return undefined;
};

export const getUserById = async (userId: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return users.find(u => u.id === userId);
};

export const getLoggedInUser = async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return users[0];
}
