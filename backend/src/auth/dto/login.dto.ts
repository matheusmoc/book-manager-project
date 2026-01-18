import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'Nome de usuário' })
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
