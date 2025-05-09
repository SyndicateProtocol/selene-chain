CREATE TABLE "invalidTransactionRequests" (
	"transaction_id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chain_id" integer NOT NULL,
	"project_id" text NOT NULL,
	"contract_address" text NOT NULL,
	"data" text,
	"value" text,
	"function_signature" text NOT NULL,
	"decoded_data" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
