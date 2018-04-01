# EgiSample 

- Updated version from appweb-2.4.4/samples/C++/simpleEgi
- simpleEgi.cpp
```
    //
	//	Configure the server with the configuration directive file
	//
	if (server->configure("simpleEgi.conf") < 0) {
		...
		exit(2);
	}

	//
	//	Define our EGI procedures
	//
	new myJsonEgi("/json.egi");

	//
	//	Start the server
	//
	if (http->start() < 0) {
      ...
```
- public : the production version of angular-in-action/stock project
