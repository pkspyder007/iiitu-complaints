import { model, Schema, Types } from "mongoose";

type ComplaintTypes = "CIVIL" | "ELECTRICAL" | "IRRIGATION" | "OTHER"
type ComplaintStatus = "PENDING" | "PROCESSING" | "COMPLETE" | "ESCALATED"

interface IComplaint {
    userId: Types.ObjectId;
    type: ComplaintTypes;
    complaint: string;
    links: string[];
    status: ComplaintStatus;
}

const complaintSchema = new Schema<IComplaint>({
        complaint: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        links: {
            type: [String]
        },
        status: {
            type: String,
            default: "PENDING"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Complaint = model<IComplaint>('Complaint', complaintSchema)