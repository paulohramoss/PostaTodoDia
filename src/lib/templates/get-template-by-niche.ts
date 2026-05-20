import { nicheTemplates, defaultTemplate } from './niches';
import type { NicheTemplate } from './types';

export function getTemplateByNiche(niche: string): NicheTemplate {
  return nicheTemplates[niche] ?? defaultTemplate;
}
