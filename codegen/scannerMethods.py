#!/usr/bin/env python
from xlrd import open_workbook
from string import Template
import sys, pprint, os
import re
import time
import shutil

# Add the directory containing your module to the Python path (wants absolute paths)
scriptpath = "./fixedLabels.py"
sys.path.append(os.path.abspath(scriptpath))
from fixedLabels import *

class scannerMethods(fixedLabels):

    def __init__ (self) :   	 
        self.jsonrpc_types_h           = open('../lib/egiForm/rest_api_types.include', 'w')
        self.jsonrpc_types_c           = open('../lib/egiForm/rest_api_switch_handler_pre.include', 'w')  
        self.jsonrpc_types_c_post      = open('../lib/egiForm/rest_api_switch_handler_post.include', 'w')    
        self.jsonrpc_types_c_col       = open('../lib/egiForm/rest_api_switch_handler_column.include', 'w') 
        self.jsonrpc_types_h.write(self.header_cpp)
        self.jsonrpc_types_c.write(self.header_cpp)
        self.jsonrpc_types_c_post.write(self.header_cpp)
        self.jsonrpc_types_c_col.write(self.header_cpp)
        self.jsonrpc_counter = 400   # command enum starts from here
        self.jsonrpc_types_h.write('\n/* COMMAND STARTS FROM : '+str(self.jsonrpc_counter) +' */')
        self.jsonrpc_types_h.write('\n/* ERROR CODE STARTS FROM : 301 */')
        self.jsonrpc_types_h.write('\n\n#define NO_ERROR 300 ')

    def close(self):
        self.jsonrpc_types_h.close()          
        self.jsonrpc_types_c.close() 
        self.jsonrpc_types_c_post.close() 
        self.jsonrpc_types_c_col.close() 



    def codegen(self):
        
        select_stmt = '''
        {
            if ( JsonReq.isMember("keys") ) {
                Json::Value JsonKeyArray = JsonReq.get("keys",0);
                if ( JsonKeyArray.size() > 0 ) 
                    for(unsigned int i=0; i < JsonKeyArray.size(); ++i) 
                        primaryKey.push_back( JsonKeyArray[i].asString() );
            }
        }
'''

        print ".Scanning 'database.xlsx'"
        wb =  open_workbook('./database.xlsx')

        for sheet in wb.sheets():
                print '..Scanning (Table)'+sheet.name
                self.jsonrpc_counter = self.jsonrpc_counter + 1
                jsonrpc_command = sheet.name.upper()
                num_rows  = sheet.nrows
                num_cells = sheet.ncols
                self.jsonrpc_types_h.write('\n\n#define '+jsonrpc_command.upper()+'_CREATE  '+str(self.jsonrpc_counter))
                self.jsonrpc_counter = self.jsonrpc_counter + 1
                self.jsonrpc_types_h.write('\n#define '+jsonrpc_command.upper()+'_INSERT  '+str(self.jsonrpc_counter))
                self.jsonrpc_counter = self.jsonrpc_counter + 1
                self.jsonrpc_types_h.write('\n#define '+jsonrpc_command.upper()+'_SELECT  '+str(self.jsonrpc_counter))
                self.jsonrpc_counter = self.jsonrpc_counter + 1
                self.jsonrpc_types_h.write('\n#define '+jsonrpc_command.upper()+'_UPDATE  '+str(self.jsonrpc_counter))
                self.jsonrpc_counter = self.jsonrpc_counter + 1
                self.jsonrpc_types_h.write('\n#define '+jsonrpc_command.upper()+'_DELETE  '+str(self.jsonrpc_counter))
                self.jsonrpc_counter = self.jsonrpc_counter + 1
 
                self.jsonrpc_types_h.write('\n\n#include "'+sheet.name+'.h"\n\n') 
                #########################################################################
                # SQL PRE STATEMENT
                #

                # assign value from json to class
                self.jsonrpc_types_c.write('\n\tcase '+jsonrpc_command+'_SELECT : '+select_stmt+'\n\t\tbreak; ')
                self.jsonrpc_types_c.write('\n\tcase '+jsonrpc_command+'_INSERT :  ')
                self.jsonrpc_types_c.write('\n\tcase '+jsonrpc_command+'_UPDATE :  ')
                self.jsonrpc_types_c.write('\n\tcase '+jsonrpc_command+'_DELETE :  { ')

                ###
                class_instance = sheet.name.lower()+'_instance'
                self.jsonrpc_types_c.write('\n\t\t/* extract value from Json::Value */')
                self.jsonrpc_types_c.write('\n\t\t'+sheet.name+' '+class_instance+';')
                num_of_params = 0
                curr_row = 1
                _range_error_stmt = ' 1 '
                _primary_key_ = ''
                _select_fields_ = ''
                _sql_column_read =''
                while curr_row < num_rows:
                    param_name = sheet.cell_value(curr_row, 0).encode("utf-8")
                    param_type = sheet.cell_value(curr_row, 1).encode("utf-8")
                    param_default = sheet.cell_value(curr_row, 4)
                    param_scope   = sheet.cell_value(curr_row, 5).encode("utf-8")

                    if param_scope.upper() == 'PRIVATE' :
                        curr_row = curr_row + 1
                    else:
                        if curr_row == 1 :
                           _primary_key_ = class_instance+'.'+param_name

                        if param_type.upper() == 'TEXT' :
                           self.jsonrpc_types_c.write('\n\t\tif ( JsonReq.isMember("'+param_name+'") ) {\n\t\t\t'+class_instance+'.'+param_name +' = JsonReq.get("'+param_name+'", "'+param_default+'").asString();' )
                           _sql_column_read = _sql_column_read + '\n\t\tJsonRes["result"][row_num]["'+ param_name+'"] = (char *)sqlite3_column_text(stmt, '+str(curr_row-1)+');'               
                        else:
                           self.jsonrpc_types_c.write('\n\t\tif ( JsonReq.isMember("'+param_name+'") ) {\n\t\t\t'+class_instance+'.'+param_name +' = JsonReq.get("'+param_name+'", '+str(int(param_default))+' ).asInt();' )
                           _sql_column_read = _sql_column_read + '\n\t\tJsonRes["result"][row_num]["'+ param_name+'"] = sqlite3_column_int(stmt, '+str(curr_row-1)+');'
                        self.jsonrpc_types_c.write('\n\t\t\t'+class_instance+'.SET_VALID_BIT_'+param_name.upper()+'();\n\t\t}\n')
                        curr_row = curr_row + 1
                        _range_error_stmt = _range_error_stmt +' && ( errCode != '+sheet.name.upper()+'_'+param_name.upper()+'_RANGE_ERROR ) '
                        _select_fields_ = _select_fields_ + class_instance+'.SET_VALID_BIT_'+param_name.upper()+'();'

                    #print param_name                   
                self.jsonrpc_types_c.write('\n\t\tprimaryKey.push_back ('+ _primary_key_+');\n')

                self.jsonrpc_types_c.write('\n\t\t/* range check() */')
                self.jsonrpc_types_c.write('\n\t\terrCode = '+class_instance+'.rangeCheck();')
                self.jsonrpc_types_c.write('\n\t\tif ( '+_range_error_stmt+' ) {')
                self.jsonrpc_types_c.write('\n\n\t\t\t/* sql_exec() */')

                self.jsonrpc_types_c.write('\n\t\t\tswitch(jsonrpc_action) {')
                self.jsonrpc_types_c.write('\n\t\t\tcase '+jsonrpc_command+'_INSERT : (void)'+class_instance+'.db_insert_stmt_pre(); execStmt =  '+class_instance+'.db_insert_stmt(); break;')                
                self.jsonrpc_types_c.write('\n\t\t\tcase '+jsonrpc_command+'_UPDATE : (void)'+class_instance+'.db_update_stmt_pre(); execStmt =  '+class_instance+'.db_update_stmt('+_primary_key_ +'); break;')
                self.jsonrpc_types_c.write('\n\t\t\tcase '+jsonrpc_command+'_DELETE : (void)'+class_instance+'.db_delete_stmt_pre(); execStmt =  '+class_instance+'.db_delete_stmt('+_primary_key_ +'); break;')
                self.jsonrpc_types_c.write('\n\t\t\tcase '+jsonrpc_command+'_SELECT : (void)'+class_instance+'.db_select_stmt_pre(); break;')
                self.jsonrpc_types_c.write('\n\t\t\t}')

                self.jsonrpc_types_c.write('\n\t\t}\n\t\t}\n\t\tbreak; ')


                #########################################################################
                # SQL POST STATEMENT
                #
                self.jsonrpc_types_c_post.write('\n\tcase '+jsonrpc_command+'_INSERT :  ')
                self.jsonrpc_types_c_post.write('\n\tcase '+jsonrpc_command+'_UPDATE :  ')
                self.jsonrpc_types_c_post.write('\n\tcase '+jsonrpc_command+'_DELETE : /* break; - all SQL stmts will trigger SELECT * from <table> */')
                self.jsonrpc_types_c_post.write('\n\tcase '+jsonrpc_command+'_SELECT : { ')
                self.jsonrpc_types_c_post.write('\n\t\t'+sheet.name+' '+class_instance+';')
                self.jsonrpc_types_c_post.write('\n\t\t'+_select_fields_)
                self.jsonrpc_types_c_post.write('\n\t\texecStmt =  '+class_instance+'.db_select_stmt( primaryKey ); \n\t\t}\n\t\tbreak;')

                #########################################################################
                # SQL COLUMN 
                #
                self.jsonrpc_types_c_col.write('\n\tcase '+jsonrpc_command+'_INSERT :  ')
                self.jsonrpc_types_c_col.write('\n\tcase '+jsonrpc_command+'_UPDATE :  ')
                self.jsonrpc_types_c_col.write('\n\tcase '+jsonrpc_command+'_DELETE :  /* break; - all SQL stmts will trigger SELECT * from <table> */')
                self.jsonrpc_types_c_col.write('\n\tcase '+jsonrpc_command+'_SELECT :  ')
                self.jsonrpc_types_c_col.write(_sql_column_read+'\n\t\tbreak;')