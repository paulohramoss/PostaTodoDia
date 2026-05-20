'use server';

import { prisma } from '@/lib/prisma';
import { GenerateInput, VisualPreview } from '@/types/content';

type SavedGeneratedPayload = {
  content: unknown;
  visualPreview?: VisualPreview;
};

function isSavedGeneratedPayload(value: unknown): value is SavedGeneratedPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'content' in value
  );
}

export async function saveContent(
  input: GenerateInput,
  generatedContent: unknown,
  visualPreview?: VisualPreview | null,
) {
  const payload: SavedGeneratedPayload = {
    content: generatedContent,
    ...(visualPreview ? { visualPreview } : {}),
  };

  return prisma.savedContent.create({
    data: { ...input, generatedContent: JSON.stringify(payload) },
  });
}

export async function listContents() {
  const items = await prisma.savedContent.findMany({ orderBy: { createdAt: 'desc' } });
  return items.map((item) => {
    let generatedContent: unknown = null;
    try {
      generatedContent = JSON.parse(item.generatedContent);
    } catch {
      generatedContent = { type: 'legado', raw: item.generatedContent };
    }

    if (isSavedGeneratedPayload(generatedContent)) {
      return {
        ...item,
        generatedContent: generatedContent.content,
        visualPreview: generatedContent.visualPreview,
      };
    }

    return { ...item, generatedContent };
  });
}

export async function deleteContent(id: string) {
  return prisma.savedContent.delete({ where: { id } });
}
