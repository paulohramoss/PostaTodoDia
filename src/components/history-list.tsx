'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteContent } from '@/server/actions/content-actions';
import { GeneratedContentPreview } from '@/components/generated-content-preview';

const formatLabels: Record<string, string> = {
  Stories: '📱 Stories',
  Post: '🖼️ Post',
  Carrossel: '🎠 Carrossel',
  Reels: '🎬 Reels',
  'Calendário semanal': '📅 Calendário',
  'Ideias rápidas': '💡 Ideias',
};

export function HistoryList({ items }: { items: any[] }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    start(async () => {
      await deleteContent(id);
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.id} className="group rounded-2xl bg-white shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-900">
                  {formatLabels[item.format] ?? item.format}
                </span>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {item.niche}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {item.goal} · {new Date(item.createdAt).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <span className="text-xs text-slate-400 group-open:hidden">Ver conteúdo ▾</span>
              <span className="hidden text-xs text-slate-400 group-open:inline">Fechar ▴</span>
              <button
                disabled={pending}
                onClick={(e) => { e.preventDefault(); handleDelete(item.id); }}
                className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50"
              >
                Excluir
              </button>
            </div>
          </summary>
          <div className="border-t border-slate-100 px-5 pb-5 pt-4">
            <GeneratedContentPreview
              content={item.generatedContent}
              context={item}
              visualPreview={item.visualPreview}
            />
          </div>
        </details>
      ))}
    </div>
  );
}
