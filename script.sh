#!/bin/bash

# activate the virtual environment
source env/bin/activate

# start a python server on port 5050
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