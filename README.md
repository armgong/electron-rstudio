2017-02-25

This is a try for using electron develop rstudio client , replace rstudio-desktop maybe , currently only a demo on linux, and the process is:

electron start ->  start rserve on 127.0.0.1 -> create http client and render on electron window -> close electron -> killrserver.

this will only avialable on linux ,because rserver only run on linux.


Better implementation will  need try these two ways:

1 read rsession source code , and change some rsession code, make it act as http server just like rserver did. 

2 devel a modified mini rserver which can run windows (no fork api ) or mac .  

will try figure out which way is better, currently perfer the first way ,but will think it again.


2017-02-26

Also try rsession mode ,don't use rserver ,this work on linux and maybe work on mac ,but will not work on windows, becasuse windows use named pipe implement rsession server ,need modify windows rsession code.

now  main.js (call rserver) and  session-main.js (call rsession directly) both worked , next step is setup windows build machine for rstudio , so rsession can be modified and built on windows.

2017-02-27

windows 32 bit build env setup, now modify rsession source code and compiled, after some teak ,it works.
