COSMOS="/home/ubuntu/server/cosmos_server"
WWW="/var/www/html"

pushd "$COSMOS"
git pull
popd

sudo rm -r $WWW/*
sudo cp -r $COSMOS/web/* $WWW

echo "update complete!"
