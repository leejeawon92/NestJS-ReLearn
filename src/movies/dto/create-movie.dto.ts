import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto { // movie.entity.ts에서 정의한 속성을 정의해야 한다.
  @IsString()
  readonly title: string;
  
  @IsNumber()
  readonly year: number;
  
  @IsString({each:true})  // string의 배열이기 때문에 모든 요소를 하나씩 검사해야 한다. 
  readonly genres: string[];
}


// 이전까지 controller와 service에서 updateData와 movieData의 유효성검사를 하지 않았다. 따라서, updateData와 movieData에게 타입을 부여하기 위해서 service와 controller에 DTO라는 걸 생성해야 한다.
// DTO는 Data Transfer Object(데이터 전송 객체)를 뜻한다. 
// DTO를 사용하는 이유는 코드를 더 간결하게 해주며 nestJS가 들어오는 query에 대해 유효성을 검사할 수 있기 때문이다.

// main.ts에서 생성한 new ValidationPipe()의 미들웨어와 이것을 검사하는 class CreateMovieDto를 사용하고 있기 때문에 결과적으로 input값에 대한 유효성 검사를 하고 있는 것이다. 
// 이것을 작성하지 않았다면 사용자가 title만 작성하고 post해도 문제가 없었다.