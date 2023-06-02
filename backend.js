const express = require('express')
const app = express()
const port = 3000
const { exec } = require('child_process');
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home')
})

app.post("/done",(req,res)=>{
    const data = req.body.data;
    const ammount = req.body.ammount;

    exec(`solana airdrop ${ammount} ${data} --url https://api.devnet.solana.com`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        else{
                    exec(` solana balance ${data} --url https://api.devnet.solana.com`, (error, stdout, stderr) => {
                if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
                }
                const outputdata = JSON.parse(stdout);

                if (outputdata.Commitment === "confirmed") {
                    res.send(`sent ${ammount} sol to ${data}`);
                }
            
                // Process the command output (stdout)
                console.log(`Command output: ${stdout}`);
            });

            
        }
        // Process the command output (stdout)
        console.log(`Command output: ${stdout}`);
      });
      
})
// app.get("/done",(req,res)=>{
//     res.sendStatus(200).send("<div><h1>Sent to the id</h1></div>")
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// // const express = require('express');
// // const app = express();
// // const port = 3000;

//  // Middleware to parse request body

// app.get('/', (req, res) => {
//   res.send(`
//     <form action="/done" method="POST">
//       <input type="text" name="data" placeholder="Enter data">
//       <button type="submit">Submit</button>
//     </form>
//   `);
// });

// app.post('/done', (req, res) => {
//   const data = req.body.data;
//   res.send(`Received data: ${data}`);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });