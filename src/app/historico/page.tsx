import { EmptyState } from '@/components/empty-state';
import { HistoryList } from '@/components/history-list';
import { listContents } from '@/server/actions/content-actions';

export default async function HistoricoPage(){const items=await listContents();return <div><h1 className="mb-6 text-3xl font-bold">Histórico</h1>{items.length===0?<EmptyState title="Nenhum conteúdo salvo ainda." />:<HistoryList items={items as any[]} />}</div>}
