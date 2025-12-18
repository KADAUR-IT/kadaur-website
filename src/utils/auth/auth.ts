import { AuthClient } from "payload-auth-plugin/client"

export const adminAuthClient = new AuthClient("user", {
    payloadBaseURL: process.env.PAYLOAD_PUBLIC_SERVER_URL
})