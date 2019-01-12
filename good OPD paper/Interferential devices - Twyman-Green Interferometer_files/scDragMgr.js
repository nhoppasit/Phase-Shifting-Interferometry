


var scDragMgr = {



	makeContainer : function(pKey, pCatchment, pContainer, pIfEmpty) {
		this.dragdrop.makeContainer(pKey, pCatchment, pContainer, pIfEmpty); return this
	},




	setMode : function(pContainer, pMode, pMax) {
		this.dragdrop.setMode(pContainer, pMode, pMax); return this
	},



	setResizeOnDragOut : function(pContainer, pMode) {
		this.dragdrop.setResizeOnDragOut(pContainer, pMode); return this
	},


	setDragOverClass : function(pContainer, pClass) {
		this.dragdrop.setDragOverClass(pContainer, pClass); return this
	},


	getContainers : function (pKey, pRootNode) {
		return this.dragdrop.getContainers(pKey, pRootNode)
	},


	getLabels : function(pContainer) {
		return this.dragdrop.getLabels(pContainer)
	},



	repopulateContainers : function (pKey) {
		this.dragdrop.repopulateContainers(pKey); return this
	},
	

	makeDraggableLabel : function(pKey, pLabel, pHandle) {
		this.dragdrop.makeDraggableLabel(pKey, pLabel, pHandle); return this
	},
	

	setCallback : function(pLabel, pfunction) {
		this.dragdrop.setCallback(pLabel, pfunction); return this
	},


	setDraggable : function (pLabel, pIsDraggable) {
		this.dragdrop.setDraggable(pLabel, pIsDraggable); return this
	},


	setConstraintBox : function (pLabel, pNode) {

		if (navigator.userAgent.toLowerCase().indexOf("khtml") != -1) return
		this.dragdrop.setConstraintBox(pLabel, pNode); return this
	},


	setDragClass : function(pLabel, pClass) {
		this.dragdrop.setDragClass(pLabel, pClass); return this
	},


	saveLabelPos : function (pLabel) {
		return this.dragdrop.saveLabelPos(pLabel)
	}
}

scDragMgr.helpers = {
	
	addClass : function(pNode, pClass) {
		var vNewClassStr = pNode.className
		for (var i = 1, n = arguments.length; i < n; i++) vNewClassStr += ' '+arguments[i]
		pNode.className = vNewClassStr
		return scDragMgr.helpers
	},
	
	delClass : function(pNode, pClass) {
		if (pClass != '') {
			var vCurrentClasses = pNode.className.split(' ')
			var vNewClasses = new Array()
			for (var i = 0, n = vCurrentClasses.length; i < n; i++) {
				var vClassFound = false
				for (var j = 1, m = arguments.length; j < m; j++) {
					if (vCurrentClasses[i] == arguments[j]) vClassFound = true
				}
				if (!vClassFound) vNewClasses.push(vCurrentClasses[i])
			}
			pNode.className = vNewClasses.join(' ')
		}
		return scDragMgr.helpers
	},
	
	switchClass : function(pNode, pClassOld, pClassNew) {
		if (pClassOld && pClassOld != '') {
			var vCurrentClasses = pNode.className.split(' ')
			var vNewClasses = new Array()
			var vClassFound = false
			for (var i = 0, n = vCurrentClasses.length; i < n; i++) {
				if (vCurrentClasses[i] != pClassOld) {
					vNewClasses.push(vCurrentClasses[i])
				} else {
					if (pClassNew && pClassNew != '') vNewClasses.push(pClassNew)
					vClassFound = true
				}
			}
			if (pClassNew && pClassNew != '' && !vClassFound) vNewClasses.push(pClassNew)
			pNode.className = vNewClasses.join(' ')
		}
		return scDragMgr.helpers
	},

	isMouseInside : function(pDragEvent, pContainter) {
		return ( pDragEvent.transformedMouseOffset.inside( pContainter.topLeftPosition, pContainter.bottomRightPosition )) 
	},

	map : function(array, func) {
		for (var i = 0, n = array.length; i < n; i++) func(array[i])
	},

	nextItem : function(item, nodeName) {
		if (item == null) return
		var next = item.nextSibling
		while (next != null) {
			if (next.nodeName == nodeName) return next
			next = next.nextSibling
		}
		return null
	},

	previousItem : function(item, nodeName) {
		var previous = item.previousSibling
		while (previous != null) {
			if (previous.nodeName == nodeName) return previous
			previous = previous.previousSibling
		}
		return null
	},

	moveBefore : function(item1, item2) {
		var parent = item1.parentNode
		parent.removeChild(item1)
		parent.insertBefore(item1, item2)
	},

	moveAfter : function(item1, item2) {
		var parent = item1.parentNode
		parent.removeChild(item1)
		parent.insertBefore(item1, item2 ? scDragMgr.helpers.nextItem(item2, item2.nodeName) : null)
	},
	
	isEltContainedByNode: function(pElt, pContainer) {
		var vElt = pElt
		var vFound = false
		if (vElt) {
			while (vElt.parentNode && !vFound) {
				vElt = vElt.parentNode
				vFound = vElt == pContainer
			}
		}
		return(vFound)
	}
}

