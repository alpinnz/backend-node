const midtransClient = require('midtrans-client');
const config = require('../../../config');

let core = new midtransClient.CoreApi(config.midtrans);

exports.index = async (req, res, next) => {
    const transaction_details = ({
        "gross_amount": 10000,
        "order_id": "T" + Math.round((new Date()).getTime() / 1000),
    });
    const customer_details = ({
        "email": "alpinnz@gmail.com",
        "first_name": "Alfin",
        "last_name": "Novi Aji",
        "phone": "+6281 1234 1234"
    })

    const item_details = [{
        "id": "1388998298204",
        "price": 10000,
        "quantity": 1,
        "name": "Ayam Zozozo"
    }]

    console.log(req.body);
    if (req.body.payment_type === 'bank_transfer' && req.body.bank_transfer.bank != null || req.body.payment_type === 'echannel' && req.body.bank_transfer.bank != null) {

        const payment_type = "bank_transfer";

        switch (req.body.bank_transfer.bank) {
            case 'permata':
                // 
                const bank_transfer_permata = ({
                    "bank": "permata",
                    "permata": {
                        "recipient_name": "ALFIN NOVIAJI"
                    }
                })
                // 
                const input_permata = ({
                    "payment_type": payment_type,
                    "transaction_details": transaction_details,
                    "bank_transfer": bank_transfer_permata
                })
                // 
                core.charge(input_permata)
                    .then((data) => {
                        res.json(data);
                        console.log(data);
                    }).catch(err => res.send(err.message));
                break;
            case 'bca':
                // 
                const bank_transfer_bca = ({
                    "bank": "bca",
                    "va_number": "111111",
                });
                // 
                const input_bca = ({
                    "payment_type": payment_type,
                    "transaction_details": transaction_details,
                    "customer_details": customer_details,
                    "item_details": item_details,
                    "bank_transfer": bank_transfer_bca
                })
                // 
                core.charge(input_bca)
                    .then((data) => {
                        res.json(data);
                        console.log(data);
                    }).catch(err => res.send(err.message));
                break;
            case 'bni':
                // 

                const bank_transfer_bni = ({
                    "bank": "bni",
                    "va_number": "111111"
                })
                // 
                const input_bni = ({
                    "payment_type": payment_type,
                    "customer_details": customer_details,
                    "item_details": item_details,
                    "transaction_details": transaction_details,
                    "bank_transfer": bank_transfer_bni
                })
                // 
                core.charge(input_bni)
                    .then((data) => {
                        res.json(data);
                        console.log(data);
                    }).catch(err => res.send(err.message));
                break;
            default:
                res.json({
                    status: 404,
                    error: 'bank null or missing'
                });
                break;
        }
    } else {
        res.json({
            status: 404,
            error: 'parameter null or missing'
        });
    }
};






















