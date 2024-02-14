import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'src/entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[]{
    return this.movies;
  }
  
  getOne(id: string): Movie{
    const movie = this.movies.find(movie => movie.id === +id);
    if(!movie){
      throw new NotFoundException(`${id}에 해당하는 Movie를 찾지 못했습니다.`);  // nestJS가 제공하는 예외처리
    }
    return movie;
  }
  
  deleteOne(id:string){ 
    this.getOne(id);         // movie를 가져오고 없다면 에러처리를 위해서 할 것이고, 있다면 다음 줄을 실행하게 될 것이다.
    this.movies = this.movies.filter(movie => movie.id !== +id);
  }
  
  create(movieData){
    this.movies.push({
      id: this.movies.length+1,
      ...movieData
    })
  }

}
