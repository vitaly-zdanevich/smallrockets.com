var myCookie = document.cookie;
var mySession;
if (myCookie.indexOf("FG.SESSION=a7e5ab80fecee516") != -1 || myCookie.indexOf("FG.SESSION="f2c37f14810f0c4b") != -1)
{
 location.href="/templates/error/forums_down.htm";
}
