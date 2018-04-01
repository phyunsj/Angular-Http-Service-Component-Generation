TOPDIR = $(shell echo `/bin/pwd`/../..)
include ../../../config.mk

PRODUCT = jsontestrunner

.PHONY: all

all: $(PRODUCT)

SOURCES = main.cpp
OBJS = main.o 


PATH := $(TIMESYS_BIN):$(PATH)
BUILD_DIR = .

#CPPFLAGS = -I$(RFLHDR) -I$(COMDIR)/inc -I$(LINUX_RFLINC) -I$(LINUX_INC)  -DNDEBUG  -DLOG_FLASH
CPPFLAGS = -I$(RFLHDR) -I$(COMDIR)/inc -I$(LINUX_RFLINC) -I$(LINUX_INC) -DNDEBUG -DLOG_FLASH -DIEC_ADVANCED -I./..
ASFLAGS += 
STRIP=-s
#STRIP=
# CPPFLAGS included as part of CFLAGS and CXXFLAGS definition
CXXFLAGS += -O1 -Wall -Wformat -Wpointer-arith -Wswitch -Wunused  
#CXXFLAGS += -g -Wall -Wformat -Wpointer-arith -Wswitch -Wunused  
LDFLAGS +=  -Bdynamic $(STRIP)   -L $(TOPDIR) -ljson

# Targets

.PHONY: rebuild clean

jsontestrunner: $(OBJS)
	$(CXX) $(CXXFLAGS)  $^ $(LDFLAGS) -o $(PRODUCT)


rebuild: clean all

clean:
	-@$(RM) $(OBJS)
	-@$(RM) $(PRODUCT)
	-@$(RM) core
	@rm -f `find . -name .depend`

install: $(PRODUCT)
	@mkdir -p $(GARD_BIN)
	cp $(PRODUCT) $(GARD_BIN)
depend: .depend
.depend: $(SOURCES)
	$(CC) -M $(CPPFLAGS) $(CFLAGS) $^ > $@

sinclude .depend
