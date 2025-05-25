import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CartItemsDTO{
    @IsNumber()
    @IsNotEmpty()
    cart_id: number;

    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;


    constructor(data: any) {
        this.cart_id = data.cart_id;
        this.product_id = data.product_id;
        this.quantity = data.quantity;
    }
}