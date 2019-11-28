COSMOS="/home/ubuntu/server/cosmos_ios/server/src/"

pushd "$COSMOS"
git pull
sudo node cosmos_server.js live & disown
sudo kill -9 $(ps aux | grep 'sudo node cosmos_server.js' | awk '{print $2}')
popd
