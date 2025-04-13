
import { marked } from 'marked';

export const renderMarkdown = (markdown: string): string => {
  // Since marked can return a Promise<string> in async mode, we need to ensure we're using the sync version
  // or properly handle the async nature
  return marked.parse(markdown, { async: false }) as string;
};
