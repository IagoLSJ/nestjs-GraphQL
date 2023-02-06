import { CategoryReturnDTO } from 'src/category/dto/category.return.dto';

export interface IBook {
  _id: any;
  name: string;
  author: string;
  publishingCompany: string;
  category: CategoryReturnDTO;
  createdAt: Date;
  updatedAt: Date;
}
