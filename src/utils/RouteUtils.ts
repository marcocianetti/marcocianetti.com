import kebabCase from 'lodash.kebabcase';

const RouteUtils = {
  generatePathToTag: function (tag: string) {
    return `/tag/${kebabCase(tag)}`;
  },
};

export default RouteUtils;
