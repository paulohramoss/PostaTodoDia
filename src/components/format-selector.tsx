'use client';
import { ContentFormat } from '@/types/content';

export function FormatSelector({formats,value,onChange}:{formats:ContentFormat[];value:ContentFormat;onChange:(v:ContentFormat)=>void}){return <select className="w-full rounded-lg border px-3 py-2" value={value} onChange={(e)=>onChange(e.target.value as ContentFormat)}>{formats.map(f=><option key={f}>{f}</option>)}</select>}
