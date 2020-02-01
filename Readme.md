# This is the 2-day project I made.
Server side: expressjs, mongodb. client: angular.

How to start this web site.
=========================================

You can skip the first 3 steps and just start from the step (4) due to angular stuff already exists in public foler.
(I already built it for you.)

(1) Enter to 'umbrella' folder, run 'npm install'.
(2) Build angular code: ng build --prod
(3) Copy all files from 'umbrella/dist/umbrella' to 'web_customer/public' folder. ( See Note 3)
(4) Run docker-compose build from the root project folder.
(5) Run docker-compose up.  If you see the errors about connecting to mongo db failed / rejected, just stop and re-run this command again.
(6) Open http://localhost:8061 inside your favourit browser.

Note 1
=========================================
In order to get the completely json data, just call sample api for different (country, city) combinations.
Below is api call using my personal key but which giving me partial data.
http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2bffd518832bcc0bb54aec227dd2bfcb

Note 2
=========================================
Hack some city like oakville and mississauga to have some no-rain records due to sample api always giving same json data.

Note 3
==========================================
Skip the nginx contaier due to take long time to build up image in my machine.
