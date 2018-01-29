import mongoose from 'mongoose';
import crypto from 'crypto';
import Dealers from '../models/dealers';
import Pumps from '../models/pumps';
import Purchases from '../models/purchases';

exports.DealersEntry = (req, res, next)=> {

    Dealers.find({}, (err, dealers) => {
        if (dealers.length == 0) {
            for(let i =0; i < 5000; i++){
                const Name = crypto.randomBytes(8).toString('hex');
                const dealerName = new Dealers({  DealerName: Name });
                dealerName.save((err) =>{
                    if(err){ return res.status(404).send({ message: 'Error to save' }) }
                });
            }
            return res.status(200).send({ Message: "5000 Dealers added." });
        }
        else {
            return res.status(200).send({Message: "Dealer has already Entries."});
        }
    })

}

// exports.getDealers = (req, res, next)=>{
//     Dealers.find({}).sort('DealerID').limit(5000).exec((err, dealers)=>{
//         if(err){ return res.status(404).send({ message: 'Error to save' }) }
//         return res.status(200).json({ Dealers: dealers})
//     })
// }

exports.PumpsEntry = (req, res, next) => {
    Dealers.find({}).sort('DealerID').exec((err, dealers)=>{
        Pumps.find({}, (err, pumps) => {
            if (pumps.length == 0) {
                for(let i= 0;i<dealers.length;i++) {
                    for (let j = 0; j < 10; j++) {
                        let dealerID = new Pumps({ DealerID: dealers[i]._id });
                        dealerID.save((err)=>{ if (err){ return next() } })
                    }
                }
                return res.status(200).json({ Message: "Ten Pumps has added for each Dealers."});
            }else{
                return res.status(202).json({
                    Message: "Pumps has already entries.",
                    pumps: pumps.length
                });
            }
        });
    })
}

exports.PurchageEntry = (req, res, next) => {
    Pumps.find({}).exec((err, pumps)=>{
        Purchases.find({}).exec((err, purchases)=> {
            if (purchases.length == 0) {
                for (let i = 0; i < pumps.length; i++) {
                    for (let j = 0; j < 200; j++) {
                        let purchase = new Purchases({PumpID: pumps[i]._id, VolumePurchased: 10 });
                        purchase.save((err) => {  if (err) { return next() }  })
                    }
                }
                return res.status(200).json({ Message: "200 Purchases has added for each Pumps."});
            } else {
                return res.status(202).json({
                    Message: "purchases has already entries.",
                    pumps: purchases.length
                });
            }
        })
    })
}

exports.updateDealers = (req, res, next) =>{
    Purchases.aggregate([
        {
            $lookup: {
                from: 'pumps',
                localField: 'PumpID',
                foreignField: '_id',
                as: 'Pump'
            }
        },
        { $unwind: "$Pump" },
        {
            $group:
                {
                    _id: "$Pump.DealerID",
                    totalAmount: { $sum: '$VolumePurchased' }
                }
        }
    ])
        .exec((err, result)=>{
                    if(err){next()}
                    for(let i=0;i<result.length;i++){
                        let _id = result[i]._id;
                        Dealers.findOne({_id}, (err,dealer)=>{
                            dealer.TotalPurchasedVolume = result[i].totalAmount;
                            dealer.save();
                        })
                    }
                    return res.status(200).json({Message: "Total Purchased Volume by a all dealer Updated."})
                })
}