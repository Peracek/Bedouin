echo "Starting Bedouin tests"

# build and start Bedouin server with testing templates
npm run server-build
export TEMPLATES_DIR=tests/templates
node build/index.js &
SERVER_PID=$!

#wait for Bedouin to start
wait-on http://localhost:3001/api

# run newman tests
newman run tests/newman/BedouinTests.postman_collection.json -e tests/newman/bedouin.postman_environment.json

kill $SERVER_PID