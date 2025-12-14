'use client';

import * as React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { summarizeConversation } from '@/app/chat/actions';
import type { Message, User } from '@/types';

type SummarizeDialogProps = {
  messages: Message[];
  users: User[];
};

export function SummarizeDialog({ messages, users }: SummarizeDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [summary, setSummary] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');

    const userMap = new Map(users.map(user => [user.id, user.name]));
    const conversationText = messages
      .map(msg => `${userMap.get(msg.senderId) || 'Unknown'}: ${msg.text}`)
      .join('\n');

    const result = await summarizeConversation(conversationText);
    setIsLoading(false);

    if (result.success) {
      setSummary(result.summary);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={handleSummarize}>
          <Sparkles className="h-5 w-5" />
          <span className="sr-only">Summarize Conversation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Conversation Summary</DialogTitle>
          <DialogDescription>
            An AI-generated summary of the conversation so far.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="prose prose-sm max-h-80 overflow-y-auto rounded-md border bg-secondary/50 p-4">
            <p>{summary}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
