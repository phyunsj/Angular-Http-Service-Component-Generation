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

class scannerTypes(fixedLabels):

    def __init__ (self) :
        pass

    def codegen(self):

        class_template = '''            

class ${TableName} {

public:

    ${TableName}();
   ~${TableName}();

    ${publicMember}
    ${publicMethod}

private:
    ${privateMember}
    ${privateMethod}
};

''' 

        sql_create_template = '''            
    std::string stmt = "CREATE TABLE ${TableName} ( ${Param} );";
    return stmt;  
''' 

        sql_insert_template = '''            
    std::string stmt = "INSERT INTO ${TableName} ( ";
    std::stringstream stmt_out;
    stmt_out << stmt << "${Param}" << " ) VALUES ( " << ${ParamValue} << ");";
    return stmt_out.str();    
''' 

        sql_update_template = '''            
    std::string stmt = "UPDATE ${TableName} SET ";
    std::stringstream stmt_out;
    int firstEntry = 1;
    stmt_out << stmt ;
    ${Param};
    stmt_out << " WHERE ${Primary} = '" << key << "';";

    return stmt_out.str(); 
''' 

        sql_select_template = '''            
    std::string stmt = "SELECT ";
    std::stringstream stmt_out;
    int firstEntry = 1;
    stmt_out << stmt ;
    ${Param};
    stmt_out << " FROM ${TableName} " ;
    // primary key
    if ( primaryKey.size() > 0 ) { // 0 means all records from the table
         stmt_out << " WHERE ";
        for (int i = 0; i < primaryKey.size() ; i++ ) {
           if ( i == 0 )  stmt_out << " ( ${TablePrimaryKey}  = '" << primaryKey[i] << "' )";
           else        stmt_out << " or ( ${TablePrimaryKey}  = '" << primaryKey[i] << "' )";
        }   
    }
    stmt_out << ";";
    return stmt_out.str();  
''' 

        sql_delete_template = '''            
    std::string stmt = "DELETE FROM ${TableName} WHERE ${Param} = ";
    std::stringstream stmt_out;
    stmt_out << stmt << "'" << key <<"';";
    return stmt_out.str();  
''' 


        print ".Scanning database.xlsx'"
        wb =  open_workbook('./database.xlsx')

        range_error_start = 301
        for sheet in wb.sheets():
            print "..Scanning (Table) "+sheet.name 

            self.jsonrpc_types_h              = open('../lib/egiForm/'+sheet.name+'.h', 'w')  
            self.jsonrpc_types_c              = open('../lib/egiForm/'+sheet.name+'.cpp', 'w')     
            self.jsonrpc_types_h.write(self.header_cpp)
            self.jsonrpc_types_c.write(self.header_cpp)
            self.jsonrpc_types_c.write('\n#include <string>\n#include <sstream>\n#include <vector>\n#include \"'+sheet.name+'.h\"')

            num_rows  = sheet.nrows
            num_cells = sheet.ncols
            curr_row = 1 # 

            _publicMember = ""
            _publicMethod = "\n\tstd::string db_create_stmt();"
            _publicMethod = _publicMethod + "\n\tvoid db_create_stmt_pre();"
            _publicMethod = _publicMethod + "\n\tstd::string db_insert_stmt();"
            _publicMethod = _publicMethod + "\n\tvoid db_insert_stmt_pre();"
            _publicMethod = _publicMethod + "\n\tstd::string db_update_stmt( const std::string key);"
            _publicMethod = _publicMethod + "\n\tvoid db_update_stmt_pre();"
            _publicMethod = _publicMethod + "\n\tstd::string db_select_stmt( const std::vector<std::string> );"
            _publicMethod = _publicMethod + "\n\tvoid db_select_stmt_pre();"
            _publicMethod = _publicMethod + "\n\tstd::string db_delete_stmt( const std::string key);"
            _publicMethod = _publicMethod + "\n\tvoid db_delete_stmt_pre();"
            _privateMember = "\n\tunsigned int valid;"
            _privateMethod = ""

            _sql_create_param = ""
            _sql_insert_param = ""
            _sql_insert_param_value = ""
            _sql_update_param = ""
            _sql_select_param = ""
            _sql_delete_param = ""
 
            _ctor_init_list = ""
            while curr_row < num_rows:
                param_name    = sheet.cell_value(curr_row, 0).encode("utf-8")
                param_type    = sheet.cell_value(curr_row, 1).encode("utf-8")
                param_min     = sheet.cell_value(curr_row, 2)
                param_max     = sheet.cell_value(curr_row, 3)
                param_default = sheet.cell_value(curr_row, 4)
                param_scope   = sheet.cell_value(curr_row, 5).encode("utf-8")
                
                #print param_name
                #define MIN
                self.jsonrpc_types_h.write('\n\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_MIN '+str(int(param_min)))
                #define MAX
                if param_type.upper() == 'ENUM' :
                    param_enum_list = param_max.encode("utf-8").split('|')
                    for idx, param_enum in enumerate(param_enum_list) :
                        self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_ENUM_'+param_enum.upper()+' '+str(int(param_min+idx)))               
                    self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_MAX '+str(int(param_min+len(param_enum_list)-1)))
                else:
                    self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_MAX '+str(int(param_max)))
                #define DEFAULT
                if param_type.upper() == 'TEXT' :
                    self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_DEFAULT  "'+ param_default+'"' )
                else: 
                    self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_DEFAULT '+str(int(param_default)))
                #define valid bit
                self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_VALID_FLAG   (0x1 << '+str(int( curr_row -1 ))+')')
                # define range_error
                self.jsonrpc_types_h.write('\n#define '+sheet.name.upper()+'_'+param_name.upper()+'_RANGE_ERROR '+str(range_error_start))
                range_error_start = range_error_start + 1

                # member
                if param_scope.upper() == 'PRIVATE' :
                    if param_type.upper() == 'TEXT' :
                      _privateMember  = _privateMember + '\n\tstd::string '+param_name+';'
                    elif param_type.upper() == 'NUMBER' or param_type.upper() == 'INT' :
                      _privateMember  = _privateMember + '\n\tint '+param_name+';'
                    else:
                      _privateMember  = _privateMember + '\n\tUNKNOWN '+param_name+'; // compilation error'
                else :
                    if param_type.upper() == 'TEXT' :
                      _publicMember   = _publicMember +  '\n\tstd::string '+param_name+';'
                    else :
                      _publicMember  = _publicMember + '\n\tint '+param_name+';'
                # method
                _publicMethod = _publicMethod + '\n\tvoid SET_VALID_BIT_'+param_name.upper()+'();'

                # method impl
                self.jsonrpc_types_c.write('\n\nvoid '+sheet.name+'::SET_VALID_BIT_'+param_name.upper()+'() { valid = valid | (0x1 << '+str(curr_row-1)+'); }')
                
                # sql_stmt
                if curr_row == 1 :
                  _sql_create_param = _sql_create_param + param_name.upper()+' '+param_type.upper()+' PRIMARY KEY NOT NULL'
                  _sql_delete_param = param_name.upper()
                  _sql_insert_param = param_name.upper() # primary key 
                  _sql_insert_param_value  = ' " \\"" << '+param_name+' << "\\""   ' # primary key 
                  if param_type.upper() == 'TEXT' :
                      _ctor_init_list = param_name+'("'+param_default+'")'
                  else:
                      _ctor_init_list = param_name+'('+str(int(param_default))+')'
                  _sql_select_param = '\n\tstmt_out << "'+param_name.upper()+'";'
                  _primaryKey = param_name
                else :
                  if  param_scope.upper() != 'PRIVATE'  :
                      if param_type.upper() == 'TEXT' :
                         _ctor_init_list =  _ctor_init_list + ','+ param_name+'("'+param_default+'")'
                         _sql_insert_param_value = _sql_insert_param_value + ' << ", \\"" << '+param_name +' << "\\"" '
                         _sql_update_param = _sql_update_param + '\n\tif ( '+sheet.name.upper()+'_'+param_name.upper()+'_VALID_FLAG & valid ) {\n\t\tif (firstEntry) { firstEntry = 0; stmt_out << "'+param_name.upper()+'=\\"" << '+param_name+' << "\\""; }\n\t\telse {  stmt_out << ",'+param_name.upper()+'=\\"" << '+param_name+' << "\\"";}\n\t}'
                      else:
                         _ctor_init_list =  _ctor_init_list + ','+ param_name+'('+str(int(param_default))+')'
                         _sql_insert_param_value = _sql_insert_param_value + ' << ", " << '+param_name
                         _sql_update_param = _sql_update_param + '\n\tif ( '+sheet.name.upper()+'_'+param_name.upper()+'_VALID_FLAG & valid ) {\n\t\tif (firstEntry) { firstEntry = 0; stmt_out << "'+param_name.upper()+'=" << '+param_name+'; }\n\t\telse {  stmt_out << ",'+param_name.upper()+'=" << '+param_name+';}\n\t}'
                      if param_type.upper() == 'ENUM' :
                         _sql_create_param = _sql_create_param + ', ' + param_name.upper() + ' INT NOT NULL'
                      else:
                         _sql_create_param = _sql_create_param + ', ' + param_name.upper() + ' '+param_type.upper() + ' NOT NULL'
                      _sql_insert_param = _sql_insert_param + ', '+param_name.upper()
                  
                      _sql_select_param = _sql_select_param + '\n\tif ( '+sheet.name.upper()+'_'+param_name.upper()+'_VALID_FLAG & valid ) {\n\t\tstmt_out << ",'+param_name.upper()+'";}'
                #
                curr_row = curr_row + 1
            
            # range check 
            _publicMethod = _publicMethod + '\n\tint rangeCheck( ) { /* not implemented */ return 300; }'

            stmts = Template(class_template).safe_substitute(dict(TableName=sheet.name, \
                     publicMember = _publicMember, publicMethod = _publicMethod, privateMember = _privateMember, privateMethod = _privateMethod )) 
            
            self.jsonrpc_types_h.write(stmts)
            # sql_stmt
            stmt = Template(sql_create_template).safe_substitute(dict(TableName=sheet.name.upper(), \
                     Param = _sql_create_param ))
            self.jsonrpc_types_c.write('\n\nstd::string '+sheet.name+'::db_create_stmt() { \n'+stmt+'\n}\n')
            stmt = Template(sql_insert_template).safe_substitute(dict(TableName=sheet.name.upper(), \
                     Param = _sql_insert_param, ParamValue = _sql_insert_param_value  ))
            self.jsonrpc_types_c.write('\n\nstd::string '+sheet.name+'::db_insert_stmt() { \n'+stmt+'\n}\n')
            stmt = Template(sql_select_template).safe_substitute(dict(TableName=sheet.name.upper(), \
                     Param = _sql_select_param, TablePrimaryKey = _primaryKey ))
            self.jsonrpc_types_c.write('\n\nstd::string '+sheet.name+'::db_select_stmt( const std::vector<std::string> primaryKey ) { \n'+stmt+'\n}\n')
            stmt = Template(sql_update_template).safe_substitute(dict(TableName=sheet.name.upper(), \
                     Param = _sql_update_param, Primary =  _sql_delete_param ))
            self.jsonrpc_types_c.write('\n\nstd::string '+sheet.name+'::db_update_stmt(std::string key) { \n'+stmt+'\n}\n')
            stmt = Template(sql_delete_template).safe_substitute(dict(TableName=sheet.name.upper(), \
                     Param = _sql_delete_param ))
            self.jsonrpc_types_c.write('\n\nstd::string '+sheet.name+'::db_delete_stmt(std::string key) { \n'+stmt+'\n}\n')

            # ctor/dtor
            self.jsonrpc_types_c.write('\n'+sheet.name+'::~'+sheet.name+'() {}')
            self.jsonrpc_types_c.write('\n'+sheet.name+'::'+sheet.name+'():'+_ctor_init_list+' {}')
            self.jsonrpc_types_h.close()          
            self.jsonrpc_types_c.close() 

