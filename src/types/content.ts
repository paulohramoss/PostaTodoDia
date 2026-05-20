export type ContentFormat =
  | 'Stories'
  | 'Post'
  | 'Carrossel'
  | 'Reels'
  | 'Calendário semanal'
  | 'Ideias rápidas';

export type GenerateInput = {
  niche: string;
  goal: string;
  product: string;
  tone: string;
  format: ContentFormat;
  audience: string;
  extraNotes?: string;
};

// ── Unified content structures (used by both AI and local fallback) ──────────

export type StoriesContent = {
  format: 'Stories';
  title: string;
  items: {
    story: number;
    objective: string;
    text: string;
    visualSuggestion: string;
  }[];
  cta: string;
};

export type PostContent = {
  format: 'Post';
  title: string;
  caption: string;
  cta: string;
  hashtags: string[];
  imageSuggestion: string;
};

export type CarrosselContent = {
  format: 'Carrossel';
  title: string;
  slides: {
    slide: number;
    title: string;
    text: string;
  }[];
  cta: string;
};

export type ReelsContent = {
  format: 'Reels';
  hook: string;
  scenes: {
    scene: number;
    visual: string;
    spokenText: string;
    screenText: string;
  }[];
  cta: string;
};

export type CalendarioContent = {
  format: 'Calendário semanal';
  days: {
    day: string;
    theme: string;
    format: string;
    caption: string;
    objective: string;
  }[];
};

export type IdeiasContent = {
  format: 'Ideias rápidas';
  ideas: {
    title: string;
    angle: string;
    suggestedFormat: string;
  }[];
};

export type GeneratedContent =
  | StoriesContent
  | PostContent
  | CarrosselContent
  | ReelsContent
  | CalendarioContent
  | IdeiasContent;

export type InstagramPreviewSurface =
  | 'story'
  | 'post'
  | 'carousel'
  | 'reel'
  | 'planner'
  | 'ideas';

export type VisualPreview = {
  surface: InstagramPreviewSurface;
  aspectRatio: '1:1' | '9:16';
  source: 'ai' | 'local';
  imageDataUrl?: string;
  prompt: string;
  alt: string;
  title: string;
  overlayText: string;
  caption: string;
  cta?: string;
  themeColor: string;
  accentColor: string;
  meta: {
    format: ContentFormat;
    niche: string;
    goal: string;
    product: string;
  };
  sequence?: {
    label: string;
    title: string;
    text: string;
  }[];
  error?: string;
};

export type GenerateResult = {
  content: GeneratedContent;
  source: 'ai' | 'local';
  visualPreview?: VisualPreview;
};
