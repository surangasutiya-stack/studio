import { getConversations, getLoggedInUser } from '@/lib/data';
import { ChatSidebar } from '@/components/chat/chat-sidebar';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const loggedInUser = await getLoggedInUser();

  return (
    <div className="flex h-screen w-full bg-background">
      <ChatSidebar conversations={conversations} loggedInUser={loggedInUser} />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
