import Link from 'next/link';

export function DashboardCard({title,description}:{title:string;description:string}){return <Link href="/gerar" className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-slate-600">{description}</p></Link>}
