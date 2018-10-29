date=`date +%d_%m_%y_%H_%M`
cmd="mysqldump -u root -pRyczak13! cosmos > ~/db_backup/cosmos_db_backup_$date.sql"
eval $cmd
