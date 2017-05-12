//plotData  which holds marker locations should load first, so we can grab/use that data and filter with slider

//---------------------AUTO ESTABLISH IMAGE SIZE--------------------------------

var width = document.getElementById('map').attributes[0].ownerElement.clientWidth;
var height = document.getElementById('map').attributes[0].ownerElement.clientHeight;

//current image dimension = height="957.5" width="1800"

var rescale = width/1800;
// we'll use this to multiply times the original x,y,width and height dimensions.

//-------------------------ADD IN INITIAL MAP/IMAGE (not projected)---------------------------------------
document.body.onload = addMap;


function addMap () {

	//making sure the map is correctly scaled
  var svg = document.getElementById('mapSvg');
  	svg.setAttribute('width', rescale*1800);
  	svg.setAttribute('height', rescale*957.5);

  var image = document.getElementById('backgroundImage');
  	image.setAttribute('width', rescale*1800);
  	image.setAttribute('height', rescale*957.5);

  filterByDate(); //call on filter/data to load rectangles

}

//-------------------------ADD DATA/PLOTS by date---------------------------------------

function filterByDate(filterDate = document.getElementById('rangeVal').attributes.value.value) { //filters by slider date

	var svg = document.getElementById('mapSvg');
	var image = document.getElementById('backgroundImage');
	var pretooltip = document.getElementById('pretooltip');
	var tooltip = document.getElementById('tooltip');

	while (svg.lastChild !==image && svg.lastChild !==pretooltip && svg.lastChild !==tooltip) { //removes old rectangles
  svg.removeChild(svg.lastChild);
	}

	let pastPlots = plotData.filter(plot=>{
		return plot.year<filterDate;
	})

	pastPlots.forEach(plot=>{

		var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	  	rect.setAttribute('width', rescale*plot.width);
	  	rect.setAttribute('height', rescale*plot.height);
	  	rect.setAttribute('x', rescale*plot.x);
	  	rect.setAttribute('y', rescale*plot.y);
	  	rect.setAttribute('class', plot.class);
	  	rect.setAttribute('id', plot.id);
	  	rect.setAttribute('label', plot.type+' plot: '+plot.id+', row: '+plot.row+', year: '+plot.year+', condition: '+plot.condition);
	  	rect.setAttribute('onmouseover', "ShowTooltip(evt)" );
	  	rect.setAttribute('onmouseout', "HideTooltip(evt)" );

	  svg.append(rect);


	})


}


function ShowTooltip(evt){
	var curr=evt.target.attributes.label.value;
	var tooltip = document.getElementById('tooltip');
  tooltip.firstChild.data = curr;

}

function HideTooltip(evt){
	var tooltip = document.getElementById('tooltip');
  tooltip.firstChild.data = '';

}



