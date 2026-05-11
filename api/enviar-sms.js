const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);

module.exports = async (req, res) => {

    if (req.method !== 'POST') {

        return res.status(405).json({
            error: 'Método no permitido'
        });
    }

    try {

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

        return res.status(500).json({

            success: false,

            error: error.message
        });
    }
};