const twilio = require('twilio');

module.exports = async (req, res) => {

    console.log("BODY:", req.body);

    console.log("SID:", process.env.TWILIO_SID);

    console.log("PHONE:", process.env.TWILIO_PHONE);

    try {

        const client = twilio(
            process.env.TWILIO_SID,
            process.env.TWILIO_TOKEN
        );

        const { telefono, mensaje } = req.body;

        const response = await client.messages.create({

            body: mensaje,

            from: process.env.TWILIO_PHONE,

            to: telefono
        });

        return res.status(200).json({
            success: true,
            sid: response.sid
        });

    } catch (error) {

        console.log("ERROR TWILIO:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};