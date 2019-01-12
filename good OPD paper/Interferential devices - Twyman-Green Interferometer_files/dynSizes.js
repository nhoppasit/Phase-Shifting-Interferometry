
/** ############ */

function scSiRuleAutoMarginW(pIdMarginWNode, pPathContainer, pIsDynSize, pMinWidth, pMaxMargin) {
	this.fIsDynSize = pIsDynSize;
	this.fId = pIdMarginWNode;
	this.fPath = pPathContainer;
	this.fMinWidth = pMinWidth;
	this.fMaxMargin = pMaxMargin;
	scOnLoads[scOnLoads.length] = this;
}
scSiRuleAutoMarginW.prototype.onResizedAnc = function(pOwnerNode, pEvent) {
	if( ! this.fIsDynSize) {
		pEvent.stopBranch = true;
		return;
	}
	if(pEvent.resizedNode == pOwnerNode) return;
	if(pEvent.phase==1) this.xReset();
	else this.xRedraw();
}
scSiRuleAutoMarginW.prototype.onResizedDes = function(pOwnerNode, pEvent) {
	if(pEvent.phase==1) this.xReset();
	else this.xRedraw();
}
scSiRuleAutoMarginW.prototype.xReset = function() {
	this.fNode.style.marginLeft = "0px";
	this.fNode.style.marginRight = "0px";
}
scSiRuleAutoMarginW.prototype.xRedraw = function() {
	var vH = this.fContainer.clientHeight;
	if(isNaN(vH) || vH <= 0) return;
	var vContentH = scSiLib.getContentHeight(this.fContainer);
	if(isNaN(vContentH) || vContentH <= 0) return;
	if(vContentH < vH) {
		var vW = this.fContainer.clientWidth;
		if(vW <= this.fMinWidth) return;
		var vMargin = Math.min( this.fMaxMargin * (1 - vContentH / vH), (vW - this.fMinWidth)/2) + "px";
		this.fNode.style.marginLeft = vMargin;
		this.fNode.style.marginRight = vMargin;
	}
}
scSiRuleAutoMarginW.prototype.onLoad = function() {
	this.fNode = $(this.fId);
	if( ! this.fNode) return;
	this.fContainer = scPaLib.findNode(this.fPath, this.fNode);
	if( ! this.fContainer) return;
	scSiLib.addRule(this.fContainer, this);
	this.xRedraw();
}
scSiRuleAutoMarginW.prototype.loadSortKey = "Si2";
scSiRuleAutoMarginW.prototype.ruleSortKey = "2";


/** ############ */

function scSiRuleFlexH(pIdFlexNode, pPathContainer, pIsDynSize, pRatioFreeSpace) {
	this.fIsDynSize = pIsDynSize;
	this.fId = pIdFlexNode;
	this.fPath = pPathContainer;
	this.fRatioFreeSpace = pRatioFreeSpace;
	scOnLoads[scOnLoads.length] = this;
}
scSiRuleFlexH.prototype.onResizedAnc = scSiRuleAutoMarginW.prototype.onResizedAnc;
scSiRuleFlexH.prototype.onResizedDes = scSiRuleAutoMarginW.prototype.onResizedDes;
scSiRuleFlexH.prototype.xReset = function() {
	this.fNode.style.height = null;
}
scSiRuleFlexH.prototype.xRedraw = function() {
	var vH = this.fContainer.clientHeight;
	if(isNaN(vH) || vH <= 0) return;
	var vContentH = scSiLib.getContentHeight(this.fContainer);
	if(isNaN(vContentH) || vContentH <= 0) return;
	if(vContentH < vH) this.fNode.style.height = Math.round( (vH-vContentH) * this.fRatioFreeSpace)+"px";
}
scSiRuleFlexH.prototype.onLoad = function() {
	this.fNode = $(this.fId);
	if( ! this.fNode) return;
	this.fContainer = scPaLib.findNode(this.fPath, this.fNode);
	if( ! this.fContainer) return;
	scSiLib.addRule(this.fContainer, this);
	this.xRedraw();
}
scSiRuleFlexH.prototype.loadSortKey = "Si3";
scSiRuleFlexH.prototype.ruleSortKey = "3";


/** ############ */

