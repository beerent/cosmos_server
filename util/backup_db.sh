date=`date +%d_%m_%y_%H_%M`
cmd="mysqldump --no-create-info --insert-ignore -u root -pRyczak13! cosmos > ~/db_backup/cosmos_db_backup_$date.sql"
eval $cmd
