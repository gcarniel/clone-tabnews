import migrationRunner from 'node-pg-migrate'
import { join } from 'node:path'
import database from 'infra/database.js'

export default async function handler(req, res) {


  const dbClient = await database.getNewClient()

  const defaultMigrationsOptions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true
  } 

  if (req.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions)
    await dbClient.end()
    return res.status(200).json(pendingMigrations)
  }
  if (req.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false
    })

    await dbClient.end()

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations)
    }

    return res.status(200).json(migratedMigrations)
  }

  res.status(405).end()
}

async function handleGet(req, res) {

}

async function handlePost(req, res) {



}