'use client';

import * as React from 'react';
import { Paperclip, Mic, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ChatInputProps = {
  onSendMessage: (text: string) => void;
};

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  React.useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="p-4 border-t bg-card">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Button variant="ghost" size="icon" type="button">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 resize-none min-h-[40px] max-h-40 bg-secondary border-none focus-visible:ring-1"
          rows={1}
        />
        {message ? (
          <Button size="icon" type="submit">
            <SendHorizonal className="h-5 w-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" type="button">
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </form>
    </div>
  );
}
