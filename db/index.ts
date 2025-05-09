import { desc } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { invalidTransactionRequests } from "./schema"
class Db {
  private pg = drizzle({
    casing: "snake_case",
    connection: process.env.DATABASE_URL as string,
    schema: {
      invalidTransactionRequests
    }
  })

  saveInvalidTransactionRequest(
    payload: typeof invalidTransactionRequests.$inferInsert
  ) {
    return this.pg.insert(invalidTransactionRequests).values({
      ...payload
    })
  }
  getInvalidTransactionRequests() {
    return this.pg.query.invalidTransactionRequests.findMany({
      orderBy: [desc(invalidTransactionRequests.createdAt)],
      limit: 100
    })
  }
}

const db = new Db()

export { db }
