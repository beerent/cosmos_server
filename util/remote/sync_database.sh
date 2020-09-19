#create backup
echo "creating backup on Cosmos HQ"
db_filename=`ssh -i ~/.ssh/cosmos_revived_2020.pem ubuntu@www.knowyourcosmos.com './server/cosmos_server/util/hq/backup_db.sh'`

#get backup
echo "pulling down backup from Cosmos HQ"
scp -i ~/.ssh/cosmos_revived_2020.pem ubuntu@www.knowyourcosmos.com:~/db_backup/${db_filename} .

#apply backup
echo "applying backup"
mysql --login-path=local -e "drop database cosmos"
mysql --login-path=local -e "create database cosmos"
mysql --login-path=local cosmos < $db_filename

#remove backup
echo "removing backup"
rm $db_filename

echo "backup complete."
