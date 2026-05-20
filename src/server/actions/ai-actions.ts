'use server';

import type { GenerateInput, GenerateResult } from '@/types/content';
import { generateWithAI } from '@/lib/ai/generate-with-ai';
import { generateVisualPreview } from '@/lib/ai/generate-visual-preview';
import { generateContent } from '@/lib/generate-content';

export async function generateContentAction(
  input: GenerateInput
): Promise<GenerateResult & { debugError?: string }> {
  try {
    const content = await generateWithAI(input);
    const visualPreview = await generateVisualPreview(input, content);
    return { content, source: 'ai', visualPreview };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[PostaTodoDia] AI generation failed, using local fallback.', msg);
    const content = generateContent(input);
    const visualPreview = await generateVisualPreview(input, content);
    return { content, source: 'local', visualPreview, debugError: msg };
  }
}
