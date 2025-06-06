import { IsPhoneNumber, IsString } from "class-validator";

export class UpdateOrderStatusDTO {
    @IsString()
    orderId: string;

    @IsPhoneNumber()
    orderStatus: string;

    constructor(data : any){
        this.orderId = data.orderId;
        this.orderStatus = data.orderStatus
    }
}