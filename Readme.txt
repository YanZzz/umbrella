This is the 2 days project I made for the interview.

How to start this web site.
=========================================

(1) Enter to umbrella folder, run 'npm install'.
(2) Build angular code: ng build --prod
(3) Copy all files from umbrella/dist/ to web_customer/public folder. ( See Note 3)
(4) Run docker-compose build.
(5) Run docker-compose up.  If you see the errors about connecting to mongo db failed / rejected, just stop and re-run this command again.
(6) Open http://localhost:8061 inside your favourit browser.

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
