import { Controller, Request, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuário' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user); // Make sure login return type is handled by interceptor if it returns user object
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
  }
}
