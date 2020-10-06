cmd="sudo SSL_PASSWORD=dixiedix13 node /home/ubuntu/server/cosmos_server/server/src/cosmos_server.js live & disown"
eval $cmd

sudo kill -9 $(ps aux | grep 'sudo node cosmos_server.js' | awk '{print $2}')