scDragMgr.utilities = {

	logError : function(pPre, pEx) {
		var vMsg = "scDragMgr ERROR: "+pPre
		vMsg += (pEx != null) ? " - "+((typeof pEx.message != "undefined") ? pEx.message : pEx) : ""
		if(window.console) {
			window.console.log(vMsg)
		} else {
			alert(vMsg)
		}
	},
	log : function(pMsg) {
		if(window.console) {
			window.console.log(pMsg)
		}
	}
}

scDragMgr.events = {
	fix : function(event) {
		if (!event) event = window.event

		if (event.target) {
			if (event.target.nodeType == 3) event.target = event.target.parentNode
		} else if (event.srcElement) {
			event.target = event.srcElement
		}

		return event
	},

	register : function(element, type, func) {
		if (element.addEventListener) {
			element.addEventListener(type, func, false)
		} else if (element.attachEvent) {
			if (!element._listeners) element._listeners = new Array()
			if (!element._listeners[type]) element._listeners[type] = new Array()
			var workaroundFunc = function() {
				func.apply(element, new Array())
			}
			element._listeners[type][func] = workaroundFunc
			element.attachEvent('on' + type, workaroundFunc)
		}
	},

	unregister : function(element, type, func) {
		if (element.removeEventListener) {
			element.removeEventListener(type, func, false)
		} else if (element.detachEvent) {
			if (element._listeners && element._listeners[type] && element._listeners[type][func]) {
				element.detachEvent('on' + type, element._listeners[type][func])
			}
		}
	}
}


scDragMgr.coordinates = {

	create : function(x, y) {


		return new _scDragMgrCoordinate(this, x, y)
	},

	origin : function() {
		return this.create(0, 0)
	},

	/*
	 * FIXME: Safari 1.2, returns (0,0) on absolutely positioned elements
	 */
	topLeftPosition : function(element) {
		var left = parseInt(scDragMgr.css.readStyle(element, "left"))
		var left = isNaN(left) ? 0 : left
		var top = parseInt(scDragMgr.css.readStyle(element, "top"))
		var top = isNaN(top) ? 0 : top

		return this.create(left, top)
	},

	bottomRightPosition : function(element) {
		return this.topLeftPosition(element).plus(this._size(element))
	},

	topLeftOffset : function(element) {
		var offset = this._offset(element) 
		var parent = element.offsetParent
		while (parent) {
			offset = offset.plus(this._offset(parent))
			parent = parent.offsetParent
			if (parent) offset = offset.minus(this._scroll(parent))
		}
		return offset
	},

	bottomRightOffset : function(element) {
		return this.topLeftOffset(element).plus(
				this.create(element.offsetWidth, element.offsetHeight))
	},

	scrollOffset : function() {
		if (window.pageXOffset) {
			return this.create(window.pageXOffset, window.pageYOffset)
		} else if (document.documentElement) {
			return this.create(
					document.body.scrollLeft + document.documentElement.scrollLeft, 
					document.body.scrollTop + document.documentElement.scrollTop)
		} else if (document.body.scrollLeft >= 0) {
			return this.create(document.body.scrollLeft, document.body.scrollTop)
		} else {
			return this.create(0, 0)
		}
	},

	clientSize : function() {
		if (window.innerHeight >= 0) {
			return this.create(window.innerWidth, window.innerHeight)
		} else if (document.documentElement) {
			return this.create(document.documentElement.clientWidth,
					document.documentElement.clientHeight)
		} else if (document.body.clientHeight >= 0) {
			return this.create(document.body.clientWidth,
					document.body.clientHeight)
		} else {
			return this.create(0, 0)
		}
	},

	/**
	 * mouse coordinate relative to the window (technically the
	 * browser client area) i.e. the part showing your page
	 *
	 * NOTE: in Safari the coordinate is relative to the document
	 */
	mousePosition : function(event) {
		event = scDragMgr.events.fix(event)
		return this.create(event.clientX, event.clientY)
	},

	/**
	 * mouse coordinate relative to the document
	 */
	mouseOffset : function(event) {
		event = scDragMgr.events.fix(event)
		if (event.pageX >= 0 || event.pageX < 0) {
			return this.create(event.pageX, event.pageY)
		} else if (event.clientX >= 0 || event.clientX < 0) {
			return this.mousePosition(event).plus(this.scrollOffset())
		}
	},

	_size : function(element) {
		return this.create(element.offsetWidth, element.offsetHeight)
	},
	_offset : function(element) {
		return this.create(element.offsetLeft,element.offsetTop)
	},
	_scroll : function(element) {
		return this.create(element.scrollLeft,element.scrollTop)
	}
}

