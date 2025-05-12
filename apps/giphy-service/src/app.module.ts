import { Module } from '@nestjs/common';
import { GiphyModule } from './giphy/giphy.module';
import { AppController } from './app.controller';

@Module({
  imports: [GiphyModule],
  controllers: [AppController],
})
export class AppModule {}
