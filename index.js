let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override')
app.use(methodOverride('_method'))

//data
let posts = [
    {
        bio: "muhammad",
        id: uuidv4(),
        username: "SAYED NOOR MAHAMMAD",
        content: "SACRIFAICE==SUCCESS"
    },
    {
        bio: "suleman",
        id: uuidv4(),
        username: "SULEMAN",
        content: "JUMP INTO HARDWORK AND GAIN MORE"
    },
    {
        bio: "rahim",
        id: uuidv4(),
        username: "RAHIM",
        content: "DO MORE"
    }
]

//listing server
app.listen(port, () => {
    console.log("listening req");
})
//index page /posts route
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})
// create new post form 
app.get("/posts/new", (req, res) => {
    res.render("newpost.ejs")
})
// create new post  and redirect into main page 
app.post("/posts", (req, res) => {
    let id = uuidv4();

    let { username, content } = req.body;
    console.log(id, username, content);
    posts.push({ id, username, content });
    res.redirect("/posts")
})
//view detail each post 


app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);

   
    if (!post) {
        res.send("404!")
    }
    res.render("showdetail.ejs", { post });
});
//edit values
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => {
        return id == p.id;
    })
    res.render("edit.ejs", ({ post }));

})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    
    posts = posts.filter((p) => id!= p.id);
    res.redirect("/posts");
 
})

