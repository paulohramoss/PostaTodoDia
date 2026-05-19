'use client';
import { createContext, useContext, useState } from 'react';

type Toast = { id: number; message: string };
const ToastCtx = createContext<{toast:(m:string)=>void; toasts:Toast[]; remove:(id:number)=>void}>({toast:()=>{},toasts:[],remove:()=>{}});
export function ToastProvider({children}:{children:React.ReactNode}){const [toasts,setToasts]=useState<Toast[]>([]);const toast=(message:string)=>{const id=Date.now();setToasts((t)=>[...t,{id,message}]);setTimeout(()=>setToasts((t)=>t.filter((x)=>x.id!==id)),2500)};const remove=(id:number)=>setToasts((t)=>t.filter((x)=>x.id!==id));return <ToastCtx.Provider value={{toast,toasts,remove}}>{children}</ToastCtx.Provider>}
export const useToast=()=>useContext(ToastCtx);
