import { IsNumber } from "class-validator";

export class PaginatedDto<T> {
   @IsNumber()
   total: number;

   @IsNumber()
   limit: number;
   
   @IsNumber()
   offset: number;
   
   results: T[]; 
}