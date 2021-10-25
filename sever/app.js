const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const app=express();

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

const connection=require('./db');



app.get('/task',async (req,res)=>{
    const my_Query=`SELECT * FROM todos;`
    connection.query(my_Query, (err, response, f) => {
        if (err) {
            console.log("This is the error", err);
        }
        else {
            res.json(response);
            
        }
    });
    
})

app.post('/add', (req,res)=>{
    let task=req.body;
    if(task.item.length>=3){
        const add=`INSERT INTO todos(item) VALUES('${task.item}');`
        connection.query(add,(e,r,f)=>{
            if(e){
                console.log("this is the error", e)
            }
            else{
                res.json(task)
            }
        })
    }
})


app.post('/delete', async (req,res)=>{
    let  data=req.body;
    console.log(typeof(data))
    const delQuery=`DELETE FROM todos WHERE id=?;`
    const arr=[data.id]
    
    connection.query(delQuery,arr, (err, response,f) => {
        if (err) {
            console.log("errr in del", err);
        }
    });
    res.json(data)
});


const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Listening To Port No. ${port}...`);
});