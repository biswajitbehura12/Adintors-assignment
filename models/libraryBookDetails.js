const mongoose = require('mongoose');

const libraryBookSchema = new mongoose.Schema({
    title: {type:String,required: true},
  author: {type:String,required: true},
  isBooked:{type:String,default: false},
  isDelete:{type:Boolean,default:false}
 } ,{
     timestamps:true 
  });
  module.exports = mongoose.model('AdintorsLibrary', libraryBookSchema);