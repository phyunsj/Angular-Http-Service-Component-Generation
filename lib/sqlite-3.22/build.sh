#!/bin/bash
gcc shell.c sqlite3.c -lpthread -ldl -o sqlite3
gcc -DSQLITE_THREADSAFE=0  -shared -fPIC sqlite3.c -o libsqlite3.so

