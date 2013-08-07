#Misc
This folder contains miscellaneous JavaScript scripts.

##rendermult.js
--------------
This script takes a list of urls(one per line) from the file whose name is given as a command line parameter and takes screenshots of all pages corresponding to the urls. The output file for each url is a ".png" file. The format of the out put file name is
"last part of the url-index of the url in the file.png". 

###Usage
--------
e.g. phantomjs page_links www.google.com


##page_links.js
--------------
This script takes a url as a command line parameter and lists all the links in the html page corresponding to the url.

###Usage
--------
phantomjs rendermult.js urls.txt