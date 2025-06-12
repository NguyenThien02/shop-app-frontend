import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional, Min } from "class-validator";

export enum VoucherType {
    PERCENTAGE = 'PERCENTAGE',
    FIXED = 'FIXED'
}

export class VoucherDTO {
    @IsNumber()
    @IsNotEmpty()
    sellerId: number;

    @IsEnum(VoucherType)
    @IsNotEmpty()
    type: VoucherType;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    amount: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    minOrderCost?: number;

    @IsString()
    @IsNotEmpty()
    expiryDatetime: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    limitUsage?: number;

    constructor(data: any) {
        this.sellerId = data.sellerId;
        this.type = data.type;
        this.amount = data.amount;
        this.description = data.description;
        this.minOrderCost = data.minOrderCost;
        this.expiryDatetime = data.expiryDatetime;
        this.limitUsage = data.limitUsage;
    }
}