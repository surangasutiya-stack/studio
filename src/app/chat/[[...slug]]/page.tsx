import { getConversationById, getLoggedInUser } from '@/lib/data';
import { ChatPlaceholder } from '@/components/chat/chat-placeholder';
import { ChatView } from '@/components/chat/chat-view';

export default async function ChatPage({ params }: { params: { slug: string[] } }) {
  const chatId = params.slug?.[0];
  const loggedInUser = await getLoggedInUser();

  if (!chatId) {
    return <ChatPlaceholder />;
  }
  
  const conversation = await getConversationById(chatId, loggedInUser.id);

  if (!conversation) {
    return <ChatPlaceholder />;
  }

  return <ChatView conversation={conversation} loggedInUser={loggedInUser} />;
}
