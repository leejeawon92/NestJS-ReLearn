import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')  // URL의 엔트리포인트를 컨트롤한다. 즉, /movies에서 시작한다
export class MoviesController {
  @Get()
  getAll(){
    return '전체영화리스트'
  }

  @Get('search')
  search(@Query("year") searchingYear: string){             // 무언가를 찾고싶다면 Query detorator를 사용할 수 있다.
    return ` ${searchingYear}년 이후에 영화를 검색중입니다.`
  }

  @Get('/:id')                            // parameter의 decorator를 사용하면 nestJS는 내가 URL에 id parameter가 필요하다는 것을 알게 된다.
  getOne(@Param('id') movieId:string){    // url에서 id를 가져오고 movieId라는 string변수에 저장한다.
    return `선택한 movie : ${movieId}`    // @Get('/:id')에서 id와 @Param('id')의 "id"와 같이 이름은 같아야 한다.
  }

  @Post()
  create(@Body() movieData){ // @Body는 movieData안의 request의 body를 가져오기 위해 사용하였다. 즉, body는 request의 body부분을 가져오고 싶을때 사용한다. 
    return movieData
  }

  @Delete('/:id')
  remove(@Param('id') movieId:string){
    return `${movieId}영화를 삭제하였습니다.`
  }

  @Patch('/:id') 
  patch(@Param('id') movieId:string, @Body() updateData){ // put은 모든 리소스를 업데이트하지만, patch는 리소스의 일부분만 업데이트 해준다. 
    return {                                              // express에서는 body를 json으로 리턴하기 위해서는 몇가지 작업이 필요했지만 nestjs에서는 따로 할 필요가없다
      updateMovie: movieId,  // 업데이트할 moveid와 보낼 데이터를 object형태로 return하는 형태이다. 
      ...updateData
  }
  }
}
