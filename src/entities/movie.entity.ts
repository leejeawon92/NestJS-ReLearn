export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}


// 서비스로 보내고 받을 Class(인터페이스)를 export할 것이다. 즉, movies.service.ts에서 movie를 구성하는 것들에 대한 규격을 정의한다. 
// 메모리상에 만든 가짜데이터베이스 역할이기 때문에 서버를 켜 놓은 동안만 데이터가 유지될 것이다.