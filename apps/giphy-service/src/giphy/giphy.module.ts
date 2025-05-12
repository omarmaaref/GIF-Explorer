import { Module } from '@nestjs/common';
import { GiphyController } from './giphy.controller';
import { GiphyService } from './giphy.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import giphyAPIConfiguration from './configuration.ts/giphyAPI.configuration';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [giphyAPIConfiguration],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('giphyBaseUrl'),
        timeout: 5000,
        params: { api_key: config.get<string>('giphyApiKey') },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 60000
    }),
  ],
  controllers: [GiphyController],
  providers: [GiphyService],
})
export class GiphyModule {}
