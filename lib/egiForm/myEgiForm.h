///
///	@file 	myEgiForm.h
/// @brief 	Demonstrate the use of Embedded Gate Interface (EGI) 
///

//////////////////////////////// Defines ///////////////////////////////
#if BLD_FEATURE_EGI_MODULE
//
//	Define the our EGI object to be called when the web form is posted.
//
class myJsonEgi : public MaEgiForm {
  public:
			myJsonEgi(char *egiName);
			~myJsonEgi();
	void	run(MaRequest *rq, char *script, char *path, char *query, 
				char *postData, int postLen);
};

#endif

