
const BookDetails=require("../models/libraryBookDetails");
const BookingBooks=require("../models/BookingBookByuser");
var mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
// const { type } = require('os');
const getBooks = async (req, res) => {
    try {
       const data=await BookDetails.find();
       res.json(data);
       
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const getBookingBookByuser = async (req, res) => {
    try {
    
const data=  await BookingBooks.aggregate([
    {
$match:{
    userId:new ObjectId(req.user.id),

}
    }
   , 
   {
    $facet: {
      metadata: [
        { $count: "total" },
        {
          $addFields: {
            current_page: req.body.page,
            total_page: { $ceil: { $divide: ["$total", 10] } },
          },
        },
      ],
      data: [{ $skip: (req.body.page - 1) * 10 }, { $limit: 10 }],
    },
  },
]);
res.json(data);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const createBook = async (req, res) => {
    try {
       
        const newBookObj = new BookDetails(req.body);
        await newBookObj.save();
        if(!newBookObj) return res.status(400).json([{ message: 'Book not created', type: 'error' }]);
        res.json(newBookObj);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const BookingBookByuser = async (req, res) => {
    try {
        if(!req.body.BookingToDate) return res.status(400).json([{ message: 'Booking to date required', type: 'error' }]);
        function getYesterdaysDate() {
            var date = new Date();
           let dd=date.getDate();
           let mm=(date.getMonth()+1);
           let yyyy=date.getFullYear()
           if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
            return  `${dd}-${mm}-${yyyy}`;
        }
        const BookingObj= new BookingBooks({
            BookId:req.body.BookId,
    userId:req.user.id,
    BookingFromDate:getYesterdaysDate(),
    BookingToDate:req.body.BookingToDate,
    userName:req.body.userName
        })
     await BookingObj.save();
     if(!BookingObj) return res.status(400).json([{ message: 'Booking failed', type: 'error' }]);
     const data1= await BookDetails.findOneAndUpdate({_id:req.body.BookId},{
        isBooked:true
     },{new:true})
     res.json(BookingObj);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const BookSubmitByuser = async (req, res) => {
    try {
     const data=  await BookingBooks.findOneAndDelete({
        BookId:req.body.BookId,
        userId:req.user.id,
     });
     if(data){
     const data1= await BookDetails.findOneAndUpdate({
        _id:req.body.BookId,
     },{
        isBooked:false
     },{new:true})
     res.status(200).json(data1);
     }
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}



module.exports = {
    
    getBooks,BookingBookByuser,createBook,getBookingBookByuser,BookSubmitByuser
} 