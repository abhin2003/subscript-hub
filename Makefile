.PHONY: up down demo test seed reset lint

# Start full multi-container development environment
up:
	docker compose up -d

# Stop all running containers
down:
	docker compose down

# Fast reset and seed for offline demonstrations (BP §16.8 / FR-K6)
demo:
	docker compose down -v
	docker compose up -d db mailpit
	@echo "Waiting for PostgreSQL to become healthy..."
	docker compose exec -T db pg_isready -U postgres -d subscript_hub || sleep 3
	docker compose run --rm api alembic upgrade head
	docker compose run --rm api python scripts/seed.py
	docker compose up -d api worker web
	@echo "Demo ready at http://localhost:5173 (Mailpit: http://localhost:8025)"

# Run backend and frontend test suites
test:
	docker compose run --rm api pytest tests/
	cd frontend && npm run test

# Run seed script
seed:
	docker compose run --rm api python scripts/seed.py

# Complete reset of database and storage volumes
reset:
	docker compose down -v
	docker compose up -d db
	docker compose run --rm api alembic upgrade head
	docker compose run --rm api python scripts/seed.py

# Run static analysis and lint checks
lint:
	cd backend && ruff check . && mypy .
	cd frontend && npm run lint
