How to run this web site.
=========================================
** Skip the nginx contaier due to take long time in my machine.
** If you want to try please modify yml file.
(0) Build angular code and copy all files to public foler.
(1) Run docker-compose build 
(2) Run docker-compose up
(3) Open http://localhost:8061 from docker web.

Note 1
=========================================
call sample api to mimic the api call to get the data.
the free api call return back less datahttp://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2bffd518832bcc0bb54aec227dd2bfcb

Note 2
=========================================
Hack some city like oakville/mississauga to have a no-raing record.