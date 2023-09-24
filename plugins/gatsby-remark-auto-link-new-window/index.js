const visit = require('unist-util-visit');

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'link', (node) => {
    // Check if link is external by checking if the "url" attribute starts with http.
    if (node.url.startsWith('http')) {
      if (!node.data) {
        // hProperties refers to the HTML attributes of the node in question.
        // Ensure this object is added to the node.
        node.data = { hProperties: {} };
      }

      // Assign the 'target' attribute.
      node.data.hProperties = Object.assign(
        {},
        node.data.hProperties,
        {
          target: '_blank',
        }
      );
    }
  });

  return markdownAST;
};
