# Waiting for MySQL:

echo "$(date) - waiting for MySQL...";
wait-on tcp:database:3306
echo "$(date) - MySQL is ready";
cd /usr/src/app
npm run migrate
pm2 start npm --watch -- start
pm2 logs
