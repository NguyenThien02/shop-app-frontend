import { IsNotEmpty, IsNumber } from "class-validator";

export class CartDTO {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    constructor(data : any){
        this.user_id = data.user_id;
    }
}