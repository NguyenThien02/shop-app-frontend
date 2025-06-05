import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDTO {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    seller_id: number;

    @IsString()
    @IsNotEmpty()
    shipping_addres: string;

    @IsNumber()
    @IsNotEmpty()
    total_amount: number;

    @IsString()
    @IsNotEmpty()
    notes: string;

    constructor(data : any){
        this.user_id = data.user_id;
        this.seller_id = data.seller_id;
        this.shipping_addres = data.shipping_addres;
        this.total_amount = data.total_amount;
        this.notes = data.notes;
    }
}