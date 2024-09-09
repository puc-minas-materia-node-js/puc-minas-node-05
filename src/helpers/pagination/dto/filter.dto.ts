import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

export class FilterDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, {message: 'O campo "Page" é obrigatório!'})
    page: number = DEFAULT_PAGE;

    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, {message: 'O campo "PageSize" é obrigatório!'})
    pageSize: number = DEFAULT_PAGE_SIZE;
}
