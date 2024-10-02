import express from "express";
import routes from "./routes/index.mjs"
const app = express();
app.use(express.json())

app.use(routes);


const loggingMiddleware = (req, res, next) => {
	console.log(`${req.method} - ${req.url}`)
	next();
};

// const verifyMiddleware = (req, res,next) => {
// 	const key = parseInt(req.params.key)
// 	console.log(typeof (id));
// 	if (key != 8) {
// 		return res.send({ msg: "auth failed" })
// 	}
// 	else {
// 		next()
// 	}
// }

//app.use(loggingMiddleware);

const port = process.env.port || 3000;


app.get('/', loggingMiddleware, (req, res) => {
	res.send({ msg: "hemlo" });
});
// app.get('/api/users/',
// 	query("filter").isString().notEmpty(),
// 	(req, res) => {
// 		const result = validationResult(req);
// 		console.log(result)
// 	//console.log(req.query)
// 	const { query: { filter, value } } = req;
// 	//console.log(filter, value);
// 	if (!filter && !value) return res.send(users);
// 	if (!filter || !value) return res.status(401).send("bad request...invalid query params");
//
//
// 	if (filter && value) res.send(
// 		users.filter((user) => user[filter].includes(value)
// 		)
// 	)
//
// });




app.listen(port, () => {
	console.log("listening on port", port);
});
