// // // require("dotenv").config();
// // // const express = require("express");
// // // const Razorpay = require("razorpay");

// // // const router = express.Router();

// // // router.post("/orders", async (req, res) => {
// // //     try {
// // //         const instance = new Razorpay({
// // //             key_id: process.env.RAZORPAY_KEY_ID,
// // //             key_secret: process.env.RAZORPAY_SECRET,
// // //         });

// // //         const options = {
// // //             amount: 50000, // amount in smallest currency unit
// // //             currency: "INR",
// // //             receipt: "receipt_order_74394",
// // //         };

// // //         const order = await instance.orders.create(options);

// // //         if (!order) return res.status(500).send("Some error occured");

// // //         res.json(order);
// // //         console.log(order);
// // //     } catch (error) {
// // //         res.status(500).send(error);
// // //     }
// // // });

// // // // router.post("/success", async (req, res) => {
// // // //     try {
// // // //         console.log(req.body)
// // // //         // getting the details back from our font-end
// // // //         const {
// // // //             // orderCreationId,
// // // //             razorpayPaymentId,
// // // //             // razorpayOrderId,
// // // //             // razorpaySignature,
// // // //         } = req.body;

// // // //         // Creating our own digest
// // // //         // The format should be like this:
// // // //         // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
// // // //         const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

// // // //         shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

// // // //         const digest = shasum.digest("hex");

// // // //         // comaparing our digest with the actual signature
// // // //         if (digest !== razorpaySignature)
// // // //             return res.status(400).json({ msg: "Transaction not legit!" });

// // // //         // THE PAYMENT IS LEGIT & VERIFIED
// // // //         // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

// // // //         res.json({
// // // //             msg: "success",
// // // //             orderId: razorpayOrderId,
// // // //             paymentId: razorpayPaymentId,
// // // //         });
// // // //     } catch (error) {
// // // //         res.status(500).send(error);
// // // //     }
// // // // });


// // // module.exports = router ;


// // const router = require("express").Router();
// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");

// // router.post("/orders", async (req, res) => {
// // 	try {
		

// // 		const options = {
// // 			amount: req.body.amount * 100,
// // 			currency: "INR",
// // 			receipt: crypto.randomBytes(10).toString("hex"),
// // 		};

// // 		instance.orders.create(options, (error, order) => {
// // 			if (error) {
// // 				console.log(error);
// // 				return res.status(500).json({ message: "Something Went Wrong!" });
// // 			}
// // 			res.status(200).json({ data: order });
// // 		});
// // 	} catch (error) {
// // 		res.status(500).json({ message: "Internal Server Error!" });
// // 		console.log(error);
// // 	}
// // });

// // router.post("/verify", async (req, res) => {
// // 	try {
// // 		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
// // 			req.body;
// // 		const sign = razorpay_order_id + "|" + razorpay_payment_id;
// // 		const expectedSign = crypto
// // 			.createHmac("sha256", process.env.RAZORPAY_KEY_ID)
// // 			.update(sign.toString())
// // 			.digest("hex");

// // 		if (razorpay_signature === expectedSign) {
// //             console.log("payed ")
// // 			return res.status(200).json({ message: "Payment verified successfully" });
// // 		} else {
// // 			return res.status(400).json({ message: "Invalid signature sent!" });
// // 		}
// // 	} catch (error) {
// // 		res.status(500).json({ message: "Internal Server Error!" });
// // 		console.log(error);
// // 	}
// // });

// // module.exports = router;


// const crypto = require("crypto");


// router.post('/orders',async(req, res)=>{
// console.log(instance)
//     const options = {
//         amount: 5000,
//         currency: "INR",
//     }

//     const order = await instance.orders.create(options);
//     console.log(order)
    
// })

// module.exports = router;