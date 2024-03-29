import { registerAs } from '@nestjs/config';
import { version } from 'package.json';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    maintenance: process.env.APP_MAINTENANCE === 'true' ?? false,

    name: process.env.APP_NAME ?? 'd4rk',
    env: process.env.APP_ENV ?? 'development',

    tz: process.env.APP_TZ ?? 'Asia/HoChiMinh',

    repoVersion: version,
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === 'true' ?? false,
      prefix: 'v',
      version: process.env.HTTP_VERSION ?? '1',
    },

    globalPrefix: '/api',
    database: {
      host: process.env.DATABASE_HOST,
    },
    http: {
      enable: process.env.HTTP_ENABLE === 'true' ?? false,
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 3000,
    },

    jobEnable: process.env.JOB_ENABLE === 'true' ?? false,
  }),
);
