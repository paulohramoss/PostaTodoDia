import type { NicheTemplate } from './types';

export const nicheTemplates: Record<string, NicheTemplate> = {
  'Corretor de imóveis': {
    niche: 'Corretor de imóveis',
    audienceProfile: 'Pessoas entre 28–50 anos buscando comprar imóvel próprio ou investir, têm renda estável mas sentem insegurança no processo de compra, medo de burocracia e medo de fazer um mau negócio.',
    commonPains: [
      'Não sabe por onde começar a busca pelo imóvel',
      'Medo de entrar em financiamento e se arrepender',
      'Não confia em corretores porque sente que só querem vender',
      'Não sabe quais documentos precisa separar',
      'Está cansado de ver imóveis e não se decidir',
    ],
    contentAngles: [
      'Desmistificar o processo de compra passo a passo',
      'Comparar aluguel x financiamento com números reais',
      'Mostrar bastidores de uma negociação bem-sucedida',
      'Dar dicas práticas para análise de imóvel na visita',
      'Revelar erros que compradores cometem e como evitá-los',
      'Apresentar imóveis com detalhes reais de localização e valor',
    ],
    ctas: [
      'Me chama no direct com a palavra IMÓVEL',
      'Comenta "QUERO" que te mando as opções',
      'Salva esse post para quando precisar',
      'Manda mensagem com sua cidade e faixa de valor',
    ],
    forbidden: [
      'Frases genéricas como "realize o sonho da casa própria"',
      'Não mencionar valores ou faixas de preço',
      'Tom excessivamente formal ou jurídico',
      'Prometer aprovação de crédito',
    ],
    examples: [
      'Você paga R$1.800 de aluguel? Sabia que por esse mesmo valor você já financia um apartamento em [bairro]?',
      '3 perguntas que você PRECISA fazer antes de assinar qualquer contrato de compra',
      'Visitei 5 imóveis essa semana. Esse aqui me surpreendeu por um motivo que ninguém esperava',
    ],
  },

  'Imobiliária': {
    niche: 'Imobiliária',
    audienceProfile: 'Clientes buscando comprar, vender ou alugar imóvel, tanto pessoa física quanto pequenos investidores. Querem agilidade, transparência e uma imobiliária que entende seu momento de vida.',
    commonPains: [
      'Demora no atendimento de outras imobiliárias',
      'Falta de transparência no processo de locação/compra',
      'Dificuldade de encontrar imóvel com as especificações certas',
      'Insegurança sobre documentação e garantias',
      'Não saber se o preço pedido é justo',
    ],
    contentAngles: [
      'Portfólio de imóveis com fotos reais e valores honestos',
      'Processo de atendimento diferenciado e humanizado',
      'Educação sobre financiamento e legislação',
      'Histórias reais de clientes que fecharam negócio',
      'Dicas de bairros, valorização e mercado local',
    ],
    ctas: [
      'Me chama no direct com a palavra IMÓVEL',
      'Acessa o link na bio e veja o portfólio completo',
      'Manda o que você busca que te ajudo a encontrar',
    ],
    forbidden: [
      'Fotos genéricas de banco de imagem',
      'Jargões técnicos sem explicação',
      'Prometer valorização garantida',
    ],
    examples: [
      'Esse apartamento de 3 quartos em [bairro] acabou de entrar no nosso portfólio. R$X/mês, vaga e área de lazer incluídos.',
      'Como funciona o processo de aluguel aqui com a gente: do primeiro contato até a entrega das chaves em 5 dias.',
    ],
  },

  'Personal trainer': {
    niche: 'Personal trainer',
    audienceProfile: 'Adultos entre 25–45 anos que querem emagrecer, ganhar massa ou melhorar a saúde. Já tentaram academia sozinhos e desistiram. Sentem falta de orientação personalizada e resultado visível.',
    commonPains: [
      'Vai à academia mas não sabe o que está fazendo',
      'Já perdeu e ganhou peso várias vezes',
      'Não tem tempo para treinar muito',
      'Sente dores por falta de técnica',
      'Não vê resultado mesmo treinando',
      'Medo de se machucar',
    ],
    contentAngles: [
      'Erros comuns na academia que impedem resultado',
      'Desmistificar mitos como "cardio emagrece mais que musculação"',
      'Mostrar transformações reais de alunos (com antes/depois)',
      'Treinos rápidos e práticos para quem tem pouco tempo',
      'Explicar a ciência por trás do treino de forma simples',
      'Mostrar bastidores do trabalho personalizado',
    ],
    ctas: [
      'Me chama no direct com a palavra TREINO',
      'Comenta aqui qual é sua maior dificuldade na academia',
      'Manda mensagem para a gente montar seu plano',
    ],
    forbidden: [
      'Fotos de corpos "perfeitos" sem contexto real',
      'Prometer transformação em X dias sem esforço',
      'Frases motivacionais vazias sem informação prática',
      'Associar saúde exclusivamente à estética',
    ],
    examples: [
      'Esse erro aqui é o motivo pelo qual você treina há 3 meses e não vê resultado',
      'Treino de 30 minutos que meu aluno faz antes do trabalho e perdeu 8kg em 2 meses',
      'Mito: fazer cardio em jejum queima mais gordura. A realidade é diferente',
    ],
  },

  'Nutricionista': {
    niche: 'Nutricionista',
    audienceProfile: 'Adultos que querem emagrecer ou melhorar a alimentação, já fizeram dietas restritivas que não funcionaram, têm relação difícil com comida, e buscam uma abordagem mais sustentável e sem culpa.',
    commonPains: [
      'Já fez mil dietas e sempre voltou ao peso anterior',
      'Sente culpa quando come algo fora da dieta',
      'Não sabe o que é saudável de verdade com tanta informação contraditória',
      'Tem pouco tempo para cozinhar e come mal',
      'Não consegue manter a consistência',
    ],
    contentAngles: [
      'Desfazer mitos alimentares com base em ciência acessível',
      'Mostrar que comer bem não precisa ser chato ou caro',
      'Receitas rápidas e práticas para o dia a dia',
      'Falar sobre a relação emocional com a comida',
      'Comparativos nutricionais de alimentos do dia a dia',
      'Processo de consulta e como funciona na prática',
    ],
    ctas: [
      'Me chama no direct com a palavra DIETA',
      'Comenta aqui o seu maior desafio alimentar',
      'Manda mensagem para agendar sua avaliação',
    ],
    forbidden: [
      'Dietas extremamente restritivas ou radicais',
      'Prometer perda de peso em prazo fixo',
      'Associar saúde exclusivamente a corpo magro',
      'Usar termos como "detox" sem embasamento científico',
    ],
    examples: [
      'Você não tem falta de força de vontade. Você tem uma estratégia errada para o seu estilo de vida.',
      'O que eu como em um dia típico como nutricionista (sem ser chato ou perfeito)',
      'Esse alimento que você acha saudável pode estar sabotando seu resultado',
    ],
  },

  'Clínica de estética': {
    niche: 'Clínica de estética',
    audienceProfile: 'Mulheres entre 25–50 anos que querem cuidar da aparência, têm insegurança com algum aspecto físico específico, pesquisam muito antes de decidir por um procedimento e têm medo de resultado ruim.',
    commonPains: [
      'Medo de procedimento com resultado artificial ou exagerado',
      'Não sabe qual tratamento é indicado para sua queixa',
      'Já teve experiência ruim em outro lugar',
      'Acha caro e não sabe se vale o investimento',
      'Não sabe a diferença entre os tratamentos disponíveis',
    ],
    contentAngles: [
      'Explicar procedimentos de forma simples e transparente',
      'Mostrar resultados reais de pacientes (com autorização)',
      'Comparar tratamentos para mesma queixa',
      'Desmistificar medos comuns sobre procedimentos',
      'Mostrar protocolo de segurança e qualificação da equipe',
      'Conteúdo educativo sobre skincare e cuidados diários',
    ],
    ctas: [
      'Me chama no direct com a palavra ESTÉTICA',
      'Comenta aqui qual é sua principal queixa estética',
      'Manda mensagem para agendar sua avaliação gratuita',
    ],
    forbidden: [
      'Antes/depois exagerado ou irreal',
      'Prometer resultados específicos em número de sessões',
      'Conteúdo que causa insegurança ou body shaming',
      'Comparações negativas de corpos',
    ],
    examples: [
      'Essa paciente veio com manchas e flacidez facial. Depois de 4 sessões do protocolo X, olha a diferença',
      'Qual a diferença entre botox e bioestimulador? Muito confunde os dois',
      'Por que eu nunca faço procedimento sem avaliação prévia — e você também não deveria',
    ],
  },

  'Loja de roupas': {
    niche: 'Loja de roupas',
    audienceProfile: 'Mulheres entre 20–45 anos que gostam de moda mas têm dificuldade de montar looks, se sentem perdidas nas tendências ou têm dificuldade de encontrar peças que sirvam bem.',
    commonPains: [
      'Tem roupa mas sente que não tem nada para vestir',
      'Não sabe combinar peças',
      'Compra por impulso e se arrepende',
      'Dificuldade de encontrar tamanhos adequados',
      'Quer ter estilo mas não sabe por onde começar',
    ],
    contentAngles: [
      'Looks completos com combinações reais',
      'Como usar uma peça de 3 jeitos diferentes',
      'Tendências adaptadas para o dia a dia',
      'Dicas de montagem de guarda-roupa cápsula',
      'Lançamentos e novidades com descrição honesta',
      'Dicas de estilo por tipo físico ou ocasião',
    ],
    ctas: [
      'Me chama no direct com a palavra MODA',
      'Comenta o número da peça que te interessou',
      'Acessa o link na bio para ver o catálogo completo',
    ],
    forbidden: [
      'Apenas fotos de produto sem contexto ou look',
      'Descrições genéricas sem ajudar na decisão de compra',
      'Tom exclusivo ou que exclua tamanhos plus',
    ],
    examples: [
      'Essa calça entrou hoje e já está vendendo rápido. Serve do 36 ao 48 e combina com tudo',
      '3 jeitos de usar a mesma camisa branca — do casual ao arrumado',
      'Montei um look completo por menos de R$200. Olha o resultado',
    ],
  },

  'Social media': {
    niche: 'Social media',
    audienceProfile: 'Empreendedores, donos de negócio local ou prestadores de serviço que precisam de presença digital mas não têm tempo ou conhecimento para gerenciar as próprias redes.',
    commonPains: [
      'Não sabe o que postar',
      'Posta mas não tem engajamento',
      'Não tem tempo para produzir conteúdo',
      'Já contratou freelancer que desapareceu',
      'Não entende métricas nem ROI do social media',
    ],
    contentAngles: [
      'Mostrar resultados reais de clientes gerenciados',
      'Educar sobre importância de consistência e estratégia',
      'Demonstrar processo de trabalho e bastidores',
      'Desmistificar o que funciona de verdade no Instagram',
      'Cases de crescimento de seguidores e engajamento',
    ],
    ctas: [
      'Me chama no direct com a palavra SOCIAL',
      'Comenta "QUERO" que te mando meu portfólio',
      'Manda mensagem para uma proposta personalizada',
    ],
    forbidden: [
      'Prometer número exato de seguidores ou alcance',
      'Usar termos como "viralizar" como garantia',
      'Comparar negativamente com concorrentes',
    ],
    examples: [
      'Esse cliente chegou com 300 seguidores e em 90 dias chegamos a 4.200. O que mudou foi a estratégia, não mágica.',
      'O maior erro de quem tenta gerenciar o próprio Instagram: postar sem objetivo definido',
    ],
  },

  'Mentor/infoprodutor': {
    niche: 'Mentor/infoprodutor',
    audienceProfile: 'Profissionais liberais ou empreendedores que querem monetizar seu conhecimento, lançar um curso ou mentoria, mas têm medo de não ter audiência, não saber precificar ou não saber por onde começar.',
    commonPains: [
      'Sente que não é especialista suficiente para ensinar',
      'Não sabe como atrair alunos sem ter grande audiência',
      'Já tentou lançar algo e não vendeu',
      'Medo de investir em infra e não recuperar',
      'Não sabe precificar seu conhecimento',
    ],
    contentAngles: [
      'Desmistificar a síndrome do impostor',
      'Mostrar que é possível começar com audiência pequena',
      'Explicar modelos de mentoria e infoprodutos',
      'Contar a própria trajetória com números reais',
      'Ensinar sobre posicionamento e nicho',
    ],
    ctas: [
      'Me chama no direct com a palavra MENTORIA',
      'Comenta "QUERO" que te mando os detalhes',
      'Acessa o link na bio para conhecer o programa',
    ],
    forbidden: [
      'Prometer renda passiva sem esforço',
      'Números de faturamento desconexos da realidade do seguidor',
      'Frases como "você só precisa de 1 hora por dia"',
    ],
    examples: [
      'Eu lancei meu primeiro produto com 180 seguidores e faturei R$3.400. Não foi sorte, foi método.',
      'Você não precisa de 10 mil seguidores para vender. Precisa de 100 seguidores certos.',
    ],
  },

  'Barbearia': {
    niche: 'Barbearia',
    audienceProfile: 'Homens entre 18–40 anos que valorizam a aparência, querem um profissional de confiança e buscam uma experiência além do corte — ambiente, atendimento e resultado consistente.',
    commonPains: [
      'Já teve corte errado em outro lugar',
      'Não sabe explicar o que quer',
      'Dificuldade de agendar em horários disponíveis',
      'Quer experimentar algo novo mas tem medo de não ficar bom',
      'Busca fidelidade com um profissional que conheça seu estilo',
    ],
    contentAngles: [
      'Mostrar transformações reais de cortes',
      'Dicas de como cuidar do cabelo e barba entre visitas',
      'Apresentar a equipe e criar conexão com os profissionais',
      'Mostrar o ambiente e a experiência do espaço',
      'Conteúdo educativo sobre estilos de corte',
    ],
    ctas: [
      'Me chama no direct com a palavra CORTE',
      'Comenta o número do look que quer e te passo disponibilidade',
      'Acessa o link na bio para agendar',
    ],
    forbidden: [
      'Fotos de resultado ruim sem contexto',
      'Prometer resultado idêntico ao da foto de referência sem ver o cabelo',
    ],
    examples: [
      'Esse aqui chegou sem saber o que queria. A gente entendeu o estilo dele e entregou isso.',
      'Dica rápida: como manter o fade mais tempo entre os cortes',
    ],
  },

  'Restaurante': {
    niche: 'Restaurante',
    audienceProfile: 'Moradores locais e trabalhadores da região que querem uma boa refeição, buscam custo-benefício e experiência agradável. Decidem onde comer muitas vezes baseados no que veem no Instagram.',
    commonPains: [
      'Cansado das mesmas opções de sempre',
      'Quer comer bem sem gastar muito',
      'Quer saber o que vale a pena pedir antes de ir',
      'Não quer surpresas negativas na conta',
      'Quer um lugar para ocasiões especiais',
    ],
    contentAngles: [
      'Mostrar pratos com descrição que dá fome real',
      'Contar a história dos ingredientes e preparo',
      'Apresentar promoções e combos do dia',
      'Mostrar o ambiente e a equipe',
      'Responder dúvidas frequentes como horário, reserva e cardápio',
    ],
    ctas: [
      'Me chama no direct com a palavra CARDÁPIO',
      'Reserva pelo link na bio ou pelo WhatsApp',
      'Comenta o que quer provar que te mandamos o cardápio completo',
    ],
    forbidden: [
      'Fotos de prato com iluminação ruim',
      'Prometer "o melhor da cidade" sem especificidade',
      'Posts só de promoção sem conteúdo envolvente',
    ],
    examples: [
      'Esse é o nosso prato mais pedido há 3 anos. Filé ao molho de ervas com batata rústica. R$49,90.',
      'Sexta à noite sem planos? A gente tem mesa disponível até às 22h.',
    ],
  },

  'Prestador de serviço': {
    niche: 'Prestador de serviço',
    audienceProfile: 'Pessoas físicas ou pequenas empresas que precisam contratar um serviço especializado, têm medo de contratar errado, preocupação com preço justo e querem alguém confiável.',
    commonPains: [
      'Já foi enganado por prestador que sumiu depois',
      'Não sabe quanto deve custar o serviço',
      'Medo de serviço mal feito que vai gerar mais custo',
      'Dificuldade de encontrar profissional disponível',
      'Não sabe avaliar a qualidade antes de contratar',
    ],
    contentAngles: [
      'Mostrar antes e depois do serviço com contexto real',
      'Explicar o processo de trabalho para gerar confiança',
      'Responder dúvidas frequentes sobre o serviço',
      'Mostrar depoimentos e avaliações de clientes',
      'Educar sobre quando é hora de chamar um profissional',
    ],
    ctas: [
      'Me chama no direct com a palavra SERVIÇO',
      'Manda uma foto do problema que te passo um orçamento',
      'Comenta aqui que te respondo hoje mesmo',
    ],
    forbidden: [
      'Preços sem contexto ou que variam muito sem explicação',
      'Prometer prazos que não consegue cumprir',
      'Fotos de serviço mal acabado como "antes"',
    ],
    examples: [
      'Esse cliente me mandou foto por WhatsApp, fechamos o orçamento em 2 horas e o serviço foi feito no dia seguinte.',
      'Quanto custa realmente instalar X? Fiz um comparativo honesto para você não pagar mais do que deve.',
    ],
  },
};

export const defaultTemplate: NicheTemplate = {
  niche: 'Negócio digital',
  audienceProfile: 'Empreendedores e profissionais que usam Instagram para atrair clientes e divulgar seus serviços ou produtos.',
  commonPains: [
    'Não sabe o que postar',
    'Posta mas não converte em clientes',
    'Não tem tempo para criar conteúdo',
    'Conteúdo parece genérico e não se destaca',
  ],
  contentAngles: [
    'Educação sobre o produto/serviço',
    'Prova social e resultados reais',
    'Bastidores e humanização da marca',
    'Chamadas para ação diretas e claras',
  ],
  ctas: [
    'Me chama no direct',
    'Comenta aqui que te respondo',
    'Acessa o link na bio',
  ],
  forbidden: [
    'Frases genéricas sem especificidade',
    'Conteúdo que poderia ser de qualquer negócio',
  ],
  examples: [
    'Conte uma história real de cliente que obteve resultado',
    'Mostre o processo do seu trabalho de forma honesta',
  ],
};
