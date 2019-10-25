import { GatsbyImageProps } from 'gatsby-image';

type Page = {
  node: PageNode;
};

export type PageNode = {
  html: string;

  timeToRead?: number;
  excerpt?: string;

  frontmatter: {
    title: string;
    tags: string[];
    categories: string[];
    date: string;
    template: string;

    description?: string;
    updated?: string;
    thumbnail?: {
      childImageSharp: GatsbyImageProps;
    };
  };

  fields: {
    slug: string;
  };
};

export default Page;
