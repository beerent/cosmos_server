COSMOS="/home/ubuntu/server/cosmos_ios/server/src/"

pushd "$COSMOS"
git pull
sudo kill -9 $(ps aux | grep 'cosmos_server.js' | awk '{print $2}')
sudo node cosmos_server.js live & disown
popd


echo "server restarted!"
