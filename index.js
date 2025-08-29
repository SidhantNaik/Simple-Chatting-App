const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


mongoose.connect('mongodb://127.0.0.1:27017/ChattingApp')
    .then(() => { console.log("Database is connected."); })
    .catch(ex => { console.log(ex); });



//Home route to display all messages
app.get('/chats', async (req, res) => {
    const chats = await Chat.find();
    res.render('home', { chats });
})

//Show insert form
app.get('/chat/new', (req, res) => {
    res.render("insert");
})

//Insert new message
app.post('/chats', async (req, res) => {
    const data = req.body;
    data.created_at = new Date();
    await Chat.create(data); 
    res.redirect('/chats');
})

//Show edit form
app.get('/chat/:id/edit', async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.render("edit", { chat });
})

//Edit the message
app.put('/chats/:id', async (req, res) => {
    const { id } = req.params;
    const { msg } = req.body;
    await Chat.findByIdAndUpdate(id, { msg:msg });
    res.redirect('/chats');
})

//Delete Route
app.delete('/chat/:id', async (req, res) => {
    const {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
})

app.listen(3000, () => {
    console.log("Server is running at port : 3000");
})
