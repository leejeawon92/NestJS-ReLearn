import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from 'src/entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')  
export class MoviesController {
  constructor(private readonly moviesService: MoviesService){} // express에서처럼 수동으로 import하는건 nestJS에서 기본적으로 사용하는 방법이 아니다.
                                                              //  nestJS에서는 생성자를 통해 요청을 해야한다. 

  @Get()
  getAll(): Movie[]{
    return this.moviesService.getAll();
  }
  
  @Get('search')
  search(@Query("year") searchingYear: string){
    return ` ${searchingYear}년 이후에 영화를 검색중입니다.`
  }
  
  @Get('/:id')
  getOne(@Param('id') movieId:number): Movie{
    return this.moviesService.getOne(movieId)
  }
  
  @Post()
  create(@Body() movieData: CreateMovieDto){
    return this.moviesService.create(movieData)
  }
  
  @Delete('/:id')
  remove(@Param('id') movieId:number){
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId:number, @Body() updateData: UpdateMovieDto){
    return this.moviesService.update(movieId, updateData);
  }
}


// movies.controller.ts에서 this.moviesService.getAll();가 동작하는 이유는 constructor(private readonly moviesService: MoviesService)와 같이 movieService라는 property를
// 만들고 타입을 지정해줬기 때문이다. 타입만 import해주면 된다는 의미이다.

// nestJS가 MoviesService를 import하고 controller에 inject(주입)할 것이다. 그리고 MoviesService를 보면 @Injectable()를 볼 수 있다. 결과적으로 MoviesController는 MoviesService를 필요로 하기 
// 때문에 의존관계주입(dependency injection)을 해줘야 하는 것이다. 

// nestJS가 알아서 import해주기 때문에 dependency injection 문제가 발생하지는 않지만, nestJS구조에 따라서 import를 해줘야 한다. 