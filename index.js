const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/ChattingApp')
    .then(() => { console.log("Database is connected."); })
    .catch(ex => { console.log(ex); });


app.get('/chats', async (req, res) => {

    const chats = await Chat.find();
    res.render('home', { chats });
})


app.get('/chat/new', (req, res) => {
    res.render("insert");
})

app.post('/chats', async(req, res) =>{
    const data =  req.body;
    await Chat.insertOne(data)
    res.redirect('/chats');
})



app.listen(3000, () => {
    console.log("Server is running at port : 3000");
})
