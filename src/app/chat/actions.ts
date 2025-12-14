'use server';

import { summarizeConversationThread as summarize } from '@/ai/flows/summarize-conversation-thread';
import { z } from 'zod';

const summarizeSchema = z.object({
  thread: z.string(),
});

export async function summarizeConversation(thread: string) {
  try {
    const validatedInput = summarizeSchema.parse({ thread });
    const result = await summarize({ conversationThread: validatedInput.thread });
    return { success: true, summary: result.summary };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input for summarization.' };
    }
    console.error('Summarization failed:', error);
    return { success: false, error: 'Failed to summarize the conversation.' };
  }
}
