// * Dependencies * 
// this function requires the following snippets:
// JavaScript/readable_MM_functions/findObj
// JavaScript/readable_MM_functions/showHideLayers
// JavaScript/events/getMouseLoc
function moveLayerToMouseLoc(theLayer, offsetH, offsetV)
{
  var obj;
  if ((findObj(theLayer))!=null)
  {
    if (document.layers)  //NS
    {
      document.onMouseMove = getMouseLoc;
      obj = document.layers[theLayer];
      obj.left = mLoc.x +offsetH;
      obj.top  = mLoc.y +offsetV;
    }
    else if (document.all)//IE
    {
      getMouseLoc();
      obj = document.all[theLayer].style;
      obj.pixelLeft = mLoc.x +offsetH;
      obj.pixelTop  = mLoc.y +offsetV;
    }
    showHideLayers(theLayer,'','show');
  }
}
// get mouse location
function Point(x,y) {  this.x = x; this.y = y; }
mLoc = new Point(-500,-500);
function getMouseLoc(e)
{
  if(!document.all)  //NS
  {
    mLoc.x = e.pageX;
    mLoc.y = e.pageY;
  }
}

// Example: obj = findObj("image1");
function findObj(theObj, theDoc)
{
  var p, i, foundObj;
  
  if(!theDoc) theDoc = document;
  if( (p = theObj.indexOf("?")) > 0 && parent.frames.length)
  {
    theDoc = parent.frames[theObj.substring(p+1)].document;
    theObj = theObj.substring(0,p);
  }
  if(!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
  for (i=0; !foundObj && i < theDoc.forms.length; i++) 
    foundObj = theDoc.forms[i][theObj];
  for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) 
    foundObj = findObj(theObj,theDoc.layers[i].document);
  if(!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
  
  return foundObj;
}

// * Dependencies * 
// this function requires the following snippets:
// JavaScript/readable_MM_functions/findObj
//
// Accepts a variable number of arguments, in triplets as follows:
// arg 1: simple name of a layer object, such as "Layer1"
// arg 2: ignored (for backward compatibility)
// arg 3: 'hide' or 'show'
// repeat...
//
// Example: showHideLayers(Layer1,'','show',Layer2,'','hide');
function showHideLayers()
{ 
  var i, visStr, obj, args = showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  {
    if ((obj = findObj(args[i])) != null)
    {
      visStr = args[i+2];
      if (obj.style)
      {
        obj = obj.style;
        if(visStr == 'show') visStr = 'visible';
        else if(visStr == 'hide') visStr = 'hidden';
      }
      obj.visibility = visStr;
    }
  }
}

  