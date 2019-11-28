sudo kill -9 $(ps aux | grep 'cosmos_server.js' | awk '{print $2}')
