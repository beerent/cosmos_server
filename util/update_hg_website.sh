COSMOS="/home/ubuntu/projects/cosmos_ios"
WWW="/var/www/html"

pushd "$COSMOS"
git pull
popd

sudo rm "$WWW/*"
sudo cp -r "$COSMOS/web/* $WWW"