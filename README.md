This is a try for using electron develop rstudio client , replace rstudio-desktop maybe , currently only a demo on linux, and the process is:

electron start ->  start rserve on 127.0.0.1 -> create http client and render on electron window -> close electron -> killrserver.

this will only avialable on linux ,because rserver only run on linux.

Better implementation will  need try these two ways:

1 read rsession source code , and change some rsession code, make it act as http server just like rserver did. 

2 devel a modified mini rserver which can run windows (no fork api ) or mac .  

will try figure out which way is better, currently perfer the first way ,but will think it again.



