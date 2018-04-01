///
///	@file 	myEgiForm.cpp
/// @brief 	Demonstrate the use of Embedded Gate Interface (EGI) 
///



#include	"appweb/appweb.h"
//#include    "egiHandler.h"

#include    "include/json.h"
#include    "sqlite3.h"

#include    "myEgiForm.h"
#include     <vector>
#include    "rest_api_types.include"

static sqlite3 *db = NULL;

#define _DEBUG_ 1
//
////////////////////////////////////////////////////////////////////////

myJsonEgi::myJsonEgi(char *name) : MaEgiForm(name)
{
	//	Put required initialization (if any) here

    sqlite3_open("./stocks.db",&db);
    if (!db) std::cout << "\t[SQL] the database didn't open." << std::endl;
    else std::cout << "\t[SQL] stocks.db open." << std::endl;
}

////////////////////////////////////////////////////////////////////////

myJsonEgi::~myJsonEgi()
{
	//	Put cleanup here
    if (db)  sqlite3_close(db);
}

////////////////////////////////////////////////////////////////////////
//
//	Method that is run when the EGI form is called from the web
//	page. Rq is the request context. URI is the bare URL minus query.
//	Query is the string after a "?" in the URL. Post data is posted
//	HTTP form data.
//

void myJsonEgi::run(MaRequest *rq, char *script, char *uri, char *query, 
	char *postData, int postLen)
{

#if TEST_MULTI_THREADED_ACCESS
	mprPrintf("In myJsonEgi::run, thread %s\n", mprGetCurrentThreadName());
#else
	mprPrintf("In myJsonEgi::run, single threaded\n");
#endif

    //std::cout << "URI : " << uri << std::endl;  // json.egi?user=123
    //std::cout << "QUERY : " << query << std::endl; // user=123
    //std::cout << "SCRIPT : " << script << std::endl; // json.egi
    //if ( rq->methodFlags & MPR_HANDLER_GET )    std::cout << "METHOD : GET " << std::endl;
    //if ( rq->methodFlags & MPR_HANDLER_POST )   std::cout << "METHOD : POST " << std::endl;
    //if ( rq->methodFlags & MPR_HANDLER_DELETE ) std::cout << "METHOD : DELETE " << std::endl;
    
    std::cout << "run::req[" << postData << "] size : " << postLen << std::endl;

    Json::Value      JsonReq;
    Json::Reader     JsonReader;
    Json::Value      JsonRes;
    Json::FastWriter JsonWriter;
    std::string      postResponse;
    std::string      execStmt;
    int jsonParseError = 0;
    int jsonrpc_action = 0;
    int errCode = NO_ERROR;
    // sqlite3
    std::vector<std::string> primaryKey; // assume 'number' is used for the primary key of all tables
    char *zErrMsg = 0;
    int rc;

    jsonParseError = JsonReader.parse( postData, JsonReq );
    if ( !jsonParseError )
    {
        /* {"code": -32700, "message": "Parse error"} */
        JsonRes["error"]["code"] = -32700;
        JsonRes["error"]["message"] = "Parse error";
        errCode = -1;
    } else {
    
    /* NO jsonParseError */

    /* session management */
    //std::string session = JsonReq.get("session", "invalid" ).asString();
    /* ...do something with session. omitted... */
    /* id counter management */
    //int jsonrpc_id = JsonReq.get("id", 0 ).asInt();
    /* ...do something with id. omitted... */
    /* jsonrpc version check */
    /* ...do something with version. omitted... */
    
    int jsonrpc_action = JsonReq.get("action", 0 ).asInt();

    switch( jsonrpc_action ) {
#include "rest_api_switch_handler_pre.include" // Auto-Generated switch body 
    default :
        /* {"code": -32601, "message": "Method not found"} */
        JsonRes["error"]["code"] = -32601;
        JsonRes["error"]["message"] = "Method not found";
        errCode = -1;
        break;
    } /* switch */
  
    if ( errCode == NO_ERROR ) {
    
       
        /* Execute SQL statement */
        if ( !execStmt.empty() ) {

            /* SQL EXEC - INSERT/DELETE/UPDATE */
            if ( _DEBUG_ ) std::cout << "[SQL]" << execStmt << std::endl;

            rc = sqlite3_exec(db, execStmt.c_str(), NULL, NULL, &zErrMsg);   
            if( rc != SQLITE_OK ) {
              std::cout << "SQL error: "<< zErrMsg << std::endl;
              sqlite3_free(zErrMsg);
              errCode = -1;
              JsonRes["error"]["code"] = errCode;
              JsonRes["error"]["message"] = "SQL ERROR!!!";
            } 
        }

        execStmt = "";
        switch( jsonrpc_action ) {
#include "rest_api_switch_handler_post.include" // Auto-Generated switch body 
        default :
           /* {"code": -32601, "message": "Method not found"} */
           JsonRes["error"]["code"] = -32601;
           JsonRes["error"]["message"] = "Method not found";
           errCode = -1;
           break;
        } /* switch */
  
        

        /* Execute SQL statement */
        if ( !execStmt.empty() ) {

            /* SQL_EXEC - SELECT * FROM <table> */
            if ( _DEBUG_ ) std::cout << "[SQL]" << execStmt << std::endl;
            // compile sql statement to binary
            sqlite3_stmt* stmt;

            if(sqlite3_prepare_v2(db, execStmt.c_str() , -1, &stmt, NULL) != SQLITE_OK) {
               std::cout << "SQL compilation error: " << sqlite3_errmsg(db) << std::endl;
               sqlite3_finalize(stmt);
               errCode = -1;
               JsonRes["error"]["code"] = errCode;
               JsonRes["error"]["message"] = "SQL Compilation ERROR!!!";
            } 
            
            JsonRes["result"] = Json::arrayValue;
            int row_num = 0;

            if ( errCode == NO_ERROR ) {
              while((rc = sqlite3_step(stmt)) == SQLITE_ROW) {
                 switch( jsonrpc_action ) {
#include "rest_api_switch_handler_column.include" // Auto-Generated switch body 
                 } 

                 row_num++;
              }
               
              if(rc != SQLITE_DONE) {
                 std::cout << "SQL step error: " << sqlite3_errmsg(db) << std::endl;
                 errCode = -1;
                 JsonRes["error"]["code"] = errCode;
                 JsonRes["error"]["message"] = "SQL STEP ERROR!!!";
               
              } 

            }
            //release resources
            sqlite3_finalize(stmt);

        }


    } else { /* if errorCode == NO_ERROR */

      JsonRes["error"]["code"] = errCode;
      JsonRes["error"]["message"] = "ERROR!!!";
 
    } /* if errorCode != NO_ERROR */

  } /* NO jsonParseError */
  if ( errCode == NO_ERROR ) postResponse = JsonWriter.write(JsonRes["result"]);
  else postResponse = JsonWriter.write(JsonRes);
  rq->writeFmt("%s", postResponse.c_str());
  std::cout << "run::res[" << postResponse << "] size : " << postResponse.length() << std::endl;
  return;
}
