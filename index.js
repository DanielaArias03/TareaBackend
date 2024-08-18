import express from "express";

const app = express();
 app.get("/",(req,res)=>{
    res.send("Prueba del Get")
 });


app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});

