







var scOnLoads = [];




var scOnUnloads = [];


function scOnLoad() {
	scOnLoads.sort(function (p1, p2){
			if(!p1.loadSortKey) return p2.loadSortKey ? -1 : 0;
			if(scCoLib.isIE) return p1.loadSortKey.localeCompare(p2.loadSortKey||"");
			try{
				return p1.loadSortKey > p2.loadSortKey||"" ? 1 : p1.loadSortKey == p2.loadSortKey ? 0 : -1;
			}catch(e){
				return p1.loadSortKey.localeCompare(p2.loadSortKey||"");
			}
		}
	);	for (var i in scOnLoads) try{scOnLoads[i].onLoad();}catch(e){}
	scCoLib.fOnLoadDone = true;
}


function scOnUnload() {
	scOnUnloads.sort(function (p1, p2){
			if(!p1.unloadSortKey) return p2.unloadSortKey ? -1 : 0;
			if(scCoLib.isIE) return p1.unloadSortKey.localeCompare(p2.unloadSortKey||"");
			try{
				return p1.unloadSortKey > p2.unloadSortKey||"" ? 1 : p1.unloadSortKey == p2.unloadSortKey ? 0 : -1;
			}catch(e){
				return p1.unloadSortKey.localeCompare(p2.unloadSortKey||"");
			}
		}
	);
	for (var i in scOnUnloads) try{scOnUnloads[i].onUnload();}catch(e){}
	scCoLib.fOnUnloadDone = true;
}




var scOnResizes = [];


function scOnResize(pEvent) {
	var vLen = scOnResizes.length;
	if(vLen > 1 && vLen != window.onresize.lastLen) {
		scOnResizes.sort(function (p1, p2){
				if(!p1.resizeSortKey) return p2.resizeSortKey ? -1 : 0;
				if(scCoLib.isIE) return p1.resizeSortKey.localeCompare(p2.resizeSortKey||"");
				try{
					return p1.resizeSortKey > p2.resizeSortKey||"" ? 1 : p1.resizeSortKey == p2.resizeSortKey ? 0 : -1;
				}catch(e){
					return p1.resizeSortKey.localeCompare(p2.resizeSortKey||"");
				}
			}
		);
		window.onresize.lastLen = vLen;
	}
	for (var i =0; i < vLen; i++) try{scOnResizes[i].onResize(pEvent);}catch(e){}
}


window.onload = scOnLoad;
window.onunload = scOnUnload;
window.onresize = scOnResize;


function $(pId) { return document.getElementById(pId);}


var scCoLib = {
	fDebug : false,
	fOnLoadDone:false, 
	fOnUnloadDone:false
}


scCoLib.addOnLoadHandler = function(pHanlder){
	if(scCoLib.fOnLoadDone) try{pHanlder.onLoad();}catch(e){}
	else scOnLoads[scOnLoads.length] = pHanlder;
}


scCoLib.addOnUnloadHandler = function(pHanlder){
	if(scCoLib.fOnUnloadDone) try{pHanlder.onUnload();}catch(e){}
	else scOnUnloads[scOnUnloads.length] = pHanlder;
}



scCoLib.userAgent = navigator.userAgent.toLowerCase();
scCoLib.isIE = scCoLib.userAgent.indexOf("msie")!=-1;


scCoLib.toInt = function(pX){
	var vY;
	return isNaN(vY = parseInt(pX))? 0 : vY;
}


scCoLib.util = {
	fUndef : "undefined",
	logError : function(pPre, pEx) {
		var vMsg = pPre + ((pEx != null) ? " - "+((typeof pEx.message != "undefined") ? pEx.message : pEx) : "");
		if(window.console) {
			window.console.log(vMsg);
		} else {
			alert(vMsg);
		}
	},
	log : function(pMsg) {
		if(window.console && scCoLib.fDebug) window.console.log(pMsg);
	}
}
