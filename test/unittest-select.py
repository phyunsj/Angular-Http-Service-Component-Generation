#!/usr/bin/env python

import unittest
import requests
import json
import xmlrpclib
import pexpect
import sys, getopt, pprint

IPADDR = '127.0.0.1'

def cmdOptions(argv):
    global IPADDR  
    try:
      opts, args = getopt.getopt(argv,"ht:",["target="])
    except getopt.GetoptError:
      print 'Usage : unittest-jsonrpc.py -t <target>'
      sys.exit(2)
    for opt, arg in opts:
      if opt == '-h':
        print 'Usage : unittest-jsonrpc.py -t <target> '
        sys.exit()
      elif opt in ("-t", "--target"):
        IPADDR = arg
      


class userModel(object):
    def __init__ (self, res = None):
        self.action = res and res["action"] or 0
        self.UserName = res and res["UserName"] or 0
        self.UserFirstName = res and res["UserFirstName"] or 0
        self.UserLastName = res and res["UserLastName"] or 0
        self.UserAge = res and res["UserAge"] or 0
        self.UserEducation = res and res["UserEducation"] or 0

        

#define PORTFOLIO_CREATE  401
#define PORTFOLIO_INSERT  402
#define PORTFOLIO_SELECT  403
#define PORTFOLIO_UPDATE  404
#define PORTFOLIO_DELETE  405

#define STOCK_CREATE  407
#define STOCK_INSERT  408
#define STOCK_SELECT  409
#define STOCK_UPDATE  410
#define STOCK_DELETE  411

class TestAppweb(unittest.TestCase):

    global IPADDR

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_json_1_unknown_command(self):
        
        TargetUrl = 'http://'+IPADDR+':8888/unknown.egi'
        self.headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        payload = {'action' : 1, 'code' : 1234 }
        r = requests.post(TargetUrl, data=json.dumps(payload), timeout=60, headers=self.headers, verify=False)
        print '[RESULT] HTTP Response Status :', r.status_code
        print '[RESULT] HTTP Response Header :', r.headers
        print '[RESULT] HTTP Payload         :', r.content 
        self.assertEqual( r.status_code, 404)

    def test_json_2_select(self):
        
        # POST  SELECT
        payload = {'action' : 403, 'keys' : []  }

        TargetUrl = 'http://'+IPADDR+':8888/json.egi'
        self.headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        r = requests.post(TargetUrl, data=json.dumps(payload), timeout=60, headers=self.headers, verify=False)
        print '[RESULT] HTTP Response Status :', r.status_code
        print '[RESULT] HTTP Response Header :', r.headers
        print '[RESULT] HTTP Payload         :', r.content 
        jsonResponse = json.loads(r.content)


    def test_json_3_select(self):
        
        # POST  SELECT
        payload = {'action' : 403,  'keys' : [ "APPL", "GOOG", "FB"]  }

        TargetUrl = 'http://'+IPADDR+':8888/json.egi'
        self.headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        r = requests.post(TargetUrl, data=json.dumps(payload), timeout=60, headers=self.headers, verify=False)
        print '[RESULT] HTTP Response Status :', r.status_code
        print '[RESULT] HTTP Response Header :', r.headers
        print '[RESULT] HTTP Payload         :', r.content 
        jsonResponse = json.loads(r.content)

    def test_json_4_select(self):
        
        # POST  SELECT
        payload = {'action' : 409, 'keys' : []  }

        TargetUrl = 'http://'+IPADDR+':8888/json.egi'
        self.headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        r = requests.post(TargetUrl, data=json.dumps(payload), timeout=60, headers=self.headers, verify=False)
        print '[RESULT] HTTP Response Status :', r.status_code
        print '[RESULT] HTTP Response Header :', r.headers
        print '[RESULT] HTTP Payload         :', r.content 
        jsonResponse = json.loads(r.content)


    def test_json_5_select(self):
        
        # POST  SELECT
        payload = {'action' : 409, 'keys' : [ "MMM", "ABT", "BA" ]  }

        TargetUrl = 'http://'+IPADDR+':8888/json.egi'
        self.headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        r = requests.post(TargetUrl, data=json.dumps(payload), timeout=60, headers=self.headers, verify=False)
        print '[RESULT] HTTP Response Status :', r.status_code
        print '[RESULT] HTTP Response Header :', r.headers
        print '[RESULT] HTTP Payload         :', r.content 
        jsonResponse = json.loads(r.content)


###################################################################################################
# 
#  __main__  UnitTest Runner
#
if __name__ == '__main__':

    cmdOptions(sys.argv[1:])

    suite = unittest.TestLoader().loadTestsFromTestCase(TestAppweb)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    
