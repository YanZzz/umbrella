This is the 2 days project I made for the interview.

How to start this web site.
=========================================

(1) Enter to umbrella folder, run npm install.
(2) Build angular code and copy all files to public foler. (due to Note 3)
(3) Run docker-compose build.
(4) Run docker-compose up.  If you see the error about connecting to mongo db, just stop and re-run this command again.
(4) Open http://localhost:8061 inside your favorit browser.

Note 1
=========================================
In order to get the real data, just call sample api for different (country, city) combinations.
Below is api call using my personal key but which giving you less data.
http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2bffd518832bcc0bb54aec227dd2bfcb

Note 2
=========================================
Hack some city like oakville/mississauga to have a no-raing records due to sample api always giving same json data.

Note 3
==========================================
Skip the nginx contaier due to take long time to build up image and run it in my machine.
