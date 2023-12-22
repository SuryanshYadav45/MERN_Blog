const mongoose=require('mongoose');

const BlogSchema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    file:{type:String,required:true},
    authorId:{type:String,required:true},
    authorname:{type:String,required:true},
    date: { type: Date, default: Date.now }
})

const BlogModel= new mongoose.model('blog',BlogSchema);

module.exports=BlogModel;