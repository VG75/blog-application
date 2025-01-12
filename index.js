import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/edit-blog", (req, res) => {
    res.render("edit-blog.ejs")
})

app.get("/all-blog", (req,res) => {
    res.render("all-blogs.ejs");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});