function ScSiRuleEnsureVisible(pIdNode, pPathContainer) {
	this.fId = pIdNode;
	this.fPath = pPathContainer;
	scOnLoads[scOnLoads.length] = this;
}
ScSiRuleEnsureVisible.prototype.onResizedAnc = function(pOwnerNode, pEvent) {
	if(pEvent.phase==1 || pEvent.resizedNode == pOwnerNode) return;
	this.xEnsureVis();
}
ScSiRuleEnsureVisible.prototype.onResizedDes = function(pOwnerNode, pEvent) {
	if(pEvent.phase==1) return;
	this.xEnsureVis();
}
ScSiRuleEnsureVisible.prototype.xEnsureVis = function() {
	var vOffsetMiddle = scSiLib.getOffsetTop(this.fNode, this.fContainer) + this.fNode.offsetHeight/2;
	var vMiddle = this.fContainer.clientHeight / 2;
	this.fContainer.scrollTop = vOffsetMiddle - vMiddle;
}
ScSiRuleEnsureVisible.prototype.onLoad = function() {
try {
	this.fNode = $(this.fId);
	if( ! this.fNode) return;
	this.fContainer = scPaLib.findNode(this.fPath, this.fNode);
	if( ! this.fContainer) return;
	scSiLib.addRule(this.fContainer, this);
	this.xEnsureVis();
} catch(e){alert(e);}
}
ScSiRuleEnsureVisible.prototype.loadSortKey = "SiZ";
ScSiRuleEnsureVisible.prototype.ruleSortKey = "Z";


/** ############ */

var menuScrollTiTask = {
	fCtPath : "ide:mnuScroll",
	fBtnUpPath : "ide:mnuFrmUp",
	fBtnDownPath : "ide:mnuFrmDown",
	fClassOffUp : "btnOff",
	fClassOffDown : "btnOff",
	fSpeed : 0,
	execTask : function(){
		try {
			if(this.fSpeed == 0) return false;
			this.fCt.scrollTop += this.fSpeed;
			return true;
		}catch(e){
			this.fSpeed = 0;
			return false;
		}
	},
	step: function(pPx) {
		try { this.fCt.scrollTop += pPx; }catch(e){}
	},
	checkBtn: function(){
		var vScrollTop = this.fCt.scrollTop;
		var vBtnUpOff = this.fBtnUp.className.indexOf(this.fClassOffUp);
		if(vScrollTop <= 0) {
			if(vBtnUpOff < 0) this.fBtnUp.className+= " "+this.fClassOffUp;
		} else {
			if(vBtnUpOff >= 0) this.fBtnUp.className = this.fBtnUp.className.substring(0, vBtnUpOff);
		}
		
		var vContentH = scSiLib.getContentHeight(this.fCt);
		var vBtnDownOff = this.fBtnDown.className.indexOf(this.fClassOffDown);
		if( vContentH - vScrollTop <= this.fCt.offsetHeight){
			if(vBtnDownOff < 0) this.fBtnDown.className+= " "+this.fClassOffDown;
		} else {
			if(vBtnDownOff >=0) this.fBtnDown.className = this.fBtnDown.className.substring(0, vBtnDownOff);
		}
	},
	onResizedAnc:function(pOwnerNode, pEvent){
		if(pEvent.phase==2) this.checkBtn();
	},
	ruleSortKey : "checkBtn",
	onLoad : function() {
		this.fCt = scPaLib.findNode(this.fCtPath);
		if(this.fClassOffUp && this.fClassOffDown) {
			this.fBtnUp = scPaLib.findNode(this.fBtnUpPath);
			this.fBtnDown = scPaLib.findNode(this.fBtnDownPath);
			this.checkBtn();
			scSiLib.addRule(this.fCt, this);
			this.fCt.onscroll = function(){menuScrollTiTask.checkBtn()};
		}
		try {
		if(scCoLib.isIE) this.fCt.onmousewheel = function(){menuScrollTiTask.step(Math.round(-event.wheelDelta/60))};
		else this.fCt.addEventListener('DOMMouseScroll', function(pEvent){menuScrollTiTask.step(pEvent.detail)}, false);
		}catch(e){alert(e);} 
	}
}
scOnLoads[scOnLoads.length] = menuScrollTiTask;


/** ############ */

var menuCollapser = {
	collapseM : function(pDontResize){
		document.cookie = "mnuCollapse=true";
		var vMnu = $("tplMnu");
		var vMnuClosed = $("tplMnuClosed");
		var vCo = $("tplCo");
		var vMnuW = vMnu.offsetWidth;
		vMnu.style.display = "none";
		vMnuClosed.style.display = "";
		vCo.style.left = (vCo.offsetLeft - vMnuW + vMnuClosed.offsetWidth)+"px";
		if(!pDontResize) scSiLib.fireResizedNode(document.body);
	},
	openM : function(){
		document.cookie = "mnuCollapse=false";
		var vMnu = $("tplMnu");
		var vMnuClosed = $("tplMnuClosed");
		var vCo = $("tplCo");
		var vMnuClosedW = vMnuClosed.offsetWidth;
		vMnuClosed.style.display = "none";
		vMnu.style.display = "";
		vCo.style.left = (vCo.offsetLeft - vMnuClosedW + vMnu.offsetWidth)+"px";
		scSiLib.fireResizedNode(document.body);
	},
	
	onLoad : function() {
		if(document.cookie.indexOf("mnuCollapse=true")>=0) this.collapseM(true);
	},
	loadSortKey : "AA"
}
scOnLoads[scOnLoads.length] = menuCollapser;

