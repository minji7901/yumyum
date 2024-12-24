import { FoodType } from './Food';

export interface SearchType {
  pageNo: number;
  numOfRows: number;
  totalCount: number;
  items: FoodType[];
}
