import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class OrderDetailDTO {
    @IsNumber()
    @IsOptional()
    orderId?: number;

    @IsString()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfProducts: number;

    constructor(data : any){
        this.orderId = data.orderId;
        this.productId = data.productId;
        this.numberOfProducts = data.numberOfProducts;
    }
}