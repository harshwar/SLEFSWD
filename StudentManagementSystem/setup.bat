@echo off
echo Installing Python dependencies...
pip install flask pymongo flask-cors requests python-dotenv dnspython certifi

echo Installing Node.js dependencies...
cd node_api
call npm init -y
call npm install express mongoose cors dotenv
cd ..

echo Setup complete!
pause
