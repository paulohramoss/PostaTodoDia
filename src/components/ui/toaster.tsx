'use client';
import { ToastProvider, useToast } from './use-toast';

function ToastList(){const {toasts}=useToast();return <div className="fixed bottom-4 right-4 z-50 space-y-2">{toasts.map(t=><div key={t.id} className="rounded-lg bg-slate-900 px-4 py-2 text-white">{t.message}</div>)}</div>}

export function Toaster(){return <ToastProvider><ToastList/></ToastProvider>}
