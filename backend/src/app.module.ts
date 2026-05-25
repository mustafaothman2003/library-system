import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/library'),
    AuthModule,
    UsersModule,
    BooksModule,
    BorrowModule,
    LogsModule,
    // JwtModule removed — use JwtModule registered in AuthModule
  ],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule { }
