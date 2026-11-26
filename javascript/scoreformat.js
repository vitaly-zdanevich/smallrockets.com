function CellFormat()
{
 this.FormatCell = CellFormat_FormatCell;
 this.FormatCellHilite = CellFormat_FormatCellHilite;
 this.FormatHeader = CellFormat_FormatHeader;
 this.bHidden = false;
}
function CellFormat_FormatCell(sValue, sWidth)
{
 var sOut = "<td";
 if(sWidth != null)
 {
 sOut += " width=\"" + sWidth + "\"";
 }
 if(this.ColumnWidth != null)
 {
 sWidth = this.ColumnWidth;
 }
 if(this.CellBgcolor != null)
 {
 sOut += " bgcolor=\"" + this.CellBgcolor + "\"";
 }
 sOut += ">";
 if(this.CellFormatPre != null)
 {
 sOut += this.CellFormatPre;
 }
 if(this.CellFormatFont != null)
 {
 sOut += "<font face=\""+this.CellFormatFont+"\"";
 if(this.CellFormatFontSize != null)
 {
 sOut += " size=\""+this.CellFormatFontSize+"\"";
 }
 if(this.CellFormatFontColor != null)
 {
 sOut += " color=\""+this.CellFormatFontColor+"\"";
 }
 sOut += ">";
 }
 sOut += sValue;
 if(this.CellFormatFont != null)
 {
 sOut += "</font>";
 }
 if(this.CellFormatPost != null)
 {
 sOut += this.CellFormatPost;
 }
 sOut += "</td>";
 return sOut;
}
function CellFormat_FormatCellHilite(sValue, sWidth)
{
 var sOut = "<td";
 if(sWidth != null)
 {
 sOut += " width=\"" + sWidth + "\"";
 }
 if(this.ColumnWidth != null)
 {
 sWidth = this.ColumnWidth;
 }
 if(this.HiliteBgcolor != null)
 {
 sOut += " bgcolor=\"" + this.HiliteBgcolor + "\"";
 }
 sOut += ">";
 if(this.HiliteFormatPre != null)
 {
 sOut += this.HiliteFormatPre;
 }
 if(this.HiliteFormatFont != null)
 {
 sOut += "<font face=\""+this.HiliteFormatFont+"\"";
 if(this.HiliteFormatFontSize != null)
 {
 sOut += " size=\""+this.HiliteFormatFontSize+"\"";
 }
 if(this.HiliteFormatFontColor != null)
 {
 sOut += " color=\""+this.HiliteFormatFontColor+"\"";
 }
 sOut += ">";
 }
 sOut += sValue;
 if(this.HiliteFormatFont != null)
 {
 sOut += "</font>";
 }
 if(this.HiliteFormatPost != null)
 {
 sOut += this.HiliteFormatPost;
 }
 sOut += "</td>";
 return sOut;
}
function CellFormat_FormatHeader(sValue, sWidth)
{
 var sOut = "<td";
 if(this.ColumnTitle != null)
 {
 sValue = this.ColumnTitle;
 }
 if(this.ColumnWidth != null)
 {
 sWidth = this.ColumnWidth;
 }
 if(sWidth != null)
 {
 sOut += " width=\"" + sWidth + "\"";
 }
 if(this.HeaderBgcolor != null)
 {
 sOut += " bgcolor=\"" + this.HeaderBgcolor + "\"";
 }
 sOut += ">";
 if(this.HeaderFormatPre != null)
 {
 sOut += this.HeaderFormatPre;
 }
 if(this.HeaderFormatFont != null)
 {
 sOut += "<font face=\""+this.HeaderFormatFont+"\"";
 if(this.HeaderFormatFontSize != null)
 {
 sOut += " size=\""+this.HeaderFormatFontSize+"\"";
 }
 if(this.HeaderFormatFontColor != null)
 {
 sOut += " color=\""+this.HeaderFormatFontColor+"\"";
 }
 sOut += ">";
 }
 sOut += sValue;
 if(this.HeaderFormatFont != null)
 {
 sOut += "</font>";
 }
 if(this.HeaderFormatPost != null)
 {
 sOut += this.HeaderFormatPost;
 }
 sOut += "</td>";
 return sOut;
}
function ScoreFormat()
{
 // Data format functions
 this.SetCellFormatPre = Score_SetCellFormatPre;
 this.SetCellFormatPost = Score_SetCellFormatPost;
 this.SetCellFont = Score_SetCellFont;
 this.SetCellBgcolor = Score_SetCellBgcolor;
 // Header format functions
 this.SetHeaderFormatPre = Score_SetHeaderFormatPre;
 this.SetHeaderFormatPost = Score_SetHeaderFormatPost;
 this.SetHeaderFont = Score_SetHeaderFont;
 this.SetHeaderBgcolor = Score_SetHeaderBgcolor;
 this.SetHeaderNone = Score_SetHeaderNone;
 this.SetColumnTitle = Score_SetColumnTitle;
 this.SetColumnWidth = Score_SetColumnWidth;
 this.HideColumn = Score_HideColumn;
 // Hilite formatting functions
 this.SetHiliteFormatPre = Score_SetHiliteFormatPre;
 this.SetHiliteFormatPost = Score_SetHiliteFormatPost;
 this.SetHiliteFont = Score_SetHiliteFont;
 this.SetHiliteBgcolor = Score_SetHiliteBgcolor;
 // Misc.
 this.GetCellFormat = Score_GetCellFormat;
 this.ShowTable = Score_ShowTable;
 this.aFormats = new Array();
 this.bNoHeader = false;
}
function Score_GetCellFormat(type)
{
 var cfFormatInfo = null;
 var i;
 for(i = 0;i < this.aFormats.length;i++)
 {
 if(this.aFormats[i].sType == type)
 {
 cfFormatInfo = this.aFormats[i];
 break;
 }
 }
 if(cfFormatInfo != null)
 {
 return cfFormatInfo;
 }
 else
 {
 cfFormatInfo = new CellFormat();
 cfFormatInfo.sType = type;
 this.aFormats[this.aFormats.length] = cfFormatInfo;
 return cfFormatInfo;
 }
}
function Score_SetCellFormatPre(type, html)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.CellFormatPre = html;
}
function Score_SetCellFormatPost(type, html)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.CellFormatPost = html;
}
function Score_SetCellFont(type, font, fontsize, fontcolor)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.CellFormatFont = font;
 cfFormatInfo.CellFormatFontSize = fontsize;
 cfFormatInfo.CellFormatFontColor = fontcolor;
}
function Score_SetCellBgcolor(type, color)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.CellBgcolor = color;
}
function Score_SetHeaderFormatPre(type, html)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HeaderFormatPre = html;
}
function Score_SetHeaderFormatPost(type, html)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HeaderFormatPost = html;
}
function Score_SetHeaderFont(type, font, fontsize, fontcolor)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HeaderFormatFont = font;
 cfFormatInfo.HeaderFormatFontSize = fontsize;
 cfFormatInfo.HeaderFormatFontColor = fontcolor;
}
function Score_SetHeaderBgcolor(type, color)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HeaderBgcolor = color;
}
function Score_SetColumnTitle(type, title)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.ColumnTitle = title;
}
function Score_SetColumnWidth(type, width)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.ColumnWidth = width;
}
function Score_SetHeaderNone()
{
 this.bNoHeader = true;
}
function Score_SetHiliteFormatPre(type, html)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HiliteFormatPre = html;
}
function Score_SetHiliteFormatPost(type, html)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HiliteFormatPost = html;
}
function Score_SetHiliteFont(type, font, fontsize, fontcolor)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HiliteFormatFont = font;
 cfFormatInfo.HiliteFormatFontSize = fontsize;
 cfFormatInfo.HiliteFormatFontColor = fontcolor;
}
function Score_SetHiliteBgcolor(type, color)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.HiliteBgcolor = color;
}
function Score_HideColumn(type)
{
 var cfFormatInfo = this.GetCellFormat(type);
 cfFormatInfo.bHidden = true;
}
function Score_ShowTable(maxscores, tablewidth, tableborder, cellpadding, cellspacing)
{
 var nI;
 var nJ;
 if(maxscores == null)
 {
 maxscores = 10;
 }
 document.writeln("<table width=\""+tablewidth+"\" border=\""+tableborder+"\" cellpadding=\""+cellpadding+"\" cellspacing=\""+cellspacing+"\">");
 if(!this.bNoHeader)
 {
 document.write("<tr>");
 hfCell = this.GetCellFormat("Position");
 document.write(hfCell.FormatHeader("Pos", "5%"));
 hfCell = this.GetCellFormat("UserName");
 document.write(hfCell.FormatHeader("UserName", null));
 for(nI = 0;nI < aScoreTypes.length;nI++)
 {
 var hfCell;
 hfCell = this.GetCellFormat(aScoreTypes[nI]);
 if(hfCell.bHidden == false)
 {
 document.writeln(hfCell.FormatHeader(aScoreTypes[nI], null));
 }
 }
 document.writeln("</tr>");
 }
 for(nI = 0;nI < aScoreTable.length;nI++)
 {
 if(nI == maxscores)
 {
 break;
 }
 var cfCell;
 document.write("<tr>");
 if(aScoreTable[nI].bHilited == false)
 {
 cfCell = this.GetCellFormat("Position");
 document.write(cfCell.FormatCell(aScoreTable[nI].nPosition, "5%"));
 cfCell = this.GetCellFormat("UserName");
 document.write(cfCell.FormatCell(aScoreTable[nI].sUserName, null));
 }
 else
 {
 cfCell = this.GetCellFormat("Position");
 document.write(cfCell.FormatCellHilite(aScoreTable[nI].nPosition, "5%"));
 cfCell = this.GetCellFormat("UserName");
 document.write(cfCell.FormatCellHilite(aScoreTable[nI].sUserName, null));
 }
 for(nJ = 0;nJ < aScoreTable[nI].aData.length;nJ++)
 {
 cfCell = this.GetCellFormat(aScoreTable[nI].aData[nJ].sType);
 if(cfCell.bHidden == false)
 {
 if(aScoreTable[nI].bHilited == false)
 {
 document.write(cfCell.FormatCell(aScoreTable[nI].aData[nJ].sData, null));
 }
 else
 {
 document.write(cfCell.FormatCellHilite(aScoreTable[nI].aData[nJ].sData, null));
 }
 }
 }
 document.writeln("</tr>");
 }
 document.writeln("</table>");
}
function ScoreType(sType, sData)
{
 this.sType = sType;
 this.sData = sData;
}
function ScoreData(nPosition, sUserName, aData, bHilited)
{
 this.nPosition = nPosition;
 this.sUserName = sUserName;
 this.aData = aData;
 this.bHilited = bHilited;
}
