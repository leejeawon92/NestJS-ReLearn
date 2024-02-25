import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ // 테스팅을 진행할 때 nestJS는 아래처럼 테스트마다 애플리케이션을 생성하고 있다 여기서 npm run start:dev에서
      imports: [AppModule],                                               // 생성하는 애플리케이션이랑은 다르다. npm run start:dev는 브라우저에서 테스트할 수 있는 진짜 애플리케이션 이고 아래의 다른 애플리케이션은 각 테스트를 위한 것이다.
    }).compile();                                                          
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // GET으로 API request를 보낸다. 웹사이트의 서버에 request를 보내면 URL을 받고(.get('/')), 200과 Hello World를(.expect(200) , .expect('Hello World!')) 받아야 한다.
      .get('/')                         // 즉, URL에 대한 요청을 테스팅하고 있는 것이다. controller, service, pipe의 결과에 대해 모든 테스트를 진행하고 있다는 뜻이기도 하다.
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', ()=> {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([])
    })
  })

  it('POST 201', ()=>{
    return request(app.getHttpServer())
      .post('/movies')
      .send({title:'e2eTest', year:2022, genres:['e2eTest']})
      .expect(201)
  })

  it('POST 400', ()=>{ // 잘못된 데이터를 가진 movie를 create하는지 여부확인
    return request(app.getHttpServer())
      .post('/movies')
      .send({title:'e2eTest', year:2022, genres:['e2eTest'], fail:123})
      .expect(400);
  })

  it('DELETE', ()=> {
    return request(app.getHttpServer()).delete('/movies').expect(404);
  })

  describe('/movies/:id', ()=> { // POST에서 새로 생성한 movie의 id가 1이라는 것을 알기 때문에 request(app.getHttpServer()).get('movies/1') 와 같이 작성하면 일치하는 부분이 나올 것이다. => 결과: 404에러
    it('GET 200', ()=>{
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    })
  })

  it('PATCH 200', ()=> {
    return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title: 'update e2e TEST'})
      .expect(200);
  })

  it('DELETE 200', ()=>{
    return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
  })
  
});



// 하나하나 테스트하는 유닛테스트을 배워보았다. 하지만 유닛테스트의 단점으로는 예를들어 비밀번호를 생성하는 함수가 있다면 암호화+저장 두가지 모두를 해야 하는데 이런 함수들은 유닛테스트로 구현하기는 힘들다
//  e2e테스트는 어떤 기능과 관련된 애플리케이션의 모든 부분을 테스트할 때 사용된다. 