#!/usr/bin/env bash
# Chạy migration + kiểm thử trên một Postgres 16 cục bộ (không cần Docker / Supabase CLI).
#   PGHOST=/tmp PGPORT=54329 PGUSER=postgres npm run db:test
set -euo pipefail
cd "$(dirname "$0")/.."
DB=${TEST_DB:-bjt_test}
psql -v ON_ERROR_STOP=1 -q -d postgres -c "drop database if exists $DB" -c "create database $DB"
for f in tests/00_supabase_stub.sql migrations/*.sql; do
  psql -v ON_ERROR_STOP=1 -q -d "$DB" -f "$f" > /dev/null
done
for f in tests/[0-9]*_*.sql; do
  [ "$f" = tests/00_supabase_stub.sql ] && continue
  psql -v ON_ERROR_STOP=1 -q -d "$DB" -f "$f" | grep -q "ALL TESTS PASSED" && echo "✓ $f" || { echo "✗ $f"; exit 1; }
done
