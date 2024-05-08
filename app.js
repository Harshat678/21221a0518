const express = require('express');

const cors =require('cors')
require('dotenv').config();
const app = express();
app.use(cors());
const port = 3000;

const windowSize = 10;
let arr = [];


const fetchNums = async (op) => {
    console.log(process.env.token)
    if(op=='e'){
        const response = await fetch('http://20.244.56.144/test/even',{Headers:{'Authorization':`Bearer ${process.env.token}`}});
        console.log(response.body.stream);
        return response.body.stream;}
if(op=='p'){
    const response = await fetch('http://20.244.56.144/test/primes',{Headers:{'Authorization':`Bearer ${process.env.token}`}});
return response.body.numbers;}
    if(op=='r'){
        const response = await fetch('http://20.244.56.144/test/rand',{Headers:{'Authorization':`Bearer ${process.env.token}`}});
return response.body.numbers;}
    if(op=='f'){
        const response = await fetch('http://20.244.56.144/test/even',{Headers:{'Authorization':`Bearer ${process.env.token}`}});
    return response.body.numbers;

}
    
   
}


const calAvg = (numbers) => {
    let sum = 0;
    for(i=0;i<numbers.lenght;i++){
        sum +=numbers[i];
    }
    return sum / numbers.length;
}


const removeold = () => {
    if (arr.length >= windowSize) {
        arr.shift();
    }
}


app.get('/numbers/:numberid', async (req, res) => {


    const op = req.params.numberid
    const numbers = await fetchNums(op);

    
    numbers.forEach(num => {
        if (!arr.includes(num)) {
            arr.push(num);
            removeold();
        }
    });

    const avg = calAvg(arr);

    const response = {
        numbers: numbers,
        windowPrevState: [],
        windowCurrState: arr,
        avg: avg
    };
    res.json(response);
    
});

app.get('/',(req,res)=>{
   res.send(' welcome to home page !! ')
   console.log(process.env.token)
})
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});