const { getToken } = require("../services/monnify");

exports.testConnection = async (req, res) => {
    try {
        const token = await getToken();

        res.json({
            success: true,
            message: "Monnify connected successfully",
            token: token
        });

    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to connect to Monnify",
            error: error.response?.data || error.message
        });
    }
};
const axios = require("axios");

exports.getBanks = async (req, res) => {
    try {
        const token = await getToken();

        const response = await axios.get(
            `${process.env.MONNIFY_BASE_URL}/api/v1/banks`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch banks",
            error: error.response?.data || error.message
        });
    }
};
exports.nameEnquiry = async (req, res) => {
    try {
        const token = await getToken();

        const { accountNumber, bankCode } = req.body;

        const response = await axios.get(
            `${process.env.MONNIFY_BASE_URL}/api/v2/disbursements/account/validate?accountNumber=${accountNumber}&bankCode=${bankCode}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            message: "Account lookup failed",
            error: error.response?.data || error.message
        });
    }
};
