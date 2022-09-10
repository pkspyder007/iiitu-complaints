import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "../config";

const OAuth2 =  google.auth.OAuth2;

export const sendEmail = async (to: string, sub: string, htmlContent: string) => {
    const myOAuth2Client = new OAuth2(config.get("GCID"), config.get("GCSECRET"), "https://developers.google.com/oauthplayground");

    myOAuth2Client.setCredentials({ refresh_token: config.get("REFRESH_TOKEN") });
    const myAccessToken = await myOAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "19137@iiitu.ac.in", //your gmail account you used to set the project up in google cloud console"
            clientId: config.get("GCID"),
            clientSecret: config.get("GCSECRET"),
            refreshToken: config.get("REFRESH_TOKEN"),
            accessToken: myAccessToken.token as unknown as string //access token variable 
        }
    });

    const mailOptions = {
        from: '19137@iiitu.ac.in', // sender
        to: to, // receiver
        subject: sub, // Subject
        html: htmlContent // html body
    }

    transport.sendMail(mailOptions, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            transport.close();
            console.log(result);
        }
    });

}