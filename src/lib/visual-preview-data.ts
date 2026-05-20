import type {
  GeneratedContent,
  GenerateInput,
  VisualPreview,
} from '@/types/content';

type PreviewContext = Partial<GenerateInput>;

type PreviewSpec = Omit<VisualPreview, 'source' | 'imageDataUrl' | 'error'>;

const paletteBySurface: Record<VisualPreview['surface'], { theme: string; accent: string; mood: string }> = {
  story: {
    theme: '#2563eb',
    accent: '#f97316',
    mood: 'energia direta de bastidor, luz natural, sensação de conversa próxima',
  },
  post: {
    theme: '#7c3aed',
    accent: '#14b8a6',
    mood: 'editorial limpo, produto em destaque, composição premium para feed',
  },
  carousel: {
    theme: '#059669',
    accent: '#f59e0b',
    mood: 'layout educativo, profundidade visual, ritmo de apresentação',
  },
  reel: {
    theme: '#f59e0b',
    accent: '#2563eb',
    mood: 'movimento, ação, bastidor real, câmera vertical dinâmica',
  },
  planner: {
    theme: '#e11d48',
    accent: '#0f766e',
    mood: 'mesa de planejamento criativo, calendário, organização visual',
  },
  ideas: {
    theme: '#334155',
    accent: '#f97316',
    mood: 'mural criativo, notas visuais, ideias em processo',
  },
};

