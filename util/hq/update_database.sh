COSMOS="/home/ubuntu/server/cosmos_server/web/database/"

pushd "$COSMOS"
git pull

mysql -u root -pRyczak13! cosmos < current_db_updates.sql

echo "" >> old_db_updates.sql
cat current_db_updates.sql >> old_db_updates.sql
rm current_db_updates.sql
touch current_db_updates.sql

git add .
git commit -m "[server] updated database"
git push

echo "database update complete!"
