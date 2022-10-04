import { model, Schema, Types } from "mongoose";

type ComplaintTypes = "CIVIL" | "ELECTRICAL" | "IRRIGATION" | "OTHER"
type ComplaintStatus = "PENDING" | "PROCESSING" | "COMPLETE" | "ESCALATED"

interface IComplaint {
    user: Types.ObjectId;
    type: ComplaintTypes;
    complaint: string;
    links: string[];
    remarks: string;
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
        remarks: {
            type: String
        },
        status: {
            type: String,
            default: "PENDING"
        },
        user: {
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