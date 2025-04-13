import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class NormalizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    if (['POST', 'PUT'].includes(request.method)) {
      // Adicione outras normalizações aqui
    }

    return next.handle().pipe(
      map((data) => {
        return data
      })
    )
  }
}
