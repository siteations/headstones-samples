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

	var svg = d3.select('#mapSvg');

	let pastPlots = plotData.filter(plot=>{
		return plot.year<filterDate;
	})

	let plots = svg.selectAll('rect').remove();

		plots== svg.selectAll('rect')
		.data(pastPlots)
		.enter()
		.append('rect')
    .attr('width', (d)=>rescale*d.width)
    .attr('height', (d)=>rescale*d.height)
    .attr('x', (d)=>rescale*d.x)
	  	.attr('y', (d)=>rescale*d.y)
	  	.attr('class', (d)=>d.class)
	  	.attr('id', (d)=>d.id)
	  	.attr('label', (d)=> d.type+' plot: '+d.id+', row: '+d.row+', year: '+d.year+', condition: '+d.condition)
	  	.attr('onmouseover', "ShowTooltip(evt)" )
	  	.attr('onmouseout', "HideTooltip(evt)" );
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



