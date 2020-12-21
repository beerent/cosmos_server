memory=`ssh -i ~/.ssh/cosmos_final_key.pem ubuntu@www.knowyourcosmos.com './server/cosmos_server/util/hq/free_memory.sh'`
echo "cosmos memory: ${memory}MB"
