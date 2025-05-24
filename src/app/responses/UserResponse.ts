import { Role } from "../models/Role";

export interface UserResponse {
    fullName : string;
    phoneNumber : string;
    address : string;
    birthday : Date;
    role : Role;
    createAt : Date;
    updateAt : Date;
}