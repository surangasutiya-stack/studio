import { MessageSquareDashed } from 'lucide-react';
import { Logo } from '../logo';

export function ChatPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-background">
      <div className="flex flex-col items-center justify-center text-center">
        <MessageSquareDashed className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-2xl font-bold tracking-tight">
          Select a chat to start messaging
        </h3>
        <p className="text-muted-foreground mt-2">
          Choose from your existing conversations or start a new one.
        </p>
      </div>
       <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
}
