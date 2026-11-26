function MakeUpperCaseString()
{
	var newString = "";
	newString = document.score.elements("search").value;
	newString = newString.toUpperCase();
	document.score.search.value = newString;
}

function Search(type)
{
	if (type == "name")
	{
		var urlString = "\/highscores/ultragold1/viewscores.php?GAME=ultragold1&NUM=-1&SEARCH=" + (document.score.elements('search').value).toLowerCase();
		document.location.href = urlString;
	}

	if (type == "group")
	{
		var urlString = "\/highscores/ultragold1/viewscores.php?GAME=ultragold1&NUM=-1&GROUP=" + (document.score.elements('search').value).toLowerCase();
		document.location.href = urlString;
	}

}

function ChangeImage(imageName, imageSrc)
{
 if (document.images)
 {
 eval("document." + imageName + ".src =" + "\"" + imageSrc + "\";");
 }
 return true;
}
