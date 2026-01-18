import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('books')
@ApiBearerAuth()
@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}


  @Post('create')
  @ApiOperation({ summary: 'Criar um novo livro' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiQuery({ name: 'title', required: false, description: 'Filtrar livros por título' })
  findAll(@Query('title') title?: string) {
    return this.booksService.findAll(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um livro pelo ID' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um livro' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um livro' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
