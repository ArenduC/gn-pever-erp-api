import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { identifier, password } = loginDto;

    // Find user using username OR email
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where(
        `LOWER(user.username) = LOWER(:identifier)
         OR LOWER(user.email) = LOWER(:identifier)`,
        { identifier: identifier.trim() },
      )
      .getOne();

    // Generic error avoids revealing whether an account exists
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException(
        'Invalid username/email or password',
      );
    }

    // Check password
    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid username/email or password',
      );
    }

    // Check account status
    if (!user.isEnabled) {
      throw new UnauthorizedException(
        'Your account is disabled',
      );
    }

    // JWT payload
    const payload = {
      sub: user.id,
      username: user.username,
      roleId: user.roleId,
    };

    // Generate access token
    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_SECRET',
        ),
        expiresIn: '15m',
      },
    );

    // Generate refresh token using a separate secret
    const refreshToken = await this.jwtService.signAsync(
      {
        ...payload,
        tokenType: 'refresh',
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_SECRET',
        ),
        expiresIn: '7d',
      },
    );

    // Update last login time
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 900,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId,
        employeeId: user.employeeId,
      },
    };
  }
}