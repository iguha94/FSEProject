# -*- coding: utf-8 -*-
"""
Created on Tue Feb 18 17:01:14 2020

@author: MBiggs
"""

from flask import Flask, jsonify, render_template, request,g
import mysql.connector
import base64
import re
from flask_cors import CORS, cross_origin



regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/registration": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/event":{"origins":"http://localhost:300"}})

@app.before_request
def con():
  g.db = mysql.connector.connect(user='root', password='',
                                host='localhost', database='FSETEAM04',
                                auth_plugin='mysql_native_password')

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/chngtoadmstatus',methods=['GET'])
def changetoadmstatus():
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    emailid= request.args.get('Email')
    if emailid== '':
        return jsonify({'Message': 'Valid EmailID is Mandatory'}),400
    sql = "SELECT * FROM Users WHERE Email=%s"
    val = (emailid,)
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    if len(myresult)!=1:
        return jsonify({'Message': 'User is not present in the Databse'}),400
    sql = "UPDATE Users SET Status = 'ADMIN' WHERE Email = %s"
    val = (emailid,)
    mycursor.execute(sql, val)
    g.db.close()
    return jsonify({'Message': 'User Has been Promoted to Admin Status'}), 200


@app.route('/login',methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def login():
    print('Here')
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    print('Here2')
    print (request.json)
    print('Email: ', request.json['payload']['Email'])
    print('PassWord: ', request.json['payload']['PassWord'])
    if not request.json or not 'Email' in request.json['payload'] or request.json['payload']['Email'] == '':
        return jsonify({'Message': 'EmailID is Mandatory'}),200
    if not request.json or not 'PassWord' in request.json['payload'] or request.json['payload']['PassWord'] == '' :
        return jsonify({'Message': 'PassWord is Mandatory'}),200
    EmailID = request.json['payload']['Email']
    PassWord = base64.b64encode(request.json['payload']['PassWord'].encode("utf-8"))

    sql = "SELECT * FROM Users WHERE Email=%s AND PassWord=%s"
    val = (EmailID,PassWord,)
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    print('here4',len(myresult))
    g.db.close()
    if len(myresult)!=1:
        return jsonify({'Message': 'Email or Password is Incorrect'}),200
    print('here3')
    return jsonify({'Message': 'Logged in Successfully'}), 200


@app.route('/test',methods=['POST'])
def test():
    return jsonify({'Message': 'Logged in Successfully'}), 200

@app.route('/registration',methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def signup():
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    print(request.json)
    print(request.json['payload']['Email'])
    if not request.json['payload'] or not 'Email' in request.json['payload'] or request.json['payload']['Email'] == '' or not re.search(regex, request.json['payload']['Email']):
        return jsonify({'Message': 'Valid EmailID is Mandatory'}),200
    if not request.json or not 'PassWord' in request.json['payload'] or request.json['payload']['PassWord'] == '' :
        return jsonify({'Message': 'PassWord is Mandatory'}),200
    print('here')
    EmailID = request.json['payload']['Email']
    sql = "SELECT * FROM Users WHERE Email=%s"
    val = (EmailID,)
    print(EmailID)
    mycursor.execute(sql,val)
    myresult = mycursor.fetchall()
    print('Total record in db: ',len(myresult))
    if len(myresult)>0:
        return jsonify({'Message': 'User with This EmailID is already Present'}),200
    print(request.json['payload'])
    if 'LastName' not in request.json['payload']:
        return jsonify({'Message': 'Last Name is Mandatory'}), 200
    if 'FirstName' not in request.json['payload']:
        return jsonify({'Message': 'First Name is Mandatory'}), 200
    if 'Street' not in request.json['payload']:
        return jsonify({'Message': 'Street Name is Mandatory'}), 200
    if 'Country' not in request.json['payload']:
        return jsonify({'Message': 'Country Name is Mandatory'}), 200
    if 'ZIP' not in request.json['payload']:
        return jsonify({'Message': 'Zip is Mandatory'}), 200
    if 'State' not in request.json['payload']:
        return jsonify({'Message': 'State Name is Mandatory'}), 200
    if 'City' not in request.json['payload']:
        return jsonify({'Message': 'City is Mandatory'}), 200
    if 'Phone' not in request.json['payload']:
        return jsonify({'Message': 'Phone Number is Mandatory'}), 200
    print('here3')
    LastName = request.json['payload']['LastName']
    FirstName = request.json['payload']['FirstName']
    Street = request.json['payload']['Street']
    City = request.json['payload']['Country']
    ZIP = request.json['payload']['ZIP']
    State = request.json['payload']['State']
    Country = request.json['payload']['Country']
    PassWord = base64.b64encode(request.json['payload']['PassWord'].encode("utf-8"))
    Phone = request.json['payload']['Phone']
    Status = 'Default'
    CurStatus=''
    sql = "INSERT INTO Users (LastName,FirstName,Street,City,ZIP,State,Country,Email,PassWord,Phone,Status,CurStatus) VALUES ( %s, %s,%s,%s, %s, %s,%s,%s, %s, %s,%s,%s)"
    val = (LastName,FirstName,Street,City,ZIP,State,Country,EmailID,PassWord,Phone,Status,CurStatus)
    print('here')
    mycursor.execute(sql, val)
    g.db.commit()
    g.db.close()
    return jsonify({'Message': 'Account Created Successfully'}), 200

@app.route('/event',methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def request():
	mycursor = g.db.cursor()
	mycursor.execute('USE FSETEAM04')
	print(request.json)
	print(request.json['payload']['organization'])
	return jsonify({'Message': 'Resources Successfully Requested'}), 200

if __name__ == '__main__':
    app.run(debug=True)