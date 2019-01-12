

 
var scDynUiMgr = {
	


	xInitMgr: function() {
	},



	collBlkToggle: function(pTitle, pCo, pClassOpen, pClassClosed) {
		vOldStateClosed = pCo.style.display == 'none';
		pCo.style.display = vOldStateClosed ? '' : 'none';
		pTitle.className = vOldStateClosed ? pClassOpen : pClassClosed;
		if (scCoLib.isIE) {
			var vTags = pCo.getElementsByTagName("IFRAME");
			if (vOldStateClosed) {
				for(var i=0; i<vTags.length; i++) {
					vTags[i].src = vTags[i].bkpSrc ? vTags[i].bkpSrc : vTags[i].src;
				}		
			} else {
				for(var i=0; i<vTags.length; i++) {
					vTags[i].bkpSrc = vTags[i].src;
					vTags[i].src = "";
				}
			}
		}
		if("scSiLib" in window) scSiLib.fireResizedNode(pCo);
	},
	

	displaySubWindow: function(pNode,pUrl,pName,pOpt) {
		scCoLib.util.log("scDynUiMgr.displaySubWindow("+pUrl+","+pName+","+pOpt+")");
		var vOpt = pOpt || ""; //Retreave  display Opts if any...
		var vSwId = pNode.swId || null; //Retreave the subWindow ID if it has already been created

		if (vSwId == null) { 
			vSwId = this.subWindow.xGenId("scSubWindow"); //generate a new subWindow ID
			var vSwHtml = scDynUiMgr.subWindow.xMakeSw(vSwId, pName, vOpt); //build the subWindow HTML
			var vTmpDiv=document.createElement("DIV"); // Temp div to hold the created subWindow html
			vTmpDiv.innerHTML = vSwHtml;
			var vSwOver = vTmpDiv.firstChild;
			while(vSwOver && vSwOver.nodeType != 1) vSwOver = vSwOver.nextSibling;
			var vSwDiv = vSwOver;
			vSwDiv = vSwDiv.nextSibling;
			while(vSwDiv && vSwDiv.nodeType != 1) vSwDiv = vSwDiv.nextSibling;
			var vCont = vOpt.ANCHORPATH ? scPaLib.findNode(vOpt.ANCHORPATH, pNode) || document.body : document.body;
			vCont.appendChild(vSwOver); //Apend the created subWindow overlay to the end of the document
			vCont.appendChild(vSwDiv); //Apend the created subWindow to the end of the document
			vSwDiv.fNode = pNode; //Keep pointer to owner node on the subWindow
			pNode.swId = vSwId; 
			scDynUiMgr.subWindow.xInit(vSwId);
		}

		scDynUiMgr.subWindow.xShow(vSwId,pUrl);
	},

	hideSubWindow: function(pId) {
		scCoLib.util.log("scDynUiMgr.hideSubWindow("+pId+")");
		var vCurrSw = scDynUiMgr.subWindow.fSubWins[pId];
		if (vCurrSw){
			vCurrSw.fOver.style.visibility = "hidden";
			vCurrSw.style.visibility = "hidden";
			vCurrSw.fFra.src = "";
		}
	}
}


scDynUiMgr.subWindow = {
	fZIndex : 1000,
	fSubWins : new Array(),
	
	xBuildCls: function(pCls, pSufx) {
		var vCls = pCls.split(" ");
		var vRetCls = "";
		for(var i=0; i<vCls.length; i++) vRetCls += vCls[i]+(pSufx ? ('_'+pSufx) : '')+' ';
		return(vRetCls);
	},
	xGenId: function(pPrefix) {
		var vIndex = 0;
		while(($(pPrefix+vIndex) || $(pPrefix+vIndex+'fr')) && vIndex < 10000) vIndex++;
		if (vIndex == 10000) {
			scCoLib.util.logError("scDynUiMgr ERROR: Error generating ID, too many "+pPrefix+" IDs on this page.");
			return("");
		} else return (pPrefix + vIndex);
	},
	xMakeSw: function(pId,pName,pOpt) {
		scCoLib.util.log("scDynUiMgr.subWindow.xMakeSw("+pId+","+pName+")");
		var vSubWinTi = pOpt.SUBWINTI || ""
		var vCloseBtnCo = pOpt.CLOSEBTNCO || "X"
		var vCloseBtnTi = pOpt.CLOSEBTNTI || ""
		var vHtml = '<div id="'+pId+'_over" class="'+this.xBuildCls(pName,"over");
		vHtml += '" style="position:absolute;visibility:hidden;"></div>';
		vHtml += '<div id="'+pId+'" class="'+this.xBuildCls(pName,"win")+'" style="position:absolute;visibility:hidden;">';
		vHtml += '<div class="'+this.xBuildCls(pName,"ti")+'">';
		vHtml += '<a class="'+this.xBuildCls(pName,"x")+'"'+(vCloseBtnTi ? ' title="'+vCloseBtnTi+'"' : '')+' href="#" onclick="scDynUiMgr.hideSubWindow(\''+pId+'\');return(false);"><span>'+vCloseBtnCo+'</span></a>';
		vHtml += '<span id="'+pId+'_ti">'+vSubWinTi+'</span>';
		vHtml += '</div>';
		vHtml += '<div class="'+this.xBuildCls(pName,"co")+'">';
		vHtml += '<iframe class="'+this.xBuildCls(pName,"fra")+'" marginheight="0" marginwidth="0" frameborder="0';
		vHtml += '" name="'+pName+'" src=""></iframe>';
		return(vHtml+'</div></div>');
	},
	
	xInit: function(pId) {
		scCoLib.util.log("scDynUiMgr.subWindow.xInit("+pId+")");
		var vCurrSw = document.getElementById(pId);
		vCurrSw.fOver = document.getElementById(pId+"_over");
		vCurrSw.fTi = document.getElementById(pId+"_ti");
		vCurrSw.fFra = vCurrSw.getElementsByTagName("IFRAME")[0];
		vCurrSw.fFra.setSubWindowTitle = function(pTitle){
			scDynUiMgr.subWindow.fSubWins[pId].fTi.innerHTML = pTitle;
		}
		vCurrSw.fFra.hideSubWindow = function(){
			scDynUiMgr.hideSubWindow(pId);
		}
		this.fSubWins[pId] = vCurrSw;
	},
	
	xShow: function(pId,pUrl) {
		scCoLib.util.log("scDynUiMgr.subWindow.xShow("+pId+","+pUrl+")");
		var vCurrSw = this.fSubWins[pId];
		vCurrSw.fFra.src = pUrl;
		vCurrSw.fOver.style.zIndex = this.fZIndex++;
		vCurrSw.fOver.style.visibility = "visible";
		vCurrSw.style.zIndex = this.fZIndex++;
		vCurrSw.style.visibility = "visible";
	}
}


scDynUiMgr.xInitMgr();
