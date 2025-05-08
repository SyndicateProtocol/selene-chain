import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { transactionRequests } from "./schema"
class Db {
  private pg = drizzle({
    casing: "snake_case",
    connection: process.env.DATABASE_URL as string,
    schema: {
      transactionRequests
    }
  })

  getInvalidTransactionRequests() {
    return this.pg.query.transactionRequests.findMany({
      where: eq(transactionRequests.invalid, true)
    })
  }
}

const db = new Db()

export { db }
