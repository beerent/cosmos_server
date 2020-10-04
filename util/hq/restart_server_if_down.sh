#!/bin/bash

response=$(curl --write-out '%{http_code}' --silent --output /dev/null https://knowyourcosmos.com:13213/health)

if [ $response -ne 200 ]; then
  ./restart_mysql.sh
  ./restart_server.sh
fi
