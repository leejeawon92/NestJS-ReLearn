import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); // 이 코드는 왜 필요할까? 이 해답은 구조와 아키텍처에 대해 이해해야 한다
  }
  @Get('/welcome')  
  saywelcome(): string { // express에서 controller와 같은 역할 - http://localhost:3000/welcome으로 접속하면 return부분이 보여질 것이다. 
    return '환영합니다.';
  }
  @Post('/post')
  saypost(): string {
    return '요청';
  }
}

//1. app.module.ts에서 @Module()데코레이터 안에 [AppController]는 위 코드와 같다.
//2. @Controller()안에 @Get()이라는 데코레이터가 있고, string을 return하는 getHello함수가 있다.
//3. this.appService.getHello();에서 appService는 생성자(constructor)에서 오는 것을 볼 수 있다.
//4. AppController가 하는 일은 기본적으로 url을 가져오고 함수를 실행하는 것이다.  
//   예를들어 express에서 controller/router 같은 존재이다. src/app.controller.ts파일에서 Get데코레이터가 express의 get라우터와 같은 역할을 한다
//5. @Get, @Post을 작성하는 것만으로도 get request, post request를 할 수 있게 되었다
