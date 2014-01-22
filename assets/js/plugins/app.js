//* ========================
//File: app.js
//Author: Raphael Oliveira
//======================== */
var APP = APP || {};

APP.footer = function () {
	var acFooter = "";
	acFooter += "<div class=\"acFooter\">";
	acFooter += "	<hr \/>";
	acFooter += "	<div>ACTalks - 'HTML5' with Raphael 'DDL' Oliveira<\/div>";
	acFooter += "<\/div>";
	acFooter += "<img src=\"https:\/\/s3.amazonaws.com\/media-p.slid.es\/uploads\/avenuecode\/images\/197088\/logo.png\" class=\"acFooter\" \/>";

	$( 'section:not(:has(section))' ).each( function ( index, el ) {
		$( this ).append( acFooter );
	} );

};

APP.prettify = function () {
	$( '.prettyprint:not(.noConvert) code' ).each( function ( index, el ) {
		$( this ).html( $( '<div />' ).text( $( this ).html() ).html() );
	} );
	prettyPrint();
};