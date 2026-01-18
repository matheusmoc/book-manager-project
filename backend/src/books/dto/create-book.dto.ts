import { IsString, IsInt, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Code', description: 'O título do livro' })
  @IsString({ message: 'O título deve ser uma string' })
  @Length(1, 100, { message: 'O título deve ter entre 1 e 100 caracteres' })
  title: string;

  @ApiProperty({ example: 'Robert C. Martin', description: 'O autor do livro' })
  @IsString({ message: 'O autor deve ser uma string' })
  @Length(1, 100, { message: 'O autor deve ter entre 1 e 100 caracteres' })
  author: string;

  @ApiPropertyOptional({ example: 2008, description: 'O ano de publicação' })
  @IsOptional()
  @IsInt({ message: 'O ano deve ser um número inteiro' })
  year?: number;

  @ApiPropertyOptional({ example: 'Um manual de artesanato de software ágil', description: 'Descrição do livro' })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string;
}
