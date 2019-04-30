date=`date +%d_%m_%y_%H_%M`
outfile="cosmos_db_backup_$date.sql"
cmd="mysqldump --login-path=hq cosmos > ~/db_backup/$outfile"
eval $cmd
echo $outfile
