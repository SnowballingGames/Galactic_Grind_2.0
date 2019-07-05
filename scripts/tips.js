var tip_queue = [];
var pips = [];
var tips = [];
var queue_timer = -90;

function Tip(text, trigger) {
    this.text = text;
    this.trigger = trigger;
    this.shown = false;
    
    this.test = function () {
        if (this.trigger && !this.shown) {
            tip_queue.push(this);
            this.shown = true;
        }
    }
}
function tipTick(dt) {
    queue_timer += dt;
    
    if (queue_timer >= 30) {
        queue_timer = 0;
        
        if (tip_queue[0]) {
            HTMLTip(tip_queue[0]);
            tip_queue.splice(0, 1);
        }
        
        var len = tips.length;
        for (var i = 0; i < tips.length; i++) {
            tips[i].test();
        }
    }
}
function HTMLTip(tip) {
    var text = tip.text;
    
    $("#tip_container").fadeIn();
    $("#tip_content").html(text);
}
function initTips() {
    var tip_buy_buildings = new Tip("Quick Tip: you can buy multiples of each building by clicking on their background.", function () {return TIER_1_COUNT - TIER_ONE_COUNT == 0;});
    
    tips.push(tip_buy_buildings);
}

function createPip(element, group) {
    var pip = new Pip(element, group);
    
    pips.push(pip);
    
    updatePips();
}
function updatePips() {    
    var len = pips.length;
    for (var i = 0; i < len; i++) {
		HTMLPip(pips[i].element, pips[i]);
    }
}
function Pip(element, group) {
    this.element = element;
    this.hover = true;
    this.group = group || null;
}
function HTMLPip(element_id, pip) {
    var element = $(element_id);
    if (!element.length) {return;}
    var pip = $(document.createElement('img'));
    
    var ele_top = element.position().top;
    var ele_left = element.position().left;
        
    var pip_top = ele_top - 16;
    var pip_left = ele_left + element.width();
    
    pip.attr("src", "images/exclimation_pip.png").attr("class", "pip").attr("id", "pip_"+element.attr("id"));
    pip.attr("style", "position:absolute;top:"+pip_top+"px;left:"+pip_left+"px;z-index:120980109");
    
    if (pip.hover) {
        element.on("mouseenter", function () {
            element.off("mouseenter");
            $("#pip_"+element.attr("id")).fadeOut().remove();
            pips.splice(pips.indexOf(pip), 1);
        })
    }
    
   element.parent().append(pip);
}

/*
function HTMLPip(element_id, pip) {	
	var element = $(element_id);
	if (!element.length) {return;};
	if (!element.is("img")) {
		return HTMLPipNormal(element_id, pip);
	}
	if (element.hasClass("unlocked")) {return;};

	element.addClass("unlocked");
    if (pip.hover) {
        element.on("mouseenter", function () {
            element.off("mouseenter");
            $("#pip_"+element.attr("id")).fadeOut().remove();
            pips.splice(pips.indexOf(pip), 1);
		});
	}
	$(element_id).after('<img src="images/exclimation_pip.png" class="img_pip" id="pip_'+element.attr("id")+'"/>');
}
*/
//Lambda Expression