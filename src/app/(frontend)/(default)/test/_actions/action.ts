import fs from "fs";
import axios from "axios";

export async function uploadCV(formData: FormData) {

    const options = {
        method: 'GET',
        url: 'https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume/job/status/40b62cf9-00d2-4039-91ca-c2bdaa042bcd',
        headers: {
            'apy-token': 'APY0MovWLbJFabGHYhsZgbV13i4YYWBDASBbOllnNsN0bfx58qNYxRQu2umkZBFSMXh1qXsUcR',
            'Content-Type': 'application/json'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}