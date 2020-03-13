# -*- coding: utf-8 -*-
"""
Created on Tue Feb 18 17:01:14 2020

@author: MBiggs
"""

from flask import Flask, jsonify, render_template, request,g
import mysql.connector
import base64
import re



regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

app = Flask(__name__)

#@app.before_request
##def con():
##   g.db = mysql.connector.connect(user='root', password='',
#                                 host='localhost', database='FSETEAM04',
#                                 auth_plugin='mysql_native_password')

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
def login():
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    if not request.json or not 'Email' in request.json or request.json['Email'] == '':
        return jsonify({'Message': 'EmailID is Mandatory'}),400
    if not request.json or not 'PassWord' in request.json or request.json['PassWord'] == '' :
        return jsonify({'Message': 'PassWord is Mandatory'}),400
    EmailID = request.json['Email']
    PassWord = base64.b64encode(request.json['PassWord'].encode("utf-8"))
    sql = "SELECT * FROM Users WHERE Email=%s AND PassWord=%s"
    val = (EmailID,PassWord,)
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    g.db.close()
    if len(myresult)!=1:
        return jsonify({'Message': 'Email or Password is Incorrect'}),400

    return jsonify({'Message': 'Logged in Successfully'}), 200


@app.route('/test',methods=['POST'])
def test():
    return jsonify({'Message': 'Logged in Successfully'}), 200



@app.route('/registration',methods=['POST'])
def signup():
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    if not request.json or not 'Email' in request.json or request.json['Email'] == '' or not re.search(regex, request.json['Email']):
        return jsonify({'Message': 'Valid EmailID is Mandatory'}),400
    if not request.json or not 'PassWord' in request.json or request.json['PassWord'] == '' :
        return jsonify({'Message': 'PassWord is Mandatory'}),400

    EmailID = request.json['Email']
    sql = "SELECT * FROM Users WHERE Email=%s"
    val = (EmailID,)
    print(sql)
    mycursor.execute(sql,val)
    myresult = mycursor.fetchall()
    print('Total record in db: ',len(myresult))
    if len(myresult)>0:
        return jsonify({'Message': 'User with This EmailID is already Present'}),400

    if 'LastName' not in request.json:
        return jsonify({'Message': 'Last Name is Mandatory'}), 400
    if 'FirstName' not in request.json:
        return jsonify({'Message': 'First Name is Mandatory'}), 400
    if 'Street' not in request.json:
        return jsonify({'Message': 'Street Name is Mandatory'}), 400
    if 'Country' not in request.json:
        return jsonify({'Message': 'Country Name is Mandatory'}), 400
    if 'ZIP' not in request.json:
        return jsonify({'Message': 'Zip is Mandatory'}), 400
    if 'State' not in request.json:
        return jsonify({'Message': 'State Name is Mandatory'}), 400
    if 'City' not in request.json:
        return jsonify({'Message': 'City is Mandatory'}), 400
    if 'Phone' not in request.json:
        return jsonify({'Message': 'Phone Number is Mandatory'}), 400

    LastName = request.json['LastName']
    FirstName = request.json['FirstName']
    Street = request.json['Street']
    City = request.json['Country']
    ZIP = request.json['ZIP']
    State = request.json['State']
    Country = request.json['Country']
    PassWord = base64.b64encode(request.json['PassWord'].encode("utf-8"))
    Phone = request.json['Phone']
    Status = 'Default'
    CurStatus=''
    sql = "INSERT INTO Users (LastName,FirstName,Street,City,ZIP,State,Country,Email,PassWord,Phone,Status,CurStatus) VALUES ( %s, %s,%s,%s, %s, %s,%s,%s, %s, %s,%s,%s)"
    val = (LastName,FirstName,Street,City,ZIP,State,Country,EmailID,PassWord,Phone,Status,CurStatus)
    mycursor.execute(sql, val)
    #g.db.commit()
    g.db.close()
    return jsonify({'Message': 'Account Created Successfully'}), 200



if __name__ == '__main__':
    app.run(debug=True)