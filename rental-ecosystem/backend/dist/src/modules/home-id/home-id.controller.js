"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeIdController = void 0;
const common_1 = require("@nestjs/common");
const home_id_service_1 = require("./home-id.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let HomeIdController = class HomeIdController {
    constructor(homeIdService) {
        this.homeIdService = homeIdService;
    }
    async generate(propertyId) {
        return this.homeIdService.generate(propertyId);
    }
    async lookup(homeId) {
        return this.homeIdService.lookup(homeId);
    }
    async validate(homeId) {
        const isValid = this.homeIdService.validate(homeId);
        return { homeId, isValid };
    }
};
exports.HomeIdController = HomeIdController;
__decorate([
    (0, common_1.Post)('generate/:propertyId'),
    (0, roles_decorator_1.Roles)('landlord', 'agent'),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeIdController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('lookup/:homeId'),
    __param(0, (0, common_1.Param)('homeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeIdController.prototype, "lookup", null);
__decorate([
    (0, common_1.Get)('validate/:homeId'),
    __param(0, (0, common_1.Param)('homeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeIdController.prototype, "validate", null);
exports.HomeIdController = HomeIdController = __decorate([
    (0, common_1.Controller)('home-id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [home_id_service_1.HomeIdService])
], HomeIdController);
//# sourceMappingURL=home-id.controller.js.map