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
import datetime


regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/registration": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/query": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/event": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/subdonation": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/getmatchingdonation": {"origins": "http://localhost:3000"}})
cors = CORS(app, resources={r"/insertmatchingdonation": {"origins": "http://localhost:3000"}})

@app.before_request
def con():
  g.db = mysql.connector.connect(user='root', password='',
                                host='localhost', database='FSETEAM04',
                                auth_plugin='mysql_native_password') #passowrd is 'root' for mikayla

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
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
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
    mycursor.execute(sql, val)
    g.db.commit()
    g.db.close()
    return jsonify({'Message': 'Account Created Successfully'}), 200

@app.route('/query',methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def query():
    print('in query')
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    sql = "SELECT * FROM Disasters"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    eventsarr=[]
    for event in myresult:
        jsonevent={}
        jsonevent['ID']=event[0]
        jsonevent['Title']=event[1]
        jsonevent['Street']=event[2]
        jsonevent['City']=event[3]
        jsonevent['ZIP']=event[4]
        jsonevent['State']=event[5]
        jsonevent['Country']=event[6]
        jsonevent['Email']=event[7]
        jsonevent['CallCenterID']=event[8]
        jsonevent['CreatedAt']=event[9]
        jsonevent['ClosedEvent']=event[10]
        eventsarr.append(jsonevent)

    g.db.close()
    print(eventsarr)
    return jsonify({'Events': eventsarr}),200

@app.route('/event',methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def event():
    print('In Create Event')
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    Items = request.json['payload']['resources']
    organization = request.json['payload']['organization']
    disaster = request.json['payload']['disaster']
    print(Items)
    print(organization)
    print(disaster)
    EID = hash(datetime.datetime.now())
    Street = 'Oakcrest Street'
    City = 'Iowa City'
    Zip = '52246'
    State = 'IA'
    Country = 'USA'
    Date = str(datetime.date.today())
    Email='Common@uiowa.edu'
    sql = "INSERT INTO Disasters (EID,Title,Street,City,ZIP,State,Country,Email,CallCenterID,CreatedAT) VALUES ( %s, %s,%s,%s, %s, %s,%s,%s, %s, %s)"
    val = (EID,disaster,Street,City,Zip,State,Country,Email,organization,Date)
    mycursor.execute(sql, val)
    g.db.commit()

    cnt = 1
    for item in Items:
        print(item)
        itemname = item['resourceType']
        itemcnt = item['amount']
        sql = "INSERT INTO ReqItem (EID,IID,ItemName,Requested,CallCenterID) VALUES ( %s, %s,%s,%s, %s)"
        val = (EID,cnt,itemname,itemcnt,organization)
        mycursor.execute(sql, val)
        g.db.commit()
        cnt = cnt + 1
    g.db.close()
    return jsonify({'Message': 'Event Created Successfully'}),200

@app.route('/eventdetails',methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def eventdetails():
    print('in event details extraction')
    eventdetails={}
    #Itemarr=[]
    EID = request.args.get('ID')
    print('Event Id: ',EID)
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    sql = "SELECT * FROM Disasters WHERE EID=%s"
    val = (EID,)
    mycursor.execute(sql, val)
    eventdesc = mycursor.fetchall()
    e = eventdesc[0]
    eventdetails['EventName']=e[1]
    eventdetails['Street']=e[2]
    eventdetails['City']=e[3]
    eventdetails['ZIP']=e[4]
    eventdetails['State']=e[5]
    eventdetails['Country']=e[6]
    eventdetails['Creator']=e[7]
    eventdetails['CallCenter']=e[8]
    eventdetails['CreatedAt']=e[9]

    donationjson={}
    sql = "SELECT * FROM alldonations WHERE EID=%s"
    val = (EID,)
    mycursor.execute(sql, val)
    allitems = mycursor.fetchall()
    for item in allitems:
        djson={}
        djson['Donated'] = item[5]
        djson['DonorID']=item[2]
        donationjson[item[1]] = djson

    itemarr=[]
    sql = "SELECT * FROM ReqItem WHERE EID=%s"
    val = (EID,)
    mycursor.execute(sql, val)
    allitems = mycursor.fetchall()
    for item in allitems:
        jsonevent={}
        djson={}
        jsonevent['IID']=item[1]
        jsonevent['ItemName']=item[2]
        jsonevent['Requested']=item[3]
        jsonevent['Donated'] = '0'
        jsonevent['DonorID']='NA'
        if item[1] in donationjson:
            jsonevent['Donated'] = donationjson[item[1]]['Donated']
            jsonevent['DonorID']= donationjson[item[1]]['DonorID']
        itemarr.append(jsonevent)
        #donationjson[item[1]] = djson
    eventdetails['RItems']=itemarr

    #eventdetails['Confirmed']=donationjson
    print(eventdetails)
    g.db.close()
    return jsonify({'EventDetails': eventdetails}),200

@app.route('/subdonation',methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def SubmitDonation():
    print('In Create Event')
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    DonatedItems = request.json['body']['data']
    Date = str(datetime.date.today())
    for item in DonatedItems:
        sql = "INSERT INTO DonItem (EID,IID,DonorID,ItemName,Requested,Donated,ReqCallCenterID,DonCallCenterID,DonatedAT,Street,City,ZIP,State,Country) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (item['EID'],item['IID'],item['DonorID'],item['ItemName'],item['Requested'],item['Donated'],item['ReqCallCenterID'],item['DonCallCenterID'],Date,item['Street'],item['City'],item['ZIP'],item['State'],item['Country'])
        mycursor.execute(sql, val)
        g.db.commit()
    g.db.close()
    print('Donation Received')
    return jsonify({'Message': 'Donation Created Successfully'}),200

@app.route('/getmatchingdonation',methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def GetMatchingDonation():
    eventdetails={}
    EID = request.args.get('ID')
    print('Event Id: ',EID)
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    sql = "SELECT * FROM Disasters WHERE EID=%s"
    val = (EID,)
    mycursor.execute(sql, val)
    eventdesc = mycursor.fetchall()
    e = eventdesc[0]
    eventdetails['EventName']=e[1]
    eventdetails['Street']=e[2]
    eventdetails['City']=e[3]
    eventdetails['ZIP']=e[4]
    eventdetails['State']=e[5]
    eventdetails['Country']=e[6]
    eventdetails['Creator']=e[7]
    eventdetails['CallCenter']=e[8]
    eventdetails['CreatedAt']=e[9]

    ditemjson={}
    sql = "SELECT * FROM DonItem WHERE EID=%s"
    val = (EID,)
    mycursor.execute(sql, val)
    allitems = mycursor.fetchall()
    for item in allitems:
        jsonevent={}
        jsonevent['IID']=item[1]
        jsonevent['ItemName']=item[3]
        jsonevent['Requested']=item[4]
        jsonevent['Donated']=item[5]
        jsonevent['DonorID']=item[2]
        jsonevent['Street']=item[9] 
        jsonevent['City']=item[10]
        jsonevent['ZIP']=item[11]
        jsonevent['State']=item[12]
        jsonevent['Country']=item[13]
        ditemarr=[]
        if jsonevent['IID'] not in ditemjson:
            ditemarr.append(jsonevent)
        else:
            ditemarr = ditemjson[jsonevent['IID']]
            ditemarr.append(jsonevent)
        ditemjson[jsonevent['IID']] = ditemarr

        finalditemarr=[]
        for key in ditemjson:
            finalditemarr.append(ditemjson[key])
        eventdetails['MatchingDonations']=finalditemarr
    g.db.close()
    print(eventdetails)
    return jsonify({'EventDetails': eventdetails}),200

@app.route('/insertmatchingdonation',methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def InsertMatchingDonation():
    print('In Create Event')
    mycursor = g.db.cursor()
    mycursor.execute('USE FSETEAM04')
    DonatedItems = request.json['info']['Donations']
    EventId = request.json['info']['EventId']
    closedonation = request.json['info']['CloseDonation']
    print('closedonation: ',closedonation)
    if closedonation:
        print('Closing Event')
        sql = "UPDATE Disasters SET CloseEvent = %s where EID=%s"
        val = (closedonation,EventId,)
        mycursor.execute(sql, val)
        g.db.commit()
        print('Closed Event')

    Date = str(datetime.date.today())
    for key in DonatedItems:
        item = DonatedItems[key]
        print(EventId,item['IID'],item['DonorID'],item['ItemName'],item['Requested'],item['Donated'],Date,item['Street'],item['City'],item['ZIP'],item['State'],item['Country'])
        sql = "INSERT INTO AllDonations (EID,IID,DonorID,ItemName,Requested,Donated,DonatedAT,Street,City,ZIP,State,Country) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (EventId,item['IID'],item['DonorID'],item['ItemName'],item['Requested'],item['Donated'],Date,item['Street'],item['City'],item['ZIP'],item['State'],item['Country'])
        mycursor.execute(sql, val)
        g.db.commit()

    g.db.close()
    return jsonify({'Message': 'Donation Submitted Successfully'}),200


if __name__ == '__main__':
    app.run(debug=True)