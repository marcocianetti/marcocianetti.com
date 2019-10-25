var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var moment_1 = __importDefault(require("moment"));
var Config_1 = __importDefault(require("../config/Config"));
// Locale for Moment
require("moment/locale/" + Config_1["default"].SiteLanguage);
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.format = function (date) {
        return moment_1["default"].utc(date).locale(Config_1["default"].SiteLanguage).format(Config_1["default"].DateFormat);
    };
    DateUtils.parse = function (date) {
        return moment_1["default"](date, Config_1["default"].DateFromFormat);
    };
    return DateUtils;
}());
exports["default"] = DateUtils;
