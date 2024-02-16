import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,   // 아무 decorator도 없는 어떠한 property의 object를 거를수 있다. 즉, class CreateMovieDto에서 정의하지 않는 속성들은 Validator에 도달하지 않는다는 뜻
      forbidNonWhitelisted: true, // 이상한 값을 보내면 request 자체를 막아버릴 수 있다
      transform: true  // 기본적으로 유저가 보낸 데이터를 개발자가 원하는 실제 타입으로 변환해준다. 결론적으로 nestJS가 타입을 넘겨줄 때 자동으로 타입변환해서 준다는 것 
    })                 // 기존의 getOne이나 delete에서 인자값을 string으로 타입정의를 하고 number로 변환해주는 작업이 필요 없어졌다는 의미이다.
  )
  await app.listen(3000);
}
bootstrap();

// 파이프는 코드가 지나가는 곳을 의미하며 따라서 유효성 검사용 파이프를 생성할 것이다.
// 파이프는 미들웨어라고 생각하면 된다.
// 사용할 파이프를 nestJS애플리케이션에게 넘겨준다. 

