import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, method, url } = request;

    return next.handle().pipe(
      tap(() => {
        if (user && method !== 'GET') {
          const actionType = `${method}_${url.split('/').pop()}`;
          this.prisma.auditLog
            .create({
              data: {
                userId: user.id,
                actionType: actionType.substring(0, 100),
                entityType: url.split('/')[2] || 'unknown',
                metadata: { method, url },
              },
            })
            .catch(() => {
              // Silently fail - audit logging should never break the request
            });
        }
      }),
    );
  }
}