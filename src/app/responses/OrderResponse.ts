import { UserResponse } from "./UserResponse";

export interface OrderResponse {
    order_id : number
    user_response : UserResponse;
    order_date : Date;
    total_amount : number;
    shipping_address : string;
    order_status : string;
    payment_status : string;
    notes : string;
}