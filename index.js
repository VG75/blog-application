import express from "express";
import bodyParser from "body-parser";
import { title } from "process";
import { type } from "os";
import { read } from "fs";

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

app.get("/all-blogs", (req,res) => {
    res.render("all-blogs.ejs", {allBlogs: allBlogs});
})

app.get("/view-blog", (req, res) => {
    let blogIndex = parseInt(req.query.blogIndex, 10);
    const blog = allBlogs[blogIndex];
    const escapeHTML = (str) => {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };
    let escapedContent = escapeHTML(blog.content);
    let formatedContent = "<p>" + escapedContent.split("\n").join("</p><p>") + "</p>";

    res.render("view-blog.ejs", {
        title: blog.title,
        date: blog.date,
        author: blog.author,
        content: formatedContent
    })
});
let blogEditIndex;
app.post("/edit-blog", (req, res) => {
    blogEditIndex = parseInt(req.body["blogIndex"], 10);
    res.render("edit-blog.ejs", {blog : allBlogs[blogEditIndex]});
});

app.post("/edit-page", (req, res) => {
    console.log(blogEditIndex);
    const blogToEdit = allBlogs[blogEditIndex];
    

    blogToEdit.title = req.body["title"];
    blogToEdit.author = req.body["author"];
    blogToEdit.content = req.body["blogContent"];
    
    const date = new Date();
    const dateStringList = date.toDateString().split(" ");
    const currentDate = `${dateStringList[2]} ${dateStringList[1]}, ${dateStringList[3]}`;
    blogToEdit.date = currentDate;
    
    res.redirect("/all-blogs");

})



let date = new Date();

const allBlogs = [];
allBlogs.push({
    title: "The Art of Coding",
    date: "12 Jan, 2025",
    author: "Vageesha G",
    content: "We’re thrilled to have you here in our vibrant online community where stories, ideas, and knowledge come to life. Our platform is a haven for writers, thinkers, and readers who share a passion for creativity and expression. Whether you’re here to discover inspiring articles, share your own stories, or engage in meaningful conversations, you’ll find yourself at home in a space designed for exploration and connection.\n\nHere, you’ll uncover a wide variety of content ranging from thought-provoking blogs to helpful how-to guides and captivating personal narratives. Our community celebrates diversity, ensuring there’s something for everyone to enjoy and learn from. You can expect an easy-to-use interface, personalized experiences, and an inclusive environment where every voice matters.\n\nJoin us in shaping a thriving hub of ideas and inspiration! Create your own blogs, showcase your thoughts, or dive into the rich collection of posts shared by our talented community. Whether you’re here to connect, learn, or create, our platform is the perfect place to make your mark. Together, let’s build a space where words inspire action and ideas ignite change. Welcome aboard!"
});

allBlogs.push({
    title: "The Art of Coding",
    date: "12 Jan, 2025",
    author: "Vageesha G",
    content: "We’re thrilled to have you here in our vibrant online community where stories, ideas, and knowledge come to life. Our platform is a haven for writers, thinkers, and readers who share a passion for creativity and expression. Whether you’re here to discover inspiring articles, share your own stories, or engage in meaningful conversations, you’ll find yourself at home in a space designed for exploration and connection.\n\nHere, you’ll uncover a wide variety of content ranging from thought-provoking blogs to helpful how-to guides and captivating personal narratives. Our community celebrates diversity, ensuring there’s something for everyone to enjoy and learn from. You can expect an easy-to-use interface, personalized experiences, and an inclusive environment where every voice matters.\n\nJoin us in shaping a thriving hub of ideas and inspiration! Create your own blogs, showcase your thoughts, or dive into the rich collection of posts shared by our talented community. Whether you’re here to connect, learn, or create, our platform is the perfect place to make your mark. Together, let’s build a space where words inspire action and ideas ignite change. Welcome aboard!"
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});