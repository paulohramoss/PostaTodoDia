import { DashboardCard } from '@/components/dashboard-card';

const cards = [
['Sequência de Stories','5 stories com CTA final'],['Post com legenda','Título, legenda, CTA e hashtags'],['Carrossel','6 slides prontos'],['Roteiro de Reels','Gancho e cenas'],['Calendário semanal de conteúdo','7 dias de ideias'],['Ideias de posts','15 ideias rápidas']
];

export default function DashboardPage(){return <div><h1 className="mb-6 text-3xl font-bold">Dashboard</h1><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{cards.map(([title,description])=><DashboardCard key={title} title={title} description={description} />)}</div></div>}
