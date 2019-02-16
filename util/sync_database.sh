#create backup
ssh -i ~/.ssh/cosmos_hq.pem ubuntu@www.knowyourcosmos.com './server/cosmos_ios/util/backup_db.sh'


#get backup
db_filename=`ssh -i ~/.ssh/cosmos_hq.pem ubuntu@www.knowyourcosmos.com './server/cosmos_ios/util/backup_db.sh'`
scp -i ~/.ssh/cosmos_hq.pem ubuntu@www.knowyourcosmos.com:~/db_backup/$db_filename .


#apply backup
mysql -u root -pRyczak13! -e "drop database cosmos"
mysql -u root -pRyczak13! -e "create database cosmos"
mysql -u root -pRyczak13! cosmos < $db_filename


#remove backup
rm $db_filename