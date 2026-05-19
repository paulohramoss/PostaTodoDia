export type ContentFormat = 'Stories' | 'Post' | 'Carrossel' | 'Reels' | 'Calendário semanal' | 'Ideias rápidas';

export type GenerateInput = {
  niche: string;
  goal: string;
  product: string;
  tone: string;
  format: ContentFormat;
  audience: string;
  extraNotes?: string;
};