function _scDragMgrCoordinate(factory, x, y) {
	this.factory = factory
	this.x = isNaN(x) ? 0 : x
	this.y = isNaN(y) ? 0 : y
}

_scDragMgrCoordinate.prototype = {
	toString : function() {
		return "(" + this.x + "," + this.y + ")"
	},

	toHash : function() {
		return {"x":this.x,"y":this.y}
	},

	plus : function(that) {
		return this.factory.create(this.x + that.x, this.y + that.y)
	},

	minus : function(that) {
		return this.factory.create(this.x - that.x, this.y - that.y)
	},

	min : function(that) {
		return this.factory.create(
				Math.min(this.x , that.x), Math.min(this.y , that.y))
	},

	max : function(that) {
		return this.factory.create(
				Math.max(this.x , that.x), Math.max(this.y , that.y))
	},

	constrainTo : function (one, two) {
		var min = one.min(two)
		var max = one.max(two)

		return this.max(min).min(max)
	},

	distance : function (that) {
		return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2))
	},

	reposition : function(element) {
		element.style["top"] = this.y + "px"
		element.style["left"] = this.x + "px"
	},


    inside : function(pTL, pBR) {
		return (this.x >= pTL.x) && (this.x <= pBR.x) &&(this.y >= pTL.y) && (this.y <= pBR.y)
	}
}


scDragMgr.css = {
	readStyle : function(element, property) {
		if (element.style[property]) {
			return element.style[property]
		} else if (element.currentStyle) {
			return element.currentStyle[property]
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var style = document.defaultView.getComputedStyle(element, null)
			return style.getPropertyValue(property)
		} else {
			return null
		}
	}
}


scDragMgr.drag = {
	createSimpleGroup : function(element, handle) {
		handle = handle ? handle : element
		var group = this.createGroup(element)
		group.setHandle(handle)
		group.transparentDrag()
		group.onTopWhileDragging()
		return group
	},

	createGroup : function(element) {
		var group = new _scDragMgrDragGroup(this, element)
		element.fStylePosBase = scDragMgr.css.readStyle(element, 'position')
		if (element.fStylePosBase == 'static') {
			element.fStylePosDrag = 'relative'
			element.style["position"] = element.fStylePosDrag
		} else if (element.fStylePosBase == 'absolute') {
			/* for Safari 1.2 */
			scDragMgr.coordinates.topLeftOffset(element).reposition(element)
		}
		return group
	},

	constraints : function() {
		return this._constraintFactory
	},

	_createEvent : function(type, event, group) {
		return new _scDragMgrDragEvent(type, event, group)
	}
}

function _scDragMgrDragGroup(factory, element) {
	this.factory = factory
	this.element = element
	this._handle = null
	this._draggable = true
	this._thresholdDistance = 0
	this._transforms = new Array()
	this._listeners = new Array()
	this._listeners['draginit'] = new Array()
	this._listeners['dragstart'] = new Array()
	this._listeners['dragmove'] = new Array()
	this._listeners['dragend'] = new Array()
}

