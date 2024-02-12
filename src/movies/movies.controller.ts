import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')  // URL의 엔트리포인트를 컨트롤한다. 즉, /movies에서 시작한다
export class MoviesController {
  @Get()
  getAll(){
    return '전체영화리스트'
  }

  @Get('/:id')                            // parameter의 decorator를 사용하면 nestJS는 내가 URL에 id parameter가 필요하다는 것을 알게 된다.
  getOne(@Param('id') movieId:string){    // url에서 id를 가져오고 movieId라는 string변수에 저장한다.
    return `선택한 movie : ${movieId}`    // @Get('/:id')에서 id와 @Param('id')의 "id"와 같이 이름은 같아야 한다.
  }

  @Post()
  create(){
    return '영화를생성하였습니다.'
  }

  @Delete('/:id')
  remove(@Param('id') movieId:string){
    return `${movieId}영화를 삭제하였습니다.`
  }

  @Patch('/:id')                           // put은 모든 리소스를 업데이트하지만, patch는 리소스의 일부분만 업데이트 해준다. 
  patch(@Param('id') movieId:string){
    return `${movieId}영화를 수정하였습니다.`
  }
}
