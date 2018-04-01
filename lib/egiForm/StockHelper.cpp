

#include <string>
#include <sstream>
#include <vector>
#include "Stock.h"

/* 
   Special treatment prior to change Stock table. Any adjustment can be made. (i.e., accessing a private memeber of Stock class) 
  It will be called within "jsonrpc_switch_handler_pre.include"
*/

void Stock::db_create_stmt_pre() { 
             
   return;
}


void Stock::db_insert_stmt_pre() { 
             
   return;
}


void Stock::db_select_stmt_pre() { 
             
   return;
}


void Stock::db_update_stmt_pre() { 
             
   return;
}


void Stock::db_delete_stmt_pre() { 
             
   return;
}
