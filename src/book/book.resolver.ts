import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

import {
  BookInput,
  FindBookInput,
  UpdateBookInput,
} from './inputs/book.inputs';

import { BookService } from './book.service';

import { BookReturnDTO } from './dto/book.return.dto';

import { Book } from './book.schema';

@Resolver()
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [BookReturnDTO])
  async books(): Promise<BookReturnDTO[]> {
    return await this.bookService.findAll();
  }

  @Mutation(() => BookReturnDTO)
  async createBook(@Args('input') input: BookInput): Promise<Book> {
    return await this.bookService.createBook(input);
  }

  @Query(() => BookReturnDTO)
  async findBook(@Args('input') input: FindBookInput): Promise<any> {
    return await this.bookService.findById(input);
  }

  @Mutation(() => BookReturnDTO)
  async updateBook(@Args('input') input: UpdateBookInput): Promise<any> {
    return await this.bookService.update(input);
  }

  @Mutation(() => String)
  async deleteBook(@Args('input') input: FindBookInput): Promise<any> {
    return await this.bookService.delete(input._id);
  }
}
