import type { GenerateInput, GeneratedContent } from '@/types/content';

const nichoCTAWord: Record<string, string> = {
  'Corretor de imóveis': 'IMÓVEL',
  'Imobiliária': 'IMÓVEL',
  'Personal trainer': 'TREINO',
  'Nutricionista': 'DIETA',
  'Clínica de estética': 'ESTÉTICA',
  'Loja de roupas': 'MODA',
  'Social media': 'SOCIAL',
  'Mentor/infoprodutor': 'MENTORIA',
  'Barbearia': 'CORTE',
  'Restaurante': 'CARDÁPIO',
  'Prestador de serviço': 'SERVIÇO',
};

function getCTA(input: GenerateInput): string {
  const word = nichoCTAWord[input.niche] ?? input.product.split(' ')[0].toUpperCase();
  return `Me chama no direct com a palavra ${word} e eu te explico tudo!`;
}

export function generateContent(input: GenerateInput): GeneratedContent {
  const cta = getCTA(input);
  const { niche, goal, product, tone, audience, extraNotes } = input;

  if (input.format === 'Stories') {
    return {
      format: 'Stories',
      title: `Stories: ${goal} com ${product}`,
      items: [
        {
          story: 1,
          objective: 'Gerar respostas e iniciar conversa',
          text: `${audience}, qual é seu maior desafio com ${product.toLowerCase()} hoje?`,
          visualSuggestion: 'Caixinha de perguntas ou enquete interativa',
        },
        {
          story: 2,
          objective: 'Criar identificação com o público',
          text: `Muita gente em ${niche} trava na hora de ${goal.toLowerCase()} porque não sabe por onde começar. Você também passa por isso?`,
          visualSuggestion: 'Vídeo selfie com texto grande na tela',
        },
        {
          story: 3,
          objective: 'Entregar valor real',
          text: `Dica prática: para ${goal.toLowerCase()} com ${product.toLowerCase()}, o segredo é consistência + estratégia clara.`,
          visualSuggestion: 'Texto com fundo colorido e bullet points',
        },
        {
          story: 4,
          objective: 'Apresentar a solução',
          text: `${extraNotes ? extraNotes + ' — ' : ''}Eu ajudo ${audience} a ${goal.toLowerCase()} com ${product.toLowerCase()} de forma personalizada.`,
          visualSuggestion: 'Foto ou vídeo de bastidor / atendimento real',
        },
        {
          story: 5,
          objective: 'Gerar directs e conversões',
          text: cta,
          visualSuggestion: 'Seta animada apontando para o direct, fundo chamativo',
        },
      ],
      cta,
    };
  }

  if (input.format === 'Post') {
    return {
      format: 'Post',
      title: `Como ${audience} pode ${goal.toLowerCase()} com ${product}`,
      caption: `Se você é ${audience} e ainda não consegue ${goal.toLowerCase()} de verdade, esse post é pra você.\n\nNo nicho de ${niche}, quem comunica com clareza e constância sai na frente.\n\nAqui vão 3 passos práticos:\n\n1️⃣ Defina sua promessa principal — o que você entrega de diferente?\n2️⃣ Mostre provas reais — depoimentos, resultados, bastidores\n3️⃣ Chame pra ação com clareza — diga EXATAMENTE o que a pessoa deve fazer agora\n\n${extraNotes ? extraNotes + '\n\n' : ''}Salva esse post e me conta nos comentários: qual desses passos você já pratica?`,
      cta,
      hashtags: [
        '#instagramparanegocios',
        '#conteudodigital',
        `#${niche.replace(/\s+/g, '').toLowerCase()}`,
        `#${product.replace(/\s+/g, '').toLowerCase()}`,
        '#marketingdigital',
        '#empreendedorismo',
      ],
      imageSuggestion: `Foto profissional mostrando ${product.toLowerCase()} em ação, tom ${tone.toLowerCase()}`,
    };
  }

  if (input.format === 'Carrossel') {
    return {
      format: 'Carrossel',
      title: `Pare de travar para falar sobre ${product}`,
      slides: [
        { slide: 1, title: `Pare de travar para falar sobre ${product}`, text: 'Swipe para descobrir o método que está funcionando →' },
        { slide: 2, title: `O erro mais comum de ${niche}`, text: `Tentar ${goal.toLowerCase()} sem entender o que o público realmente precisa.` },
        { slide: 3, title: 'Passo 1: Conheça sua audiência', text: `Quem é ${audience}? Quais são suas dores em relação a ${product.toLowerCase()}?` },
        { slide: 4, title: 'Passo 2: Crie conteúdo estratégico', text: `Tom ${tone.toLowerCase()} para conectar com ${audience} e gerar desejo ao mesmo tempo.` },
        { slide: 5, title: 'Passo 3: Chame pra ação toda semana', text: `Diga exatamente o que fazer: "Me chama no direct", "Comenta aqui", "Salva esse post".` },
        { slide: 6, title: 'Pronto para aplicar?', text: cta },
      ],
      cta,
    };
  }

  if (input.format === 'Reels') {
    return {
      format: 'Reels',
      hook: `Você está cometendo esse erro ao tentar ${goal.toLowerCase()} no Instagram?`,
      scenes: [
        { scene: 1, visual: 'Selfie ou vídeo direto para câmera', spokenText: `Hoje vou te mostrar por que ${audience} não consegue ${goal.toLowerCase()} mesmo postando todo dia.`, screenText: '❌ O erro que você está cometendo' },
        { scene: 2, visual: 'Tela com texto animado', spokenText: `O problema é simples: falta de mensagem clara sobre ${product.toLowerCase()}. As pessoas não entendem o que você vende.`, screenText: '🔍 O verdadeiro problema' },
        { scene: 3, visual: 'Vídeo explicativo com bullet points', spokenText: `A solução? Crie conteúdo com intenção. Cada post deve ter 1 objetivo: educar, engajar ou converter.${extraNotes ? ' ' + extraNotes : ''}`, screenText: '✅ A solução em 3 passos' },
        { scene: 4, visual: 'Fundo chamativo com seta para o direct', spokenText: cta, screenText: '📲 Me chama no direct agora!' },
      ],
      cta,
    };
  }

  if (input.format === 'Calendário semanal') {
    const plan = [
      { theme: `Dor/problema de ${audience}`, format: 'Stories', caption: `Fale sobre o maior desafio de ${audience} com ${product.toLowerCase()}.`, objective: 'Identificação' },
      { theme: 'Dica educativa', format: 'Post', caption: `Ensine algo prático sobre ${product.toLowerCase()} para ${audience}.`, objective: 'Educação' },
      { theme: 'Bastidor / dia a dia', format: 'Reels', caption: `Mostre como é sua rotina trabalhando com ${product.toLowerCase()}.`, objective: 'Humanização' },
      { theme: 'Prova social / resultado', format: 'Post', caption: `Compartilhe um depoimento ou resultado de cliente em ${niche}.`, objective: 'Conversão' },
      { theme: 'Oferta / chamada para ação', format: 'Stories', caption: cta, objective: 'Vendas' },
      { theme: 'Curiosidade / provocação', format: 'Reels', caption: `Quebre uma crença comum de ${audience} sobre ${product.toLowerCase()}.`, objective: 'Engajamento' },
      { theme: 'Engajamento / descanso', format: 'Stories', caption: `Caixinha de perguntas ou enquete para aproximar do público.`, objective: 'Relacionamento' },
    ];
    return {
      format: 'Calendário semanal',
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => ({
        day,
        theme: plan[i].theme,
        format: plan[i].format,
        caption: plan[i].caption,
        objective: plan[i].objective,
      })),
    };
  }

  return {
    format: 'Ideias rápidas',
    ideas: [
      { title: `3 erros que ${audience} comete ao escolher ${product.toLowerCase()}`, angle: 'Educação por negativo', suggestedFormat: 'Carrossel' },
      { title: `"Você sabia que...?" — curiosidade sobre ${niche}`, angle: 'Curiosidade', suggestedFormat: 'Stories' },
      { title: `Antes e depois com ${product.toLowerCase()}`, angle: 'Prova social', suggestedFormat: 'Post' },
      { title: `Bastidor: como eu preparo ${product.toLowerCase()} para ${audience}`, angle: 'Humanização', suggestedFormat: 'Reels' },
      { title: `Mito ou verdade? 3 crenças sobre ${niche} desmontadas`, angle: 'Educação', suggestedFormat: 'Carrossel' },
      { title: `O que ninguém te conta sobre ${product.toLowerCase()}`, angle: 'Revelação', suggestedFormat: 'Post' },
      { title: `Rotina de quem tem resultado: como ${audience} pode adaptar`, angle: 'Inspiração prática', suggestedFormat: 'Reels' },
      { title: `Dica rápida: 1 hábito que muda tudo em ${niche}`, angle: 'Micro-dica', suggestedFormat: 'Stories' },
      { title: `Depoimento: "${goal} com ${product.toLowerCase()}"`, angle: 'Prova social', suggestedFormat: 'Post' },
      { title: `Enquete: qual é sua maior dificuldade com ${product.toLowerCase()}?`, angle: 'Engajamento', suggestedFormat: 'Stories' },
      { title: `Passo a passo: como funciona trabalhar comigo em ${niche}`, angle: 'Processo e confiança', suggestedFormat: 'Carrossel' },
      { title: `Com vs sem ${product.toLowerCase()}: comparativo honesto`, angle: 'Comparativo', suggestedFormat: 'Post' },
      { title: `Perguntas frequentes de ${audience} sobre ${product.toLowerCase()}`, angle: 'FAQ', suggestedFormat: 'Carrossel' },
      { title: `${goal} em 5 passos para ${audience}`, angle: 'Tutorial', suggestedFormat: 'Carrossel' },
      { title: `Se você ainda não fez isso em ${niche}, pode estar perdendo oportunidades`, angle: 'Provocação', suggestedFormat: 'Reels' },
    ],
  };
}