_scDragMgrDragGroup.prototype = {
	/*
	 * TODO:
	 *   - unregister(type, func)
	 *   - move custom event listener stuff into Event library
	 *   - keyboard nudging of "selected" group
	 */

	setHandle : function(handle) {
		var events = scDragMgr.events

		handle.scDragMgrDragGroup = this
		events.register(handle, 'mousedown', this._dragInit)
		handle.onmousedown = function() { return false }

		if (this.element != handle)
			events.unregister(this.element, 'mousedown', this._dragInit)
	},

	register : function(type, func) {
		this._listeners[type].push(func)
	},

	addTransform : function(transformFunc) {
		this._transforms.push(transformFunc)
	},

	verticalOnly : function() {
		this.addTransform(this.factory.constraints().vertical())
	},

	horizontalOnly : function() {
		this.addTransform(this.factory.constraints().horizontal())
	},

	setThreshold : function(thresholdDistance) {
		this._thresholdDistance = thresholdDistance
	},

	transparentDrag : function(opacity) {
		var opacity = typeof(opacity) != "undefined" ? opacity : 0.75;
		var originalOpacity = scDragMgr.css.readStyle(this.element, "opacity")

		this.register('dragstart', function(dragEvent) {
			var element = dragEvent.group.element
			element.style.opacity = opacity
			element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')'
		})
		this.register('dragend', function(dragEvent) {
			var element = dragEvent.group.element
			element.style.opacity = originalOpacity
			element.style.filter = 'alpha(opacity=100)'
		})
	},

	onTopWhileDragging : function(zIndex) {
		var zIndex = typeof(zIndex) != "undefined" ? zIndex : 100000;
		var originalZIndex = scDragMgr.css.readStyle(this.element, "z-index")

		this.register('dragstart', function(dragEvent) {
			dragEvent.group.element.style.zIndex = zIndex
		})
		this.register('dragend', function(dragEvent) {
			dragEvent.group.element.style.zIndex = originalZIndex
		})
	},

	setDraggable : function(draggable) {
		this._draggable = draggable
	},

	_dragInit : function(event) {
		event = scDragMgr.events.fix(event)
		var group = document.scDragMgrDragGroup = this.scDragMgrDragGroup
		var dragEvent = group.factory._createEvent('draginit', event, group)

		if (group._draggable) {
			group._isThresholdExceeded = false
			group._initialMouseOffset = dragEvent.mouseOffset
			group._grabOffset = dragEvent.mouseOffset.minus(dragEvent.topLeftOffset)
			scDragMgr.events.register(document, 'mousemove', group._drag)
			document.onmousemove = function() { return false }
			scDragMgr.events.register(document, 'mouseup', group._dragEnd)

			group._notifyListeners(dragEvent)
		}
	},

	_drag : function(event) {
		event = scDragMgr.events.fix(event)
		var coordinates = scDragMgr.coordinates
		var group = this.scDragMgrDragGroup
		if (!group) return
		var dragEvent = group.factory._createEvent('dragmove', event, group)

		var newTopLeftOffset = dragEvent.mouseOffset.minus(group._grabOffset)

		if (!group._isThresholdExceeded) {
			var distance = 
					dragEvent.mouseOffset.distance(group._initialMouseOffset)
			if (distance < group._thresholdDistance) return
			group._isThresholdExceeded = true
			group._notifyListeners(
					group.factory._createEvent('dragstart', event, group))
		}

		for (i in group._transforms) {
			var transform = group._transforms[i]
			newTopLeftOffset = transform(newTopLeftOffset, dragEvent)
		}

		var dragDelta = newTopLeftOffset.minus(dragEvent.topLeftOffset)
		var newTopLeftPosition = dragEvent.topLeftPosition.plus(dragDelta)
		newTopLeftPosition.reposition(group.element)
		dragEvent.transformedMouseOffset = newTopLeftOffset.plus(group._grabOffset)

		group._notifyListeners(dragEvent)

		var errorDelta = newTopLeftOffset.minus(coordinates.topLeftOffset(group.element))
		if (errorDelta.x != 0 || errorDelta.y != 0) {
			coordinates.topLeftPosition(group.element).plus(errorDelta).reposition(group.element)
		}
	},

	_dragEnd : function(event) {
		event = scDragMgr.events.fix(event)
		var group = this.scDragMgrDragGroup
		var dragEvent = group.factory._createEvent('dragend', event, group)

		group._notifyListeners(dragEvent)

		this.scDragMgrDragGroup = null
		scDragMgr.events.unregister(document, 'mousemove', group._drag)
		document.onmousemove = null
		scDragMgr.events.unregister(document, 'mouseup', group._dragEnd)
	},

	_notifyListeners : function(dragEvent) {
		var listeners = this._listeners[dragEvent.type]
		for (i in listeners) {
			listeners[i](dragEvent)
		}
	}
}

function _scDragMgrDragEvent(type, event, group) {
	this.type = type
	this.group = group
	this.mousePosition = scDragMgr.coordinates.mousePosition(event)
	this.mouseOffset = scDragMgr.coordinates.mouseOffset(event)
	this.transformedMouseOffset = this.mouseOffset
	this.topLeftPosition = scDragMgr.coordinates.topLeftPosition(group.element)
	this.topLeftOffset = scDragMgr.coordinates.topLeftOffset(group.element)
	this.bottomRightPosition = scDragMgr.coordinates.bottomRightPosition(group.element)
	this.bottomRightOffset = scDragMgr.coordinates.bottomRightOffset(group.element)
}

_scDragMgrDragEvent.prototype = {
	toString : function() {
		return "mouse: " + this.mousePosition + this.mouseOffset + "    " +
				"xmouse: " + this.transformedMouseOffset + "    " +
				"left,top: " + this.topLeftPosition + this.topLeftOffset
	}
}

scDragMgr.drag._constraintFactory = {
	vertical : function() {
		return function(coordinate, dragEvent) {
			var x = dragEvent.topLeftOffset.x
			return coordinate.x != x
					? coordinate.factory.create(x, coordinate.y) 
					: coordinate
		}
	},

	horizontal : function() {
		return function(coordinate, dragEvent) {
			var y = dragEvent.topLeftOffset.y
			return coordinate.y != y
					? coordinate.factory.create(coordinate.x, y) 
					: coordinate
		}
	}
}


