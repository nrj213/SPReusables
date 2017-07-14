var ribbonHeight = 65;
function toggleRibbon() {
	var height = $("#rbn-toggle").hasClass("rbn-show") ? 0 : ribbonHeight;
	$("#suiteBar").toggle();
	$("#s4-ribbonrow").toggle();
	$("#RibbonContainer").toggle();
	$("#rbn-toggle").toggleClass("rbn-show");
	$("#rbn-toggle").toggleClass("rbn-hide");
	$("#rbn-toggle").toggleClass("ribbon");
	$(".main-nav").toggleClass("ribbon")
	$("#s4-workspace").height($(window).height() - height);
}

