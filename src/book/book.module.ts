import { CategoryModule } from './../category/category.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    CategoryModule,
  ],
  providers: [BookResolver, BookService],
})
export class BookModule {}
