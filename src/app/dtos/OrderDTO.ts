import { IsNotEmpty, IsNumber, IsString, IsOptional, MaxLength, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { OrderDetailDTO } from './OrderDetailDTO';

export class OrderDTO {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    seller_id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500, { message: 'Shipping address cannot exceed 500 characters' })
    shipping_addres: string;

    @IsString()
    @IsOptional()
    @MaxLength(4000, { message: 'Notes cannot exceed 4000 characters' })
    notes?: string;

    @IsNumber()
    @IsOptional()
    voucher_id?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDTO)
    order_details: OrderDetailDTO[];

    constructor(data: any) {
        this.user_id = data.user_id;
        this.seller_id = data.seller_id;
        this.shipping_addres = data.shipping_addres;
        this.notes = data.notes;
        this.voucher_id = data.voucher_id;
        this.order_details = data.order_details?.map((detail: any) => new OrderDetailDTO(detail)) || [];
    }
}