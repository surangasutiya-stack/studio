'use server';
/**
 * @fileOverview Summarizes conversation threads using AI.
 *
 * - summarizeConversationThread - A function that handles the summarization of conversation threads.
 * - SummarizeConversationThreadInput - The input type for the summarizeConversationThread function.
 * - SummarizeConversationThreadOutput - The return type for the summarizeConversationThread function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConversationThreadInputSchema = z.object({
  conversationThread: z.string().describe('The complete conversation thread to summarize.'),
});
export type SummarizeConversationThreadInput = z.infer<
  typeof SummarizeConversationThreadInputSchema
>;

const SummarizeConversationThreadOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the conversation thread.'),
});
export type SummarizeConversationThreadOutput = z.infer<
  typeof SummarizeConversationThreadOutputSchema
>;

export async function summarizeConversationThread(
  input: SummarizeConversationThreadInput
): Promise<SummarizeConversationThreadOutput> {
  return summarizeConversationThreadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConversationThreadPrompt',
  input: {schema: SummarizeConversationThreadInputSchema},
  output: {schema: SummarizeConversationThreadOutputSchema},
  prompt: `You are an AI assistant designed to summarize long conversation threads.

  Please provide a concise and informative summary of the following conversation thread:

  {{{conversationThread}}}
  `,
});

const summarizeConversationThreadFlow = ai.defineFlow(
  {
    name: 'summarizeConversationThreadFlow',
    inputSchema: SummarizeConversationThreadInputSchema,
    outputSchema: SummarizeConversationThreadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
