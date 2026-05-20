import { GoogleGenAI } from '@google/genai';
import type { GeneratedContent, GenerateInput, VisualPreview } from '@/types/content';
import {
  buildInstagramPreviewSpec,
  createLocalVisualPreview,
} from '@/lib/visual-preview-data';

export async function generateVisualPreview(
  input: GenerateInput,
  content: GeneratedContent,
): Promise<VisualPreview> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return createLocalVisualPreview(input, content, 'GEMINI_API_KEY não configurada');
  }

  const spec = buildInstagramPreviewSpec(input, content);

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateImages({
      model: process.env.GEMINI_IMAGE_MODEL ?? 'imagen-4.0-generate-001',
      prompt: spec.prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: spec.aspectRatio,
        includeRaiReason: true,
        enhancePrompt: true,
      },
    });

    const generated = response.generatedImages?.find((item) => item.image?.imageBytes);
    const imageBytes = generated?.image?.imageBytes;

    if (!imageBytes) {
      const reason = response.generatedImages?.[0]?.raiFilteredReason;
      throw new Error(reason ?? 'A IA não retornou imagem para o preview');
    }

    return {
      ...spec,
      source: 'ai',
      imageDataUrl: `data:${generated?.image?.mimeType ?? 'image/png'};base64,${imageBytes}`,
      prompt: generated?.enhancedPrompt ?? spec.prompt,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[PostaTodoDia] Visual preview generation failed, using local fallback.', message);
    return createLocalVisualPreview(input, content, message);
  }
}
