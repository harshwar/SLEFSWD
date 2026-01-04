from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os, certifi
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

client = MongoClient(os.getenv('MONGO_URI'), tlsCAFile=certifi.where())
db = client['student_db']
col = db['students']

@app.route('/create', methods=['POST'])
def create():
    data = request.json
    res = col.insert_one(data)
    data['_id'] = str(res.inserted_id)
    return jsonify(data), 201

@app.route('/read', methods=['GET'])
def read():
    docs = []
    for d in col.find():
        d['_id'] = str(d['_id'])
        docs.append(d)
    return jsonify(docs)

@app.route('/update', methods=['PUT'])
def update():
    sid = request.args.get('id')
    col.update_one({'_id': ObjectId(sid)}, {'$set': request.json})
    return jsonify({'msg': 'updated'})

@app.route('/delete', methods=['DELETE'])
def delete():
    sid = request.args.get('id')
    col.delete_one({'_id': ObjectId(sid)})
    return jsonify({'msg': 'deleted'})

if __name__ == '__main__':
    app.run(port=5000)
