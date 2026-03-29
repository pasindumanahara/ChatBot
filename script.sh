#!/bin/bash

read -p "create new environment? -y -n" answer

if [ $answer = "y" ]; then    
    # create python env
    python3 -m venv env
    # activate the virtual environment
    source env/bin/activate
    # python packages
    pip install "fastapi[standard]" ollama
    echo "Done..."
else
    read -p "path? [/env/]" path
    if [ -z path ]; then
        exit
    source $path/actvate
fi

# install ollama
read -p "already have ollama? -y -n" answer1

if [ $answer1 = "n" ]; then
    echo "installing ollama.."
    sudo apt install ollama
    echo "pulling llama3.2:3b model.."
    ollama pull llama3.2:3b
    addr=$(ollama serve | grep 127)
    site=$(curl $addr | grep "ollama is running")
    if [ $site != "ollama is running" ]; then 
        echo "error starting ollama"
        echo "exiting.."
        exit
    fi
fi
        
# start a python server on port 5050
echo "Starting HTTP server"
python -m http.server 5050

# run backend server
fastapi dev main.py

# open index.html in the browser
$browser_existence = $(which firefox)
if [ -z "$browser_existence" ]; then
    echo "Firefox is not installed. Use any browser"
else
    firefox http://localhost:5050
fi