scDragMgr.dragdrop = {
	

	fFirstCatchments : new Array(),
	fLastCatchments : new Array(),



	makeContainer : function (pKey, pCatchment, pContainer, pIfEmpty) {
		try {
			var vKey = (typeof pKey != "undefined") ? pKey : 'defaultKey' 
			vKey = (vKey.length == 0) ? 'defaultKey' : vKey
			if (typeof pCatchment.fKey != "undefined") {
				scDragMgr.utilities.logError("dragdrop.makeContainer: "+pCatchment.id+" is already init.")
				return
			}

			pCatchment.fKey = vKey
			pCatchment.fResizeOnDragOut = false
			pCatchment.onDragOver = new Function() // public dragover  event (for styles etc)
			pCatchment.onDragOut = new Function() //public dragout event (for styles etc)
			pCatchment.xUpdateGui = this._UpdateGui  
			pCatchment.xIsDropable = this._IsDropable
			pCatchment.xOnDragOver = this._onDragOver
			pCatchment.xOnDragOut = this._onDragOut
			

			if (typeof this.fFirstCatchments[pCatchment.fKey] == "undefined") {
				this.fFirstCatchments[pCatchment.fKey] = this.fLastCatchments[pCatchment.fKey] = pCatchment
				pCatchment.fPreviousCatchment = null
				pCatchment.fNextCatchment = null
			} else {
				pCatchment.fPreviousCatchment = this.fLastCatchments[pCatchment.fKey]
				pCatchment.fNextCatchment = null
				this.fLastCatchments[pCatchment.fKey].fNextCatchment = pCatchment
				this.fLastCatchments[pCatchment.fKey] = pCatchment
			}

			if  (typeof pContainer != "undefined") {
				pContainer.fDelaultDisplay = scDragMgr.css.readStyle(pContainer, "display")
				pContainer.fCatchment = pCatchment
				pCatchment.fContainer = pContainer
				this.setMode(pContainer, "ordered", -1)
				this.setDragOverClass(pContainer, "")
			}

			if  (typeof pIfEmpty != "undefined") {
				pIfEmpty.fDelaultDisplay = scDragMgr.css.readStyle(pIfEmpty, "display")
				pCatchment.fIfEmpty = pIfEmpty
			}
			pCatchment.fIsEmpty = pCatchment.xUpdateGui()
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.makeContainer: ", vError)
		}
	},


	setMode : function(pContainer, pMode, pMax) {
		try {
			if  (typeof pContainer.fCatchment != "undefined") {
				var vCatchment = pContainer.fCatchment
				vCatchment.fDropMode = pMode
				vCatchment.fMaxLabels = pMax
				switch(vCatchment.fDropMode){
					case "ordered":
						vCatchment.xOnDragPostProcess = this._onDragSort
						vCatchment.xOnDragEndPostProcess = this._onDropReposition
						break
					case "append":
						vCatchment.xOnDragPostProcess = new Function()
						vCatchment.xOnDragEndPostProcess = this._onDropReposition
						break
					case "inBulk":
						vCatchment.xOnDragPostProcess = new Function()
						vCatchment.xOnDragEndPostProcess = new Function()
				}
			}
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.setMode: ", vError)
		}
	},


	setResizeOnDragOut : function(pContainer, pMode) {
		try {
			pContainer.fCatchment.fResizeOnDragOut = pMode
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.setResizeOnDragOut: ", vError)
		}
	},


	setDragOverClass : function(pContainer, pClass) {
		if (pClass) pContainer.fCatchment.fDragOverClass = pClass
		else pContainer.fCatchment.fDragOverClass = ""
	},


	getContainers : function(pKey, pRootNode) {
		try {
			var vContainers = new Array()
			var vCatchment = scDragMgr.dragdrop.fFirstCatchments[pKey]
			while (vCatchment != null) {
				if (scDragMgr.helpers.isEltContainedByNode(vCatchment, pRootNode)) vContainers.push(vCatchment.fContainer)
				vCatchment = vCatchment.fNextCatchment
			}
			return (vContainers)
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.getContainers: ", vError)
		}
	},


	getLabels : function(pContainer) {
		try {
			var vLabels = new Array()
			if  (typeof pContainer != "undefined") {
				var vChild = pContainer.firstChild
				while (vChild != null) {
					if  (vChild.fIsDraggable) vLabels.push(vChild)
					vChild = vChild.nextSibling
				}
			}
			return (vLabels)
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.getLabels: ", vError)
		}
	},
	

	countLabels : function(pContainer) {
		try {
			var vCount = 0
			if  (typeof pContainer != "undefined") {
				var vChild = pContainer.firstChild
				while (vChild != null) {
					if  (vChild.fIsDraggable) vCount++
					vChild = vChild.nextSibling
				}
			}
			return (vCount)
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.countLabels: ", vError)
		}
	},



	repopulateContainers : function (pKey) {
		try {
			var vCatchment = scDragMgr.dragdrop.fFirstCatchments[pKey]
			while (vCatchment != null) {
				this._emptyLabels(vCatchment.fContainer)
				vCatchment = vCatchment.fNextCatchment
			}
			vCatchment = scDragMgr.dragdrop.fFirstCatchments[pKey]
			while (vCatchment != null) {
				this._populate(vCatchment.fContainer)
				vCatchment = vCatchment.fNextCatchment
			}
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.repopulateContainers: ", vError)
		}
	},
	

	makeDraggableLabel : function(pKey, pLabel, pHandle) {
		try {
			var vKey = (typeof pKey != "undefined") ? pKey : 'defaultKey' 
			vKey = (vKey.length == 0) ? 'defaultKey' : vKey
			if (typeof pLabel.fKey != "undefined") {
				scDragMgr.utilities.logError("dragdrop.makeDraggableLabel: "+pLabel.id+" is already init.")
				return
			}
			pLabel.fIsDraggable = true

			if (pLabel.parentNode.fCatchment && pLabel.parentNode.fCatchment.xUpdateGui) {
				pLabel.parentNode.fCatchment.xUpdateGui()
			}
			pHandle = pHandle ? pHandle : pLabel
			var vGroup = scDragMgr.drag.createGroup(pLabel)
			vGroup.setHandle(pHandle)
			vGroup.transparentDrag()
			vGroup.setThreshold(4)
			vGroup.onTopWhileDragging()
			vGroup.register('dragstart', this._onDragStart)
			vGroup.register('dragmove', this._onDragMove)
			vGroup.register('dragend', this._onDragEnd)
			pLabel.fStartParent = null
			pLabel.fLastParent = null
			pLabel.fKey = vKey
			pLabel.fGroup = vGroup
			pLabel.xDropCallback = new Function()
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.makeDraggableLabel: ", vError)
		}
	},
	

	setConstraintBox : function(pLabel, pNode) {
		try {
			var vCoords = scDragMgr.coordinates
			var vMaxTopLeft = vCoords.topLeftOffset(pNode)
			var vMaxBottomRight = vCoords.bottomRightOffset(pNode).minus(vCoords._size(pLabel))
			pLabel.fGroup.addTransform(function(pCoordinate, pDragEvent) {
				return pCoordinate.constrainTo(vMaxTopLeft, vMaxBottomRight)
			})
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.setConstraintBox: ", vError)
		}
	},
	

	setCallback : function(pLabel, pfunction) {
		try {
			pLabel.xDropCallback = pfunction
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.setCallback: ", vError)
		}
	},


	setDraggable : function (pLabel, pIsDraggable) {
		try {
			pLabel.fGroup.setDraggable(pIsDraggable)
			var vStyle = pLabel.style
			if(vStyle["position"]) vStyle["position"] = (pIsDraggable ? pLabel.fStylePosDrag : (pLabel.fStylePosBase ? pLabel.fStylePosBase : 'static'))
		} catch (vError) {
			scDragMgr.utilities.c("dragdrop.setDraggable: ", vError)
		}
	},


	setDragClass : function(pLabel, pClass) {
		if (pClass) pLabel.fDragClass = pClass
		else pLabel.fDragClass = ""
	},


	saveLabelPos : function (pLabel) {
		try {
			var vPos = scDragMgr.coordinates.topLeftOffset(pLabel)
			var vRetVal = 'x:'+vPos.x
			vRetVal += ',y:'+vPos.y
			return vRetVal
		} catch (vError) {
			scDragMgr.utilities.logError("dragdrop.saveLabelPos: ", vError)
		}
	},



	_emptyLabels : function(pContainer) {
		if  (typeof pContainer != "undefined") {
			var vChild = pContainer.firstChild
			while (vChild != null) {
				if  (vChild.fIsDraggable) {
					var vNextChild = vChild.nextSibling
					pContainer.removeChild(vChild)
					vChild = vNextChild
				} else vChild = vChild.nextSibling
			}
		}
	},

	_populate : function(pContainer) {
		if  (typeof pContainer != "undefined" && pContainer.labelsToAdd) {
			for (var i = 0, n = pContainer.labelsToAdd.length; i < n; i++) {
				if (pContainer.labelsToAdd[i] && pContainer.labelsToAdd[i].label) {
					var vLabel = pContainer.labelsToAdd[i].label
					pContainer.appendChild(vLabel)
					if (pContainer.fCatchment.fDropMode == 'inBulk') {

						scDragMgr.coordinates.create(0, 0).reposition(vLabel)
					} else scDragMgr.coordinates.create(0, 0).reposition(vLabel)
				}
			}
			pContainer.fCatchment.xUpdateGui()
			pContainer.labelsToAdd = null
		}
	},
	

	_UpdateGui : function() {
		var vHasItems = false
		if  (typeof this.fContainer != "undefined") {
			var vChild = this.fContainer.lastChild
			while (vChild != null && !vHasItems) {
				if  (vChild.fIsDraggable) {
					vHasItems = true
				}
				vChild = vChild.previousSibling
			}
			if  (typeof this.fIfEmpty != "undefined") {
				if  (typeof this.fContainer != "undefined" && this.fContainer != this) this.fContainer.style["display"] = (!vHasItems ? "none" : this.fContainer.fDelaultDisplay)
				this.fIfEmpty.style["display"] = (vHasItems ? "none" : this.fIfEmpty.fDelaultDisplay)
			}
		}

		var vCatchment = scDragMgr.dragdrop.fFirstCatchments[this.fKey]
		while (vCatchment != null) {
			vCatchment.topLeftPosition = scDragMgr.coordinates.topLeftOffset(vCatchment)
			vCatchment.bottomRightPosition = scDragMgr.coordinates.bottomRightOffset(vCatchment)
			vCatchment = vCatchment.fNextCatchment
		}
		return vHasItems
	},


	_IsDropable : function(pDragEvent) {
		return( this.fMaxLabels == -1 || scDragMgr.dragdrop.countLabels(this.fContainer) < this.fMaxLabels || pDragEvent.group.element.parentNode.fCatchment == this )
	},
	_onDragOver : function(pDragEvent) {
		var vGroup = pDragEvent.group
		var vItem = pDragEvent.group.element
		var vCurrentCatchment = vItem.parentNode.fCatchment
		
		vCurrentCatchment.onDragOut()
		scDragMgr.helpers.delClass(vCurrentCatchment, vCurrentCatchment.fDragOverClass)
		vCurrentCatchment.fContainer.removeChild(vItem)
		vCurrentCatchment.xUpdateGui()
		this.fContainer.appendChild(vItem)
		vItem.fLastContainer = this.fContainer
		this.xUpdateGui()
		this.onDragOver()
		scDragMgr.helpers.addClass(this, this.fDragOverClass)
	},
	_onDragOut : function(pDragEvent) {
		var vItem = pDragEvent.group.element
		var vCurrentContainer = vItem.parentNode
		var vCurrentCatchment = vCurrentContainer.fCatchment
		
		vCurrentCatchment.onDragOut()
		scDragMgr.helpers.delClass(vCurrentCatchment, vCurrentCatchment.fDragOverClass)
		vItem.fLastContainer = null
		
		if (! vCurrentCatchment.fResizeOnDragOut){

			if (scCoLib.isIE){

				vCurrentCatchment.style.height = (vCurrentCatchment.offsetHeight - scCoLib.toInt(vCurrentCatchment.currentStyle.borderTopWidth) - scCoLib.toInt(vCurrentCatchment.currentStyle.borderBottomWidth))+"px"
				vCurrentCatchment.style.width = (vCurrentCatchment.offsetWidth - scCoLib.toInt(vCurrentCatchment.currentStyle.borderLeftWidth) - scCoLib.toInt(vCurrentCatchment.currentStyle.borderRightWidth))+"px"
			} else {
				vCurrentCatchment.style.height = (vCurrentCatchment.clientHeight!=""?vCurrentCatchment.clientHeight+"px":"")
				vCurrentCatchment.style.width = (vCurrentCatchment.clientWidth!=""?vCurrentCatchment.clientWidth+"px":"")
			}
		}
		
		if (vCurrentContainer != vItem.fStartContainer) {
			vCurrentCatchment.fContainer.removeChild(vItem)
			vCurrentCatchment.xUpdateGui()
			
			if (vItem.fStartPrevSibling) vItem.fStartContainer.insertBefore(vItem, vItem.fStartPrevSibling ? scDragMgr.helpers.nextItem(vItem.fStartPrevSibling, vItem.fStartPrevSibling.nodeName) : null)
			else if (vItem.fStartNextSibling) vItem.fStartContainer.insertBefore(vItem, vItem.fStartNextSibling)
			else vItem.fStartContainer.appendChild(vItem)
		} else {
			if (vItem.fStartPrevSibling) scDragMgr.helpers.moveAfter(vItem, vItem.fStartPrevSibling)
			else if (vItem.fStartNextSibling) scDragMgr.helpers.moveBefore(vItem, vItem.fStartNextSibling)
		}
		vItem.fStartContainer.fCatchment.xUpdateGui()
	},
	_onDropReposition : function(pDragEvent) {
		var vItem = pDragEvent.group.element
		scDragMgr.coordinates.create(0, 0).reposition(vItem)
	},

	_onDragSort : function(pDragEvent) {
		var vHelpers = scDragMgr.helpers
		var vItem = pDragEvent.group.element
		var vMoveTo = null
		var vCoordinates = scDragMgr.coordinates
		var vXmouse = pDragEvent.transformedMouseOffset
		var vPrevious = vHelpers.previousItem(vItem, vItem.nodeName)
		while (vPrevious != null) {
			var vThreshold = vCoordinates.bottomRightOffset(vPrevious)

			if (vXmouse.y <= vThreshold.y && vXmouse.x <= vThreshold.x) {
				vMoveTo = vPrevious
			}
			vPrevious = vHelpers.previousItem(vPrevious, vItem.nodeName)
		}
		if (vMoveTo != null) {
			vHelpers.moveBefore(vItem, vMoveTo)
			vItem.fForceDropCallback = true
			return
		}
		var vNext = vHelpers.nextItem(vItem, vItem.nodeName)
		while (vNext != null) {

			var vThreshold = vCoordinates.topLeftOffset(vNext)
			if (vThreshold.y <= vXmouse.y && vThreshold.x <= vXmouse.x) {
				vMoveTo = vNext
			}
			vNext = vHelpers.nextItem(vNext, vItem.nodeName)
		}
		if (vMoveTo != null) {
			vHelpers.moveBefore(vItem, vHelpers.nextItem(vMoveTo, vItem.nodeName))
			vItem.fForceDropCallback = true
			return
		}
	},


	_onDragStart : function(pDragEvent) {
		var vCoordinates = scDragMgr.coordinates
		var vItem = pDragEvent.group.element
		
		var vCatchment = scDragMgr.dragdrop.fFirstCatchments[vItem.fKey]
		while (vCatchment != null) {
			vCatchment.topLeftPosition = vCoordinates.topLeftOffset(vCatchment)
			vCatchment.bottomRightPosition = vCoordinates.bottomRightOffset(vCatchment)
			vCatchment = vCatchment.fNextCatchment
		}
		vItem.fStartContainer = vItem.parentNode
		vItem.fStartPrevSibling = scDragMgr.helpers.previousItem(vItem, vItem.nodeName)
		vItem.fStartNextSibling = scDragMgr.helpers.nextItem(vItem, vItem.nodeName)
		vItem.fLastContainer = vItem.fStartContainer
		scDragMgr.helpers.addClass(vItem, vItem.fDragClass)
		vItem.parentNode.fCatchment.onDragOver()
		

		if (scTooltipMgr) scTooltipMgr.hideTooltip(true)

		scDragMgr.helpers.addClass(vItem.parentNode.fCatchment, vItem.parentNode.fCatchment.fDragOverClass)
	},
	_onDragMove : function(pDragEvent) {
		var vHelpers = scDragMgr.helpers
		var vGroup = pDragEvent.group
		var vItem = vGroup.element


		var vIsOutside = true
		var vCatchment = scDragMgr.dragdrop.fFirstCatchments[vItem.fKey]
		while (vCatchment != null) {
			if (vHelpers.isMouseInside(pDragEvent, vCatchment) && vCatchment.xIsDropable(pDragEvent)) {
				vIsOutside = false
				break
			}
			vCatchment = vCatchment.fNextCatchment
		}

		if (vIsOutside) {
			if (vItem.fLastContainer != null) {
				vItem.fLastContainer.fCatchment.xOnDragOut(pDragEvent)
			}


		} else if (vCatchment && (vItem.fLastContainer == null || vCatchment != vItem.fLastContainer.fCatchment)) {
			vCatchment.xOnDragOver(pDragEvent)
		}
		if (vCatchment) vCatchment.xOnDragPostProcess(pDragEvent, vCatchment)
	},
	_onDragEnd : function(pDragEvent) {
		var vItem = pDragEvent.group.element
		
		scDragMgr.helpers.delClass(vItem, vItem.fDragClass)
		vItem.parentNode.fCatchment.onDragOut()
		scDragMgr.helpers.delClass(vItem.parentNode.fCatchment, vItem.parentNode.fCatchment.fDragOverClass)

		var vCatchment = scDragMgr.dragdrop.fFirstCatchments[vItem.fKey]
		if (! vCatchment.fResizeOnDragOut){

			while (vCatchment != null) {
				vCatchment.style.height=""
				vCatchment.style.width=""
				vCatchment = vCatchment.fNextCatchment
			}
		}
		
		if (vItem.fForceDropCallback || vItem.fStartContainer != vItem.parentNode) {
			try{
				vItem.xDropCallback()
			} catch (vError){
				scDragMgr.utilities.logError("dragdrop._onDragEnd: ", vError)
			}
		}
		vItem.parentNode.fCatchment.xOnDragEndPostProcess(pDragEvent)
	}
}
