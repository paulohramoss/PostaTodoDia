import type { GenerateInput } from '@/types/content';
import { getTemplateByNiche } from '@/lib/templates/get-template-by-niche';

const schemaByFormat: Record<string, string> = {
  Stories: `{
  "format": "Stories",
  "title": "título curto e chamativo para identificar o conteúdo",
  "items": [
    { "story": 1, "objective": "objetivo deste story", "text": "texto/roteiro do story", "visualSuggestion": "sugestão visual detalhada" },
    { "story": 2, "objective": "...", "text": "...", "visualSuggestion": "..." },
    { "story": 3, "objective": "...", "text": "...", "visualSuggestion": "..." },
    { "story": 4, "objective": "...", "text": "...", "visualSuggestion": "..." },
    { "story": 5, "objective": "CTA final", "text": "chamada para ação direta", "visualSuggestion": "..." }
  ],
  "cta": "call to action final da sequência"
}`,

  Post: `{
  "format": "Post",
  "title": "título do post (não aparece na legenda, é para referência)",
  "caption": "legenda completa do post com quebras de linha reais usando \\n",
  "cta": "chamada para ação do post",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6"],
  "imageSuggestion": "descrição detalhada da foto/vídeo ideal para este post"
}`,

  Carrossel: `{
  "format": "Carrossel",
  "title": "título do carrossel (capa - slide 1)",
  "slides": [
    { "slide": 1, "title": "título da capa — deve parar o scroll", "text": "subtítulo curto ou teaser" },
    { "slide": 2, "title": "título do slide 2", "text": "texto explicativo do slide 2" },
    { "slide": 3, "title": "título do slide 3", "text": "texto explicativo do slide 3" },
    { "slide": 4, "title": "título do slide 4", "text": "texto explicativo do slide 4" },
    { "slide": 5, "title": "título do slide 5", "text": "texto explicativo do slide 5" },
    { "slide": 6, "title": "slide final com CTA", "text": "chamada para ação clara" }
  ],
  "cta": "chamada para ação do carrossel"
}`,

  Reels: `{
  "format": "Reels",
  "hook": "primeira frase falada — deve prender em menos de 3 segundos",
  "scenes": [
    { "scene": 1, "visual": "o que aparece na tela", "spokenText": "o que o criador fala", "screenText": "texto sobreposto na tela" },
    { "scene": 2, "visual": "...", "spokenText": "...", "screenText": "..." },
    { "scene": 3, "visual": "...", "spokenText": "...", "screenText": "..." },
    { "scene": 4, "visual": "cena final", "spokenText": "fala da CTA", "screenText": "texto da CTA" }
  ],
  "cta": "chamada para ação ao final do reels"
}`,

  'Calendário semanal': `{
  "format": "Calendário semanal",
  "days": [
    { "day": "Seg", "theme": "tema do dia", "format": "formato (Post/Stories/Reels)", "caption": "legenda ou roteiro resumido", "objective": "objetivo do conteúdo" },
    { "day": "Ter", "theme": "...", "format": "...", "caption": "...", "objective": "..." },
    { "day": "Qua", "theme": "...", "format": "...", "caption": "...", "objective": "..." },
    { "day": "Qui", "theme": "...", "format": "...", "caption": "...", "objective": "..." },
    { "day": "Sex", "theme": "...", "format": "...", "caption": "...", "objective": "..." },
    { "day": "Sáb", "theme": "...", "format": "...", "caption": "...", "objective": "..." },
    { "day": "Dom", "theme": "...", "format": "...", "caption": "...", "objective": "..." }
  ]
}`,

  'Ideias rápidas': `{
  "format": "Ideias rápidas",
  "ideas": [
    { "title": "título da ideia 1", "angle": "ângulo de abordagem", "suggestedFormat": "Post/Stories/Reels/Carrossel" },
    { "title": "título da ideia 2", "angle": "...", "suggestedFormat": "..." },
    { "title": "...", "angle": "...", "suggestedFormat": "..." }
    // 15 ideias no total
  ]
}`,
};

export function buildPrompt(input: GenerateInput): { systemPrompt: string; userPrompt: string } {
  const template = getTemplateByNiche(input.niche);
  const schema = schemaByFormat[input.format] ?? schemaByFormat['Post'];

  const systemPrompt = `Você é um especialista em marketing digital para Instagram focado no mercado brasileiro.
Sua função é criar conteúdo pronto para postar — específico, natural e que realmente converte.

REGRAS ABSOLUTAS:
- Escreva SEMPRE em português brasileiro informal mas profissional
- Seja específico: mencione o produto/serviço, o público e a dor real
- Evite clichês como "acredite no seu potencial", "venha realizar seus sonhos", "você merece"
- O conteúdo deve parecer escrito por um humano que conhece o nicho
- Cada texto deve ser pronto para copiar e postar, sem precisar editar
- Retorne APENAS JSON válido, sem markdown, sem explicações, sem comentários fora do JSON

CONTEXTO DO NICHO — ${template.niche}:
Perfil do público: ${template.audienceProfile}

Principais dores:
${template.commonPains.map((p) => `- ${p}`).join('\n')}

Ângulos de conteúdo que funcionam:
${template.contentAngles.map((a) => `- ${a}`).join('\n')}

CTAs que convertem nesse nicho:
${template.ctas.map((c) => `- ${c}`).join('\n')}

O QUE EVITAR:
${template.forbidden.map((f) => `- ${f}`).join('\n')}

Exemplos de tom e abordagem:
${template.examples.map((e) => `- ${e}`).join('\n')}`;

  const userPrompt = `Gere um conteúdo para Instagram com os seguintes dados:

NICHO: ${input.niche}
PRODUTO/SERVIÇO: ${input.product}
OBJETIVO: ${input.goal}
FORMATO: ${input.format}
TOM DE VOZ: ${input.tone}
PÚBLICO-ALVO: ${input.audience}${input.extraNotes ? `\nOBSERVAÇÕES: ${input.extraNotes}` : ''}

O conteúdo deve ser no formato: ${input.format}

Retorne EXATAMENTE neste schema JSON (sem nada fora do JSON):
${schema}

IMPORTANTE:
- Use linguagem ${input.tone.toLowerCase()} e natural
- Mencione "${input.product}" de forma específica no conteúdo
- Fale diretamente com "${input.audience}"
- O objetivo é: ${input.goal}
- Nada de texto antes ou depois do JSON`;

  return { systemPrompt, userPrompt };
}
