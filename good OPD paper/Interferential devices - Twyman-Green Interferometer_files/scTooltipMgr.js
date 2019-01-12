

var scTooltipMgr = {

	cTtAbove : false, // tooltip above mousepointer?
	cTtDelay : 500, // time span until tooltip shows up [milliseconds]
	cTtLeft : false, // tooltip on the left of the mouse?
	cTtOffsetX : 12, // horizontal offset of left-top corner from mousepointer
	cTtOffsetY : 15, // vertical offset 
	cTtShadow : false, // Add shadow?
	cTtStatic : false, // tooltip NOT move with the mouse?
	cTtSticky : false, // do NOT hide tooltip on mouseout?
	cTtTemp : 0, // time span after which the tooltip disappears, 0 (zero) means "infinite timespan"
	cTtMaxWidth : 400, // Max width of tooltips
	cTtMaxHeight : 250, // Max height of tooltips (a scrollbar is added)
	cTtFixType : "win", // type of fixed positionning (win,node,id)
	cTtTextAlign : "left",
	cTtHPos : "leftAlign",
	cTtVPos : "topAlign",


	fCurrTt : null, // current tooltip
	fCurrTtId : null, // current tooltip ID
	fIfrm : null, // iframe to cover windowed controls in IE
	fIfrmId : null, // ID of iframe to cover windowed controls in IE
	fCurrTtW : 0, fCurrTtH : 0, // width and height of fCurrTt
	fCurrTtX : 0, fCurrTtY : 0,
	fOffX : 0, fOffY : 0,
	fXlim : 0, fYlim : 0, // right and bottom borders of visible client area
	fSup : false, // true if Opt.ABOVE
	fSticky : false, // fCurrTt sticky?
	fWait : false,
	fAct : false, // tooltip visibility flag
	fSub : false, // true while tooltip below mousepointer
	fUndef : "undefined",
	fArea : false,
	fMmovEvt : null, // stores previous mousemove evthandler
	fWsizEvt : null, // stores previous window.onresize evthandler
	fMupEvt : null, // stores previous mouseup evthandler

	fTag : null, // stores hovered dom node, href and previous statusbar txt
	fDb : null, // Document body
	fNua : null, //userAgent
	fNuav : null, //Navigator version
	fFix : false,
	fFixId : false,
	fFixType : "win",
	fTtHPos : null,
	fTtVPos : null,
	

	fNavop:null, fNavsf:null, fNavkr:null, fNavop6:null, fNavop7:null, fNavie:null, fNavie6:null, fNavn6:null, fNavw3c:null,
	

	xInitMgr: function() {
		if (this.fDb == null) {
			this.fDb = (document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body? document.body : null;
			this.fNua = navigator.userAgent.toLowerCase();
			this.fNuav = navigator.appVersion;
			this.fNavkr = this.fNua.indexOf("konqueror") != -1 || this.fNua.indexOf("khtml") != -1;
			this.fNavsf = this.fNavkr && this.fNua.indexOf("safari") != -1;
			this.fNavop = !!(window.opera && document.getElementById);
			this.fNavop6 = this.fNavop && !document.defaultView;
			this.fNavop7 = this.fNavop && !this.fNavop6;
			this.fNavie = this.fNua.indexOf("msie") != -1 && document.all && this.fDb && !this.fNavop;
			this.fNavie6 = this.fNavie && parseFloat(this.fNuav.substring(this.fNuav.indexOf("MSIE")+5)) >= 5.5;
			this.fNavn6 = (!this.fNavop && document.defaultView && typeof document.defaultView.getComputedStyle != this.fUndef);
			this.fNavw3c = !this.fNavie && !this.fNavn6 && !this.fNavop && document.getElementById;
		}
	},
	xInitIfrm: function() {
		if (this.fNavie6 && !this.xGetElt(this.fIfrmId)) {
			var vTmpDiv = document.createElement("DIV"); 
			this.fIfrmId = this.xGenId("TTiEiFrM")
			vTmpDiv.innerHTML = '<iframe id="'+this.fIfrmId+'" src="javascript:false" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;"></iframe>';
			var vTtDiv = vTmpDiv.firstChild;
			while(vTtDiv && vTtDiv.nodeType != 1) vTtDiv = vTtDiv.nextSibling;
			document.body.appendChild(vTtDiv);
			this.fIfrm = $(this.fIfrmId);
		}
	},
	xBuildCls: function(pCls, pSufx) {
		var vCls = pCls.split(" ");
		var vRetCls = "";
		for(var i=0; i<vCls.length; i++) vRetCls += vCls[i]+(pSufx ? ('_'+pSufx) : '')+' ';
		return(vRetCls);
	},
	xMakeTt: function(pId, pCo, pTi, pCls, pOpt) {
		var vSdw = (typeof pOpt.SHADOW != this.fUndef)? pOpt.SHADOW : this.cTtShadow;
		var vMaxX = this.xInt((this.fDb && this.fDb.clientWidth)? this.fDb.clientWidth : window.innerWidth)+this.xInt(window.pageXOffset || (this.fDb? this.fDb.scrollLeft : 0) || 0);
		var vHtml = '<div id="'+pId+'" class="'+this.xBuildCls(pCls,"fra")+'" style="position:absolute;z-index:1010;left:0px;top:0px;width:'+vMaxX+'px;visibility:hidden;text-align:left;">';
		vHtml += '<div style="position:absolute;" class="'+this.xBuildCls(pCls,"")+'">';
		if(pTi) vHtml += '<div id="'+pId+'ti" class="'+this.xBuildCls(pCls,"ti")+'"><span>'+pTi+'</span></div>';
		vHtml += '<div id="'+pId+'Scrol"><div id="'+pId+'co" class="'+this.xBuildCls(pCls,"co")+'">'+pCo+'</div></div></div>';
		if(vSdw) {
			vHtml += '<div id="'+pId+'SdwR" class="'+this.xBuildCls(pCls,"sh")+'" style="position:absolute;overflow:hidden;"></div>';
			vHtml += '<div id="'+pId+'SdwB" class="'+this.xBuildCls(pCls,"sh")+'" style="position:absolute;overflow:hidden;"></div>';
		}
		return(vHtml+'</div>');
	},
	xShow: function(pEvt, pId, pSup, pDelay, pFix, pFixId, pFixType, pLeft, pHPos, pVPos, pOffx, pOffy, pStatic, pSticky, pTemp) {
		if(this.fCurrTt) this.hideTooltip(true);
		this.fMmovEvt = document.onmousemove || null;
		this.fWsizEvt = window.onresize || null;
		if(window.dd && (window.DRAG && this.fMmovEvt == DRAG || window.RESIZE && this.fMmovEvt == RESIZE)) return;
		this.fCurrTt = this.xGetElt(pId);
		this.fCurrTtId = pId;
		if(this.fCurrTt) {
			pEvt = pEvt || window.event;
			if(this.fCurrTt.fNode.alt) {
				this.fCurrTt.fNode.ttAlt = this.fCurrTt.fNode.alt;
				this.fCurrTt.fNode.alt = "";
			}
			if(this.fCurrTt.fNode.title) {
				this.fCurrTt.fNode.ttTitle  = this.fCurrTt.fNode.title;
				this.fCurrTt.fNode.title = "";
			}
			this.fSub = !(this.fSup = pSup);
			this.fSticky = pSticky;
			this.fCurrTtW = this.xGetEltW(this.fCurrTt)+(this.fNavie? (this.xInt(this.fCurrTt.currentStyle.borderRightWidth)+this.xInt(this.fCurrTt.currentStyle.borderLeftWidth)):0);
			this.fCurrTtH = this.xGetEltH(this.fCurrTt)+(this.fNavie? (this.xInt(this.fCurrTt.currentStyle.borderTopWidth)+this.xInt(this.fCurrTt.currentStyle.borderBottomWidth)):0);
			this.fOffX = pLeft? -(this.fCurrTtW+pOffx) : pOffx;
			this.fOffY = pOffy;
			this.fFix = pFix;
			this.fFixId = pFixId;
			this.fFixType = pFixType;
			this.fTtHPos = pHPos;
			this.fTtVPos = pVPos;
			if(this.fNavop7) this.xOpDeHref(pEvt);
			this.fXlim = this.xInt((this.fDb && this.fDb.clientWidth)? this.fDb.clientWidth : window.innerWidth)+this.xInt(window.pageXOffset || (this.fDb? this.fDb.scrollLeft : 0) || 0)-this.fCurrTtW;
			this.fYlim = this.xInt(window.innerHeight || this.fDb.clientHeight)+this.xInt(window.pageYOffset || (this.fDb? this.fDb.scrollTop : 0) || 0)-this.fCurrTtH-this.fOffY;
			this.xSetDivZ();
			if(pFix) this.xSetDivPosFix(pFixType, pFix[0], pFix[1], pFixId, pHPos, pVPos);
			else this.xSetDivPos(this.xEvX(pEvt), this.xEvY(pEvt));
			var vTimeOutTxt = 'scTooltipMgr.showDiv(\'true\');';
			if(pSticky) vTimeOutTxt += '{scTooltipMgr.releaseMov();scTooltipMgr.releaseSize();scTooltipMgr.fMupEvt = document.onmouseup || null;if(document.captureEvents && !scTooltipMgr.fNavn6) document.captureEvents(Event.MOUSEUP);document.onmouseup = scTooltipMgr.hideTooltip;}';
			else if(pStatic) vTimeOutTxt += 'scTooltipMgr.releaseMov();scTooltipMgr.releaseSize();';
			if(pTemp > 0) vTimeOutTxt += 'window.tt_rtm = window.setTimeout(\'scTooltipMgr.fSticky = false; scTooltipMgr.hideTooltip();\','+pTemp+');';
			window.tt_rdl = window.setTimeout(vTimeOutTxt, pDelay);
			if(!pFix && (!pSticky || (pSticky && this.fCurrTt.fNode.onmouseover))) {
				if(document.captureEvents && !this.fNavn6) document.captureEvents(Event.MOUSEMOVE);
				document.onmousemove = this.moveTooltip;
			} else if (pFix && pFixId) {
				if(document.captureEvents && !this.fNavn6) document.captureEvents(Event.RESIZE);
				window.onresize = this.reposTooltip;
			}
		}
	},
	xInt: function(pX){
		var vY;
		return isNaN(vY = parseInt(pX))? 0 : vY;
	},
	xEvX: function(pEvt){
		var vX = this.xInt(pEvt.pageX || pEvt.clientX || 0)+this.xInt(this.fNavie? this.fDb.scrollLeft : 0)+this.fOffX;
		if(vX > this.fXlim) vX = this.fXlim;
		var vScr = this.xInt(window.pageXOffset || (this.fDb? this.fDb.scrollLeft : 0) || 0);
		if(vX < vScr) vX = vScr;
		return vX;
	},
	xEvY: function(pEvt) {
		var vY = this.xInt(pEvt.pageY || pEvt.clientY || 0)+this.xInt(this.fNavie? this.fDb.scrollTop : 0);
		if(this.fSup) vY -= (this.fCurrTtH + this.fOffY - 15);
		else if(vY > this.fYlim || !this.fSub && vY > this.fYlim-24) {
			vY -= (this.fCurrTtH + 5);
			this.fSub = false;
		} else {
			vY += this.fOffY;
			this.fSub = true;
		}
		return (vY<0? 0 : vY);
	},
	xShowIfrm: function(pX) {
		if(!this.fCurrTt || !this.fIfrm) return;
		if(pX)	{
			this.fIfrm.style.width = this.fCurrTtW+'px';
			this.fIfrm.style.height = this.fCurrTtH+'px';
			this.fIfrm.style.display = "block";
		}
		else this.fIfrm.style.display = "none";
	},
	xGetElt: function(pId) {
		return(this.fNavie? (document.all[pId] || null) : ($(pId) || null));
	},
	xGetEltW: function(pElt) {
		return(this.xInt(pElt.style.pixelWidth || pElt.offsetWidth));
	},
	xGetEltH: function(pElt) {
		return(this.xInt(pElt.style.pixelHeight || pElt.offsetHeight));
	},
	xGetEltL: function(pElt) {
		var vX;
		if (pElt.style.pixelLeft) {
			vX = this.xInt(pElt.style.pixelLeft);
		} else {
			vX = this.xInt(pElt.offsetLeft);
			if (pElt.offsetParent.tagName.toLowerCase() != 'body' && pElt.offsetParent.tagName.toLowerCase() != 'html') {
				vX -= pElt.offsetParent.scrollLeft;
				vX += this.xGetEltL(pElt.offsetParent);
			}
		}
		if (this.fNavsf) {
		}
		return vX;
	},
	xGetEltT: function(pElt) {
		var vY;
		if (pElt.style.pixelTop) {
			vY = this.xInt(pElt.style.pixelTop);
		} else {
			vY = this.xInt(pElt.offsetTop);
			if (pElt.offsetParent.tagName.toLowerCase() != 'body' && pElt.offsetParent.tagName.toLowerCase() != 'html') {
				vY -= pElt.offsetParent.scrollTop;
				vY += this.xGetEltT(pElt.offsetParent);
			}
		}
		if (this.fNavsf) {
		}
		return vY;
	},
	xSetEltW: function(pElt, pW) {
		if(typeof pElt.style.pixelWidth != this.fUndef) pElt.style.pixelWidth = pW;
		else 
		pElt.style.width = pW+'px';
	},
	xSetEltH: function(pElt, pH) {
		if(typeof pElt.style.pixelHeight != this.fUndef) pElt.style.pixelHeight = pH;
		else pElt.style.height = pH+'px';
	},
	xSetEltT: function(pElt, pT) {
		if(typeof pElt.style.pixelTop != this.fUndef) pElt.style.pixelTop = pT;
		else pElt.style.top = pT+'px';
	},
	xSetEltL: function(pElt, pL) {
		if(typeof pElt.style.pixelLeft != this.fUndef) pElt.style.pixelLeft = pL;
		else pElt.style.left = pL+'px';
	},

	xSetDivZ: function() {
		var vTtsh = this.fCurrTt.style || this.fCurrTt;
		if(vTtsh) {
			if(window.dd && dd.z) vTtsh.zIndex = Math.max(dd.z+1, vTtsh.zIndex);
			if(this.fIfrm) this.fIfrm.style.zIndex = vTtsh.zIndex-1;
		}
	},
	xSetDivPosFix: function(pType, pX, pY, pRelId, pHPos, pVPos) {
		var vX;
		var vY;
		if (pType == "win"){
			switch(pHPos){
			case "center":
				vX = this.fXlim / 2 + pX;
				break
			case "rightAlign":
				vX = this.fXlim + pX;
				break
			default :
				vX = pX;
			}
			switch(pVPos){
			case "center":
				vY = this.fYlim / 2 + pX;
				break
			case "bottomAlign":
				vY = this.fYlim + pX;
				break
			default :
				vY = pY;
			}
		} else {
			var vRelBase = (pType == "id" ? $(pRelId) : this.fCurrTt.fNode);
			switch(pHPos){
			case "center":
				vX = this.xGetEltL(vRelBase) + (this.xGetEltW(vRelBase) - this.fCurrTtW)/2 + pX;
				break
			case "rightAlign":
				vX = this.xGetEltL(vRelBase) + this.xGetEltW(vRelBase) - this.fCurrTtW + pX;
				break
			case "leftOfElement":
				vX = this.xGetEltL(vRelBase) - this.fCurrTtW + pX;
				if (!this.xIsInWinH(vX)) vX = this.xGetEltL(vRelBase) + this.xGetEltW(vRelBase) - pX;
				break
			case "rightOfElement":
				vX = this.xGetEltL(vRelBase) + this.xGetEltW(vRelBase) + pX;
				if (!this.xIsInWinH(vX)) vX = this.xGetEltL(vRelBase) - this.fCurrTtW - pX;
				break
			default :
				vX = this.xGetEltL(vRelBase) + pX;
			}
			switch(pVPos){
			case "center":
				vY = this.xGetEltT(vRelBase) + (this.xGetEltH(vRelBase) - this.fCurrTtH)/2 + pY;
				break
			case "bottomAlign":
				vY = this.xGetEltT(vRelBase) + this.xGetEltH(vRelBase) - this.fCurrTtH + pY;
				break
			case "aboveElement":
				vY = this.xGetEltT(vRelBase) - this.fCurrTtH + pY;
				if (!this.xIsInWinV(vY)) vY = this.xGetEltT(vRelBase) + this.xGetEltH(vRelBase) - pY;
				break
			case "belowElement":
				vY = this.xGetEltT(vRelBase) + this.xGetEltH(vRelBase) + pY;
				if (!this.xIsInWinV(vY)) vY = this.xGetEltT(vRelBase) - this.fCurrTtH - pY;
				break
			default :
				vY = this.xGetEltT(vRelBase) + pY;
			}
		}
		if(vX > this.fXlim) vX = this.fXlim;
		var vScrX = this.xInt(window.pageXOffset || (this.fDb? this.fDb.scrollLeft : 0) || 0);
		if(vX < vScrX) vX = vScrX;
		if(vY > this.fYlim) vY = this.fYlim;
		var vScrY = this.xInt(window.pageYOffset || (this.fDb? this.fDb.scrollTop : 0) || 0);
		if(vY < vScrY) vY = vScrY;
		this.xSetDivPos(vX, vY);
	},
	xIsInWinH: function(pX) {
		if(pX > this.fXlim) return(false);
		var vScr = this.xInt(window.pageXOffset || (this.fDb? this.fDb.scrollLeft : 0) || 0);
		if(pX < vScr) return(false);
		return(true);
	},
	xIsInWinV: function(pY) {
		if(pY > this.fYlim) return(false);
		var vScr = this.xInt(window.pageYOffset || (this.fDb? this.fDb.scrollTop : 0) || 0);
		if(pY < vScr) return(false);
		return(true);
	},
	xSetDivPos: function(pX, pY) {
		var vTtsh = this.fCurrTt.style || this.fCurrTt;
		var vPx = (this.fNavop6)? '' : 'px';
		vTtsh.left = (this.fCurrTtX = pX)+vPx;
		vTtsh.top = (this.fCurrTtY = pY)+vPx;
		if(this.fIfrm) {
			this.fIfrm.style.left = vTtsh.left;
			this.fIfrm.style.top = vTtsh.top;
		}
	},
	xOpDeHref: function(pEvt) {
		var vTag;
		if(pEvt) {
			vTag = pEvt.target;
			while(vTag) {
				if(vTag.hasAttribute("href")) {
					this.fTag = vTag
					this.fTag.t_href = this.fTag.getAttribute("href");
					this.fTag.removeAttribute("href");
					this.fTag.style.cursor = "hand";
					this.fTag.onmousedown = this.xOpReHref;
					this.fTag.stats = window.status;
					window.status = this.fTag.t_href;
					break;
				}
				vTag = vTag.parentElement;
			}
		}
	},
	xOpReHref: function() {
		if(this.fTag) {
			this.fTag.setAttribute("href", this.fTag.t_href);
			window.status = this.fTag.stats;
			this.fTag = null;
		}
	},
	xSetEltSizePos: function(pElt, pT, pL, pW, pH) {
		this.xSetEltL(pElt, pL);
		this.xSetEltT(pElt, pT);
		this.xSetEltW(pElt, pW);
		this.xSetEltH(pElt, pH);
	},
	xSetTtSize: function(pId, pOpt) {
		var vCont = this.xGetElt(pId);
		if (vCont) {
			var vMaxW = (typeof pOpt.MAXWIDTH != this.fUndef)? pOpt.MAXWIDTH : this.cTtMaxWidth, 
			vMaxH = (typeof pOpt.MAXHEIGHT != this.fUndef)? pOpt.MAXHEIGHT : this.cTtMaxHeight; 
			var vTt = vCont.firstChild;
			while(vTt && vTt.nodeType != 1) vTt = vTt.nextSibling;
			var vTtScrol = this.xGetElt(pId+'Scrol');
			var vTtW = this.xGetEltW(vTt);
			if (vTtW > vMaxW) { //Fix max width if needed
				if (this.fNavkr) this.xSetEltW(vTtScrol, vMaxW);
				else this.xSetEltW(vTt, vMaxW);
				vTtW = this.xGetEltW(vTt);
			}
			var vTtH = this.xGetEltH(vTt);
			if (vTtH > vMaxH) { //Fix max height & add scroll if needed
				vTtH = vMaxH;
				var vTtScrolH = vTtH; 
				var vTtTi = this.xGetElt(pId+'ti');
				if (vTtTi) vTtScrolH -= this.xGetEltH(vTtTi);
				if (typeof vTtScrol.style.overflowY != this.fUndef) vTtScrol.style.overflowY = 'scroll';
				else vTtScrol.style.overflow = 'scroll';
				this.xSetEltH(vTtScrol, vTtScrolH);
				vTtH = this.xGetEltH(vTt);
				pOpt.FORCESTICKY = true; //Set force sticky flag if scroll
			}
			var vContW = vTtW;
			var vContH = vTtH;
			var vSdwR = this.xGetElt(pId+'SdwR');
			if (vSdwR) { // Size shadow if it exists
				var vSdwB = this.xGetElt(pId+'SdwB');
				var vSdwW = this.xGetEltW(vSdwR);
				this.xSetEltSizePos(vSdwR,vSdwW,vTtW,vSdwW,vTtH-vSdwW);
				this.xSetEltSizePos(vSdwB,vTtH,vSdwW,vTtW,vSdwW);
				vContW += vSdwW;
				vContH += vSdwW;
			}
			this.xSetEltW(vCont, vContW);
			this.xSetEltH(vCont, vContH);
		}
	},
	xEltInContId: function(pElt, pId) {
		var vElt = pElt;
		var vFound = false;
		if (vElt) {
			vFound = vElt.id == pId;
			while (vElt.parentNode && !vFound) {
				vElt = vElt.parentNode
				vFound = vElt.id == pId;
			}
		}
		return(vFound);
	},
	xEltInContTtId: function(pElt, pTtId) {
		var vElt = pElt;
		var vFound = false;
		if (vElt) {
			vFound = vElt.ttId == pTtId;
			while (vElt.parentNode && !vFound) {
				vElt = vElt.parentNode
				vFound = vElt.ttId == pTtId;
			}
		}
		return(vFound);
	},
	xGetTargetElt: function(pEvt) {
		var vEvt = pEvt || window.event;
		var vTargetElt = null
		if(vEvt && vEvt.target) vTargetElt = vEvt.target;
		if(!vTargetElt && vEvt && vEvt.srcElement) vTargetElt = vEvt.srcElement;
		return(vTargetElt);
	},
	xGenId: function(pPrefix) {
		var vIndex = 0;
		while((this.xGetElt(pPrefix+vIndex) || this.xGetElt(pPrefix+vIndex+'co') || this.xGetElt(pPrefix+vIndex+'ti') || this.xGetElt(pPrefix+vIndex+'SdwR') || this.xGetElt(pPrefix+vIndex+'SdwB') || this.xGetElt(pPrefix+vIndex+'Scrol')) && vIndex < 10000) vIndex++;
		if (vIndex == 10000) {
			alert("Tooltip creation Error");
			return("");
		} else return (pPrefix + vIndex);
	},



	moveTooltip: function(pEvt) {
		if(!scTooltipMgr.fCurrTt) return;
		if(scTooltipMgr.fNavn6 || scTooltipMgr.fNavw3c) {
			if(scTooltipMgr.fWait) return;
			scTooltipMgr.fWait = true;
			setTimeout('scTooltipMgr.fWait = false;', 5);
		}
		var vEvt = pEvt || window.event;
		scTooltipMgr.xSetDivPos(scTooltipMgr.xEvX(vEvt), scTooltipMgr.xEvY(vEvt));
		if(scTooltipMgr.fNavop6) {
			if(scTooltipMgr.fArea && vEvt.target.tagName != 'AREA') scTooltipMgr.hideTooltip();
			else if(vEvt.target.tagName == 'AREA') scTooltipMgr.fArea = true;
		}
		if((scTooltipMgr.fNavsf || scTooltipMgr.fCurrTt.fNode.onmouseover) &&  !scTooltipMgr.xEltInContTtId(scTooltipMgr.xGetTargetElt(vEvt), scTooltipMgr.fCurrTtId)) scTooltipMgr.hideTooltip();
	},
	releaseMov: function() {
		if(document.onmousemove == this.moveTooltip) {
			if(!this.fMmovEvt && document.releaseEvents && !this.fNavn6) document.releaseEvents(Event.MOUSEMOVE);
			document.onmousemove = this.fMmovEvt;
		}
	},
	releaseSize: function() {
		if(window.onresize == this.reposTooltip) {
			if(!this.fWsizEvt && document.releaseEvents && !this.fNavn6) document.releaseEvents(Event.RESIZE);
			window.onresize = this.fWsizEvt;
		}
	},
	showDiv: function(pFlag) {
		this.xShowIfrm(pFlag);
		this.fCurrTt.style.visibility = pFlag? 'visible' : 'hidden';
		this.fAct = pFlag;
	},
	hideTooltip: function(pPara) {
		var vForce = (typeof pPara == "boolean")? pPara : false;
		if(scTooltipMgr.fCurrTt) {
			if(window.tt_rdl) window.clearTimeout(tt_rdl);
			if(!scTooltipMgr.fSticky || !scTooltipMgr.fAct || (scTooltipMgr.fSticky && !scTooltipMgr.xEltInContId(scTooltipMgr.xGetTargetElt(pPara),scTooltipMgr.fCurrTtId)) || vForce) {
				if(window.tt_rtm) window.clearTimeout(tt_rtm);
				scTooltipMgr.showDiv(false);
				scTooltipMgr.xSetDivPos(-scTooltipMgr.fCurrTtW, -scTooltipMgr.fCurrTtH);
				if (scTooltipMgr.fCurrTt.fNode.ttTitle) scTooltipMgr.fCurrTt.fNode.title = scTooltipMgr.fCurrTt.fNode.ttTitle;
				if (scTooltipMgr.fCurrTt.fNode.ttAlt) scTooltipMgr.fCurrTt.fNode.alt = scTooltipMgr.fCurrTt.fNode.ttAlt;
				scTooltipMgr.fCurrTt = null;
				if(typeof scTooltipMgr.fMupEvt != scTooltipMgr.fUndef) document.onmouseup = scTooltipMgr.fMupEvt;
			}
			if(scTooltipMgr.fNavop6 && scTooltipMgr.fArea) scTooltipMgr.fArea = false;
			scTooltipMgr.releaseMov();
			scTooltipMgr.releaseSize();
			if(scTooltipMgr.fNavop7) scTooltipMgr.xOpReHref();
		}
	},
	reposTooltip: function() {
		scTooltipMgr.xSetDivPosFix(scTooltipMgr.fFixType, scTooltipMgr.fFix[0], scTooltipMgr.fFix[1], scTooltipMgr.fFixId, scTooltipMgr.fTtHPos, scTooltipMgr.fTtVPos);
	},



	showTooltip: function(pNode, pEvt, pCo, pTi, pCls, pOpt) {
		this.xInitMgr(); // Initialize tooltipMgr  if needed
		var vOpt = (typeof pOpt != this.fUndef)? pOpt : ""; //Retreave  display Opts if any...
		var vSsup = (typeof vOpt.ABOVE != this.fUndef)? vOpt.ABOVE : this.cTtAbove, 
		vDelay = (typeof vOpt.DELAY != this.fUndef)? vOpt.DELAY : this.cTtDelay,
		vFix = (typeof vOpt.FIX != this.fUndef)? vOpt.FIX : "",
		vFixId = (typeof vOpt.FIXID != this.fUndef)? vOpt.FIXID : "",
		vFixType = (typeof vOpt.FIXTYPE != this.fUndef)? vOpt.FIXTYPE : ((vFixId == "")? this.cTtFixType : "id"),
		vLeft = (typeof vOpt.LEFT != this.fUndef)? vOpt.LEFT : this.cTtLeft,
		vVPos = (typeof vOpt.VPOS != this.fUndef)? vOpt.VPOS : this.cTtVPos,
		vHPos = (typeof vOpt.HPOS != this.fUndef)? vOpt.HPOS : this.cTtHPos,
		vOffx = (typeof vOpt.OFFSETX != this.fUndef)? vOpt.OFFSETX : this.cTtOffsetX,
		vOffy = (typeof vOpt.OFFSETY != this.fUndef)? vOpt.OFFSETY : this.cTtOffsetY,
		vStatic = (typeof vOpt.STATIC != this.fUndef)? vOpt.STATIC : this.cTtStatic,
		vSticky = (typeof vOpt.STICKY != this.fUndef)? vOpt.STICKY : this.cTtSticky,
		vTemp = (typeof vOpt.TEMP != this.fUndef)? vOpt.TEMP : this.cTtTemp;
		
		var vTtId = pNode.ttId || null; //Retreave the tooltip ID if it has already been created
		if (this.fCurrTt != null && this.fCurrTt == this.xGetElt(vTtId)) return; // If the tooltip is already shown, exit (safari bug & moz call of multiple onmouseover)
		

		if (vTtId == null) { 
			vTtId = this.xGenId("scTooltip"); //generate a new tooltip ID
			var vTtHtml = this.xMakeTt(vTtId, pCo, pTi, pCls, vOpt); //build the tooltip HTML
			var vTmpDiv=document.createElement("DIV"); // Temp div to hold the created tooltip html
			vTmpDiv.innerHTML = vTtHtml;
			var vTtDiv = vTmpDiv.firstChild;
			while(vTtDiv && vTtDiv.nodeType != 1) vTtDiv = vTtDiv.nextSibling;
			document.body.appendChild(vTtDiv); //Apend the created tooltip to the end of the document
			vTtDiv.fNode = pNode; //Keep pointer to owner node on the tooltip
			this.xSetTtSize(vTtId, vOpt); //Calculate size & resize if needed


			if (vOpt.FORCESTICKY) pNode.ttFSticky = true;
			vSticky = vSticky || (pNode.ttFSticky || false);
			pNode.ttId = vTtId; 
			if(!this.fNavsf && !vSticky) pNode.onmouseout = this.hideTooltip;
		}
		this.xInitIfrm(); // Init ie iframe if needed
		vSticky = vSticky || (pNode.ttFSticky || false);


		this.xShow(pEvt, vTtId, vSsup, vDelay, vFix, vFixId, vFixType, vLeft, vHPos, vVPos, vOffx, vOffy, vStatic, vSticky, vTemp);
	}
};
