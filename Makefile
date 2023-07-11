build:
	docker-compose build

up:
	docker-compose up -d

run:
	docker-compose up --build

down:
	docker-compose down --remove-orphans

start: build up