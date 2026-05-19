'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { generateContent } from '@/lib/generate-content';
import { ContentCard } from '@/components/content-card';
import { CopyButton } from '@/components/copy-button';
import { SaveButton } from '@/components/save-button';
import { GeneratedContentPreview } from '@/components/generated-content-preview';
import { saveContent } from '@/server/actions/content-actions';

const options = {
  niche: ['Corretor de imóveis','Imobiliária','Personal trainer','Nutricionista','Clínica de estética','Loja de roupas','Social media','Mentor/infoprodutor','Barbearia','Restaurante','Prestador de serviço','Outro'],
  goal: ['Vender','Divulgar','Engajar','Motivar','Educar','Gerar directs','Quebrar objeções','Atrair seguidores'],
  format: ['Stories','Post','Carrossel','Reels','Calendário semanal','Ideias rápidas'],
  tone: ['Direto','Motivacional','Profissional','Descontraído','Vendedor','Educativo','Provocativo'],
};

const schema = z.object({ niche:z.string().min(1,'Selecione o nicho'), goal:z.string().min(1), product:z.string().min(3,'Informe produto/serviço'), tone:z.string().min(1), format:z.string().min(1), audience:z.string().min(3,'Informe o público-alvo'), extraNotes:z.string().optional() });

type FormData = z.infer<typeof schema>;

export default function GerarPage(){
  const [result,setResult]=useState<unknown>(null); const [loading,setLoading]=useState(false); const [toast,setToast]=useState<string | null>(null);
  const {register,handleSubmit,formState:{errors},watch}=useForm<FormData>({resolver:zodResolver(schema),defaultValues:{format:'Stories'}});
  const onSubmit = async (data:FormData)=>{setLoading(true); await new Promise(r=>setTimeout(r,500)); setResult(generateContent(data as never)); setLoading(false);};
  const showToast=(m:string)=>{setToast(m);setTimeout(()=>setToast(null),2000)};
  return <div className="space-y-6"><h1 className="text-3xl font-bold">Gerador de conteúdo</h1>
  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">{(['niche','goal','product','tone','format','audience','extraNotes'] as const).map((f)=><label key={f} className="text-sm font-medium">{f}<input className="mt-1 w-full rounded-lg border px-3 py-2" list={f in options?f:undefined} {...register(f)} />{f in options && <datalist id={f}>{(options as any)[f].map((o:string)=><option key={o} value={o} />)}</datalist>}<span className="text-xs text-red-500">{errors[f]?.message}</span></label>)}<button disabled={loading} className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white">{loading?'Gerando...':'Gerar conteúdo'}</button></form>
  {result && <ContentCard title={`Resultado (${watch('format')})`}><div className="mb-4 flex gap-2"><CopyButton value={JSON.stringify(result,null,2)} onCopied={()=>showToast('Conteúdo copiado com sucesso!')} /><SaveButton onClick={async()=>{await saveContent(watch() as FormData, result);showToast('Conteúdo salvo no histórico!')}} /><button onClick={handleSubmit(onSubmit)} className="rounded-lg border px-3 py-2 text-sm">Gerar novamente</button></div><GeneratedContentPreview content={result}/></ContentCard>}
  {toast && <div className="fixed bottom-4 right-4 rounded-lg bg-slate-900 px-4 py-2 text-white">{toast}</div>}
  </div>;
}
