import { Router } from "express";
import { users } from "../utils/constants.mjs";
const router=Router();

router.get('/api/users/',
	(req, res) => {
	//console.log(req.query)
	const { query: { filter, value } } = req;
	//console.log(filter, value);
	if (!filter && !value) return res.send(users);
	if (!filter || !value) return res.status(401).send("bad request...invalid query params");


	if (filter && value) res.send(
		users.filter((user) => user[filter].includes(value)
		)
	)

});
router.post('/api/users/', (req, res) => {
	console.log(req.body);
	const { body } = req
	const newUser = { id: users[users.length - 1].id + 1, ...body }

	users.push(newUser);
	res.send(users);

})
router.put("/api/users/:id", (req, res) => {
	const { body,
		params: { id },
	} = req
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) return res.send(400)
	const findUserIndex = users.findIndex((user) => user.id === parsedId
	)
	if (findUserIndex === -1) return res.sendStatus(404);

	users[findUserIndex] = { id: parsedId, ...body };

	return res.send(users)
})

router.patch("/api/users/:id", (req, res) => {
	const {
		body,
		params: { id },
	} = req

	const parsedId = parseInt(id);
	if (isNaN(parsedId)) return res.send(400);
	const findUserIndex = users.findIndex((user) => user.id === parsedId)
	if (findUserIndex === -1) return res.sendStatus(404);

	users[findUserIndex] = { ...users[findUserIndex], ...body };

	return res.send(users);

})
router.delete("/api/users/:id", (req, res) => {
	const parsedId = parseInt(req.params.id);
	if (isNaN(parsedId)) return res.statusCode(401).send({ msg: "invalid id" })
	const findUserIndex = users.findIndex((user) => user.id === parsedId)
	if (findUserIndex === -1) return res.statusCode(404).send({ msg: "user not found" })
	res.send(
		users.filter((user) => user.id != findUserIndex + 1)
	)


})

// router.get("/api/users/:key", /* verifyMiddleware, */ (req, res) => {
// 	res.send(users);
// })

router.get('/api/users/:id', (req, res) => {
	//console.log(typeof(Number(req.params.id)));
	const parsedId = parseInt(req.params.id);
	if (isNaN(parsedId)) return res.status(401).send({ msg: "bad request..invalid id" })
	const findUser = users.find((user) => user.id == parsedId);
	if (!findUser) return res.status(404).send({ msg: "user not found" });
	return res.send(findUser);
})

export default router;
