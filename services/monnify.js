const axios = require("axios");

async function getToken() {

    const apiKey = process.env.MONNIFY_API_KEY;
    const secretKey = process.env.MONNIFY_SECRET_KEY;

    const auth = Buffer
        .from(`${apiKey}:${secretKey}`)
        .toString("base64");

    const response = await axios.post(
        `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
        {},
        {
            headers: {
                Authorization: `Basic ${auth}`
            }
        }
    );

    return response.data.responseBody.accessToken;
}

module.exports = {
    getToken
};
