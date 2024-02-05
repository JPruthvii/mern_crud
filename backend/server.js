const http=require("http");
const app = require("./app");

let server=http.createServer(app)



server.listen(5000,(err)=>{
    if(err)console.log(err);
    console.log('server is running on port 5000');
})