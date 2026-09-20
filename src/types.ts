export type ArticleCategory =
  | 'Guides'
  | 'Sports'
  | 'App Updates'
  | 'Troubleshooting';

export interface TableOfContentItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ArticleStep {
  stepNumber: string;
  title?: string;
  text: string;
  url?: string;
}

export interface Article {
  id: string;
  number: string; // '01', '02', '03', '04', '05'
  headerWord: string; // 'DOWNLOAD', 'WATCH', 'UPDATE', 'PC / LAPTOP', 'LOW DATA'
  title: string;
  slug: string;
  category: ArticleCategory;
  description: string;
  content: string;
  steps?: ArticleStep[];
  importantNote?: string;
  performanceTips?: string[];
  rememberPoints?: string[];
  tags: string[];
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  toc?: TableOfContentItem[];
}

export interface AppUpdate {
  id: string;
  title: string;
  version: string;
  releaseDate: string;
  downloadUrl: string;
  compatibility: string;
  whatsNew: string[];
  bugFixes: string[];
  improvements: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Installation' | 'Troubleshooting' | 'Compatibility';
}

export type PageView =
  | 'home'
  | 'latest'
  | 'app-updates'
  | 'guides'
  | 'sports'
  | 'faq'
  | 'about'
  | 'contact'
  | 'article'
  | '404';
