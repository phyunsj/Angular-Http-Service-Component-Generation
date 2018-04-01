#!/usr/bin/env python

import unittest
import requests
import json
import xmlrpclib
import pexpect
import sys, getopt, pprint

import sqlite3
from sqlite3 import Error

def create_table():
    db_file = './stocks.db'
    

    # portfolio table - user selected stocks 
    sql_create_stock_table = '''CREATE TABLE IF NOT EXISTS PORTFOLIO (
         
        COMPANYSYMBOL TEXT PRIMARY KEY, 
        COMPANYNAME   TEXT , 
        LASTTRADEPRICEONLY INTEGER , 
        CHANGE        INTEGER  , 
        CHANGEINPERCENT  INTEGER
        );
    '''
   
    
    try:
        conn = sqlite3.connect(db_file)
        print '> Open stocks.db'
    except Error as e:
        print(e)
        sys.exit(-1)

    if conn is not None:
        try:
            c = conn.cursor()
            c.execute(sql_create_stock_table)
            print '> Create PORTFOLIO table'
        except Error as e:
            print(e)
            sys.exit(-1)

        sql_insert_stock_table = ''' INSERT INTO PORTFOLIO ( COMPANYSYMBOL, COMPANYNAME , LASTTRADEPRICEONLY, CHANGE, CHANGEINPERCENT ) VALUES( ?,?,?,?,? );'''

        stock_list = [ 
            ('AAPL',  'Apple',    0, 0, 0 ),
            ('GOOG',  'Google',   0, 0, 0 ),
            ('FB',    'Facebook', 0, 0, 0 ),
            ('AMZN',  'Amazon',   0, 0, 0 ),
            ('TWTR',  'Twitter',  0, 0, 0 ) 
            ]
 
        c.executemany(sql_insert_stock_table, stock_list)
        print '> Insert PORTFOLIO table'
     
    conn.commit()

    # stock table - all available stock choices
    sql_create_stock_table = '''CREATE TABLE IF NOT EXISTS STOCK (
        COMPANYID     INTEGER PRIMARY KEY AUTOINCREMENT , 
        COMPANYSYMBOL TEXT , 
        COMPANYNAME   TEXT , 
        LASTTRADEPRICEONLY INTEGER , 
        CHANGE        INTEGER  , 
        CHANGEINPERCENT  INTEGER
        );
    '''

    if conn is not None:
        try:
            c = conn.cursor()
            c.execute(sql_create_stock_table)
            print '> Create STOCK table'
        except Error as e:
            print(e)
            sys.exit(-1)

        sql_insert_stock_table = ''' INSERT INTO STOCK ( COMPANYSYMBOL, COMPANYNAME , LASTTRADEPRICEONLY, CHANGE, CHANGEINPERCENT ) VALUES( ?,?,?,?,? );'''

        stock_list = [ 
            ('MMM',   '3M',             25,  6,  11 ),
            ('ABT',   'Abbott',        135,  6,  11 ),
            ('ACN',   'Accenture',      55,  4,  1  ),
            ('AKAM',  'Akamai',         43,  11, 12 ),

            ('AAPL',  'Apple',         45,   2,  2  ),
            ('GOOG',  'Google',        31,   3,  3  ),
            ('FB',    'Facebook',     112,   4,  1  ),
            ('AMZN',  'Amazon',       245,   5,  12 ),
            ('TWTR',  'Twitter',       45,   6,  11 ),
            
            
            ('ADSK',  'Autodesk',       85,  36, 14 ),
            ('BA',    'Boeing',        157,  6,  11 ),
            ('AVGO',  'Broadcom',      245,  16, 11 ),
            ('DVN',   'Devon',         458,  6,  15 ),
            ('EBAY',  'eBay',          345,  3,  4  ),
            ('INTC',  'Intel',         145,  6, 11  )
            
            ]
 
        c.executemany(sql_insert_stock_table, stock_list)
        print '> Insert STOCK table'
     
    conn.commit()

    conn.close()

###################################################################################################
# 
#  __main__  UnitTest Runner
#
if __name__ == '__main__':
    create_table()
    
