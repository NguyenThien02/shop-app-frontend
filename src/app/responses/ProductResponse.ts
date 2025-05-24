import { Category } from "../models/Category";
import { UserResponse } from "./UserResponse";

export interface ProductResponse{
    product_id : number;
    product_name : String;
    description : String;
    price : number;
    stock_quantity : number;
    image_url : String;
    category : Category;
    seller_respone : UserResponse;
} 