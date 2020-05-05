import unittest
import sys
from Backend.src.REST import *
from flask import json
import os
import json
from unittest.mock import patch,MagicMock

content ={'payload':{"Email":"ABC1234@gmail.com","PassWord": "abc","LastName": "Guha","FirstName":"Indranil",
	"Street": "Oakcrest Street","City": "Iowa city","ZIP": "52246","State": "IA","Country": "USA","Phone": "3195128300","AdminStatus":True}}

eventcontent = {
                    'payload':{
                        'organization': 'University of Iowa',
                        'disaster': 'Test Disaster 8',
                        'resources':[]
                    }
                }
donationdata = {'body':{'data':[{'EID':'123',"IID":"122222","DonorID":"abc@gmail.com","ItemName":"ac","Requested":"12","Donated":"12","ReqCallCenterID":"a","DonCallCenterID":"b","Street": "Oakcrest Street","City": "Iowa city","ZIP": "52246","State": "IA","Country": "USA"}]}}
donateddata = {'info':{'EventId':'123','CreatorID':'creator@gmail.com','CloseDonation':True,'Donations':{"1":{"IID":"122222","DonorID":"abc@gmail.com","ItemName":"ac","Requested":"12","Donated":"12","Street": "Oakcrest Street","City": "Iowa city","ZIP": "52246","State": "IA","Country": "USA"}}}}

testres=[]


sys.path.append("/Users/iguha/Documents/FSEProject/")

class TestRestAPI(unittest.TestCase):

    def test_login_success(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'payload':{'Email': 'ABC123@gmail.com', 'PassWord': 'abc'}}),
            content_type='application/json'
        )
        assert response.status_code != 200

    def test_login_failure_invalid_password(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'payload':{'Email': 'ABC123@gmail.com', 'PassWord': 'abc2'}}),
            content_type='application/json'
        )
        assert response.status_code != 200

    def test_login_failure_invalid_Email(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'payload':{'Email': 'ABC1234@gmail.com', 'PassWord': 'abc'}}),
            content_type='application/json'
        )
        assert response.status_code != 200

    def test_login_failure_Missing_Email(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'payload':{'Email': '', 'PassWord': 'abc'}}),
            content_type='application/json'
        )
        assert response.status_code != 200

    def test_login_failure_Missing_Password(self):
        response = app.test_client().post(
            '/login',
            data=json.dumps({'payload':{'Email': 'ABC123@gmail.com', 'PassWord': ''}}),
            content_type='application/json'
        )
        assert response.status_code != 200

    def test_signup_success(self):
        with patch(target='mysql.connector.connect') as mock:
            connection = mock.return_value
            mycursor = connection.cursor.return_value
            response = app.test_client().post(
                '/registration',
                data=json.dumps(content),
                content_type='application/json'
            )
            assert response.status_code == 200

    def test_event_query_success(self):
            with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value

                response = app.test_client().get(
                    '/query',
                    content_type='application/json'
                )
                assert response.status_code == 200

    def test_event_create_success(self):
            with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value
                response = app.test_client().post(
                    '/event',
                    data=json.dumps(eventcontent),
                    content_type='application/json'
                )
                assert response.status_code == 200

    def test_submit_donation_success(self):
            with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value
                response = app.test_client().post(
                    '/subdonation',
                    data=json.dumps(donationdata),
                    content_type='application/json'
                )
                assert response.status_code == 200

    def test_submit_matching_donation_success(self):
            with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value

                response = app.test_client().post(
                    '/subdonation',
                    data=json.dumps(donationdata),
                    content_type='application/json'
                )
                assert response.status_code == 200

    def test_event_details_success(self):        
        with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value
                response = app.test_client().get(
                    '/eventdetails?ID=1',
                    content_type='application/json'
                )
                assert response.status_code != 200
    
    def test_getmatching_donation_success(self):        
        with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value
                response = app.test_client().get(
                    '/getmatchingdonation?ID=1',
                    content_type='application/json'
                )
                assert response.status_code != 200

    def test_insertmatching_donation_success(self):        
        with patch(target='mysql.connector.connect') as mock:
                connection = mock.return_value
                mycursor = connection.cursor.return_value
                response = app.test_client().post(
                    '/insertmatchingdonation',
                    data=json.dumps(donateddata),
                    content_type='application/json'
                )
                assert response.status_code == 200

if __name__ == "__main__":
    unittest.main()