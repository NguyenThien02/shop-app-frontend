import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    product_name : string;
    
    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsNumber()
    price : number;

    @IsNotEmpty()
    @IsNumber()
    stock_quantity : number;

    @IsNotEmpty()
    @IsString()
    image_url : string;

    @IsNotEmpty()
    @IsNumber()
    category_id : number;

    @IsNotEmpty()
    @IsNumber()
    seller_id : number;

    constructor(data : any){
        this.product_name = data.product_name;
        this.description = data.description;
        this.price = data.price;
        this.stock_quantity = data.stock_quantity;
        this.image_url = data.image_url;
        this.category_id = data.category_id;
        this.seller_id = data.seller_id;
    }
}