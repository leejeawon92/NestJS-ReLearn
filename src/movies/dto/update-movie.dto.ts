import { PartialType } from '@nestjs/mapped-types';  // mapped-types는 타입을 변환시키고 사용할 수 있게 하는 패키지
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsString({each:true})
  readonly genres?: string[];
}