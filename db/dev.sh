set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
source "$SCRIPT_DIR/../.env"

# Check if DATABASE_URL is set and points to a local DB
if [[ -n "${DATABASE_URL:-}" && "$DATABASE_URL" =~ ^postgresql://[^@]*@(localhost|127\.0\.0\.1)(:[0-9]+)?/ ]]; then
  echo "Detected local DATABASE_URL. Starting Docker and running migrations..."
  bun run db:up
  bun run db:migrate
else
  echo "DATABASE_URL is not set to a local database. Skipping Docker and migration steps."
fi
