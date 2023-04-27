const express = require('express')
const router = express.Router()
const auth = require('../middleWare/auth.js');

const {
    getBooks,BookingBookByuser,createBook,getBookingBookByuser,BookSubmitByuser
} = require('../controllers/bookControl')

router.post('/create-book',createBook);

router.post('/booking-by-user',auth,BookingBookByuser);

router.get('/get-books',getBooks);
router.get('/get-booking-book-by-user',auth,getBookingBookByuser);
router.post('/book-submit-by-user',auth,BookSubmitByuser);

module.exports = router;