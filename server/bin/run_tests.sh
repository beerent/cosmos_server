#/bin/bash

development_database="cosmos"
test_database="cosmos_test"

# dump current database
mysqldump --login-path=local --no-tablespaces --no-data $development_database > cosmos_skeleton.sql
mysql --login-path=test -e "DROP DATABASE $test_database" > /dev/null 2>&1
mysql --login-path=test -e "CREATE DATABASE $test_database" > /dev/null 2>&1
mysql --login-path=test -D $test_database < cosmos_skeleton.sql > /dev/null 2>&1

rm cosmos_skeleton.sql

node ../src/cosmos_server.js test& 
sleep .5
node ../src/test/test.js

kill %1