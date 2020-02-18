# -*- coding: utf-8 -*-
"""
Created on Tue Feb 18 17:01:14 2020

@author: MBiggs
"""

from flask import Flask

app = Flask(__name__)



@app.route('/')
def index():
    return "Hello, World!"





if __name__ == '__main__':
    app.run(debug=True)