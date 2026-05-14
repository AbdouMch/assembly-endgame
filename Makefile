.DEFAULT_GOAL := help
ENV_FILE     = docker.env
COMPOSE      = docker compose --env-file $(ENV_FILE)
PROD_COMPOSE = docker compose -f docker-compose.prod.yml --env-file $(ENV_FILE)
SERVICE      = react-app

.PHONY: help up down restart logs shell install add remove build clean prod-build prod-up prod-down prod-logs

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

up: ## Start the container (idles if no package.json yet — run 'make scaffold' first)
	$(COMPOSE) up -d

down: ## Stop and remove containers
	$(COMPOSE) down

restart: ## Restart the dev server
	$(COMPOSE) restart $(SERVICE)

logs: ## Tail live logs
	$(COMPOSE) logs -f $(SERVICE)

shell: ## Open a shell inside the container
	$(COMPOSE) exec $(SERVICE) sh

scaffold: ## Scaffold a new Vite + React project  →  make scaffold TEMPLATE=react-ts
	$(COMPOSE) exec $(SERVICE) sh -c "npm create vite@latest . -- --template $${TEMPLATE:-react} && npm install"
	$(COMPOSE) restart $(SERVICE)

dev: ## Start the Vite dev server (use after scaffold without a full restart)
	$(COMPOSE) exec $(SERVICE) npm run dev -- --host --port $${CONTAINER_PORT:-5173}

install: ## Run npm install inside the container
	$(COMPOSE) exec $(SERVICE) npm install

add: ## Install a package  →  make add PKG=react-router-dom
	$(COMPOSE) exec $(SERVICE) npm install $(PKG)

remove: ## Remove a package  →  make remove PKG=react-router-dom
	$(COMPOSE) exec $(SERVICE) npm uninstall $(PKG)

build: ## Build for production inside the container
	$(COMPOSE) exec $(SERVICE) npm run build

preview: ## Preview production build inside the container
	$(COMPOSE) exec $(SERVICE) npm run preview -- --port $${PREVIEW_PORT:-4173}

clean: ## Stop containers and wipe node_modules volume
	$(COMPOSE) down -v

run: ## Pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(COMPOSE) exec $(SERVICE) $(c)

prod-build: ## Build the production image
	$(PROD_COMPOSE) build

prod-up: ## Start the production container
	$(PROD_COMPOSE) up -d

prod-down: ## Stop the production container
	$(PROD_COMPOSE) down

prod-logs: ## Tail production logs
	$(PROD_COMPOSE) logs -f