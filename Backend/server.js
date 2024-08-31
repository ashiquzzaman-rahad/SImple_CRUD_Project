const express = require("express");
const cors = require("cors");
const mysql = require("mysql");


const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error!");
        return res.json(data);
    })
})

app.post('/create', (req, res)=>{
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]

    db.query(sql, [values], (err, data)=>{
        if(err) return res.json("Error!");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res)=>{
    const sql = "update `student` set `Name`= (?), `Email`=(?) where `ID`= (?)";
    const name = req.body.name;
    const email = req.body.email;
    const id = req.params.id;

    db.query(sql, [name, email, id], (err, data)=>{
        if(err) return res.status(500).json({ error: err.message });
        return res.json(data);
    })
})

app.delete('/:id', (req, res)=>{
    const sql = "DELETE FROM `student` WHERE `student`.`ID` = (?)";
    const id = req.params.id;
    console.log(id);
    
    db.query(sql, [id], (err, data)=>{
        if(err) return res.json("Error!");
        return res.json(data);
    })
})


app.listen(8081, ()=>{
    console.log("Listening...");
})