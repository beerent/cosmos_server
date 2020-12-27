COSMOS="/home/ubuntu/server/cosmos_server"
WWW="/var/www/html"

pushd "$COSMOS"
git pull
popd

sudo rm -r $WWW/*
sudo cp -r $COSMOS/web/* $WWW
sudo cp $WWW/landing/index.php $WWW/index.php
sudo mv $WWW/landing/resources $WWW

echo "update complete!"
