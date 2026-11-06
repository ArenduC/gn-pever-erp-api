import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../users/entities/user.entity';

export interface JwtPayload {
  sub: string;
  username: string;
  roleId: string | null;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>(
        'JWT_ACCESS_SECRET',
      ),
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // Verify that the ERP user still exists and is enabled
    const user = await this.userRepository.findOne({
      where: {
        id: payload.sub,
        isEnabled: true,
      },
      select: {
        id: true,
        username: true,
        email: true,
        roleId: true,
        employeeId: true,
        isEnabled: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'User does not exist or account is disabled',
      );
    }

    // This object becomes request.user
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      employeeId: user.employeeId,
    };
  }
}