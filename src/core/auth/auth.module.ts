import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AccountModule } from '@accounts/account.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@auth/auth.guard'
import { JwtStrategy } from './jwt.strategy'
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
      })
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
