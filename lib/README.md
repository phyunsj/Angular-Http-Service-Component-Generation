## egiForm

myEgiForm (Appweb embedded cgi handler) to serve POST requests & generate responses. 

EGI Form `myJsonEgi` is registerd as `json.egi` in `EgiSample/simpleEgi.cpp`

- myEgiFrom.cpp/h

Auto-Generated Classes

- Portfolio.cpp/h
- Stock.cpp/h
- Company.cpp/h

Not implemented. Insert any logic prior to SQL execution. 

- ProtfolioHelper.cpp
- StoclHelper.cpp
- CompanyHelper.cpp 

Auto-Generated switch body based on action type. 

- rest_api_switch_handler_pre.include
- rest_api_switch_handler_post.include
- rest_api_switch_handler_column.include

Auto-Generated type decalrations (class name, enum , error, action )

- rest_api_types.include
```
#define NO_ERROR 300 

#define PORTFOLIO_CREATE  401
#define PORTFOLIO_INSERT  402
#define PORTFOLIO_SELECT  403
#define PORTFOLIO_UPDATE  404
#define PORTFOLIO_DELETE  405

#include "Portfolio.h"
```


## JsonCpp

https://github.com/open-source-parsers/jsoncpp

## sqlite-3.22 

sqlite-amalgamation-3220000.zip from  https://www.sqlite.org/download.html 
