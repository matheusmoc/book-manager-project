import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', minLength: 4, description: 'Nome de usuário' })
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  @MinLength(4, { message: 'O nome de usuário deve ter pelo menos 4 caracteres' })
  username: string;

  @ApiProperty({ example: 'password123', minLength: 6, description: 'Senha do usuário' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
