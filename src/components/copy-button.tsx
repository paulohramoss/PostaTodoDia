'use client';

export function CopyButton({value,onCopied}:{value:string;onCopied:()=>void}){return <button onClick={async()=>{await navigator.clipboard.writeText(value);onCopied();}} className="rounded-lg border px-3 py-2 text-sm">Copiar</button>}
