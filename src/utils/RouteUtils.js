var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_kebabcase_1 = __importDefault(require("lodash.kebabcase"));
var RouteUtils = {
    generatePathToCategory: function (category) {
        var c = category.split(' ').length === 1 ? category.toLowerCase() : lodash_kebabcase_1["default"](category);
        return "/categorie/" + c;
    },
    generatePathToTag: function (tag) {
        return "/tag/" + lodash_kebabcase_1["default"](tag);
    }
};
exports["default"] = RouteUtils;
