const mongoose = require('mongoose');
const BookingBookByUserSchema= new mongoose.Schema({
    BookId:{type: mongoose.Schema.Types.ObjectId, ref:"AdintorsLibrary"},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDataAdintors',
        required: true,
    },
    userName:{type:String,default:""},

    BookingFromDate:{type:String,required:true},
    BookingToDate:{type:String,required:true}                                       
      
},{
    timestamps:true 
})

module.exports = mongoose.model('BookingLibraryBook', BookingBookByUserSchema);