function cleanText(value: string | undefined, maxLength = 180): string {
  const text = (value ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

function getContextValue(context: PreviewContext, key: keyof GenerateInput, fallback: string): string {
  const value = context[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function getSurface(content: GeneratedContent): VisualPreview['surface'] {
  switch (content.format) {
    case 'Stories': return 'story';
    case 'Post': return 'post';
    case 'Carrossel': return 'carousel';
    case 'Reels': return 'reel';
    case 'Calendário semanal': return 'planner';
    case 'Ideias rápidas': return 'ideas';
  }
}

function getAspectRatio(surface: VisualPreview['surface']): VisualPreview['aspectRatio'] {
  return surface === 'story' || surface === 'reel' ? '9:16' : '1:1';
}

function getPrimaryCopy(content: GeneratedContent): {
  title: string;
  overlayText: string;
  caption: string;
  cta?: string;
  visualBrief: string;
  sequence?: VisualPreview['sequence'];
} {
  switch (content.format) {
    case 'Stories': {
      const firstStory = content.items[0];
      return {
        title: content.title,
        overlayText: firstStory?.text ?? content.title,
        caption: firstStory?.objective ?? content.cta,
        cta: content.cta,
        visualBrief: firstStory?.visualSuggestion ?? content.title,
        sequence: content.items.map((item) => ({
          label: `Story ${item.story}`,
          title: item.objective,
          text: item.text,
        })),
      };
    }
    case 'Post':
      return {
        title: content.title,
        overlayText: content.title,
        caption: content.caption,
        cta: content.cta,
        visualBrief: content.imageSuggestion,
        sequence: content.hashtags.slice(0, 6).map((hashtag, index) => ({
          label: `#${index + 1}`,
          title: hashtag,
          text: 'Hashtag sugerida para alcance do post',
        })),
      };
    case 'Carrossel': {
      const cover = content.slides[0];
      return {
        title: content.title,
        overlayText: cover?.title ?? content.title,
        caption: cover?.text ?? content.cta,
        cta: content.cta,
        visualBrief: `Capa de carrossel sobre ${content.title}`,
        sequence: content.slides.map((slide) => ({
          label: `Slide ${slide.slide}`,
          title: slide.title,
          text: slide.text,
        })),
      };
    }
    case 'Reels': {
      const firstScene = content.scenes[0];
      return {
        title: content.hook,
        overlayText: firstScene?.screenText ?? content.hook,
        caption: firstScene?.spokenText ?? content.cta,
        cta: content.cta,
        visualBrief: firstScene?.visual ?? content.hook,
        sequence: content.scenes.map((scene) => ({
          label: `Cena ${scene.scene}`,
          title: scene.screenText,
          text: scene.visual,
        })),
      };
    }
    case 'Calendário semanal':
      return {
        title: 'Calendário semanal',
        overlayText: content.days[0]?.theme ?? 'Semana de conteúdo',
        caption: content.days.map((day) => `${day.day}: ${day.theme}`).join(' | '),
        visualBrief: 'Planejamento semanal de conteúdo para Instagram com calendário e peças visuais',
        sequence: content.days.map((day) => ({
          label: day.day,
          title: day.theme,
          text: `${day.format} - ${day.objective}`,
        })),
      };
    case 'Ideias rápidas':
      return {
        title: 'Ideias rápidas',
        overlayText: content.ideas[0]?.title ?? 'Ideias de conteúdo',
        caption: content.ideas[0]?.angle ?? 'Banco de ideias para Instagram',
        visualBrief: 'Quadro criativo com ideias de conteúdo para redes sociais',
        sequence: content.ideas.slice(0, 8).map((idea, index) => ({
          label: `${index + 1}`,
          title: idea.title,
          text: `${idea.suggestedFormat} - ${idea.angle}`,
        })),
      };
  }
}

function escapeSvg(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function createLocalImageDataUrl(spec: PreviewSpec): string {
  const width = spec.aspectRatio === '9:16' ? 720 : 1080;
  const height = spec.aspectRatio === '9:16' ? 1280 : 1080;
  const title = escapeSvg(cleanText(spec.title, 42));
  const product = escapeSvg(cleanText(spec.meta.product, 34));
  const overlay = escapeSvg(cleanText(spec.overlayText, 48));

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${spec.themeColor}"/>
      <stop offset="0.48" stop-color="#0f172a"/>
      <stop offset="1" stop-color="${spec.accentColor}"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="24%" r="60%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <circle cx="${width * 0.18}" cy="${height * 0.22}" r="${width * 0.16}" fill="#ffffff" opacity="0.12"/>
  <circle cx="${width * 0.84}" cy="${height * 0.68}" r="${width * 0.22}" fill="#ffffff" opacity="0.10"/>
  <rect x="${width * 0.08}" y="${height * 0.14}" width="${width * 0.84}" height="${height * 0.68}" rx="38" fill="#ffffff" opacity="0.13"/>
  <rect x="${width * 0.12}" y="${height * 0.18}" width="${width * 0.76}" height="${height * 0.55}" rx="28" fill="#0f172a" opacity="0.22"/>
  <text x="${width * 0.12}" y="${height * 0.80}" fill="#ffffff" font-family="Arial, sans-serif" font-size="${spec.aspectRatio === '9:16' ? 38 : 44}" font-weight="700">${title}</text>
  <text x="${width * 0.12}" y="${height * 0.86}" fill="#ffffff" opacity="0.84" font-family="Arial, sans-serif" font-size="${spec.aspectRatio === '9:16' ? 24 : 30}">${product}</text>
  <text x="${width * 0.12}" y="${height * 0.91}" fill="#ffffff" opacity="0.74" font-family="Arial, sans-serif" font-size="${spec.aspectRatio === '9:16' ? 20 : 24}">${overlay}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function buildInstagramPreviewSpec(
  context: PreviewContext,
  content: GeneratedContent,
): PreviewSpec {
  const surface = getSurface(content);
  const palette = paletteBySurface[surface];
  const copy = getPrimaryCopy(content);
  const format = content.format;
  const niche = getContextValue(context, 'niche', 'negócio local');
  const product = getContextValue(context, 'product', 'oferta principal');
  const goal = getContextValue(context, 'goal', 'atrair clientes');
  const audience = getContextValue(context, 'audience', 'público ideal');

  const prompt = [
    'Crie uma imagem comercial generativa para servir como exemplo visual em um preview de Instagram.',
    `Formato: ${format}. Aspect ratio: ${getAspectRatio(surface)}.`,
    `Nicho: ${niche}. Produto ou serviço: ${product}. Público: ${audience}. Objetivo: ${goal}.`,
    `Cena principal: ${copy.visualBrief}.`,
    `Direção visual: ${palette.mood}; fotografia/editorial brasileira moderna, alta qualidade, composição pronta para social media.`,
    'Não inclua texto legível, logotipos, interface de aplicativo, marca d\'água, celebridades ou pessoas identificáveis.',
    'Se houver pessoas, use adultos genéricos em contexto profissional ou cotidiano.',
  ].join(' ');

  return {
    surface,
    aspectRatio: getAspectRatio(surface),
    prompt,
    alt: `Preview visual para ${format} sobre ${product}`,
    title: cleanText(copy.title, 90),
    overlayText: cleanText(copy.overlayText, 120),
    caption: cleanText(copy.caption, 260),
    cta: cleanText(copy.cta, 120),
    themeColor: palette.theme,
    accentColor: palette.accent,
    meta: {
      format,
      niche,
      goal,
      product,
    },
    sequence: copy.sequence?.map((item) => ({
      label: cleanText(item.label, 24),
      title: cleanText(item.title, 64),
      text: cleanText(item.text, 120),
    })),
  };
}

export function createLocalVisualPreview(
  context: PreviewContext,
  content: GeneratedContent,
  error?: string,
): VisualPreview {
  const spec = buildInstagramPreviewSpec(context, content);

  return {
    ...spec,
    source: 'local',
    imageDataUrl: createLocalImageDataUrl(spec),
    error,
  };
}
