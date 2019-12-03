var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path = __importStar(require("path"));
var lodash_kebabcase_1 = __importDefault(require("lodash.kebabcase"));
var RouteUtils_1 = __importDefault(require("./src/utils/RouteUtils"));
var DateUtils_1 = __importDefault(require("./src/utils/DateUtils"));
var postNodes = [];
function addSiblingNodes(createNodeField) {
    postNodes.sort(function (nodeA, nodeB) {
        if (!nodeA.frontmatter.date && !nodeB.frontmatter.date) {
            return 0;
        }
        if (!nodeA.frontmatter.date) {
            return 1;
        }
        if (!nodeB.frontmatter.date) {
            return -1;
        }
        var dateA = DateUtils_1["default"].parse(nodeA.frontmatter.date);
        var dateB = DateUtils_1["default"].parse(nodeB.frontmatter.date);
        if (dateA.isBefore(dateB))
            return 1;
        if (dateB.isBefore(dateA))
            return -1;
        return 0;
    });
    for (var i = 0; i < postNodes.length; i += 1) {
        var nextID = i + 1 < postNodes.length ? i + 1 : 0;
        var prevID = i - 1 >= 0 ? i - 1 : postNodes.length - 1;
        var currNode = postNodes[i];
        var nextNode = postNodes[nextID];
        var prevNode = postNodes[prevID];
        createNodeField({
            node: currNode,
            name: 'nextTitle',
            value: nextNode.frontmatter.title
        });
        createNodeField({
            node: currNode,
            name: 'nextSlug',
            value: nextNode.fields.slug
        });
        createNodeField({
            node: currNode,
            name: 'prevTitle',
            value: prevNode.frontmatter.title
        });
        createNodeField({
            node: currNode,
            name: 'prevSlug',
            value: prevNode.fields.slug
        });
    }
}
exports.onCreateNode = function (_a) {
    var node = _a.node, actions = _a.actions, getNode = _a.getNode;
    var createNodeField = actions.createNodeField;
    var slug;
    if (node.internal.type === 'MarkdownRemark') {
        var fileNode = getNode(node.parent);
        var parsedFilePath = path.parse(fileNode.relativePath);
        if (Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')) {
            slug = "/" + lodash_kebabcase_1["default"](node.frontmatter.title);
        }
        else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
            slug = "/" + parsedFilePath.dir + "/" + parsedFilePath.name;
        }
        else if (parsedFilePath.dir === '') {
            slug = "/" + parsedFilePath.name;
        }
        else {
            slug = "/" + parsedFilePath.dir;
        }
        if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
            if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
                slug = "/" + node.frontmatter.slug;
            if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
                var date = new Date(node.frontmatter.date);
                createNodeField({
                    node: node,
                    name: 'date',
                    value: date.toISOString()
                });
            }
        }
        createNodeField({ node: node, name: 'slug', value: slug });
        postNodes.push(node);
    }
};
exports.setFieldsOnGraphQLNodeType = function (_a) {
    var type = _a.type, actions = _a.actions;
    var name = type.name;
    var createNodeField = actions.createNodeField;
    if (name === 'MarkdownRemark') {
        addSiblingNodes(createNodeField);
    }
};
function removeTrailingSlashes(path) {
    return (path === "/" ? path : path.replace(/\/$/, ""));
}
function onCreatePage(_a) {
    var page = _a.page, actions = _a.actions;
    var createPage = actions.createPage, deletePage = actions.deletePage;
    var oldPage = Object.assign({}, page);
    // Remove trailing slash unless page is /
    page.path = removeTrailingSlashes(page.path);
    if (page.path !== oldPage.path) {
        // Replace new page with old page
        deletePage(oldPage);
        createPage(page);
    }
}
function createPages(_a) {
    var graphql = _a.graphql, actions = _a.actions;
    return __awaiter(this, void 0, void 0, function () {
        var createPage, pageTemplate, postTemplate, tagTemplate, categoryTemplate, res, tags_1, categories_1, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    createPage = actions.createPage;
                    pageTemplate = path.resolve('src/templates/Page.tsx');
                    postTemplate = path.resolve('src/templates/Post.tsx');
                    tagTemplate = path.resolve('src/templates/Tag.tsx');
                    categoryTemplate = path.resolve('src/templates/Category.tsx');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, graphql("\n          {\n            allMarkdownRemark {\n              edges {\n                node {\n                  frontmatter {\n                    template\n                    tags\n                    categories\n                  }\n                  fields {\n                    slug\n                  }\n                }\n              }\n            }\n          }\n        ")];
                case 2:
                    res = _b.sent();
                    if (res.errors) {
                        console.error('Pages GraphQL error: ', res.errors);
                        return [2 /*return*/];
                    }
                    tags_1 = new Set();
                    categories_1 = new Set();
                    res.data.allMarkdownRemark.edges.forEach(function (edge) {
                        // Add tags
                        if (edge.node.frontmatter.tags) {
                            edge.node.frontmatter.tags.forEach(function (tag) {
                                tags_1.add(tag);
                            });
                        }
                        // Add categories
                        if (edge.node.frontmatter.categories) {
                            edge.node.frontmatter.categories.forEach(function (category) {
                                categories_1.add(category);
                            });
                        }
                        // Create a page, using the right template
                        switch (edge.node.frontmatter.template) {
                            case 'page':
                                createPage({
                                    path: edge.node.fields.slug,
                                    component: pageTemplate,
                                    context: {
                                        slug: edge.node.fields.slug
                                    }
                                });
                                break;
                            case 'post':
                                createPage({
                                    path: edge.node.fields.slug,
                                    component: postTemplate,
                                    context: {
                                        slug: edge.node.fields.slug
                                    }
                                });
                                break;
                        }
                    });
                    // Create tag pages
                    Array.from(tags_1).forEach(function (tag) {
                        createPage({
                            path: RouteUtils_1["default"].generatePathToTag(tag),
                            component: tagTemplate,
                            context: {
                                tag: tag
                            }
                        });
                    });
                    // Create category pages
                    Array.from(categories_1).forEach(function (category) {
                        createPage({
                            path: RouteUtils_1["default"].generatePathToCategory(category),
                            component: categoryTemplate,
                            context: {
                                category: category
                            }
                        });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createPages = createPages;
exports.onCreatePage = onCreatePage;
