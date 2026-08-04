import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getSiteSettings() {
  const settings = await reader.singletons.siteSettings.read();
  
  return {
    email: settings?.email?.trim() || 'owasaghedo2@gmail.com',
    twitterUrl: settings?.twitterUrl?.trim() || 'https://x.com/KRAghedo',
    facebookUrl: settings?.facebookUrl?.trim() || 'https://www.facebook.com/share/1DSUPtEhqk',
  };
}
