
import database from 'infra/database.js'

async function cleanDatabase() {
  await database.query('drop schema public cascade; create schema public;')
}

beforeAll(async () => {
  await cleanDatabase()
})

test("GET to /api/v1/migrations should return status 200 and correct data", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations")
  const responseBody = await response.json()
  expect(response.status).toBe(200)
  expect(Array.isArray(responseBody)).toEqual(true)
  expect(responseBody.length).toBeGreaterThan(0)
})