const axios = require('axios');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const message = JSON.parse(event.body);
        if (message && message.message && message.message.text) {
            const code = message.message.text;
            try {
                await axios.post('https://www.betboom.com/api/ingresar_codigo', {
                    codigo: code
                });
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Código enviado a Betboom' })
                };
            } catch (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Error al enviar el código' })
                };
            }
        }
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Mensaje no válido' })
        };
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método no permitido' })
    };
};
