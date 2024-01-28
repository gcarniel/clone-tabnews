
import database from "../../../../infra/database"

export default async function handler(req, res) {
  const resp = await database.query("SELECT 1 as num")
  console.log(resp.rows)
  res.status(200).json({ status: "ok" })
}