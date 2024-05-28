#!/usr/bin/env bash

echo "Deploying to AWS UCSC Amazon"
echo "Make sure you have done npm run build"
echo "Make sure you have a .env file with POSTGRES_HOST=pginstance in the scripts directory"
echo "Make sure you have a docker-compose.yml file in the scripts directory"
echo "Make sure you have aws-ucsc-amazon in your ~/.ssh/config file"

# Define your server details
SERVER_HOST=aws-ucsc-amazon
SERVER_BUILD=/home/ubuntu/build

# Define the local path to your project
SCRIPT_PATH=$(dirname "$0")
LOCAL_PATH=$(dirname "$0")/..

# Connect to the server and delete test
ssh $SERVER_HOST << EOF
  rm -rf $SERVER_BUILD
  mkdir $SERVER_BUILD
  mkdir $SERVER_BUILD/AccountService
  mkdir $SERVER_BUILD/OrderService
  mkdir $SERVER_BUILD/ProductService
  mkdir $SERVER_BUILD/sql
EOF

docker build -t app:latest $LOCAL_PATH
docker save -o $LOCAL_PATH/app.tar app:latest

scp $LOCAL_PATH/app.tar $SERVER_HOST:$SERVER_BUILD/app.tar

scp $SCRIPT_PATH/docker-compose.yml $SERVER_HOST:$SERVER_BUILD/docker-compose.yml
scp $SCRIPT_PATH/.env $SERVER_HOST:$SERVER_BUILD/

# Copy SQL files to server
scp -r $LOCAL_PATH/sql $SERVER_HOST:$SERVER_BUILD/
scp -r $LOCAL_PATH/AccountService/sql $SERVER_HOST:$SERVER_BUILD/AccountService/
scp -r $LOCAL_PATH/OrderService/sql $SERVER_HOST:$SERVER_BUILD/OrderService/
scp -r $LOCAL_PATH/ProductService/sql $SERVER_HOST:$SERVER_BUILD/ProductService/

ssh $SERVER_HOST "tmux new-session -d -s runningAmazon"
echo "Started tmux session runningAmazon"

ssh $SERVER_HOST "tmux send-keys -t runningAmazon 'cd $SERVER_BUILD; tmux wait-for -S cmd1' C-m"
ssh $SERVER_HOST "tmux wait-for cmd1"
echo "Changed directory to $SERVER_BUILD"

ssh $SERVER_HOST "tmux send-keys -t runningAmazon 'sudo docker-compose down; tmux wait-for -S cmd2' C-m"
ssh $SERVER_HOST "tmux wait-for cmd2"
echo "Ran docker-compose down"

ssh $SERVER_HOST "tmux send-keys -t runningAmazon 'sudo docker rmi app:latest; tmux wait-for -S cmd3' C-m"
ssh $SERVER_HOST "tmux wait-for cmd3"
echo "Removed Docker image app:latest"

ssh $SERVER_HOST "tmux send-keys -t runningAmazon 'sudo docker load -i app.tar; tmux wait-for -S cmd4' C-m"
ssh $SERVER_HOST "tmux wait-for cmd4"
echo "Loaded Docker image from app.tar"

ssh $SERVER_HOST "tmux send-keys -t runningAmazon 'sudo docker-compose up; tmux wait-for -S cmd5' C-m"
echo "Ran docker-compose up"
echo "Deployed to $SERVER_HOST, Check tmux session runningAmazon to verify deployment."