const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mercadopago = require('mercadopago');

admin.initializeApp();

// Configure Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

exports.createPreference = functions.https.onCall(async (data, context) => {
    try {
        const { items, client } = data;
        
        // Criar items para Mercado Pago
        const preferenceItems = items.map(item => ({
            title: item.name,
            unit_price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
            currency_id: 'BRL'
        }));

        // Criar preferência de pagamento
        const preference = {
            items: preferenceItems,
            payer: {
                name: client.name,
                phone: {
                    number: client.phone.replace(/\D/g, '')
                }
            },
            payment_methods: {
                excluded_payment_types: [
                    { id: 'ticket' }
                ],
                installments: 1
            },
            back_urls: {
                success: 'https://tu-dominio.com/success.html',
                failure: 'https://tu-dominio.com/failure.html'
            },
            auto_return: 'approved',
            external_reference: 'PED_' + Date.now()
        };

        const response = await mercadopago.preferences.create(preference);
        
        return {
            success: true,
            init_point: response.body.init_point,
            payment_id: response.body.id
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
});

exports.webhookMercadoPago = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const topic = req.query.topic || req.body.topic;
    
    if (topic === 'payment') {
        const paymentId = req.body.id || req.body.data?.id;
        
        try {
            const payment = await mercadopago.payment.findById(paymentId);
            
            if (payment.body.status === 'approved') {
                // Buscar pedido pelo payment_id
                const pedidosSnapshot = await admin.firestore()
                    .collection('pedidos')
                    .where('payment_id', '==', payment.body.id.toString())
                    .get();

                if (!pedidosSnapshot.empty) {
                    const pedidoDoc = pedidosSnapshot.docs[0];
                    const pedido = pedidoDoc.data();

                    // Atualizar status
                    await pedidoDoc.ref.update({
                        estado: 'Pago',
                        payment_status: payment.body.status,
                        payment_data: payment.body
                    });

                    // Descontar estoque
                    for (const produto of pedido.produtos) {
                        const productRef = admin.firestore().doc(`products/${produto.id}`);
                        const productDoc = await productRef.get();
                        
                        if (productDoc.exists) {
                            const productData = productDoc.data();
                            const novoEstoque = (productData.stock || 0) - produto.quantidade;
                            
                            await productRef.update({
                                stock: Math.max(0, novoEstoque)
                            });
                        }
                    }
                }
            }
            
            res.status(200).send('OK');
        } catch (error) {
            console.error('Webhook Error:', error);
            res.status(500).send('Error');
        }
    } else {
        res.status(200).send('OK');
    }
});