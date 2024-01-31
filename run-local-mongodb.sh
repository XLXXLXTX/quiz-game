#!/bin/bash

# is docker-compose installed?
if ! command -v docker-compose &> /dev/null; then
	echo "Error: Docker Compose not found. Please install Docker Compose and try again."
	exit 1
fi

# .env file exists?
if [ ! -f .env ]; then
	echo "Error: .env file not found. Please create a .env file and try again."
	exit 1
fi

# load .env file
echo "Loading environment variables from .env file...⌛"
set -a
source .env
set +a

# execute docker-compose up from the directory docker
echo "Running docker-compose up...⌛"
cd "docker"
docker-compose up -d 

exit 0