export interface Voucher {
    voucherId?: number;
    type: 'PERCENTAGE' | 'FIXED';
    amount: number;
    description?: string;
    minOrderCost?: number;
    expiryDatetime: Date;
    limitUsage?: number;
    createdAt?: Date;
}