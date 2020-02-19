# -*- coding: utf-8 -*-
"""
Created on Tue Feb 18 17:01:14 2020

@author: MBiggs
"""

from flask import Flask, jsonify, render_template, request
from flask_mysqldb import MySQL
import mysql.connector 

   
db = mysql.connector.connect(user='root', password='fseTeam4',
                              host='localhost')                           
mycursor = db.cursor()
#mycursor.execute("CREATE DATABASE mydatabase")

app = Flask(__name__)

@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)