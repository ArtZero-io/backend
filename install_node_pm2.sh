#!/bin/bash
# Check if the operating system is Ubuntu
if [ "$(cat /etc/os-release | grep -i "ID=ubuntu" | cut -d'=' -f2)" != "ubuntu" ]; then
    echo "This OS is not Ubuntu. Exiting..."
    exit 1
fi
#Check run as root
echo "Please run with sudo user"
echo "Install nodejs pm2"
sudo apt update -y
sudo apt upgrade -y
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs gcc g++ make npm -y
sudo apt install build-essential -y
sudo npm install pm2@latest -g
sudo npm install -g n
sudo n 16.14.0
sudo npm install -g npm@9.5.1
echo "Install yarn"
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update -y && sudo apt-get install yarn -y
pm2 -v
npm -v
node -v
yarn -v
