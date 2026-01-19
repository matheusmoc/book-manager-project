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
        // Support AWS PostgreSQL env vars (PGHOST, PGUSER, etc) or custom vars
        const host = configService.get<string>('PGHOST') || configService.get<string>('DATABASE_HOST');
        const port = parseInt(configService.get<string>('PGPORT') || configService.get<string>('DATABASE_PORT') || '5432', 10);
        const username = configService.get<string>('PGUSER') || configService.get<string>('DATABASE_USERNAME');
        const password = configService.get<string>('PGPASSWORD') || configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('PGDATABASE') || configService.get<string>('DATABASE_NAME');
        const ssl = configService.get<string>('PGSSLMODE') === 'require';
        
        const type = configService.get<string>('DATABASE_TYPE') || (host ? 'postgres' : 'sqlite');
        
        if (type === 'postgres' && host) {
            return {
                type: 'postgres',
                host,
                port,
                username,
                password,
                database,
                ssl: ssl ? { rejectUnauthorized: false } : false,
                entities: [User, Book],
                synchronize: true, // Only for development
            };
        }
        return {
            type: 'sqlite',
            database: database || 'database.sqlite',
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
