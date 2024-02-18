import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

// 모듈들을 좋은 구조로 만들어보기 위해서 app.modules는 AppService와 AppController만 가지고 있고, MoviesService, MoviesController는 movies.module로 옮겼다