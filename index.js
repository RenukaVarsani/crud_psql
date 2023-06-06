const eurekaHelper = require("./eureka-helper");
const express = require("express");
const app = express();

require("dotenv").config();
const pool = require("./db");
app.use(express.json());

app.post("/demo", async (req, res) => {
  try {
    console.log(req.body);
    const { id, description } = req.body;
    const demo = await pool.query(
      `INSERT INTO "demo" ("id", "description")  
        VALUES ($1, $2) returning * `,
      [id, description]
    );
    res.json(demo);
  } catch (error) {
    res.status(500);
    console.log(error.message);
  }
});

app.get("/demo", async (req, res) => {
  try {
    const data = await pool.query(`select id,description from demo`);
    res.send(data.rows);
    console.log(data.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/demo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataById = await pool.query("select * from demo where id = $1", [id]);
    res.json(dataById.rows[0]).status(200);
    console.log(dataById.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/demo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateData = await pool.query(
      "update demo set description=$1 where id=$2",
      [description, id]
    );
    console.log(updateData);
    res.json("updated");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/demo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await pool.query("delete from demo where id=$1", [id]);
    console.log(deleteData.rows[0]);
    res.json("deleted");
  } catch (error) {
    console.log(error.message);
  }
});

eurekaHelper.registerWithEureka("renuka-psql-crud", 5000);

app.listen(5000, () => {
  console.log("server is running on 5000 port");
});
