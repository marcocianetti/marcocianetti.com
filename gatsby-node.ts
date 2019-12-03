import * as path from 'path';
import kebabCase from 'lodash.kebabcase';
import Page, { PageNode } from './src/models/Page';
import RouteUtils from './src/utils/RouteUtils';
import DateUtils from './src/utils/DateUtils';

const postNodes: PageNode[] = [];

function addSiblingNodes(createNodeField: any) {
  postNodes.sort((nodeA, nodeB) => {

    if (!nodeA.frontmatter.date && !nodeB.frontmatter.date) {
      return 0;
    }

    if (!nodeA.frontmatter.date) {
      return 1;
    }

    if (!nodeB.frontmatter.date) {
      return -1;
    }

    const dateA = DateUtils.parse(nodeA.frontmatter.date);
    const dateB = DateUtils.parse(nodeB.frontmatter.date);

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0
  });

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 >= 0 ? i - 1 : postNodes.length - 1;
    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];

    createNodeField({
      node: currNode,
      name: 'nextTitle',
      value: nextNode.frontmatter.title,
    });

    createNodeField({
      node: currNode,
      name: 'nextSlug',
      value: nextNode.fields.slug,
    });

    createNodeField({
      node: currNode,
      name: 'prevTitle',
      value: prevNode.frontmatter.title!,
    });

    createNodeField({
      node: currNode,
      name: 'prevSlug',
      value: prevNode.fields.slug!,
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}`;
    } else {
      slug = `/${parsedFilePath.dir}`;
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
        slug = `/${node.frontmatter.slug}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = new Date(node.frontmatter.date);

        createNodeField({
          node,
          name: 'date',
          value: date.toISOString(),
        });
      }
    }

    createNodeField({ node, name: 'slug', value: slug });
    postNodes.push(node);
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type, actions }: any) => {
  const { name } = type;
  const { createNodeField } = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
};

function removeTrailingSlashes(path: string): string {
  return (path === `/` ? path : path.replace(/\/$/, ``));
}

function onCreatePage({ page, actions }: any) {
  const { createPage, deletePage } = actions;
  const oldPage = Object.assign({}, page);

  // Remove trailing slash unless page is /
  page.path = removeTrailingSlashes(page.path);

  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage);
    createPage(page);
  }
}

async function createPages({ graphql, actions }: any) {
  const { createPage } = actions;
  const pageTemplate = path.resolve('src/templates/Page.tsx');
  const postTemplate = path.resolve('src/templates/Post.tsx');
  const tagTemplate = path.resolve('src/templates/Tag.tsx');
  const categoryTemplate = path.resolve('src/templates/Category.tsx');

  try {
    const res = await graphql(`
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    template
                    tags
                    categories
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `);

    if (res.errors) {
      console.error('Pages GraphQL error: ', res.errors);
      return;
    }

    const tags = new Set<string>();
    const categories = new Set<string>();

    res.data.allMarkdownRemark.edges.forEach((edge: Page) => {

      // Add tags
      if (edge.node.frontmatter!.tags) {
        edge.node.frontmatter!.tags.forEach(tag => {
          tags.add(tag);
        });
      }

      // Add categories
      if (edge.node.frontmatter.categories) {
        edge.node.frontmatter.categories.forEach(category => {
          categories.add(category);
        });
      }

      // Create a page, using the right template
      switch (edge.node.frontmatter.template) {
        case 'page':
          createPage({
            path: edge.node.fields.slug,
            component: pageTemplate,
            context: {
              slug: edge.node.fields.slug,
            },
          });
          break;
        case 'post':
          createPage({
            path: edge.node.fields.slug,
            component: postTemplate,
            context: {
              slug: edge.node.fields.slug,
            },
          });
          break;
      }

    });

    // Create tag pages
    Array.from(tags).forEach(tag => {
      createPage({
        path: RouteUtils.generatePathToTag(tag),
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });

    // Create category pages
    Array.from(categories).forEach(category => {
      createPage({
        path: RouteUtils.generatePathToCategory(category),
        component: categoryTemplate,
        context: {
          category,
        },
      });
    });

  } catch (e) {
    console.error(e);
  }
}

exports.createPages = createPages;

exports.onCreatePage = onCreatePage;
