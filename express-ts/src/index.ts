import express, { Request, Response } from "express";
import usersRouter from "./routes/users"
const app= express();
const port = 3000;

app.use('/api/users',usersRouter)

app.get('/',(req: Request, res: Response)=>{
	res.send("hemlo")
})
app.listen(port,()=>{
	console.log("listening on port", port);
})


