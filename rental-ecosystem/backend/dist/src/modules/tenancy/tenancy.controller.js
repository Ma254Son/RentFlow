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
exports.TenancyController = void 0;
const common_1 = require("@nestjs/common");
const tenancy_service_1 = require("./tenancy.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let TenancyController = class TenancyController {
    constructor(tenancyService) {
        this.tenancyService = tenancyService;
    }
    async getMyHome(tenantId) {
        return this.tenancyService.getMyHome(tenantId);
    }
    async requestMoveOut(tenantId) {
        return this.tenancyService.requestMoveOut(tenantId);
    }
    async closeTenancy(id, userId) {
        return this.tenancyService.closeTenancy(id, userId);
    }
};
exports.TenancyController = TenancyController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)('tenant'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenancyController.prototype, "getMyHome", null);
__decorate([
    (0, common_1.Post)('move-out'),
    (0, roles_decorator_1.Roles)('tenant'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenancyController.prototype, "requestMoveOut", null);
__decorate([
    (0, common_1.Post)(':id/close'),
    (0, roles_decorator_1.Roles)('landlord', 'agent'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TenancyController.prototype, "closeTenancy", null);
exports.TenancyController = TenancyController = __decorate([
    (0, common_1.Controller)('tenancy'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [tenancy_service_1.TenancyService])
], TenancyController);
//# sourceMappingURL=tenancy.controller.js.map