import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const type = configService.get<string>('DATABASE_TYPE') || 'sqlite';
        if (type === 'postgres') {
            return {
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: parseInt(configService.get<any>('DATABASE_PORT'), 10),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [User, Book],
                synchronize: true, // Only for development
            };
        }
        return {
            type: 'sqlite',
            database: configService.get<string>('DATABASE_NAME'),
            entities: [User, Book],
            synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
