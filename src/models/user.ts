import { model, Schema } from "mongoose";

export enum USER_ROLES {
    SUPER_ADMIN = 0,
    ADMIN = 1,
    STUDENT =2
}

export interface IUser {
    name: string;
    email: string;
    role: USER_ROLES;
    password: string;
    phone: number;
    rollno: number;
    verified: boolean;
    token: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rollno: {
        type: Number,
        required: true,
        unique:true
    },
    role: {
        type: Number,
        default: USER_ROLES.STUDENT,
        enum: USER_ROLES
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
});

export const User = model<IUser>("User", userSchema);