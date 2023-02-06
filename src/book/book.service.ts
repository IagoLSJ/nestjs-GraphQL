import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AppError } from './../shared/erros/app-erro';

import {
  BookInput,
  FindBookInput,
  UpdateBookInput,
} from './inputs/book.inputs';

import { CategoryReturnDTO } from 'src/category/dto/category.return.dto';
import { BookReturnDTO } from './dto/book.return.dto';

import { CategoryService } from './../category/category.service';

import { Category } from 'src/category/category.schema';
import { Book } from './book.schema';

interface ICreateBook {
  name: string;
  author: string;
  category: CategoryReturnDTO;
  publishingCompany: string;
}

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<BookReturnDTO[]> {
    const all: BookReturnDTO[] = await this.bookModel.aggregate([
      {
        $lookup: {
          from: Category.name,
          localField: '_id',
          foreignField: '_id',
          as: 'joined',
        },
      },
    ]);

    const booksWithReturnDTO = all.map((itens) => {
      return new BookReturnDTO(
        itens._id,
        itens.name,
        itens.author,
        itens.publishingCompany,
        itens.category,
        itens.createdAt,
        itens.updatedAt,
      );
    });
    return booksWithReturnDTO;
  }

  async findById(book: FindBookInput): Promise<BookReturnDTO> {
    const bookById = await this.bookModel.findById(book._id);

    if (!bookById) throw new AppError('Book Id is not exist');

    return bookById;
  }

  async createBook(createBook: BookInput): Promise<BookReturnDTO> {
    const categoryById = await this.categoryService.findById(
      createBook.categoryId,
    );

    const newBook: ICreateBook = {
      name: createBook.name,
      author: createBook.author,
      category: categoryById,
      publishingCompany: createBook.publishingCompany,
    };

    const createdBook = new this.bookModel(newBook);

    await createdBook.save();

    return new BookReturnDTO(
      createdBook._id,
      createdBook.name,
      createdBook.author,
      createdBook.publishingCompany,
      createdBook.category,
      createdBook.createdAt,
      createdBook.updatedAt,
    );
  }

  async update(updateBook: UpdateBookInput): Promise<Book> {
    const book = await this.bookModel.findOne(
      new Types.ObjectId(updateBook._id),
    );

    book.name = updateBook.name;
    book.author = updateBook.author;
    book.publishingCompany = updateBook.publishingCompany;

    return await book.save();
  }

  async delete(_id: string): Promise<any> {
    const bookDeleted = await this.bookModel.findByIdAndDelete(_id);
    if (bookDeleted != null) return 'Book remove with success';
    return 'Book id is not exist';
  }
}
