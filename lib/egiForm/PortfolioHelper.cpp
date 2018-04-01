

#include <string>
#include <sstream>
#include <vector>
#include "Portfolio.h"

/* 
   Special treatment prior to change Portfolio table. Any adjustment can be made. (i.e., accessing a private memeber of Portfolio class) 
  It will be called within "rest_api_switch_handler_pre.include"
*/

void Portfolio::db_create_stmt_pre() { 
             
   return;
}


void Portfolio::db_insert_stmt_pre() { 
             
   return;
}


void Portfolio::db_select_stmt_pre() { 
             
   return;
}


void Portfolio::db_update_stmt_pre() { 
             
   return;
}


void Portfolio::db_delete_stmt_pre() { 
             
   return;
}
