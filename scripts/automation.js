var automation = [];

function automationTick() {
	for (var i = 0; i < automation.length; i++) {
		if (automation[i].autobuy) {
			buildings[i].buy(1);
		}
		if (automation[i].automationTick) {
			automation[i].automationTick();
		}
	}
}

function Automation() {
	this.autobuy = false;
}

function initAutomation() {
	var cultist_automation = new Automation();
	
	cultist_automation.vars = {
		target_ritual: -1,
		target_cost: 0,
	}
	cultist_automation.createHTML = function () {
		var autoritual_div = $(document.createElement("div"));
			autoritual_div.attr("id", "autoritual_div");
			autoritual_div.attr("style", "font-size: 130%;");
			autoritual_div.html("<br>Automatic Rituals:");
		
        var ritual_rush = $(document.createElement("img"));
			ritual_rush.attr("src", "images/ritual_blood_rush.png").attr("width", "48").attr("id", "cultist_automation_0");
			ritual_rush.attr("class", "automatable");
			ritual_rush.attr("onclick", "automation[0].automate(0, 75, this);");        
			
		var ritual_time = $(document.createElement("img"));
			ritual_time.attr("src", "images/ritual_of_time.png").attr("width", "48").attr("id", "cultist_automation_1");
			ritual_time.attr("class", "automatable");
			ritual_time.attr("onclick", "automation[0].automate(1, 60, this);");		
			
		var ritual_purity = $(document.createElement("img"));
			ritual_purity.attr("src", "images/ritual_of_purity.png").attr("width", "48").attr("id", "cultist_automation_2");
			ritual_purity.attr("class", "automatable");
			ritual_purity.attr("onclick", "automation[0].automate(2, 110, this);");		
		
		var ritual_soot = $(document.createElement("img"));
			ritual_soot.attr("src", "images/ritual_of_soot.png").attr("width", "48").attr("id", "cultist_automation_3");
			ritual_soot.attr("class", "automatable");
			ritual_soot.attr("onclick", "automation[0].automate(3, 95, this);");		
			
		var ritual_karma = $(document.createElement("img"));
			ritual_karma.attr("src", "images/ritual_of_karma.png").attr("width", "48").attr("id", "cultist_automation_4");
			ritual_karma.attr("class", "automatable");
			ritual_karma.attr("onclick", "automation[0].automate(4, 75, this);");		
		
		var ritual_construction = $(document.createElement("img"));
			ritual_construction.attr("src", "images/ritual_of_construction.png").attr("width", "48").attr("id", "cultist_automation_5");
			ritual_construction.attr("class", "automatable");
			ritual_construction.attr("onclick", "automation[0].automate(5, 60, this);");
		
		$("#building_automation_background").append(autoritual_div);
		$("#building_automation_background").append(ritual_rush);
		$("#building_automation_background").append($(document.createTextNode(" ")));
		$("#building_automation_background").append(ritual_construction);
		$("#building_automation_background").append($(document.createTextNode(" ")));
		$("#building_automation_background").append(ritual_time);
		if (unlocks[1].unlocked) {
			$("#building_automation_background").append($(document.createTextNode(" ")));
			$("#building_automation_background").append(ritual_soot);
		}
		if (unlocks[2].unlocked) {
			$("#building_automation_background").append($(document.createTextNode(" ")));
			$("#building_automation_background").append(ritual_purity);
		}
		if (unlocks[3].unlocked) {
			$("#building_automation_background").append($(document.createTextNode(" ")));
			$("#building_automation_background").append(ritual_karma);
		}

		
		if (this.vars.target_ritual != -1) {
			$("#cultist_automation_" + this.vars.target_ritual).addClass("automated");
		}
	}
	cultist_automation.automate = function(ritual, cost, ele) {
		if (this.vars.target_ritual == ritual) {
			this.vars.target_ritual = -1;
			$(ele).removeClass("automated");
		} else {
			this.vars.target_ritual = ritual;
			this.vars.target_cost = cost;
			
			$('.automatable').each(function() {
				$(this).removeClass("automated");
			});
			
			$(ele).addClass("automated");
		}
	}
	cultist_automation.automationTick = function () {
		if (this.vars.target_ritual != -1) {
			performRitual(this.vars.target_ritual, this.vars.target_cost, true);
		}
	}
	
	var mine_automation = new Automation();
	
	mine_automation.vars = {};
	mine_automation.createHTML = function () {
		
	}
	

	var gambler_automation = new Automation();
	
	gambler_automation.vars = {
		auto_draw: false,
	}
	gambler_automation.createHTML = function () {
		var autodraw_div = $(document.createElement("div"));
			autodraw_div.attr("id", "autodraw_div");
			autodraw_div.attr("style", "font-size: 130%;");
			autodraw_div.html("<br>Autodraw:");
			
		var autodraw_button = $(document.createElement("div"));
			autodraw_button.attr("onclick", "automation[2].automate()");
			autodraw_button.attr("id", "autodraw_button");
			if (this.vars.auto_draw) {
				autodraw_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
				autodraw_button.html("ON");
			} else {
				autodraw_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
				autodraw_button.html("OFF");
			}
			
		$("#building_automation_background").append(autodraw_div);
		$("#building_automation_background").append(autodraw_button);
	}
	gambler_automation.automate = function () {
		this.vars.auto_draw = !this.vars.auto_draw;
		
		var autodraw_button = $("#autodraw_button");
		if (this.vars.auto_draw) {
			autodraw_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
			autodraw_button.html("ON");
		} else {
			autodraw_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
			autodraw_button.html("OFF");
		}
	}
	gambler_automation.automationTick = function () {
		if (this.vars.auto_draw) {
			drawCard(true);
		}
	}

	var power_automation = new Automation();
	power_automation.vars = {};
	power_automation.createHTML = function () {
		
	}	
	
	var bank_automation = new Automation();
	
	bank_automation.vars = {
		auto_invest: false,
		auto_cash_to_gold: false,
		auto_gold_to_cash: false,
	}
	bank_automation.createHTML = function () {
		var autoinvest_div = $(document.createElement("div"));
			autoinvest_div.attr("id", "autoinvest_div");
			autoinvest_div.attr("style", "font-size: 130%;");
			autoinvest_div.html("<br>Autoinvest:");
			
		var autoinvest_button = $(document.createElement("div"));
			autoinvest_button.attr("onclick", "automation[4].automate(0)");
			autoinvest_button.attr("id", "autoinvest_button");
			if (this.vars.auto_invest) {
				autoinvest_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
				autoinvest_button.html("ON");
			} else {
				autoinvest_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
				autoinvest_button.html("OFF");
			}	
	
		if (buildings[1].count >= 1) {
			var autocash_div = $(document.createElement("div"));
				autocash_div.attr("id", "autocash_div");
				autocash_div.attr("style", "font-size: 130%;");
				autocash_div.html("<br>Auto-Cash-To-Gold:");
			
			var autocash_button = $(document.createElement("div"));
				autocash_button.attr("onclick", "automation[4].automate(1)");
				autocash_button.attr("id", "autocash_button");
				if (this.vars.auto_cash_to_gold) {
					autocash_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
					autocash_button.html("ON");
				} else {
					autocash_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
					autocash_button.html("OFF");
				}		
			
			var autogold_div = $(document.createElement("div"));
				autogold_div.attr("id", "autogold_div");
				autogold_div.attr("style", "font-size: 130%;");
				autogold_div.html("<br>Auto-Gold-To-Cash:");
			
			var autogold_button = $(document.createElement("div"));
				autogold_button.attr("onclick", "automation[4].automate(2)");
				autogold_button.attr("id", "autogold_button");
				if (this.vars.auto_gold_to_cash) {
					autogold_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
					autogold_button.html("ON");
				} else {
					autogold_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
					autogold_button.html("OFF");
				}
		}
			
		$("#building_automation_background").append(autoinvest_div);
		$("#building_automation_background").append(autoinvest_button);
		if (buildings[1].count >= 1) {
			$("#building_automation_background").append(autocash_div);
			$("#building_automation_background").append(autocash_button);
			$("#building_automation_background").append(autogold_div);
			$("#building_automation_background").append(autogold_button);
		}
	}
	bank_automation.automate = function (switcher) {
		if (switcher == 0) this.vars.auto_invest = !this.vars.auto_invest;
		else if (switcher == 1) this.vars.auto_cash_to_gold = !this.vars.auto_cash_to_gold;
		else if (switcher == 2) this.vars.auto_gold_to_cash = !this.vars.auto_gold_to_cash;
		
		var autoinvest_button = $("#autoinvest_button");
		if (this.vars.auto_invest) {
			autoinvest_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
			autoinvest_button.html("ON");
		} else {
			autoinvest_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
			autoinvest_button.html("OFF");
		}		
		
		if (buildings[1].count >= 1) {
			var autocash_button = $("#autocash_button");
			if (this.vars.auto_cash_to_gold) {
				autocash_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
				autocash_button.html("ON");
			} else {
				autocash_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
				autocash_button.html("OFF");
			}		
			
			var autogold_button = $("#autogold_button");
			if (this.vars.auto_gold_to_cash) {
				autogold_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
				autogold_button.html("ON");
			} else {
				autogold_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
				autogold_button.html("OFF");
			}
		}
	}
	bank_automation.automationTick = function () {
		if (this.vars.auto_invest) {
			invest(true);
		}
		if (this.vars.auto_cash_to_gold) {
			cashToGold(true);
		}		
		if (this.vars.auto_gold_to_cash) {
			goldToCash(true);
		}
	}
	
	var research_automation = new Automation();
	research_automation.vars = {};
	research_automation.createHTML = function () {
		
	}
	
	var factory_automation = new Automation();
	factory_automation.vars = {};
	factory_automation.createHTML = function () {
		
	}	
	
	var bonus_automation = new Automation();
	bonus_automation.vars = {};
	bonus_automation.createHTML = function () {
		
	}
	
	var click_automation = new Automation();
	click_automation.vars = {
		auto_path: false,
	};
	click_automation.createHTML = function () {
		var autopath_div = $(document.createElement("div"));
			autopath_div.attr("id", "autopath_div");
			autopath_div.attr("style", "font-size: 130%;");
			autopath_div.html("<br>Autopath:");
			
		var autopath_button = $(document.createElement("div"));
			autopath_button.attr("onclick", "automation[8].automate()");
			autopath_button.attr("id", "autopath_button");
			if (this.vars.auto_path) {
				autopath_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
				autopath_button.html("ON");
			} else {
				autopath_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
				autopath_button.html("OFF");
			}
			
		$("#building_automation_background").append(autopath_div);
		$("#building_automation_background").append(autopath_button);
	}
	click_automation.automate = function () {
		this.vars.auto_path = !this.vars.auto_path;
		
		var autopath_button = $("#autopath_button");
		if (this.vars.auto_path) {
			autopath_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#00b81c, #018f17); margin: 8px; cursor: pointer");
			autopath_button.html("ON");
		} else {
			autopath_button.attr("style", "font-size: 20px; font-weight: 900; color: black; background-color: #018f17; border: 3px solid black; border-radius: 4px; padding:5px; background-image: linear-gradient(#8f0101, #c40000); margin: 8px; cursor: pointer");
			autopath_button.html("OFF");
		}
	}
	click_automation.automationTick = function () {
		if (this.vars.auto_path) {
			runPath(true);
		}
	}
	
	var cryogenic_automation = new Automation();
	cryogenic_automation.vars = {};
	cryogenic_automation.createHTML = function () {
		
	}
	
	var alien_automation = new Automation();
	alien_automation.vars = {};
	alien_automation.createHTML = function () {
		
	}
	
	var computer_automation = new Automation();
	computer_automation.vars = {};
	computer_automation.createHTML = function () {
		
	}
	
	var accel_automation = new Automation();
	accel_automation.vars = {};
	accel_automation.createHTML = function () {
		
	}
	
	var flux_automation = new Automation();
	flux_automation.vars = {};
	flux_automation.createHTML = function () {
		
	}
	
	var clone_automation = new Automation();
	clone_automation.vars = {};
	clone_automation.createHTML = function () {
		
	}	
	
	var epiphany_automation = new Automation();
	epiphany_automation.vars = {};
	epiphany_automation.createHTML = function () {
		
	}
	
	var merchant_automation = new Automation();
	merchant_automation.vars = {};
	merchant_automation.createHTML = function () {
		
	}	
	
	var warp_automation = new Automation();
	warp_automation.vars = {};
	warp_automation.createHTML = function () {
		
	}	
	
	var stellar_automation = new Automation();
	stellar_automation.vars = {};
	stellar_automation.createHTML = function () {
		
	}	
	
	var temporal_automation = new Automation();
	temporal_automation.vars = {};
	temporal_automation.createHTML = function () {
		
	}
	
	automation.push(cultist_automation);
	automation.push(mine_automation);
	automation.push(gambler_automation);
	automation.push(power_automation);
	automation.push(bank_automation);
	automation.push(research_automation);
	automation.push(factory_automation);
	automation.push(bonus_automation);
	automation.push(click_automation);
	automation.push(cryogenic_automation);
	automation.push(alien_automation);
	automation.push(computer_automation);
	automation.push(accel_automation);
	automation.push(flux_automation);
	automation.push(clone_automation);
	automation.push(epiphany_automation);
	automation.push(merchant_automation);
	automation.push(warp_automation);
	automation.push(stellar_automation);
	automation.push(temporal_automation);
}