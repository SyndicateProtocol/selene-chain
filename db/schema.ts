import { sql } from "drizzle-orm"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const invalidTransactionRequests = pgTable(
  "invalidTransactionRequests",
  {
    transactionId: text("transaction_id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    chainId: integer("chain_id").notNull(),
    projectId: text("project_id").notNull(),
    contractAddress: text("contract_address").notNull(),
    data: text("data"),
    value: text("value"),
    functionSignature: text("function_signature").notNull(),
    decodedData: text("decoded_data"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
  }
)
