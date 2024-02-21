import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {  // describe는 테스트를 묘사하는 단어
  let service: MoviesService;

  beforeEach(async () => {  // beforeEach는 테스트를 하기 전에 실행되는 부분
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => { // it부분도 테스트하는 부분이다. 첫 번째인자에는 “테스트이름”, 두 번째인자에는 “테스트하고 싶은 부분을 테스트하는 함수”
    expect(service).toBeDefined(); // ervice가 존재하는지 여부를 확인
  });

  describe('getAll', ()=>{
    it('배열을 return하는가', ()=>{ // getAll()을 실행할때마다 Movie배열을 return하는지 테스트
      const result = service.getAll();  // 위 코드에서 service = module.get<MoviesService>(MoviesService);처럼 정의를 하였기 때문에 movies.service.ts파일에 있는 getAll()에 접근할 수가 있다.
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('getOne', ()=>{  // getOne을 테스트하기 위해서는 Movie가 create가 되어있어야 한다.
    it('영화를 return받았는가', ()=>{
      service.create({
        title:'테스트',
        genres:['test'],
        year: 2022
      })
    })
    const movie = service.getOne(1);
    expect(movie).toBeDefined();
  })

  it('404에러를 보여주고 있는가', ()=>{  // movieId가 999인 것은 없기 때문에 new NotFoundException을 보게 될 것이다.
    try{
      service.getOne(999); 
    } catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
    }
  })

  describe('deleteOne', ()=>{ //  movie 하나를 지우는것이 제대로 동작하였을 경우
    it('영화를 삭제하였는가', ()=>{
      service.create({
        title:'테스트',
        genres:['test'],
        year: 2022
      })
    })
    const allMovies = service.getAll();
    service.deleteOne(1);
    const afterDelete = service.getAll();
    expect(afterDelete.length).toEqual(allMovies.length -1);  // 전체무비에서 한 개가 삭제되었기 때문에 afterDelete는 전체영화에서 -1이 되어야 한다.
  })

  it('404에러를 보여주고 있는가', ()=>{
    try{
      service.deleteOne(999);  // movieId로 deleteOne을 하면 404에러를 return해야 한다.
    }catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
    }
  })

  describe('create', ()=> {  // movie의 개수가 얼만큼 늘어났는지, 마지막으로 생성된 movie가 이것이 맞는지 등을 test해볼 수 있다
    it('영화를 제대로 생성하였는가', ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title:'테스트3',
        genres:['test3'],
        year: 2022
      })
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('update', ()=> {
    it('영화가 업데이트 되었는가', ()=>{
      service.create({
        title:'테스트4',
        genres:['test4'],
        year: 2022
      })
      service.update(1, {title:'update 테스트4'});
      const movie= service.getOne(1);
      expect(movie.title).toEqual('update 테스트4');
    })
  })

});



// 유닛테스팅은 모든 함수를 따로 테스트 하는 것을 말한다. 서비스에서 분리된 유닛을 테스트한다. 예를들면 getAll()함수 하나만 테스트하고 싶을 때 사용한다.

// end-to-end(e2e)테스팅은 모든 시스템을 테스팅하는 것이다. 예를들면 어떤페이지로 가면 특정페이지가 나와야하는 경우. 즉 사용자관점에서 보는 것이다.
// 즉, 사용자가 특정 링크를 클릭하면 어떤 링크를 봐야 하는 것처럼 사용자가 취할만한 액션들을 처음부터 끝까지 테스트하는 것이다.