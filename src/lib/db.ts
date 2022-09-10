import { connect } from "mongoose";

export async function connectToDB(dbUri: string) {
    try {
        await connect(dbUri);
        console.log("Connected To DB");
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}