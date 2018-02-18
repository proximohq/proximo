# Waiting for MySQL:

echo "$(date) - waiting for MySQL...";
npm run wait-for-db
echo "$(date) - MySQL is ready";
cd /usr/src/app
npm run migrate
npm run start:watch
