import unittest
import sys
from Backend.src.start import *
from Backend.src.REST import *
from flask import json
import os
import json
from unittest.mock import patch,MagicMock

content ={"Email":"ABC123@gmail.com","PassWord": "abc","LastName": "Guha","FirstName":"Indranil",
	"Street": "Oakcrest Street","City": "Iowa city","ZIP": "52246","State": "IA","Country": "USA","Phone": "3195128300"}

testres=[]


sys.path.append("/Users/iguha/Documents/FSEProject/")

class TestRestAPI(unittest.TestCase):

    def test_login_success(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'Email': 'ABC123@gmail.com', 'PassWord': 'abc'}),
            content_type='application/json'
        )
        assert response.status_code == 200

    def test_login_failure_invalid_password(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'Email': 'ABC123@gmail.com', 'PassWord': 'abc2'}),
            content_type='application/json'
        )
        assert response.status_code == 400

    def test_login_failure_invalid_Email(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'Email': 'ABC1234@gmail.com', 'PassWord': 'abc'}),
            content_type='application/json'
        )
        assert response.status_code == 400

    def test_login_failure_Missing_Email(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'Email': '', 'PassWord': 'abc'}),
            content_type='application/json'
        )
        assert response.status_code == 400

    def test_login_failure_Missing_Password(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'Email': 'ABC123@gmail.com', 'PassWord': ''}),
            content_type='application/json'
        )
        assert response.status_code == 400

    def test_signup_success(self):
        with patch(target='mysql.connector.connect') as mock:
            connection = mock.return_value
            mycursor = connection.cursor.return_value
            response = app.test_client().post(
                '/signup',
                data=json.dumps(content),
                content_type='application/json'
            )
            assert response.status_code == 200


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()