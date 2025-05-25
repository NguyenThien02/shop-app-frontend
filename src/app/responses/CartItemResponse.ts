import { CartResponse } from "./CartResponse";
import { ProductResponse } from "./ProductResponse";


export interface CartItemsResponse{
    cart_item_id : number;
    cart : CartResponse;
    product : ProductResponse;
    quantity : number;
} 