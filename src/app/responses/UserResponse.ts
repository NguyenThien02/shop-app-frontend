import { Role } from "../models/Role";

export interface UserResponse {
    id : number
    full_name : string;
    phone_number : string;
    address : string;
    birthday : Date;
    role : Role;
    created_at : Date;
    updated_at : Date;
}