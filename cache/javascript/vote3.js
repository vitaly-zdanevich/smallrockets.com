// Setup and stuff (will be filled in from CGI)
var expired = 1;
var expires = "03/09/2001";
var votetotal = 466;
// The vote object
function Vote(questionid)
{
 this.questionid = questionid;
 this.ShowVote = Vote_ShowVote;
 this.ShowResults = Vote_ShowResults;
 this.ShowForm = Vote_DefaultShowForm;
 this.barwidth = 200;
 this.barheight = 8;
 this.barimage = "DISITEROOT/images/ic_bar.gif";
 this.tablewidth = "70%";
 this.fonttag = "<font size=1>";
 this.SetBarWidth = Vote_SetBarWidth;
 this.SetBarHeight = Vote_SetBarHeight;
 this.SetBarImage = Vote_SetBarImage;
 this.SetTableWidth = Vote_SetTableWidth;
 this.SetFontTag = Vote_SetFontTag;
}
function Vote_SetBarWidth(barwidth)
{
 this.barwidth = barwidth;
}
function Vote_SetBarHeight(barheight)
{
 this.barheight = barheight;
}
function Vote_SetBarImage(barimage)
{
 this.barimage = barimage;
}
function Vote_SetTableWidth(tablewidth)
{
 this.tablewidth = tablewidth;
}
function Vote_SetFontTag(fonttag)
{
 this.fonttag = fonttag;
}
function Vote_ShowVote()
{
 // Obtain information from cookie
 var voted = GetCookie("question"+this.questionid);
 if(voted || expired)
 {
 this.ShowResults();
 }
 else
 {
 this.ShowForm();
 }
}
function Vote_ShowResults()
{
 var onepercent = this.barwidth / 100;
 var out = "<table width=\"" + this.tablewidth + "\" border=\"0\">\n";
 out += "<TR><TD VALIGN=\"top\" COLSPAN=3><FONT SIZE=2 COLOR=\"#ffffff\" FACE=\"Verdana, helvetica, arial\"><B>Which game would you most like to see a sequel to?</B></TD></TR>";
out += "<tr><td width=95%>" + this.fonttag + "Red Ace" + "</font></td>" +
"<td width=\"5%\" align=\"right\">" + this.fonttag + 30 + "%</font></td>" +
"<td width=\"" + this.barwidth + "\" valign=\"middle\"><img src=\""+this.barimage+"\" width=\"" + (30 * onepercent) + "\" height=\"" + this.barheight + "\"></td></tr>";
out += "<tr><td width=95%>" + this.fonttag + "MAD" + "</font></td>" +
"<td width=\"5%\" align=\"right\">" + this.fonttag +  9 + "%</font></td>" +
"<td width=\"" + this.barwidth + "\" valign=\"middle\"><img src=\""+this.barimage+"\" width=\"" + ( 9 * onepercent) + "\" height=\"" + this.barheight + "\"></td></tr>";
out += "<tr><td width=95%>" + this.fonttag + "Kayak" + "</font></td>" +
"<td width=\"5%\" align=\"right\">" + this.fonttag + 12 + "%</font></td>" +
"<td width=\"" + this.barwidth + "\" valign=\"middle\"><img src=\""+this.barimage+"\" width=\"" + (12 * onepercent) + "\" height=\"" + this.barheight + "\"></td></tr>";
out += "<tr><td width=95%>" + this.fonttag + "NFK" + "</font></td>" +
"<td width=\"5%\" align=\"right\">" + this.fonttag + 10 + "%</font></td>" +
"<td width=\"" + this.barwidth + "\" valign=\"middle\"><img src=\""+this.barimage+"\" width=\"" + (10 * onepercent) + "\" height=\"" + this.barheight + "\"></td></tr>";
out += "<tr><td width=95%>" + this.fonttag + "Star Monkey" + "</font></td>" +
"<td width=\"5%\" align=\"right\">" + this.fonttag + 39 + "%</font></td>" +
"<td width=\"" + this.barwidth + "\" valign=\"middle\"><img src=\""+this.barimage+"\" width=\"" + (39 * onepercent) + "\" height=\"" + this.barheight + "\"></td></tr>";

 out += "</table>";
 document.write(out)
 if(expired)
 {
 document.write("<br><FONT SIZE=1><i>This vote has ended.</i>");
 }
}
function Vote_DefaultShowForm()
{
 document.write("<FONT SIZE=2 COLOR=\"#ffffff\" FACE=\"Verdana, helvetica, arial\"><B>Which game would you most like to see a sequel to?</B><FONT SIZE=1>"+
"<form action=\"/cgi-bin/vote.cgi\" method=get name=\"VoteForm\">"+
"<input type=\"hidden\" name=\"mode\" value=\"vote\">"+
"<input type=\"hidden\" name=\"question\" value=\""+this.questionid+"\">"+
"<INPUT Type=Radio NAME=\"vote\" VALUE=\"1\"> Red Ace<br>"+
"<INPUT Type=Radio NAME=\"vote\" VALUE=\"2\"> MAD<br>"+
"<INPUT Type=Radio NAME=\"vote\" VALUE=\"3\"> Kayak<br>"+
"<INPUT Type=Radio NAME=\"vote\" VALUE=\"4\"> NFK<br>"+
"<INPUT Type=Radio NAME=\"vote\" VALUE=\"5\"> Star Monkey<br>"+
"<BR><INPUT Type=Submit VALUE=\"Vote!\">"+
"</form>"
);
}
