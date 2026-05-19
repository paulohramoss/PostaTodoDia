import Link from 'next/link';

const benefits = ['Gera conteúdo em segundos', 'Foco em vender e engajar', 'Pronto para copiar e postar'];
const niches = ['Corretor', 'Imobiliária', 'Personal', 'Nutricionista', 'Clínica de estética', 'Loja local'];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-bold">Crie posts, stories e roteiros para Instagram em poucos segundos</h1>
        <p className="mt-4 text-slate-600">A PostaTodoDia ajuda quem precisa divulgar todos os dias sem travar na criatividade.</p>
        <Link href="/dashboard" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white">Começar agora</Link>
      </section>
      <section><h2 className="mb-4 text-2xl font-semibold">Benefícios</h2><div className="grid gap-4 md:grid-cols-3">{benefits.map((b)=><div key={b} className="rounded-2xl bg-white p-5 shadow-sm">{b}</div>)}</div></section>
      <section><h2 className="mb-4 text-2xl font-semibold">Exemplos</h2><div className="rounded-2xl bg-white p-6 shadow-sm">Story 1: “Você já desistiu de comprar imóvel por medo da burocracia?”<br/>Post: “3 erros que te impedem de vender mais no Instagram”.</div></section>
      <section><h2 className="mb-4 text-2xl font-semibold">Nichos atendidos</h2><div className="flex flex-wrap gap-3">{niches.map((n)=><span key={n} className="rounded-full bg-blue-100 px-4 py-1 text-blue-700">{n}</span>)}</div></section>
      <section className="rounded-3xl bg-blue-600 p-8 text-white"><h2 className="text-2xl font-semibold">Pronto para postar todo dia com confiança?</h2><Link href="/gerar" className="mt-4 inline-block rounded-xl bg-white px-6 py-3 text-blue-700">Gerar conteúdo agora</Link></section>
    </div>
  );
}
