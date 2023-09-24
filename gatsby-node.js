const path = require('path');
const moment = require('moment');
const kebabCase = require('lodash.kebabcase');

const RouteUtils = {
  generatePathToTag: function (tag) {
    return `/tag/${kebabCase(tag)}`;
  },
};

const DateUtils = {
  parse: function (date) {
    return moment(date, 'DD-MM-YYYY');
  },
};

const postNodes = [];

function addSiblingNodes(createNodeField) {
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

    return 0;
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
      value: prevNode.frontmatter.title,
    });

    createNodeField({
      node: currNode,
      name: 'prevSlug',
      value: prevNode.fields.slug,
    });
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${node.frontmatter.slug}`;
    } else {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    }

    switch (fileNode.sourceInstanceName) {
      case 'posts':
        slug = `/articoli` + slug;
        break;
    }

    // Create date field
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')
    ) {
      const date = new Date(node.frontmatter.date);

      createNodeField({
        node,
        name: 'date',
        value: date.toISOString(),
      });
    }

    // Create slug field
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    postNodes.push(node);
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type;
  const { createNodeField } = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
};

function removeTrailingSlashes(path) {
  return path === `/` ? path : path.replace(/\/$/, ``);
}

async function createPages({ graphql, actions }) {
  const { createPage, createRedirect } = actions;

  // Redirects
  createRedirect({
    fromPath: `/categorie`,
    toPath: `/tag`,
  });

  createRedirect({
    fromPath: `/categorie/*`,
    toPath: `/tag/*`,
  });

  const pageTemplate = path.resolve('src/templates/Page.tsx');
  const postTemplate = path.resolve('src/templates/Post.tsx');
  const tagTemplate = path.resolve('src/templates/Tag.tsx');

  try {
    const res = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                template
                tags
              }
              fields {
                slug
                date
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

    const tags = new Set();

    res.data.allMarkdownRemark.edges.forEach((edge) => {
      // Add tags
      if (edge.node.frontmatter.tags) {
        edge.node.frontmatter.tags.forEach((tag) => {
          tags.add(tag);
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
    Array.from(tags).forEach((tag) => {
      createPage({
        path: RouteUtils.generatePathToTag(tag),
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }
}

exports.createPages = createPages;
