import { ImageDataLike } from 'gatsby-plugin-image';

type Page = {
  node: PageNode;
};

export type PageNode = {
  html: string;
  tableOfContents?: string;

  timeToRead?: number;
  excerpt?: string;

  fields: {
    date: string;
    slug: string;
    
    updated?: string;
  };

  frontmatter: {
    title: string;
    tags: string[];
    template: string;

    description?: string;
    thumbnail?: ImageDataLike;
  };
};

export default Page;
