function chicklet(aCell) {
	this.cell = aCell;
	this.identifier = "";
	this.neighbors = [];	
	
	this.findID = function(aCell) {
		
		for (var i=1; i<=gb.numBoxes(); i++) {
			if (aCell === document.getElementById("box"+i)) {
				return("box"+i); 				
			}
		}
		return "box unknown";

	};
	this.showNeighbors = function() {
		console.log(this.identifier);
		for (var i=0; i<this.neighbors.length; i++) {

			console.log(" " + this.neighbors[i]);
		}
	};
}

function gameBoard() {
	
	this.chickletList = [];
	this.numBoxes = function() {
		return 9;
	};
	
	this.setupRow = function(rowName) {
		var elems = document.getElementsByClassName(rowName);
		var re = /row(\d)/;
		var baseIndex = Number(rowName.match(re)[1]);
		baseIndex -= 1;
		baseIndex *= 3;
		
		for (var i=1; i<elems.length; i++) {
			var elem = new chicklet(elems[i]);
			elem.identifier = elem.findID(elems[i]);
			this.chickletList.push(elem);
		}			
	};		
	this.setupCellLinks = function() {
		for (var i=0; i<this.chickletList.length; i++) {
			var elem = this.chickletList[i];
			//console.log("for elem: " + elem.identifier);
			//attach left neighbor
			if (i % 3 > 0) {
				//pushing the actual object does not work.  Can't retrive it
				//later.
				elem.neighbors.push(this.chickletList[i-1].identifier);
				//console.log(" pushing neighbor " + this.chickletList[i-1].identifier);
			}
			//attach right neighbor
			if ( (i+1) % 3 > 0) {
				elem.neighbors.push(this.chickletList[i+1].identifier);
				//console.log(" pushing neighbor " + this.chickletList[i+1].identifier);
			}	
			//attach top neighbor
			if (i-3 >=0) {
				elem.neighbors.push(this.chickletList[i-3].identifier);
				//console.log(" pushing neighbor " + this.chickletList[i-3].identifier);
			}
			//attach bottom neighbor
			if (i+3 < this.chickletList.length) {
				elem.neighbors.push(this.chickletList[i+3].identifier);
				//console.log(" pushing neighbor " + this.chickletList[i+3].identifier);
			}
			
			/*
			console.log("push verify: ");
			for (var j=0; j<elem.neighbors.length; j++) {
				console.log(" " + elem.neighbors[j]);
			}
			console.log("");
			*/
		}
	};
	this.showCell = function(cellNum) {
		this.chickletList[cellNum].showNeighbors();
	};
	
	this.swapValue = function(fromElem, toElem) {
		//console.log("swapValue ");
		//console.log(fromElem.innerHTML);
		//console.log(toElem.innerHTML);
		
		var tmp = toElem.innerHTML;
		toElem.innerHTML = fromElem.innerHTML;
		fromElem.innerHTML = tmp;
	};
	
	this.findElem = function(id) {
		var retVal = undefined;
				
		for (var i=0; i<this.chickletList.length; i++) {
			var elem = this.chickletList[i];
			if (id==elem.identifier) {
				retVal = elem;
				break;
			}
		}
		return retVal;
	};
	
	this.findEmptyBox = function() {
		var retVal = undefined;
		
		for (var i=0; i<this.chickletList.length; i++) {
			var id = this.chickletList[i].identifier;
			var elem = document.getElementById(id);
			if (elem.innerHTML=="") {
				retVal = id;
				break;		
			}
		}
		
		return retVal;
	};
	
	this.doSwap = function(chicklet) {
		var id = chicklet.getAttribute('id');
		var thisElem = this.findElem(id);
		
		if (thisElem == undefined) {
			console.log("undefined");
			return;
		}
		
		var list = thisElem.neighbors;
		for (var i=0; i<list.length; i++) {
			var elem = document.getElementById(list[i]);
			if (elem.innerHTML == "") {
				this.swapValue(chicklet, elem);
			}
		}		
		
		this.checkWinner();
		//console.log(elem.identifier);
		
	};
	
	this.shuffle = function(iter) {

		var emptyID = this.findEmptyBox();
		if (emptyID == undefined) {
			console.log("empty box not found");
			return;
		}

		var lastVisited = "";
		
		while (true) {
			//get neighbor list
			var list = this.findElem(emptyID).neighbors;
			var neigh = Math.floor(Math.random() * list.length);

			var toVisit = list[neigh];
			if (toVisit == lastVisited) {
				continue;
			}

			var toElem = document.getElementById(toVisit);
			var fromElem = document.getElementById(emptyID);
			this.swapValue(fromElem, toElem);
			
			lastVisited = emptyID;
			emptyID = toVisit;
			
			console.log("moving to " + toVisit);
			
			iter--;
			if (iter==0) {
				break;
			}		
		}
		
		this.checkWinner();
	};
	
	this.checkWinner = function() {
		console.log("checkWinner");
		var winner = true;
		
		//box 9 should have "" and is skipped
		for (var i=1; i<this.numBoxes(); i++) {
			var elem = document.getElementById("box"+i);
			if (elem.innerHTML !=i) {
				console.log("got " + elem.innerHTML + "expecting " + i);
				winner = false;
				break;
			}
		}
		
		var elem = document.getElementById("message");
		if (winner==true) {
			elem.innerHTML = "Winner!";
		} else {
			elem.innerHTML = "Arrange numbers in order.";			
		}
	};
}


(function() {


	
	console.log("running java script");
	document.getElementById('box1').onclick = function() {
		gb.doSwap(this);
		console.log("box1 clicked");
	};
	document.getElementById('box2').onclick = function() {
		//var element = document.getElementById("box2");
		//var value = Number(element.innerHTML);
		//value += 1;
		//element.innerHTML = value.toString();	
		
		gb.doSwap(this);	
		console.log("box2 clicked");
	};
	document.getElementById('box3').onclick = function() {
		
		gb.doSwap(this);
		console.log("box3 clicked");
	};
	document.getElementById('box4').onclick = function() {
		
		gb.doSwap(this);
		console.log("box4 clicked");
	};
	document.getElementById('box5').onclick = function() {
		
		gb.doSwap(this);
		console.log("box5 clicked");
	};
	document.getElementById('box6').onclick = function() {

		gb.doSwap(this);
		console.log("box6 clicked");
	};
	document.getElementById('box7').onclick = function() {
		gb.doSwap(this);
		console.log("box7 clicked");
	};
	document.getElementById('box8').onclick = function() {
		gb.doSwap(this);
		console.log("box8 clicked");
	};
	document.getElementById('box9').onclick = function() {
		gb.doSwap(this);
		console.log("box9 clicked");
	};
	document.getElementById('shuffle').onclick = function() {
		console.log("shuffle pressed");
		gb.shuffle(10);
	};

	//store this in document
	gb = new gameBoard();
	gb.setupRow("row1");
	gb.setupRow("row2");
	gb.setupRow("row3");
	gb.setupCellLinks();
	
	gb.shuffle(10);
	/*	
	gb.showCell(0);
	gb.showCell(1);
	gb.showCell(2);
	gb.showCell(3);
	gb.showCell(4);
	gb.showCell(5);
	gb.showCell(6);
	gb.showCell(7);
	gb.showCell(8);	
	*/

}) ();
