import { PageNode } from 'models/Page';

type MetaTags = {
  title?: string;
  description?: string;
  path?: string;
  page?: PageNode;
  pageType?: 'page' | 'post';
};

export default MetaTags;