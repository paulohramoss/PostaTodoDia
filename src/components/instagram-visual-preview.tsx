'use client';

import {
  Bookmark,
  ChevronRight,
  Clapperboard,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  Send,
  Sparkles,
  Volume2,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import type { GeneratedContent, GenerateInput, VisualPreview } from '@/types/content';
import { createLocalVisualPreview } from '@/lib/visual-preview-data';

type InstagramVisualPreviewProps = {
  content: GeneratedContent;
  context?: Partial<GenerateInput>;
  visualPreview?: VisualPreview | null;
};

const clamp = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: lines,
  overflow: 'hidden',
});

function getImageStyle(preview: VisualPreview, darken = 0.46): CSSProperties {
  return {
    backgroundColor: preview.themeColor,
    backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, ${darken})), url(${preview.imageDataUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
}

function ProfileRow({ preview, compact = false }: { preview: VisualPreview; compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${preview.themeColor}, ${preview.accentColor})` }}
      >
        P
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold ${compact ? 'text-xs text-white' : 'text-sm text-slate-900'}`}>
          posta.todo.dia
        </p>
        <p className={`truncate ${compact ? 'text-[11px] text-white/70' : 'text-xs text-slate-500'}`}>
          {preview.meta.niche}
        </p>
      </div>
    </div>
  );
}

function ActionRow({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`flex items-center justify-between ${color}`}>
      <div className="flex items-center gap-4">
        <Heart className="h-5 w-5" aria-hidden />
        <MessageCircle className="h-5 w-5" aria-hidden />
        <Send className="h-5 w-5" aria-hidden />
      </div>
      <Bookmark className="h-5 w-5" aria-hidden />
    </div>
  );
}

function StoryBars({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(count, 1)}, minmax(0, 1fr))` }}>
      {Array.from({ length: Math.max(count, 1) }).map((_, index) => (
        <div key={index} className="h-1 overflow-hidden rounded-full bg-white/30">
          <div className={`h-full rounded-full bg-white ${index === 0 ? 'w-4/5' : 'w-0'}`} />
        </div>
      ))}
    </div>
  );
}

function VerticalMock({ preview }: { preview: VisualPreview }) {
  const isReel = preview.surface === 'reel';
  const sequenceCount = Math.min(preview.sequence?.length ?? 5, 7);

  return (
    <div className="mx-auto w-full max-w-[330px] rounded-[2rem] bg-slate-950 p-2.5 shadow-2xl shadow-slate-950/30">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem]" style={getImageStyle(preview, 0.72)}>
        <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-slate-950/80 to-transparent px-4 pb-12 pt-4">
          {isReel ? (
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clapperboard className="h-4 w-4" aria-hidden />
                Reels
              </div>
              <MoreHorizontal className="h-5 w-5" aria-hidden />
            </div>
          ) : (
            <div className="space-y-3">
              <StoryBars count={sequenceCount} />
              <div className="flex items-center justify-between text-white">
                <ProfileRow preview={preview} compact />
                <MoreHorizontal className="h-5 w-5 shrink-0" aria-hidden />
              </div>
            </div>
          )}
        </div>

        {isReel && (
          <div className="absolute bottom-28 right-3 z-10 flex flex-col items-center gap-5 text-white drop-shadow">
            <Heart className="h-6 w-6" aria-hidden />
            <MessageCircle className="h-6 w-6" aria-hidden />
            <Send className="h-6 w-6" aria-hidden />
            <Volume2 className="h-5 w-5" aria-hidden />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/78 to-transparent px-4 pb-5 pt-24 text-white">
          {isReel && <ProfileRow preview={preview} compact />}
          <div className="mt-3 max-w-[84%]">
            <p className="text-[11px] font-semibold uppercase text-white/60">
              {isReel ? 'Roteiro visual' : 'Sequência'}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight" style={clamp(3)}>
              {preview.overlayText}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/80" style={clamp(3)}>
              {preview.caption}
            </p>
          </div>

          {isReel ? (
            <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
              <Play className="h-4 w-4 fill-white" aria-hidden />
              <span className="truncate">{preview.cta || preview.title}</span>
            </div>
          ) : (
            <div className="mt-5 flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs text-white/80">
              <span className="min-w-0 flex-1 truncate">Enviar mensagem</span>
              <Send className="h-4 w-4 shrink-0" aria-hidden />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CarouselDots({ count = 1 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: Math.min(Math.max(count, 1), 6) }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-slate-300'}`}
        />
      ))}
    </div>
  );
}

