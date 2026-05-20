'use client';

import { Suspense, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import type { GenerateInput, GeneratedContent, VisualPreview } from '@/types/content';
import { ContentCard } from '@/components/content-card';
import { CopyButton } from '@/components/copy-button';
import { SaveButton } from '@/components/save-button';
import { GeneratedContentPreview } from '@/components/generated-content-preview';
import { saveContent } from '@/server/actions/content-actions';
import { generateContentAction } from '@/server/actions/ai-actions';

const options = {
  niche: ['Corretor de imóveis', 'Imobiliária', 'Personal trainer', 'Nutricionista', 'Clínica de estética', 'Loja de roupas', 'Social media', 'Mentor/infoprodutor', 'Barbearia', 'Restaurante', 'Prestador de serviço', 'Outro'],
  goal: ['Vender', 'Divulgar', 'Engajar', 'Motivar', 'Educar', 'Gerar directs', 'Quebrar objeções', 'Atrair seguidores'],
  format: ['Stories', 'Post', 'Carrossel', 'Reels', 'Calendário semanal', 'Ideias rápidas'],
  tone: ['Direto', 'Motivacional', 'Profissional', 'Descontraído', 'Vendedor', 'Educativo', 'Provocativo'],
};

const schema = z.object({
  niche:      z.string().min(1, 'Selecione o nicho'),
  goal:       z.string().min(1, 'Selecione o objetivo'),
  product:    z.string().min(3, 'Informe o produto/serviço'),
  tone:       z.string().min(1, 'Selecione o tom'),
  format:     z.string().min(1, 'Selecione o formato'),
  audience:   z.string().min(3, 'Informe o público-alvo'),
  extraNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Toast = { message: string; type: 'success' | 'error' | 'info' };

function SelectField({ label, name, options: opts, register, error }: {
  label: string; name: keyof FormData; options: string[];
  register: ReturnType<typeof useForm<FormData>>['register']; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">{label}</label>
      <select id={name} {...register(name)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option value="">Selecione...</option>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function InputField({ label, name, placeholder, register, error }: {
  label: string; name: keyof FormData; placeholder?: string;
  register: ReturnType<typeof useForm<FormData>>['register']; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">{label}</label>
      <input id={name} {...register(name)} placeholder={placeholder}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function GerarForm() {
  const [result, setResult]   = useState<GeneratedContent | null>(null);
  const [visualPreview, setVisualPreview] = useState<VisualPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState<Toast | null>(null);
  const searchParams = useSearchParams();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { format: 'Stories', tone: 'Direto' },
  });

  useEffect(() => {
    const format = searchParams.get('format');
    if (format && options.format.includes(format)) setValue('format', format);
  }, [searchParams, setValue]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResult(null);
    setVisualPreview(null);
    try {
      const { content, source, visualPreview: preview, debugError } = await generateContentAction(data as unknown as GenerateInput);
      setResult(content);
      setVisualPreview(preview ?? null);
      if (source === 'ai' && preview?.source === 'ai') {
        showToast('✨ Conteúdo e preview gerados com IA', 'success');
      } else if (source === 'ai') {
        showToast('✨ Conteúdo gerado com IA; preview visual local', 'info');
      } else {
        showToast(`⚡ Fallback local — ${debugError ?? 'IA indisponível'}`, 'info');
      }
    } catch {
      showToast('Erro ao gerar conteúdo. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    try {
      await saveContent(watch() as unknown as GenerateInput, result, visualPreview);
      showToast('Conteúdo salvo no histórico!');
    } catch {
      showToast('Erro ao salvar. Tente novamente.', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Gerador de conteúdo</h1>
        <p className="mt-1 text-slate-500">Preencha os campos e deixe a IA criar seu conteúdo para Instagram.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label="Nicho"       name="niche"  options={options.niche}  register={register} error={errors.niche?.message} />
          <SelectField label="Objetivo"    name="goal"   options={options.goal}   register={register} error={errors.goal?.message} />
          <InputField  label="Produto / Serviço" name="product"  placeholder="Ex: consultoria de tráfego pago" register={register} error={errors.product?.message} />
          <InputField  label="Público-alvo"      name="audience" placeholder="Ex: pequenos empreendedores"     register={register} error={errors.audience?.message} />
          <SelectField label="Tom de voz"  name="tone"   options={options.tone}   register={register} error={errors.tone?.message} />
          <SelectField label="Formato"     name="format" options={options.format} register={register} error={errors.format?.message} />

          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="extraNotes" className="text-sm font-medium text-slate-700">
              Observações extras <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <textarea id="extraNotes" {...register('extraNotes')} rows={3}
              placeholder="Ex: mencionar promoção de lançamento, foco em resultados rápidos, palavras a evitar..."
              className="resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 md:w-auto">
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Gerando conteúdo e preview...
              </>
            ) : (
              <>✨ Gerar com IA</>
            )}
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-blue-50 p-8 text-blue-700">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span className="font-medium">A IA está criando seu conteúdo e a prévia visual do Instagram...</span>
        </div>
      )}

      {result !== null && !loading && (
        <ContentCard title={`Resultado — ${watch('format')}`}>
          <div className="mb-5 flex flex-wrap gap-2">
            <CopyButton value={JSON.stringify(result, null, 2)} onCopied={() => showToast('Copiado!')} />
            <SaveButton onClick={handleSave} />
            <button onClick={handleSubmit(onSubmit)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Gerar novamente
            </button>
          </div>
          <GeneratedContentPreview
            content={result}
            context={watch() as unknown as GenerateInput}
            visualPreview={visualPreview}
          />
        </ContentCard>
      )}

      {toast !== null && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg ${
          toast.type === 'error' ? 'bg-red-600' : toast.type === 'info' ? 'bg-slate-600' : 'bg-slate-900'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default function GerarPage() {
  return (
    <Suspense fallback={<div className="text-slate-400">Carregando...</div>}>
      <GerarForm />
    </Suspense>
  );
}
