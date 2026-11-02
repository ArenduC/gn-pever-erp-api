import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  url: configService.get<string>('DATABASE_URL'),

  schema: 'paver_erp',

  autoLoadEntities: true,

  synchronize: false,

  logging: configService.get('NODE_ENV') === 'development',

  ssl: {
    rejectUnauthorized: false,
  },
});