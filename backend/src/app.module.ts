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
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          const urlObj = new URL(databaseUrl);
          const requireSSL = urlObj.searchParams.get('sslmode') === 'require' || databaseUrl.includes('sslmode=require');
          urlObj.searchParams.delete('sslmode');
          const cleanUrl = urlObj.toString();
          
          return {
            type: 'postgres',
            url: cleanUrl,
            ssl: requireSSL ? { rejectUnauthorized: false } : false,
            entities: [User, Book],
            synchronize: true,
          };
        }
        
        const host = configService.get<string>('DATABASE_HOST');
        const port = parseInt(configService.get<string>('DATABASE_PORT') || '5432', 10);
        const username = configService.get<string>('DATABASE_USERNAME');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('DATABASE_NAME');
        const type = configService.get<string>('DATABASE_TYPE') || (host ? 'postgres' : 'sqlite');
        
        if (type === 'postgres' && host) {
          return {
            type: 'postgres',
            host,
            port,
            username,
            password,
            database,
            entities: [User, Book],
            synchronize: true,
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
