import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

//1. class AppModule {}와 같이 클래스는 비어있지만, 진짜는 @Module()안에 있다. 
//2. @Module는 데코레이터라고 한다. 데코레이터는 클래스에 함수 기능을 추가할 수 있다. nestJS에서 자주사용된다.
//   즉, 클래스 위의 함수이고 클래스를 위해 움직인다고 생각하면 된다.
//3. const app = await NestFactory.create(AppModule);와 같이 하나의 모듈에서 애플리케이션을 생성한다.
//4. 모듈은 애플리케이션의 일부분이다. 예를들어 인증을담당한다건가, 사진을업로드한다던가 하나의 기능을 한다
//   AppModule은 루트모듈 같은 것이다. 