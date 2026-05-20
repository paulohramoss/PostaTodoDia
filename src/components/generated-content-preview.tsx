'use client';

import type {
  GeneratedContent,
  GenerateInput,
  VisualPreview,
  StoriesContent,
  PostContent,
  CarrosselContent,
  ReelsContent,
  CalendarioContent,
  IdeiasContent,
} from '@/types/content';
import { InstagramVisualPreview } from '@/components/instagram-visual-preview';

function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate' }) {
  const colors = {
    blue:    'bg-blue-100 text-blue-700',
    violet:  'bg-violet-100 text-violet-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber:   'bg-amber-100 text-amber-700',
    rose:    'bg-rose-100 text-rose-700',
    slate:   'bg-slate-100 text-slate-600',
  };
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>{children}</span>;
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="text-sm text-slate-800">{children}</div>
    </div>
  );
}

function CTABox({ cta }: { cta: string }) {
  return (
    <Section label="Call to Action">
      <p className="rounded-lg bg-blue-50 px-3 py-2.5 font-medium text-blue-800">{cta}</p>
    </Section>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

function StoriesPreview({ data }: { data: StoriesContent }) {
  return (
    <div className="space-y-4">
      {data.title && (
        <Section label="Título">
          <p className="font-semibold text-slate-900">{data.title}</p>
        </Section>
      )}
      <div className="space-y-3">
        {data.items.map((s) => (
          <div key={s.story} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {s.story}
              </span>
              <Badge color="blue">{s.objective}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-slate-800">{s.text}</p>
            <p className="mt-2 text-xs text-slate-400">📸 {s.visualSuggestion}</p>
          </div>
        ))}
      </div>
      <CTABox cta={data.cta} />
    </div>
  );
}

// ── Post ─────────────────────────────────────────────────────────────────────

function PostPreview({ data }: { data: PostContent }) {
  return (
    <div className="space-y-5">
      <Section label="Título">
        <p className="font-semibold text-slate-900">{data.title}</p>
      </Section>
      <Section label="Legenda">
        <p className="whitespace-pre-line leading-relaxed">{data.caption}</p>
      </Section>
      <CTABox cta={data.cta} />
      <Section label="Hashtags">
        <div className="flex flex-wrap gap-1.5">
          {data.hashtags.map((h) => (
            <Badge key={h} color="violet">{h}</Badge>
          ))}
        </div>
      </Section>
      <Section label="Sugestão de imagem">
        <p className="text-slate-500">📷 {data.imageSuggestion}</p>
      </Section>
    </div>
  );
}

// ── Carrossel ─────────────────────────────────────────────────────────────────

function CarrosselPreview({ data }: { data: CarrosselContent }) {
  return (
    <div className="space-y-4">
      {data.title && (
        <Section label="Tema do Carrossel">
          <p className="font-semibold text-slate-900">{data.title}</p>
        </Section>
      )}
      <div className="space-y-3">
        {data.slides.map((s) => (
          <div key={s.slide} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                {s.slide}
              </span>
              <p className="font-semibold text-slate-900">{s.title}</p>
            </div>
            <p className="pl-8 text-sm text-slate-600">{s.text}</p>
          </div>
        ))}
      </div>
      <CTABox cta={data.cta} />
    </div>
  );
}

// ── Reels ─────────────────────────────────────────────────────────────────────

function ReelsPreview({ data }: { data: ReelsContent }) {
  return (
    <div className="space-y-5">
      <Section label="Gancho (Hook)">
        <p className="rounded-lg bg-amber-50 px-3 py-2.5 font-semibold text-amber-900">{data.hook}</p>
      </Section>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Cenas</p>
        {data.scenes.map((s) => (
          <div key={s.scene} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {s.scene}
              </span>
              <Badge color="amber">{s.screenText}</Badge>
            </div>
            <p className="text-sm text-slate-700"><span className="font-medium">Fala:</span> {s.spokenText}</p>
            <p className="mt-1 text-xs text-slate-400">🎬 Visual: {s.visual}</p>
          </div>
        ))}
      </div>
      <CTABox cta={data.cta} />
    </div>
  );
}

// ── Calendário ────────────────────────────────────────────────────────────────

const formatColors: Record<string, 'blue' | 'violet' | 'amber'> = {
  Stories: 'blue',
  Post: 'violet',
  Reels: 'amber',
};

function CalendarPreview({ data }: { data: CalendarioContent }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      {data.days.map((d, i) => (
        <div key={d.day} className={`flex gap-4 p-4 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="flex w-10 flex-shrink-0 flex-col items-center">
            <span className="font-bold text-slate-900">{d.day}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <p className="font-medium text-slate-800">{d.theme}</p>
              <Badge color={formatColors[d.format] ?? 'slate'}>{d.format}</Badge>
              <Badge color="emerald">{d.objective}</Badge>
            </div>
            <p className="text-sm text-slate-500">{d.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Ideias rápidas ────────────────────────────────────────────────────────────

const ideiaFormatColors: Record<string, 'blue' | 'violet' | 'amber' | 'emerald'> = {
  Post: 'violet',
  Stories: 'blue',
  Reels: 'amber',
  Carrossel: 'emerald',
};

function IdeiasPreview({ data }: { data: IdeiasContent }) {
  return (
    <div className="space-y-2">
      {data.ideas.map((idea, i) => (
        <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-800">{idea.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">{idea.angle}</span>
                <Badge color={ideiaFormatColors[idea.suggestedFormat] ?? 'slate'}>{idea.suggestedFormat}</Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function GeneratedContentPreview({
  content,
  context,
  visualPreview,
  onVisualPreviewChange,
}: {
  content: unknown;
  context?: Partial<GenerateInput>;
  visualPreview?: VisualPreview | null;
  onVisualPreviewChange?: (preview: VisualPreview) => void;
}) {
  if (!content || typeof content !== 'object' || !('format' in content)) {
    return (
      <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm">
        {JSON.stringify(content, null, 2)}
      </pre>
    );
  }

  const data = content as GeneratedContent;

  return (
    <div className="space-y-6">
      <InstagramVisualPreview
        content={data}
        context={context}
        visualPreview={visualPreview}
        onVisualPreviewChange={onVisualPreviewChange}
      />

      <div className="space-y-4">
        {data.format === 'Stories'           && <StoriesPreview  data={data} />}
        {data.format === 'Post'              && <PostPreview     data={data} />}
        {data.format === 'Carrossel'         && <CarrosselPreview data={data} />}
        {data.format === 'Reels'             && <ReelsPreview    data={data} />}
        {data.format === 'Calendário semanal' && <CalendarPreview  data={data} />}
        {data.format === 'Ideias rápidas'    && <IdeiasPreview   data={data} />}
      </div>
    </div>
  );
}
