
import database from 'infra/database'

async function cleanDatabase() {
  await database.query('drop schema public cascade; create schema public;')
}

beforeAll(async () => {
  await cleanDatabase()
})

test("POST to /api/v1/migrations should return status 200 and correct data", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  })

  const responseBody1 = await response1.json()
  expect(response1.status).toBe(201)
  expect(Array.isArray(responseBody1)).toEqual(true)
  expect(responseBody1.length).toBeGreaterThan(0)

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  })

  const responseBody2 = await response2.json()
  expect(response2.status).toBe(200)
  expect(Array.isArray(responseBody2)).toEqual(true)
  expect(responseBody2.length).toEqual(0)

})