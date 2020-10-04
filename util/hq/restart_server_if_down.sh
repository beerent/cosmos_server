#!/bin/bash

response=$(curl --write-out '%{http_code}' --silent --output /dev/null https://knowyourcosmos.com:13213/health)

if [ $response -ne 200 ]; then
  /home/ubuntu/server/cosmos_server/util/hq/restart_mysql.sh
  /home/ubuntu/server/cosmos_server/util/hq/restart_server.sh
fi
