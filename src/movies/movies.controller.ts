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
