cd /app/frontend
node server.js &

# Start backend server (example)
cd /app/backend
node index.js &

# Keep the container running
tail -f /dev/null