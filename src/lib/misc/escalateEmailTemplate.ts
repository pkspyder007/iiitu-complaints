export const escalateEmailTemplate = (studentName: string, rollno: number, cId: string, complaintLink: string) => (`
    This is an automated email notification for complaint resolution.

    Complaint from student ${studentName} - ${rollno} has not been resolved in past 24 hrs.

    Complaint ID: <b>${cId}</b>
    
    <a href="${complaintLink}">Click here to see complaint</a>
`);
