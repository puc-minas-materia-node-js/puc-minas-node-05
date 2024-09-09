import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty({message: 'O nome do projeto não pode ser vazio'})
    @IsString()
    name: string;

    @IsNotEmpty({message: 'A descrição do projeto não pode ser vazia'})
    @IsString()
    description: string;

    // projectId: number;
}
