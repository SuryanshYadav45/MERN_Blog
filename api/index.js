const express = require('express');
const mongoose= require('mongoose');
const UserModel = require('./models/User');
const BlogModel = require('./models/Blog');
const bcrypt = require('bcrypt');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app=express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://0.0.0.0:27017/Blog");

app.use('/uploads', express.static(__dirname+'/uploads'));

const secretkey="ijefrfuneu"
let filename;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    filename=file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

app.post("/register",async(req,res)=>
{
    const{username,password,email}=req.body;
    await UserModel.create({
        username,
        email,
        password: await bcrypt.hash(password,10)
    })
    res.status(200).send("register successfully")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Create a JWT token
          const token = jwt.sign({ userId: user._id, id: user._id,username:user.username },secretkey,{ expiresIn: '1h' });
  
          // Send the token in the response
          res.status(200).json({ token });
        } else {
          // Incorrect password
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else {
        // User not found
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/createblog", upload.single('file'),async(req,res)=>
  {
    const{title,description}=req.body;
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token.split(' ')[1], secretkey);
    const userID=decodedToken.id;
    const authorname=decodedToken.username;

    
    const response=await BlogModel.create({
      title,description,file:filename,authorId:userID,authorname

    })
    
    res.status(200).send(response)
  })


  app.get('/getblog',async(req,res)=>
  {
      const blogs=await BlogModel.find();

      res.status(200).json(blogs);
  })
  app.post('/editblog/:id',async(req,res)=>
  {
      const singleblog=await BlogModel.findOne({_id:req.params.id})
      // console.log(singleblog)

      res.status(200).json(singleblog);
  })


app.listen(4000,()=>
{
    console.log("server running at the specified port")
})


// const clientid="Aw0uBDaJThJbdBFSLirZTY";
// const clientsecret="VP3HgdqsMKaenfZXxoQl2XVP95VtxHgFmemyF5zpmiSr";

// const concatenatedString = clientid + ':' + clientsecret;

// // Base64 encode the concatenated string
// const base64Encoded = btoa(concatenatedString);

// console.log(base64Encoded);