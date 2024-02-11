import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


//1. src/app.controller.ts안에 constructor(private readonly appService: AppService)에서 
//   AppService는 위 코드와 같다.
//2. localhost:3000 으로 접근했을 때 웹화면에 보였던 Hello World!를 볼 수 있다.
//3. 결과적으로 main.ts파일에서 시작하여 AppModule을 호출하고 module에서는 controller를 호출하였고 
//   controller는 server를 호출하였다   

//4. /src/app.controller.ts에서 보면 return this.appService.getHello();와 같이 서비스를 참조하고 있는 것을
//   볼 수 있다. 왜 서비스를 참조해야만 할까? 이것을 이해하기 위해서는 구조와 아키텍처에 대해 이해해야 한다.
//5. nestJS는 controller를 비즈니스로직과 구분 짓고 싶어한다. controller는 url을 가져오고 함수를 실행해 주는 정도의 역할이다. 하지만 비즈니스로직은 service로 가야한다. 
//6. service는 일반적으로 실제 function를 가지는 부분이다