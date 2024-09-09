import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { AuthGuardModule } from './auth-guard/auth-guard.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
        AuthGuardModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuardService]
})
export class AuthModule {}
