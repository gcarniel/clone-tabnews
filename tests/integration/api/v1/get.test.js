
test("GET to /api/v1/status should return status 200 and { status: 'ok' }", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)
  const json = await response.json()
  expect(json.status).toBe("ok")
})