COSMOS="/home/ubuntu/server/cosmos_server/server/src/"

pushd "$COSMOS"
git pull
sudo SSL_PASSWORD=$SSL_PASSWORD node cosmos_server.js live & disown
sudo kill -9 $(ps aux | grep 'sudo node cosmos_server.js' | awk '{print $2}')
popd
