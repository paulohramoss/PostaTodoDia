'use server';

import { prisma } from '@/lib/prisma';
import { GenerateInput } from '@/types/content';

export async function saveContent(input: GenerateInput, generatedContent: unknown) {
  return prisma.savedContent.create({ data: { ...input, generatedContent: generatedContent as object } });
}

export async function listContents() {
  return prisma.savedContent.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function deleteContent(id: string) {
  return prisma.savedContent.delete({ where: { id } });
}
