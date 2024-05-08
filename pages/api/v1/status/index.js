import database from "infra/database.js"

export default async function handler(req, res) {
  const databaseVersionResult = await database.query("SHOW server_version;")
  const databaseVersionValue = databaseVersionResult.rows[0].server_version

  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;")
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections

  const databaseName = process.env.POSTGRES_DB

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
     values : [databaseName]
  })
  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count

  const updatedAt = new Date().toISOString()
  res.status(200).json({ updated_at: updatedAt,
  dependencies: {
    database: {
      version: databaseVersionValue,
      max_connections: parseInt(databaseMaxConnectionsValue),
      opened_connections: parseInt(databaseOpenedConnectionsValue)
    }
  }
  })
}