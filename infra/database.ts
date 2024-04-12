import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port:parseInt(process.env.POSTGRES_PORT),
    ssl: getSSLValues()
  });

try {
  await client.connect();
  const result = await client.query(queryObject);
  return result;
} catch (error) {
  console.error(error);
}finally {
  await client.end();
}
}

export default {
  query: query
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA
    }
  } 

  return process.env.NODE_ENV === "development" ? false : true
}