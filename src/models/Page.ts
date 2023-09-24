import { ImageDataLike } from 'gatsby-plugin-image';

type Page = {
  node: PageNode;
};

export type PageNode = {
  html: string;

  timeToRead?: number;
  excerpt?: string;

  fields: {
    date: string;
    slug: string;
  };

  frontmatter: {
    title: string;
    tags: string[];
    template: string;

    description?: string;
    updated?: string;
    thumbnail?: ImageDataLike;
  };
};

export default Page;
