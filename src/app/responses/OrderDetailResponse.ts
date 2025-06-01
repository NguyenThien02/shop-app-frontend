import { OrderResponse } from "./OrderResponse";
import { ProductResponse } from "./ProductResponse";

export interface OrderDetailResponse{
    order_detail_id : number;
    orderResponse : OrderResponse;
    productResponse: ProductResponse;
    numberOfProducts: number;
    total_money: number;
} 