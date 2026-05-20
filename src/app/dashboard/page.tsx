import Link from 'next/link';

const cards = [
  {
    format: 'Stories',
    icon: '📱',
    title: 'Sequência de Stories',
    description: '5 stories com progressão estratégica e CTA final para gerar directs.',
    color: 'blue',
  },
  {
    format: 'Post',
    icon: '🖼️',
    title: 'Post com legenda',
    description: 'Título chamativo, legenda completa, CTA e hashtags prontos para publicar.',
    color: 'violet',
  },
  {
    format: 'Carrossel',
    icon: '🎠',
    title: 'Carrossel',
    description: '6 slides com progressão de valor, do problema à solução e chamada final.',
    color: 'emerald',
  },
  {
    format: 'Reels',
    icon: '🎬',
    title: 'Roteiro de Reels',
    description: 'Gancho poderoso + cenas roteirizadas para gravar em minutos.',
    color: 'amber',
  },
  {
    format: 'Calendário semanal',
    icon: '📅',
    title: 'Calendário semanal',
    description: '7 dias de conteúdo planejado com tema, formato e legenda para cada dia.',
    color: 'rose',
  },
  {
    format: 'Ideias rápidas',
    icon: '💡',
    title: 'Ideias de posts',
    description: '15 ideias de conteúdo prontas para você escolher e adaptar ao seu estilo.',
    color: 'slate',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; btn: string }> = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-100',    btn: 'bg-blue-600 hover:bg-blue-700' },
  violet:  { bg: 'bg-violet-50',  text: 'text-violet-600',  border: 'border-violet-100',  btn: 'bg-violet-600 hover:bg-violet-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-100',   btn: 'bg-amber-500 hover:bg-amber-600' },
  rose:    { bg: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-100',    btn: 'bg-rose-600 hover:bg-rose-700' },
  slate:   { bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200',   btn: 'bg-slate-700 hover:bg-slate-800' },
};

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-500">Escolha um formato e gere seu conteúdo em segundos.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const c = colorMap[card.color];
          return (
            <div key={card.format} className={`flex flex-col rounded-2xl border ${c.border} bg-white p-6 shadow-sm`}>
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} text-2xl`}>
                {card.icon}
              </div>
              <h2 className="font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-1 flex-1 text-sm text-slate-500">{card.description}</p>
              <Link
                href={`/gerar?format=${encodeURIComponent(card.format)}`}
                className={`mt-5 rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white transition ${c.btn}`}
              >
                Gerar {card.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
