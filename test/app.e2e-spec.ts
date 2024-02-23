import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  it('POST', ()=>{
    return request(app.getHttpServer())
      .post('/movies')
      .send({title:'e2eTest', year:2022, genres:['e2eTest']})
      .expect(201)
  })

  it('DELETE', ()=> {
    return request(app.getHttpServer()).delete('/movies').expect(404);
  })
  
});



// 하나하나 테스트하는 유닛테스트을 배워보았다. 하지만 유닛테스트의 단점으로는 예를들어 비밀번호를 생성하는 함수가 있다면 암호화+저장 두가지 모두를 해야 하는데 이런 함수들은 유닛테스트로 구현하기는 힘들다
//  e2e테스트는 어떤 기능과 관련된 애플리케이션의 모든 부분을 테스트할 때 사용된다. 