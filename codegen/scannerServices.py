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

class scannerServices(fixedLabels):

   
    def __init__ (self) :   	 
        self.jsonrpc_counter = 400

    def close(self):
        pass

    def codegen(self):

        angular = '''
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let service: string = '/json.egi';

export interface ${TableName}Interface {
  ${interface}

}

@Injectable()
export class ${TableName}Service {

  constructor(private http: HttpClient) {}

  // INSERT
  add(${tableName}) {   
     var payload = { action:${insert_action} ${insert_param} };

     return this.http.post<Array<${TableName}Interface>>(service, JSON.stringify(payload));
  }

  // SELECT
  load( key ) {
    var payload = { action:${select_action}, keys : key };

    return this.http.post<Array<${TableName}Interface>>(service, payload); 
  }

  // UPDATE
  update(${tableName}) {  
     var payload = { action:${update_action}  ${update_param} };

     return this.http.post<Array<${TableName}Interface>>(service, JSON.stringify(payload));
  }

  // DELETE
  remove(${tableName}) {
    var payload = { action:${delete_action} , ${primary_key}:${tableName}.${primary_key} };

    return this.http.post<Array<${TableName}Interface>>(service, JSON.stringify(payload));
  }


}
'''  

        print ".Scanning 'database.xlsx'"
        wb =  open_workbook('./database.xlsx')

        for sheet in wb.sheets():
                print '..Scanning (Table)'+sheet.name
                
                self.angular_service           = open('../angular.service/'+sheet.name.lower()+'.service.ts', 'w')

                num_rows  = sheet.nrows
                num_cells = sheet.ncols
 
                #########################################################################
                # Interface
                #

                num_of_params = 0
                curr_row = 1
                _interface_      = ''
                _create_action_  = self.jsonrpc_counter + 1
                _insert_action_  = self.jsonrpc_counter + 2
                _select_action_  = self.jsonrpc_counter + 3
                _update_action_  = self.jsonrpc_counter + 4
                _delete_action_  = self.jsonrpc_counter + 5
                self.jsonrpc_counter = self.jsonrpc_counter + 6

                _add_service_    = ''
                _update_service_ = ''
                _primary_key_    = ''


                while curr_row < num_rows:
                    param_name    = sheet.cell_value(curr_row, 0).encode("utf-8")
                    param_type    = sheet.cell_value(curr_row, 1).encode("utf-8")
                    param_scope   = sheet.cell_value(curr_row, 5).encode("utf-8")

                    if param_scope.upper() == 'PRIVATE' :
                        curr_row = curr_row + 1
                    else:
                        if curr_row == 1 :
                           _primary_key_ = param_name

                        if param_type.upper() == 'TEXT' :
                           _interface_ = _interface_ + '\n\t'+param_name+' : string;'  
                        else:
                           _interface_ = _interface_ + '\n\t'+param_name+' : number;'
                        

                        _add_service_  = _add_service_  + ' , '+ param_name +':'+sheet.name.lower()+'.'+param_name
                        _update_service_  = _update_service_  + ' , '+ param_name +':'+sheet.name.lower()+'.'+param_name
                       
                        
                        curr_row = curr_row + 1
                    #print param_name
               
            
                #
                stmts = Template(angular).safe_substitute(dict(TableName=sheet.name, tableName=sheet.name.lower(),\
                     interface = _interface_ , create_action = _create_action_, insert_action=_insert_action_, select_action = _select_action_, \
                     update_action=_update_action_, delete_action=_delete_action_ , primary_key=_primary_key_, \
                     insert_param=_add_service_,  update_param = _update_service_ )) 
            
                self.angular_service.write(stmts)

                self.angular_service.close()
