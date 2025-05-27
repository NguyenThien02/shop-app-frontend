import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDetailDTO {
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @IsString()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfProducts: number;

    @IsString()
    @IsNotEmpty()
    totalMoney: number;

    constructor(data : any){
        this.orderId = data.orderId;
        this.productId = data.productId;
        this.numberOfProducts = data.numberOfProducts;
        this.totalMoney = data.totalMoney;
    }
}