'use client';

import { useTransition } from 'react';
import { deleteContent } from '@/server/actions/content-actions';

export function HistoryList({items}:{items:any[]}){const [pending,start]=useTransition();return <div className="space-y-4">{items.map((item)=><div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{item.format} • {item.niche}</p><p className="text-sm text-slate-600">Objetivo: {item.goal} • {new Date(item.createdAt).toLocaleString('pt-BR')}</p><pre className="mt-3 line-clamp-3 whitespace-pre-wrap text-xs">{JSON.stringify(item.generatedContent,null,2)}</pre></div><button disabled={pending} onClick={()=>start(async()=>{await deleteContent(item.id);window.location.reload();})} className="rounded-lg border px-3 py-2 text-sm">Excluir</button></div></div>)}</div>}
