"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
exports.addBusiness = void 0;
var stripe_1 = require("stripe");
var db_1 = require("../../utils/db");
var apiResponse_1 = require("../../utils/apiResponse");
var BusinessValidations_1 = require("../../utils/BusinessValidations");
// import {createBusiness} from "../../services/stripe/createBusiness";
exports.addBusiness = function (event, context, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var stripe, data, validBusiness, params, savedData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stripe = new stripe_1.Stripe(process.env.STRIPE_API_KEY, {
                    apiVersion: process.env.STRIPE_API_VERSION,
                    typescript: true,
                });
                data = JSON.parse(event.body);
                validBusiness = BusinessValidations_1.validateBusiness(data);
                if (!validBusiness.isValid) {
                    return [2 /*return*/, apiResponse_1.errorHandler(callBack, 'ERROR: Business contains invalid data.', validBusiness.errors)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                params = {
                    TableName: process.env.DYNAMODB_TABLE_BUSINESSES,
                    Item: validBusiness.params,
                };
                return [4 /*yield*/, db_1.upsert(params)];
            case 2:
                savedData = _a.sent();
                console.log('savedData', savedData);
                return [2 /*return*/, apiResponse_1.successHandler(callBack, {
                        message: 'Stripe Business Created!',
                        business: params.Item,
                    })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, apiResponse_1.errorHandler(callBack, 'ERROR Business Creation FAILED!', error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=addBusiness.js.map