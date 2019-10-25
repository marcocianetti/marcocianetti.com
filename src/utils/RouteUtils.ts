import kebabCase from 'lodash.kebabcase';

const RouteUtils = {
  generatePathToCategory: function(category: string) {
    const c = category.split(' ').length === 1 ? category.toLowerCase() : kebabCase(category);
    return `/categorie/${c}`;
  },

  generatePathToTag: function(tag: string) {
    return `/tag/${kebabCase(tag)}`;
  },
};

export default RouteUtils;
