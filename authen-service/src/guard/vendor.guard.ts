// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   ForbiddenException,
// } from '@nestjs/common';

// @Injectable()
// export class VendorGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Lấy user từ request (JWT đã decode)

//     if (!user) {
//       throw new ForbiddenException('User not authenticated');
//     }

//     if (!user.vendorUuid) {
//       throw new ForbiddenException('Only vendors can access this resource');
//     }

//     return true; // Cho phép request tiếp tục
//   }
// }