function FeedMock({ preview }: { preview: VisualPreview }) {
  const isCarousel = preview.surface === 'carousel';

  return (
    <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/10">
      <div className="flex items-center justify-between px-4 py-3">
        <ProfileRow preview={preview} />
        <MoreHorizontal className="h-5 w-5 text-slate-700" aria-hidden />
      </div>

      <div className="relative aspect-square" style={getImageStyle(preview, 0.56)}>
        {isCarousel && (
          <div className="absolute right-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-xs font-semibold text-white">
            1/{Math.min(preview.sequence?.length ?? 1, 9)}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-5 pb-5 pt-24 text-white">
          <p className="text-xs font-semibold uppercase text-white/60">
            {isCarousel ? 'Capa do carrossel' : 'Feed post'}
          </p>
          <h3 className="mt-1 text-2xl font-bold leading-tight" style={clamp(3)}>
            {preview.overlayText}
          </h3>
          <p className="mt-2 text-sm text-white/80" style={clamp(2)}>
            {preview.caption}
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-3">
        <ActionRow />
        {isCarousel && <CarouselDots count={preview.sequence?.length} />}
        <p className="text-sm leading-relaxed text-slate-800" style={clamp(3)}>
          <span className="font-semibold">posta.todo.dia</span> {preview.caption}
        </p>
        {preview.cta && (
          <p className="text-sm font-semibold" style={{ color: preview.themeColor }}>
            {preview.cta}
          </p>
        )}
      </div>
    </div>
  );
}

function PlannerMock({ preview }: { preview: VisualPreview }) {
  const items = preview.sequence?.slice(0, 6) ?? [];

  return (
    <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[1.5rem] bg-white shadow-xl shadow-slate-950/10">
      <div className="aspect-square p-4" style={getImageStyle(preview, 0.32)}>
        <div className="flex h-full flex-col justify-end rounded-2xl border border-white/25 bg-white/10 p-4 text-white backdrop-blur-sm">
          <Sparkles className="mb-3 h-6 w-6" aria-hidden />
          <h3 className="text-2xl font-bold leading-tight" style={clamp(3)}>
            {preview.overlayText}
          </h3>
          <p className="mt-2 text-sm text-white/80" style={clamp(3)}>
            {preview.caption}
          </p>
        </div>
      </div>
      <div className="grid gap-2 p-4">
        {items.map((item) => (
          <div key={`${item.label}-${item.title}`} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: preview.themeColor }}
            >
              {item.label}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="truncate text-xs text-slate-500">{item.text}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}

function SequenceSummary({ preview }: { preview: VisualPreview }) {
  const items = preview.sequence?.slice(0, 5) ?? [];
  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase text-white/60">Mapa do conteúdo</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <div key={`${item.label}-${item.title}`} className="rounded-xl border border-white/10 bg-white/10 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                {item.label}
              </span>
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{item.title}</p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-white/60" style={clamp(2)}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InstagramVisualPreview({
  content,
  context,
  visualPreview,
}: InstagramVisualPreviewProps) {
  const preview = visualPreview ?? createLocalVisualPreview({ ...context, format: content.format }, content);
  const isVertical = preview.aspectRatio === '9:16';
  const isPlanner = preview.surface === 'planner' || preview.surface === 'ideas';

  return (
    <section className="overflow-hidden rounded-2xl bg-slate-950 p-4 text-white shadow-sm">
      <div className="grid gap-5 xl:grid-cols-[minmax(280px,430px)_1fr]">
        <div>
          {isVertical ? (
            <VerticalMock preview={preview} />
          ) : isPlanner ? (
            <PlannerMock preview={preview} />
          ) : (
            <FeedMock preview={preview} />
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: preview.themeColor }}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {preview.source === 'ai' ? 'Imagem IA' : 'Preview local'}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                {preview.aspectRatio}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                {preview.meta.format}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-white/60">Preview Instagram</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight" style={clamp(3)}>
                {preview.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70" style={clamp(5)}>
                {preview.caption}
              </p>
            </div>

            {preview.cta && (
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                <p className="text-xs font-semibold uppercase text-white/50">CTA</p>
                <p className="mt-1 text-sm font-semibold text-white">{preview.cta}</p>
              </div>
            )}

            {preview.source === 'local' && preview.error && (
              <p className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs leading-relaxed text-amber-100">
                A imagem da IA não ficou disponível agora; o app montou uma composição local para manter o preview usável.
              </p>
            )}
          </div>

          <SequenceSummary preview={preview} />
        </div>
      </div>
    </section>
  );
}
