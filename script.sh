#!/bin/bash

# activate the virtual environment
source env/bin/activate

# start a python server on port 5050
python -m http.server 5050

# run backend server
fastapi dev main.py
