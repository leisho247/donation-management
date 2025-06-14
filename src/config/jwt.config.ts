import { JwtModuleOptions } from '@nestjs/jwt';

export interface JwtConfig {
  accessToken: JwtModuleOptions;
  refreshToken: JwtModuleOptions;
}

export function jwtConfig(): JwtConfig {
  return {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET as string | undefined, 
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '10m', 
      },
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET as string | undefined, 
      signOptions: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '1d', 
      },
    },
  };
}
