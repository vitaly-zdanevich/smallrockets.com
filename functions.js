function openPictureWindow(h,w,url){
    extW = w+28;
	extH = h+34+30;
    t = (screen.height-h)/2;
    l = (screen.width-w)/2;
	newWindow=window.open("cgi-bin/photo_view.pl?image="+url+"&height="+h+"&width="+w,"",
	"status=no,location=no,toolbar=no,directories=no,resizable=no,width="+extW+",height="+extH+",top="+t+",left="+l+""); 
}
