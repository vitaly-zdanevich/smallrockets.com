function DIBasketInit()
{
 var cookieContent = document.cookie;
 var basketString, basketContent;
 var productData;
 var boughtProductData;
 var basketItems, basketItemArray;
 var boughtItemString, boughtItemContent;
 var boughtItems, boughtItemArray;
 var locationString;
 this.items = new Array();
 this.boughtItems = new Array();
 this.total = 0.0;
 this.numItems = 0;
 cookieContent = unescape(cookieContent);
 if (cookieContent.indexOf("ecomlocation=") != -1)
 {
 locationString = cookieContent.substring(cookieContent.indexOf('ecomlocation='),cookieContent.indexOf('|',cookieContent.indexOf('ecomlocation=')));
 this.ecomLocation = locationString.split('=')[1];
 }
 else 
 {
 this.ecomLocation = "";
 }
 if (cookieContent.indexOf("basket=") != -1)
 {
 basketString = cookieContent.substring(cookieContent.indexOf('basket='),cookieContent.indexOf(';',cookieContent.indexOf('basket=')));
 if (basketString == "")
 {
 basketString = cookieContent.substring(cookieContent.indexOf('basket='),cookieContent.indexOf('|',cookieContent.indexOf('basket='))+1);
 }
 if (basketString != "")
 {
 basketItems = basketString.split('=')[1];
 }
 else
 {
 basketItems = "";
 }
 if (basketItems.indexOf('|') != -1)
 {
 basketItemArray = basketItems.split('|');
 for (var i = 0; i < basketItemArray.length; i++)
 {
 if (basketItemArray[i] != "")
 {
 productData = basketItemArray[i].split('^');
 this.addItem(new Item(productData[0],productData[1],productData[2],parseFloat(productData[3]),productData[4],parseInt(productData[5])));
 }
 }
 }
 }
 if (cookieContent.indexOf("boughtitems=") != -1)
 {
 boughtItemString = cookieContent.substring(cookieContent.indexOf('boughtitems='),cookieContent.indexOf('|',cookieContent.indexOf('boughtitems='))+1);
 if (boughtItemString == "")
 {
 boughtItemString = cookieContent.substring(cookieContent.indexOf('boughtitems='),cookieContent.indexOf('|',cookieContent.indexOf('boughtitems='))+1);
 }
 if (boughtItemString != "")
 {
 boughtItems = boughtItemString.split('=')[1];
 }
 else
 {
 boughtItems = "";
 }
 if (boughtItems.indexOf('|') != -1)
 {
 boughtItemArray = boughtItems.split('|');
 for (var i = 0; i < boughtItemArray.length; i++)
 {
 if (boughtItemArray[i] != "")
 {
 boughtProductData = boughtItemArray[i].split('^');
 this.addBoughtItem(new Item(boughtProductData[0],boughtProductData[1],boughtProductData[2],parseFloat(boughtProductData[3]),boughtProductData[4],parseInt(boughtProductData[5])));
 }
 }
 }
 }
 this.numItems = this.items.length;
}
function DIFindItem(name)
{
 if (this.items.length > 0)
 {
 for (var i=0; i < this.items.length; i++)
 {
 if (this.items[i].name == name)
 {
 return i;
 }
 }
 }
 return -1;
}
function DIFindBoughtItem(name)
{
 if (this.boughtItems.length > 0)
 {
 for (var i=0; i < this.boughtItems.length; i++)
 {
 if (this.boughtItems[i].name == name)
 {
 return i;
 }
 }
 }
 return -1;
}
function DIBasketAddItem(item)
{
 var findIndex = this.findItem(item.name);
 if (findIndex == -1)
 {
 if (this.items.length > 0)
 {
 this.items[this.items.length] = item;
 }
 else
 {
 this.items = new Array(item);
 }
 }
 else
 {
 this.items[findIndex].quantity += parseInt(item.quantity);
 }
 this.total += parseFloat(item.price) * parseInt(item.quantity);
 this.total = round(this.total);
 this.numItems += parseInt(item.quantity);
}
function round(number)
{
 var numString;
 number += 0.005;
 numString = number.toString();
 numString = numString.substring(0,numString.indexOf('.')+3);
 return parseFloat(numString);
}
function DIBasketAddBoughtItem(item)
{
 var boughtIndex = this.findBoughtItem(item.name);
 if (boughtIndex == -1)
 {
 if (this.boughtItems.length > 0)
 {
 this.boughtItems[this.boughtItems.length] = item;
 }
 else
 {
 this.boughtItems = new Array(item);
 }
 }
 else
 {
 this.boughtItems[boughtIndex].quantity += parseInt(item.quantity);
 }
}
function DIBasketAddNewBoughtItem(item)
{
 this.addBoughtItem(item);
 this.saveBasket();
}
function DIBasketAddNewItem(item)
{
 this.addItem(item);
 this.saveBasket();
}
function DIBasketRemoveItem(itemIndex)
{
 var newArray = new Array();
 for (var i=0; i < this.items.length; i++)
 {
 if (i != itemIndex)
 {
 newArray[newArray.length] = this.items[i]; 
 }
 else
 {
 this.numItems = parseInt(this.numItems)-1;
 }
 }
 this.items = newArray;
 this.saveBasket();
}
function DIBasketEmpty()
{
 this.items = new Array();
 this.numItems = 0;
 this.total = 0;
 this.saveBasket();
}
function DIBasketSaveBasket()
{
 var cookieString = document.cookie;
 var cookies = cookieString.split(';');
 var writeString="";
 var pathString;
 var nowDate = new Date();
 nowDate.setYear(nowDate.getYear()+1);
 writeString += "basket="; 
 for (var i=0; i < this.items.length; i++)
 {
 writeString += escape(this.items[i].name + "^" + this.items[i].sku + "^" + this.items[i].platform + "^" + this.items[i].price + "^" + this.items[i].homedir + "^" + this.items[i].quantity);
 if (i != (this.items.length - 1))
 {
 writeString += "|";
 } 
 }
 writeString += "|";
 writeString += "; expires=" + nowDate.toGMTString();
 writeString += "; path=/";
 writeString += "; domain=www.smallrockets.com;";
 document.cookie = writeString;
 writeString = "";
 writeString += "ecomlocation=" + escape(parent.document.location.href) + "|; ";
 writeString += "; expires=" + nowDate.toGMTString();
 writeString += "; path=/";
 writeString += "; domain=www.smallrockets.com;";
 document.cookie = writeString;
 writeString = "";
 writeString += "boughtitems="; 
 for (var i=0; i < this.boughtItems.length; i++)
 {
 writeString += escape(this.boughtItems[i].name + "^" + this.boughtItems[i].sku + "^" + this.boughtItems[i].platform + "^" + this.boughtItems[i].price + "^" + this.boughtItems[i].homedir + "^" + this.boughtItems[i].quantity);
 if (i != (this.boughtItems.length - 1))
 {
 writeString += "|";
 } 
 }
 writeString += "|";
 writeString += "; expires=" + nowDate.toGMTString();
 writeString += "; path=/";
 writeString += "; domain=www.smallrockets.com;";
 document.cookie = writeString;
}
function Basket()
{
 var items;
 var numItems;
 var boughtItems;
 var total;
 var ecomLocation;
 this.init = DIBasketInit;
 this.addItem = DIBasketAddItem;
 this.addBoughtItem = DIBasketAddBoughtItem;
 this.addNewItem = DIBasketAddNewItem;
 this.addNewBoughtItem = DIBasketAddNewBoughtItem;
 this.removeItem = DIBasketRemoveItem;
 this.empty = DIBasketEmpty;
 this.findItem = DIFindItem;
 this.findBoughtItem = DIFindBoughtItem;
 this.saveBasket = DIBasketSaveBasket;
}
function Item(thisName,thisSku,thisPlatform,thisPrice,thisHomedir,thisQuantity)
{
 var name,sku,platform,price,homedir,quantity;
 this.name = thisName;
 this.sku = thisSku; 
 this.platform = thisPlatform;
 this.price = thisPrice;
 this.homedir = thisHomedir;
 this.quantity = thisQuantity;
}
function BasketGotoCheckout()
{
 var cookieContent = unescape(document.cookie);
 var basketString = cookieContent.substring(cookieContent.indexOf('basket='),cookieContent.indexOf(';',cookieContent.indexOf('basket=')));
 basketString = basketString.split("=")[1];
 location = "https://www.smallrockets.com/cgi-bin/checkout.cgi?buy=" + escape(basketString);
}
function BasketGetItem(itemNo)
{
 return myBasket.items[itemNo];
}
function BasketGetNumItems()
{
 return myBasket.numItems;
}
function BasketGetValue()
{
 return parseFloat(myBasket.total);
}
function BasketGetTotalItems()
{
 return myBasket.numItems;
}
function Update()
{
 location=document.location;
}
function BasketAdd(name,skuid,platform,price,homedir)
{
 myBasket.addNewItem(new Item(name,skuid,platform,price,homedir,1));
}
function BasketEmpty()
{
 myBasket.empty();
}
function checkItem(thisItem)
{
 if (myBasket.findItem(thisItem.name) != -1)
 {
 window.alert("ITEM NOT ADDED TO BASKET\n\nYou already have " + thisItem.sku + " in your basket.\nEach copy of the game unlocks the full version on your machine.\n"); 
 return false;
 }
 if (myBasket.findBoughtItem(thisItem.name) != -1)
 {
 var result = confirm("You have already successfully purchased a license key \nfor " + thisItem.sku + ".\n\nAre you really sure you want another license key for this game?");
 if (result == 1)
 {
 return true;
 }
 else
 {
 return false;
 }
 }
 return true;
}
function BasketItem(itemIndex)
{
 return myBasket.items[itemIndex];
}
function BasketAddBoughtItem(skuid,name,platform,price,homedir)
{
 myBasket.addNewBoughtItem(new Item(name,skuid,platform,price,homedir,1));
}
function BasketAddNewBoughtItem(thisItem)
{
 myBasket.addNewBoughtItem(thisItem);
 myBasket.saveBasket();
}
function BasketAddRedirect(name,skuid,platform,price,location)
{
 var thisItem = new Item(name,skuid,platform,price,location,1);
 if(checkItem(thisItem))
 {
 myBasket.ecomLocation=document.location.href;
 myBasket.addNewItem(thisItem);
 Update();
 document.location.href = '/general/basket.htm' ; 
 }
}
function BasketAddNoRedirect(name,skuid,platform,price,location)
{
 var thisItem = new Item(name,skuid,platform,price,location,1);
 if(checkItem(thisItem))
 {
 myBasket.ecomLocation=document.location.href;
 myBasket.addNewItem(thisItem);
 Update();
 }
}
function BasketRemoveItem(itemIndex)
{
 myBasket.removeItem(itemIndex);
 Update();
}
function GetCookie(name)
{
 var ac=this.document.cookie;
 if (ac=="")
 {
 return "";
 }
 var s=ac.indexOf(name + '=');
 if (s==-1) return "";
 s+=name.length + 1;
 var e = ac.indexOf(';',s);
 if (e == -1) e=ac.length;
 return unescape(ac.substring(s,e));
}
function SetCookie(name,value,path)
{
 var c=name+'='+escape(value);
 var ny=new Date();
 ny.setYear(ny.getYear()+1);
 if (path) c+='; path='+path;
 c+='; expires='+ny.toGMTString();
 document.cookie=c;
}
var myBasket = new Basket();
myBasket.init();
