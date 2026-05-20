import Link from 'next/link';

const benefits = [
  { icon: '⚡', title: 'Gera em segundos', desc: 'Preencha o formulário e tenha stories, posts e reels prontos para postar.' },
  { icon: '🎯', title: 'Focado em vender', desc: 'Cada conteúdo é pensado para engajar, gerar directs e converter seguidores.' },
  { icon: '📋', title: 'Pronto para copiar', desc: 'Legenda, CTA e hashtags no formato certo. Só copiar e postar.' },
];

const niches = [
  { emoji: '🏠', label: 'Corretor' },
  { emoji: '💪', label: 'Personal' },
  { emoji: '🥗', label: 'Nutricionista' },
  { emoji: '✨', label: 'Estética' },
  { emoji: '👗', label: 'Loja de roupas' },
  { emoji: '✂️', label: 'Barbearia' },
  { emoji: '🍽️', label: 'Restaurante' },
  { emoji: '📲', label: 'Social Media' },
];

const formats = [
  { icon: '📱', label: 'Stories', desc: '5 stories com CTA final' },
  { icon: '🖼️', label: 'Post', desc: 'Título, legenda e hashtags' },
  { icon: '🎠', label: 'Carrossel', desc: '6 slides estratégicos' },
  { icon: '🎬', label: 'Reels', desc: 'Gancho + roteiro de cenas' },
  { icon: '📅', label: 'Calendário', desc: '7 dias de conteúdo' },
  { icon: '💡', label: 'Ideias', desc: '15 ideias prontas' },
];

export default function HomePage() {
  return (
    <div className="space-y-20">

      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-16 text-white md:px-14">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
            Para quem precisa postar todo dia 🚀
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Crie posts, stories e roteiros para Instagram em segundos
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            A PostaTodoDia gera conteúdo personalizado para o seu nicho, produto e público — sem travar na criatividade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gerar"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Gerar conteúdo agora
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver formatos
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Por que usar a PostaTodoDia?</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="text-3xl">{b.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{b.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formatos */}
      <section>
        <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">6 formatos de conteúdo</h2>
        <p className="mb-8 text-center text-slate-500">Escolha o formato certo para cada momento da sua estratégia.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formats.map((f) => (
            <div key={f.label} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <p className="font-semibold text-slate-900">{f.label}</p>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nichos */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Feito para o seu nicho</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {niches.map((n) => (
            <span key={n.label} className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm">
              {n.emoji} {n.label}
            </span>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="rounded-3xl bg-slate-900 px-8 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">Pronto para postar todo dia com confiança?</h2>
        <p className="mt-3 text-slate-400">Chega de travar. Gere seu conteúdo agora e saia na frente.</p>
        <Link
          href="/gerar"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Começar de graça
        </Link>
      </section>

    </div>
  );
}
