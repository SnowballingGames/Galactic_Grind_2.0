function Research(name, description, tooltip, sx, sy, x, y, cost, max, effect, condition, previous_research) {
	this.name = name;
	this.description = description;
	this.tooltip = tooltip;
    this.sx = sx * 48;
    this.sy = sy * 48;
	this.x = x;
	this.y = y;
	this.cost = cost;
	this.max = max;
	this.effect = effect;
	this.condition = condition;
	this.previous_research = previous_research;
	this.bought = 0;
	this.researched = false;
	
	this.render = function (ctx) {
		ctx.drawImage(research_image, this.sx, this.sy, 48, 48, this.x - minigames[5].vars.research_camera.x, this.y - minigames[5].vars.research_camera.y, 48, 48);
	}
	this.renderUnknown = function (ctx) {
		ctx.drawImage(research_image, 48*4, 0, 48, 48, this.x - minigames[5].vars.research_camera.x, this.y - minigames[5].vars.research_camera.y, 48, 48);
	}
	this.drawLine = function (ctx) {
		if (this.previous_research != null) {
			var p_node = minigames[5].vars.research_tree[this.previous_research];
			var camera = minigames[5].vars.research_camera;
			
			var start_x = this.x + 24 - camera.x;
			var start_y = this.y + 24 - camera.y;
			var end_x = p_node.x + 24 - camera.x;
			var end_y = p_node.y + 24 - camera.y;
			
			ctx.beginPath();
			ctx.moveTo(start_x, start_y);
			ctx.lineTo(end_x, end_y);
			ctx.stroke();
		}
	}
	
}
function toggleResearchFullScreen() {
	if ($("#fullscreen_research").is(":hidden")) {
		$("#fullscreen_research").show();
		$("#close_fullscreen").show();
		$("#open_fullscreen").hide();
		minigames[5].vars.fullscreen = true;
		minigames[5].vars.research_ctx = document.getElementById("fullscreen_research").getContext("2d");
		minigames[5].vars.research_camera.x -= 225;
		minigames[5].vars.research_camera.y -= 135;
	} else {
		$("#fullscreen_research").hide();
		$("#close_fullscreen").hide();
		$("#open_fullscreen").show();
		minigames[5].vars.research_ctx = document.getElementById("research_canvas").getContext("2d");
		minigames[5].vars.fullscreen = false;
		minigames[5].vars.research_camera.x += 225;
		minigames[5].vars.research_camera.y += 135;
	}
}
function renderResearch() {
	research = minigames[5].vars.research_tree;
	camera = minigames[5].vars.research_camera;
	ctx = minigames[5].vars.research_ctx;
	fullscreen = minigames[5].vars.fullscreen;
	ctx.clearRect(0, 0, 300, 180);
	
	if (fullscreen) {
		ctx.fillStyle = "#e4e2c0";
		ctx.fillRect(0, 0, 750, 450);
	}
	
	ctx.lineWidth = 3;
	
	var len = research.length;
	for (var i = 1; i < len; i++) {
		if (!research[i].condition()) {continue}
		var previous = research[research[i].previous_research]
		if (previous.researched || (previous.previous_research != null && research[previous.previous_research].researched)) {
			research[i].drawLine(ctx);
		}
	}
	
	for (var i = 1; i < len; i++) {
		if (!research[i].condition()) {continue}
		var previous = research[research[i].previous_research]
		if (research[i].researched) {
			research[i].render(ctx);
		} else if (previous.researched) {
			research[i].render(ctx);
			drawCircle(research[i].x + 24, research[i].y + 24, 22);
		}	else if ((previous.previous_research != null && research[previous.previous_research].researched)) {
			research[i].renderUnknown(ctx);
			drawCircle(research[i].x + 24, research[i].y + 24, 22);
		}
		
	}
	research[0].render(ctx);
	if (!research[0].researched) {drawCircle(research[0].x + 24, research[0].y + 24, 22)}
}
function drawCircle(x, y, radius) {
	game_ctx = minigames[5].vars.research_ctx;
	
	var camera = minigames[5].vars.research_camera;
	game_ctx.beginPath();
    game_ctx.arc(x-camera.x, y-camera.y, radius, 0, 2 * Math.PI, false);
    game_ctx.fillStyle = "rgba(0,0,0,.4)";
    game_ctx.fill();
}
function researchMouseDetection(e) {
	research = minigames[5].vars.research_tree;
	camera = minigames[5].vars.research_camera;
	
	var ele;
	if ($("#fullscreen_research").is(":hidden")) {
		var ele = $("#research_canvas");
	} else {
		var ele = $("#fullscreen_research");
	}
	
	var x = Math.floor(e.pageX - ele.offset().left);
	var y = Math.floor(e.pageY - ele.offset().top);
	
	for (var i = 0; i < research.length; i++) {
		if (!research[i].condition()) {continue}
		node = research[i];
		if ((node.previous_research == null) || (research[node.previous_research].researched)) {
			if (x + camera.x > node.x && x + camera.x < node.x + 48 && y + camera.y > node.y && y + camera.y < node.y + 48) {
				researchTooltip(node);
			}
		}
	}
}
function researchClickDetection(e) {
	research = minigames[5].vars.research_tree;
	camera = minigames[5].vars.research_camera;
	
	var ele;
	if ($("#fullscreen_research").is(":hidden")) {
		var ele = $("#research_canvas");
	} else {
		var ele = $("#fullscreen_research");
	}
	
	var x = Math.floor(e.pageX - ele.offset().left);
	var y = Math.floor(e.pageY - ele.offset().top);
	
	for (var i = 0; i < research.length; i++) {
		if (!research[i].condition()) {continue}
		node = research[i];
		if ((node.previous_research == null) || (research[node.previous_research].researched)) {
			if (x + camera.x > node.x && x + camera.x < node.x + 48 && y + camera.y > node.y && y + camera.y < node.y + 48) {
				if (minigames[5].vars.research_points >= node.cost && node.bought < node.max) {
					node.bought ++;
					node.researched = true;
					
					minigames[5].vars.research_points -= node.cost;
					minigames[5].vars.researches_made += 1;
					
					buildings[5].stats["Researches Made"] = minigames[5].vars.researches_made;
					researchMouseDetection(e);
					
					updateBuildingEffects();
					
					var all_researched = true;
					for (var i = 0; i < research.length; i++) {
						if (!research[i].bought) {
							all_researched = false
						}
					}
					if (all_researched) {
						minigames[5].vars.mastery = true;
					}
				}
			}
		}
	}
}
function updateMinigames(dt) {
    if (SHOWN_TAB != -1) {minigames[SHOWN_TAB].updateHTML();}
    for (var i = 0; i < minigames.length; i++) {
		var temp_dt = dt;
        if (buildings[i].count >= 1) {
			if (minigames[10].vars.powered_buildings.includes(i)) {
				temp_dt *= 0.75;
			}			
			
			if (minigames[14].vars.clone_targets.includes(i)) {
				temp_dt *= 2;
			}
			
			if (alien_target == i) {
				temp_dt *= 1.25;
			}
			
			temp_dt *= 1 + assistants[2].level * 0.001
			
			if (minigames[3].vars.powered_buildings.includes(i)) {
				if (upgrades[47].bought) {minigames[i].update(temp_dt * 1.6)}
				else {minigames[i].update(temp_dt * 1.5)}
			} else {
				minigames[i].update(temp_dt)
			}
		};
    }
}
function updateBuildingExplanation(building_id) {
    var building = buildings[building_id];
	var red_multiplier;
	var green_percentage;
	// Factory Production
	if (building_id == 18) {
		red_multiplier = (minigames[18].vars.max_production / (building.production)).toFixed(2);
		green_percentage = (((minigames[18].vars.max_production * building.count) / PRODUCTION) * 100).toFixed(2);
	} else {
		red_multiplier = (PRODUCTION_MULTIPLIER * building.production_multiplier).toFixed(2);
		green_percentage = (((PRODUCTION_MULTIPLIER * building.production_multiplier * building.count * building.production) / PRODUCTION) * 100).toFixed(1);
	}
    
    $("#building_explanation").html(building.explanation + " You own <span style='color:#00a2bc;font-weight: 900;'>" + building.count + " " + building.tab_name + "s </span>that each produce <span style='color:#00a2bc;font-weight: 900;'>" + fancyNumber(building.production * building.production_multiplier) + " </span>credits every second, for a total of <span style='color:#00a2bc;font-weight: 900;'>" + fancyNumber(building.production * building.count * building.production_multiplier) + "</span> <span style='color:#ce1800;font-weight: 900;'>(x"+red_multiplier+")</span><span style='color:#3D9E00;font-weight: 900;'>("+green_percentage+"% of production)</span>.");
}
function updateBuildingHelp() {
    if (SHOWN_TAB != -1) {minigames[SHOWN_TAB].updateDetails();}
}
function stringUpgrade(upgrade, default_x, default_y) {
	if (upgrades[upgrade[0]].bought) {
		var r_upgrade = upgrades[upgrade[0]];
		var upgrade_tooltip_value = "";
		if (r_upgrade.evalTooltip()) {upgrade_tooltip_value = "<br/>(" +r_upgrade.evalTooltip() + ")"}
		
		var expanded_description = r_upgrade.description + upgrade_tooltip_value + "<br><span style = \\\"color:#00db0a;text-shadow:0px 0px 2px #52d56a;font-size:18px;\\\">Price: " + fancyNumber(r_upgrade.price) + "</span><br><span style = \\\"font-size:10px;float:right\\\";>"+r_upgrade.flavor_text+"<span>";
		var upgrade_string = "";
		upgrade_string += "<div style='float:left;height:48px;width:48px;background:url(images/upgrade_sheet.png) -"+r_upgrade.x+"px -"+r_upgrade.y+"px;' ";
		upgrade_string += "onmouseover='tooltip(this, -"+r_upgrade.x/48+", -"+r_upgrade.y/48+", \""+r_upgrade.display_name+"\", \""+expanded_description+"\")'";
		upgrade_string += "onmouseleave='hideTooltip()'";
		
		upgrade_string += "></div>";
		return upgrade_string;
	} else if (upgrades[upgrade[0]].available) {
		var r_upgrade = upgrades[upgrade[0]];
		var upgrade_tooltip_value = "";
		if (r_upgrade.evalTooltip()) {upgrade_tooltip_value = "<br/>(" +r_upgrade.evalTooltip() + ")"}
		
		var expanded_description = r_upgrade.description + upgrade_tooltip_value + "<br><span style = \\\"color:#00db0a;text-shadow:0px 0px 2px #52d56a;font-size:18px;\\\">Price: " + fancyNumber(r_upgrade.price) + "</span><br><span style = \\\"font-size:10px;float:right\\\";>"+r_upgrade.flavor_text+"<span>";
		upgrade_string = "";
		upgrade_string += "<div style='opacity: 0.6;float:left;height:48px;width:48px;background:url(images/upgrade_sheet.png) -"+r_upgrade.x+"px -"+r_upgrade.y+"px;' ";
		upgrade_string += "onmouseover='tooltip(this, -"+r_upgrade.x/48+", -"+r_upgrade.y/48+", \""+r_upgrade.display_name+"\", \""+expanded_description+"<br>Not bought yet\")'";
		upgrade_string += "onmouseleave='hideTooltip()'";
		
		upgrade_string += "></div>";
		return upgrade_string;
	} else if (upgrade[1]()) {
		var r_upgrade = upgrades[upgrade[0]];
		var upgrade_string = "";
		upgrade_string += "<div style='opacity: 0.6;float:left;height:48px;width:48px;background:url(images/upgrade_sheet.png) -"+default_x*48+"px -"+default_y*48+"px;' ";
		upgrade_string += "onmouseover='tooltip(this, "+default_x+", "+default_y+", \""+r_upgrade.display_name+"\", \""+upgrade[2]+"\")'";
		upgrade_string += "onmouseleave='hideTooltip()'";
		upgrade_string += "></div>";
		
		return upgrade_string;
	} else {
		var upgrade_string = "";
		upgrade_string += "<div style='opacity: 0.6;float:left;height:48px;width:48px;background:url(images/upgrade_sheet.png) -"+default_x*48+"px -"+default_y*48+"px;' ";
		upgrade_string += "onmouseover='tooltip(this, "+default_x+", "+default_y+", \"?????\", \"??????????????????????????????????????? Not Available Yet <br>???????????????????????????????????????\")'";
		upgrade_string += "onmouseleave='hideTooltip()'";
		upgrade_string += "></div>";
		
		return upgrade_string;
	}
}
function performRitual(ritual, cost, noPopup) {
	if (!(upgrades[6].bought && minigames[0].vars.blood >= 0)) {
		if (minigames[0].vars.blood >= cost) {
			minigames[0].vars.blood -= cost;
			minigames[0].vars.blood_spent += cost;
		} else {
			return;
		}
	} else {
		minigames[0].vars.blood -= cost;
		minigames[0].vars.blood_spent += cost;
		
		if (minigames[0].vars.blood < 0 && assistants[0].abilities[0].available() && assistants[0].level >= 5) {
			minigames[0].vars.blood = 1;
			assistants[0].abilities[0].cd -= 1;
		}
	}
    
    switch (ritual) {
        case 0:
            buffs[0].activate(66);
            if (!noPopup) popupText("+25% Production", $("#ritual_0").offset().left + $("#ritual_0").width()/2, $("#ritual_0").offset().top);
            break;
        case 1: 
            addClockTicks(10);
            if (!noPopup) popupText("+10 Seconds", $("#ritual_1").offset().left + $("#ritual_1").width()/2, $("#ritual_1").offset().top);
            break;
        case 2:
            if (!noPopup) popupText(minigames[0].vars.soot_counters + " Soot removed", $("#ritual_2").offset().left + $("#ritual_2").width()/2, $("#ritual_2").offset().top);
            if (minigames[0].vars.soot_counters >= 20) {
                minigames[0].vars.purity_counters += 1
                if (!noPopup) popupText(minigames[0].vars.soot_counters + " Soot removed<br>+3% production", $("#ritual_2").offset().left + $("#ritual_2").width()/2, $("#ritual_2").offset().top);     
            }
            minigames[0].vars.soot_counters = 0;
            buildings[0].stats["Soot Reduction"] = "-" + minigames[0].vars.soot_counters + "%";
            break;
        case 3:
            buffs[1].activate(120);
            var bonus = 15 + 3 * minigames[0].vars.soot_counters;
            if (!noPopup) popupText("+"+bonus+"% Production", $("#ritual_3").offset().left + $("#ritual_3").width()/2, $("#ritual_3").offset().top);
            minigames[0].vars.soot_counters++;
            break;
        case 4:
            minigames[0].vars.karma_counters += 1;
            var karma_total = minigames[0].vars.karma_counters * (15 + (15 + (minigames[0].vars.karma_counters-1)*2))/2;
            if (!noPopup) popupText("+"+(15 + (minigames[0].vars.karma_counters-1)*2)+" Production", $("#ritual_4").offset().left + $("#ritual_4").width()/2, $("#ritual_4").offset().top);
            break;
        case 5:
            if (Math.random() < Math.pow(0.99, buildings[0].count)) {
                buildings[0].count++;UPDATE_BUILDINGS = true;
                if (!noPopup) popupText("+1 Cultist", $("#ritual_5").offset().left + $("#ritual_5").width()/2, $("#ritual_5").offset().top);
				buildings[0].unlockUpgrades();
            } else {
                if (!noPopup) popupText("Ritual Failed", $("#ritual_5").offset().left + $("#ritual_5").width()/2, $("#ritual_5").offset().top);
            }
            
            break;
    }
    
    buildings[0].stats["Rituals Performed"] += 1;
    minigames[0].vars.rituals_performed += 1;
    if (minigames[0].vars.soot_counters) {buildings[0].stats["Soot Reduction"] = "-" + minigames[0].vars.soot_counters + "%"}
    if (minigames[0].vars.purity_counters) {buildings[0].stats["Purity Bonus"] = minigames[0].vars.purity_counters * 3 + "%"}
    if (minigames[0].vars.karma_counters) {buildings[0].stats["Karma Bonus"] = minigames[0].vars.karma_counters * (15 + (15 + (minigames[0].vars.karma_counters-1)*2))/2}
	
	buildings[0].stats["Blood Spent"] = minigames[0].vars.blood_spent;
    
	if (minigames[0].vars.rituals_performed >= 10) {upgrades[6].makeAvailable()}
	if (minigames[0].vars.rituals_performed >= 25) {upgrades[7].makeAvailable()}
	if (minigames[0].vars.rituals_performed >= 50) {upgrades[8].makeAvailable()}
	if (minigames[0].vars.rituals_performed >= 100) {upgrades[9].makeAvailable()}
	
	updateBuildingEffects();
    updateUnlocks();
}
function mineStore(id) {
	minigames[1].vars.stored_ids.push(id);
	
	if (minigames[1].vars.stored_ids.length >= 10 - upgrades[193].bought) {
		minigames[1].vars.stored_ids.splice(0, 1);
		if (upgrades[193].bought && minigames[1].vars.stored_ids.length == 9) {
			minigames[1].vars.stored_ids.splice(0, 1);
		}
	}
}
function refill(id) {
	var cost_multiplier = 1 * Math.pow(1.1, minigames[1].vars.stored_ids.count(id));
	switch (id) {
		case 0: 
		
		var cost = 20;
		cost = Math.floor(cost * cost_multiplier);
			if (minigames[1].vars.gold >= cost && minigames[0].vars.blood != minigames[0].vars.max_blood) {
				popupText("Blood Refill", $("#cultist_gold_refill").offset().left + $("#cultist_gold_refill").width()/2, $("#cultist_gold_refill").offset().top);
				minigames[0].vars.blood = minigames[0].vars.max_blood;
				minigames[1].vars.gold -= cost;
				
				if (upgrades[16].bought) {buffs[2].activate(15)}
				if (minigames[5].vars.research_tree[13].researched) {minigames[1].vars.gold += minigames[5].vars.research_tree[13].bought}
				mineStore(id);
			}	
			break;
		case 2: 
			
			var cost = 25;
			cost = Math.floor(cost * cost_multiplier);
			if (minigames[1].vars.gold >= cost && !(minigames[2].vars.draw_charges == minigames[2].vars.draw_charges_max && minigames[2].vars.discard_charges == minigames[2].vars.discard_charges_max)) {
				popupText("Draw Refill", $("#gambler_gold_refill").offset().left + $("#gambler_gold_refill").width()/2, $("#gambler_gold_refill").offset().top);
				minigames[2].vars.draw_charges = minigames[2].vars.draw_charges_max
				minigames[2].vars.discard_charges = minigames[2].vars.discard_charges_max
				minigames[1].vars.gold -= cost;
				
				if (upgrades[16].bought) {buffs[2].activate(15)}
				if (minigames[5].vars.research_tree[13].researched) {minigames[1].vars.gold += minigames[5].vars.research_tree[13].bought}
				mineStore(id);
			}
			break;
		case 3:
		
			var cost = 15;
			cost = Math.floor(cost * cost_multiplier);
			if (minigames[1].vars.gold >= cost && !(minigames[3].vars.power >= minigames[3].vars.max_power-5)) {
				popupText("Power Refill", $("#power_plant_gold_refill").offset().left + $("#power_plant_gold_refill").width()/2, $("#power_plant_gold_refill").offset().top);
				minigames[3].vars.power = minigames[3].vars.max_power;
				minigames[1].vars.gold -= cost;
				
				if (upgrades[16].bought) {buffs[2].activate(15)}
				if (minigames[5].vars.research_tree[13].researched) {minigames[1].vars.gold += minigames[5].vars.research_tree[13].bought}
				mineStore(id);
			}
			break;
		case 4:

			var cost = 15;
			cost = Math.floor(cost * cost_multiplier);
			if (minigames[1].vars.gold >= cost && minigames[4].vars.investing) {
				minigames[4].vars.investment_time = -1;
				minigames[1].vars.gold -= cost;
			
				if (upgrades[16].bought) {buffs[2].activate(15)}
				if (minigames[5].vars.research_tree[13].researched) {minigames[1].vars.gold += minigames[5].vars.research_tree[13].bought}
				mineStore(id);
			}
		case 5:
			
			var cost = 20;
			cost = Math.floor(cost * cost_multiplier);
			if (minigames[1].vars.gold >= cost) {

				minigames[1].vars.gold -= cost;
				minigames[5].vars.research_points += 10;
			
				if (upgrades[16].bought) {buffs[2].activate(15)}
				if (minigames[5].vars.research_tree[13].researched) {minigames[1].vars.gold += minigames[5].vars.research_tree[13].bought}
				mineStore(id);
			}
	}
	updateBuildingEffects();
	hideTooltip();
}
function drawCard(noPopup) {
	if (minigames[2].vars.draw_charges >= 1) {
		minigames[2].vars.draw_charges -= 1;
		var card = minigames[2].vars.deck.pop();
		draw(card, noPopup || false);	
		$("#deck_background").attr("src", "images/card_back.png");
		minigames[2].vars.discard_pile.push(card);
		var number = minigames[2].vars.discard_pile.peek() 
		if (number === undefined) {number = "blank";}
		$("#discard_pile").attr("src", "images/card_"+number+".png");
		if (minigames[2].vars.deck.length == 0) {shuffle()}
		minigames[2].updateHTML();
		
		if (minigames[2].vars.cards_drawn >= 10) {upgrades[36].makeAvailable();}
		if (minigames[2].vars.cards_drawn >= 25) {upgrades[37].makeAvailable();}
		if (minigames[2].vars.cards_drawn >= 50) {upgrades[38].makeAvailable();}
		if (minigames[2].vars.cards_drawn >= 100) {upgrades[39].makeAvailable();}
	}
	
	updateBuildingEffects();
}
function discardCard() {
	if (minigames[2].vars.discard_charges >= 1) {
		minigames[2].vars.discard_charges -= 1;
		var card = minigames[2].vars.deck.pop();
		minigames[2].vars.cards_discarded +=1;
		buildings[2].stats["Cards Discarded"] = minigames[2].vars.cards_discarded;
		minigames[2].vars.discard_pile.push(card);
		var number = minigames[2].vars.discard_pile.peek() 
		if (number === undefined) {number = "blank";}
		$("#discard_pile").attr("src", "images/card_"+number+".png");
		if (minigames[2].vars.deck.length == 0) {shuffle()}
		minigames[2].updateHTML();
		popupText("Card Discarded", $("#discard_button").offset().left + $("#discard_button").width()/2, $("#discard_button").offset().top);
		$("#deck_background").attr("src", "images/card_back.png");
	}
}
function draw(card, noPopup) {
	minigames[2].vars.cards_drawn += 1;
	buildings[2].stats["Cards Drawn"] = minigames[2].vars.cards_drawn;
	switch (card) {
		case 0: //Ace of spades
			minigames[2].vars.card_bonus += 0.01;
			if (!noPopup) popupText("+1% Production", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 1: //Two of spades
			minigames[2].vars.card_bonus -= 0.01;
			if (!noPopup) popupText("-1% Production", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 2: //Ace of clubs
			addClockTicks(15);
			if (!noPopup) popupText("+15 Seconds", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 3: //Two of clubs
			CREDITS = Math.max(0, CREDITS - PRODUCTION * 20);
			if (!noPopup) popupText("-" + fancyNumber(PRODUCTION * 20) + " Credits", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 4: //Ace of hearts
			buffs[3].activate(120);
			if (!noPopup) popupText("+20% Production", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 5: //Two of hearts
			buffs[4].activate(60);
			if (!noPopup) popupText("-15% Production", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 6: //Ace of Diamonds
			len = buffs.length;
			for (var i = 0; i < len; i++) {
				if (buffs[i].active) {
					buffs[i].activate(20);
				}
			}
			if (!noPopup) popupText("+20s Active Effects", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 7: //Two of Diamonds
			var temp_buffs = []
			len = buffs.length;
			for (var i = 0; i < len; i++) {
				if (buffs[i].active) {
					temp_buffs.push(buffs[i]);
				}
			}
			var ran = Math.floor(Math.random() * temp_buffs.length)
			if (temp_buffs[ran]) {
				temp_buffs[ran].time = 0.1;
				if (!noPopup) popupText(temp_buffs[ran].name + " Removed", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			} else {
				if (!noPopup) popupText("No Effects Removed", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			}
			break;
		case 8: //Two of spades
			CREDITS += PRODUCTION * 20;
			if (!noPopup) popupText("+" + fancyNumber(PRODUCTION * 20) + " Credits", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
		case 9: //Two of clubs
			for (var i = 0; i < 20; i++) {
				handleClick();
			}
			if (!noPopup) popupText("+20 Clicks", $("#draw_button").offset().left + $("#draw_button").width()/2, $("#draw_button").offset().top);
			break;
	}
	buildings[2].stats["Gambling Bonus"] = Math.round((minigames[2].vars.card_bonus - 1) * 100) + "%";
}
function cardToString(card) {
	switch (card) {
		case 0: //Ace of spades
			return "A&spades;"
			break;
		case 1: //Two of spades
			return "2&spades;"
			break;
		case 2: //Ace of clubs
			return "A&clubs;"
			break;
		case 3: //Two of clubs
			return "2&clubs;"
			break;
		case 4: //Ace of hearts
			return "A&hearts;"
			break;
		case 5: //Two of hearts
			return "2&hearts;"
			break;
		case 6: //Ace of Diamonds
			return "A&diams;"
			break;
		case 7: //Two of Diamonds
			return "2&diams;"
			break;
		case 8: //Jack of Spades
			return "J&spades;"
			break;
		case 9: //Jack of Clubs
			return "J&clubs;"
			break;
	}	
}
function shuffleDeck() {
	if (minigames[2].vars.deck.length <=3) {
		shuffle();
		popupText("Deck Shuffled", $("#shuffle_button").offset().left + $("#shuffle_button").width()/2, $("#shuffle_button").offset().top);	
	} else {
		popupText("Requires less than 3 cards to shuffle", $("#shuffle_button").offset().left + $("#shuffle_button").width()/2, $("#shuffle_button").offset().top);		
	}
}
function shuffle() {
	for (var i = 0; i < minigames[2].vars.deck.length; i++) {
		minigames[2].vars.discard_pile.push(minigames[2].vars.deck[i]);
	}
	minigames[2].vars.deck = minigames[2].vars.discard_pile.shuffle();
	minigames[2].vars.discard_pile = [];
	$("#discard_pile").attr("src", "images/card_shuffle.png");
	$("#deck_background").attr("src", "images/card_back.png");
}
function remainingCards(deck) {
	var string = "";
	
	for (var i = 0; i < 10; i++) {
		if (deck.includes(i)) {
					string += cardToString(deck[deck.indexOf(i)]) + " ";	
		}
	}
	
	return string;
}
function peek() {
	if (minigames[2].vars.peek_charges >= 1 && !($("#deck_background").attr("src") == "images/card_" + minigames[2].vars.deck.peek() + ".png")) {
		minigames[2].vars.peek_charges -= 1;
		$("#deck_background").attr("src", "images/card_" + minigames[2].vars.deck.peek() + ".png");
		popupText(cardToString(minigames[2].vars.deck.peek()) + " Next", $("#peek_button").offset().left + $("#peek_button").width()/2, $("#peek_button").offset().top);		
	}
}
function toggleOvercharge(building) {
	if (!minigames[3].vars.powered_buildings.includes(building)) {
		minigames[3].vars.powered_buildings.push(building);
		$(".overcharge").attr("src", "images/building_icon_power.png");
	} else {
		minigames[3].vars.powered_buildings.remove(building);
		$(".overcharge").attr("src", "images/misc_inactive_power.png");
	}
	UPDATE_BUILDINGS = true;
}
function invest(noPopup) {
	var bank = minigames[4].vars;
	
	if (bank.investment_time <= 0 && (CREDITS >= PRODUCTION * 300 || upgrades[196].bought)) {
		bank.investment_time = 300;
		if (subgames[0].reset_count >= 5) {bank.investment_time /= 1 + (subgames[0].reset_count) * 0.01}
		bank.investment_value = PRODUCTION * 360;
		bank.investing = true;
		CREDITS -= PRODUCTION * 300;
		if (!noPopup) popupText(fancyNumber(PRODUCTION * 300) + " Credits Invested", $("#investment_icon").offset().left + $("#investment_icon").width()/2, $("#investment_icon").offset().top);

		buildings[4].stats["Investments Made"] += 1;
		
		if (upgrades[196].bought && CREDITS < 0 && assistants[0].abilities[0].available() && assistants[0].level >= 5) {
			CREDITS = 1;
			assistants[0].abilities[0].cd -= 1;
		}
	}  else {
		if (!noPopup) popupText("Not Enough Credits", $("#investment_icon").offset().left + $("#investment_icon").width()/2, $("#investment_icon").offset().top);
	}
	updateBuildingEffects();
}
function cashToGold(noPopup) {
	if (!buffs[6].active) {
		buffs[6].activate(60);
		minigames[1].vars.gold += 1;
		if (!noPopup) popupText("+1 Gold", $("#cash_to_gold").offset().left + $("#cash_to_gold").width()/2, $("#cash_to_gold").offset().top);
	} else {
		if (!noPopup) popupText(Math.round(buffs[6].time) + " seconds remaining", $("#cash_to_gold").offset().left + $("#cash_to_gold").width()/2, $("#cash_to_gold").offset().top);	
	}
}
function goldToCash(noPopup) {
	if (!buffs[5].active && minigames[1].vars.gold >= 2) {
		buffs[5].activate(60);
		minigames[1].vars.gold -= 2;
		if (!noPopup) popupText("+10% Production", $("#gold_to_cash").offset().left + $("#gold_to_cash").width()/2, $("#gold_to_cash").offset().top);	
	} else if (minigames[1].vars.gold <= 1) {
		if (!noPopup) popupText("Not Enough Gold", $("#gold_to_cash").offset().left + $("#gold_to_cash").width()/2, $("#gold_to_cash").offset().top);	
	} else {
		if (!noPopup) popupText(Math.round(buffs[5].time) + " seconds remaining", $("#gold_to_cash").offset().left + $("#gold_to_cash").width()/2, $("#gold_to_cash").offset().top);			
	}
}
function investTooltip() {
	if (!minigames[4].vars.investing) {
		tooltip($("#investment_icon"), 7, 6, "Investment", "Invest 5 minutes worth of production <span style='color:#00db0a;'>(" + fancyNumber(PRODUCTION * 300) + ")</span> to get that amount plus an additional 20% after 5 minutes <span style='color:#00db0a;'>(" + fancyNumber(PRODUCTION * 360) + ")</span><br><span style = \"font-size:10px;float:right\";>Hotkey: " + hotkeys.activate_building_1.toUpperCase() + " </span>");
	} else {
		tooltip($("#investment_icon"), 7, 6, "Investment", "This investment will return <span style='color:#00db0a;'>" + fancyNumber(minigames[4].vars.investment_value) + "</span> credits in " + Math.round(minigames[4].vars.investment_time ) + " seconds.", function () {return "This investment will return <span style='color:#00db0a;'>" + fancyNumber(minigames[4].vars.investment_value) + "</span> credits in " + Math.round(minigames[4].vars.investment_time ) + " seconds."}, true);	
	}
}
function warp() {
	if (minigames[17].vars.warp_charges != 0) {		
		minigames[17].vars.warp_charges -= 1;
		minigames[17].vars.warp_activations += 1;
		buildings[17].stats["Total Warps"] = minigames[17].vars.warp_activations;
		var bonus = PRODUCTION * (30 + upgrades[116].bought * 5);
		CREDITS += bonus;
		stats.credits_earned += bonus
		popupText("+" + fancyNumber(bonus) + " Credits", $("#warp_display").offset().left + $("#warp_display").width()/2, $("#warp_display").offset().top);	

		if (upgrades[114].bought) {addClockTicks(5)}
		
		if (minigames[17].vars.warp_activations >= 10) {upgrades[113].makeAvailable();}
		if (minigames[17].vars.warp_activations >= 25) {upgrades[114].makeAvailable();}
		if (minigames[17].vars.warp_activations >= 50) {upgrades[115].makeAvailable();}
		if (minigames[17].vars.warp_activations >= 100) {upgrades[116].makeAvailable();}
	}
	updateBuildingEffects();
}
function toggleAliencharge(building) {
	if (!minigames[10].vars.powered_buildings.includes(building)) {
		minigames[10].vars.powered_buildings.push(building);
		$(".aliencharge").attr("src", "images/misc_active_alien.png");
	} else {
		minigames[10].vars.powered_buildings.remove(building);
		$(".aliencharge").attr("src", "images/misc_inactive_alien.png");
	}
	UPDATE_BUILDINGS = true;
}
function program1() {
	var programs_running = 0;
	if (minigames[11].vars.program_1 != 0) {programs_running += 1}
	if (minigames[11].vars.program_2 != 0) {programs_running += 1}
	if (minigames[11].vars.program_3 != 0) {programs_running += 1}

	if (programs_running < 1 + upgrades[156].bought && minigames[11].vars.program_1 == 0) {
		if (upgrades[153].bought) {
			addClockTicks(5);
		}
		
		minigames[11].vars.programs_ran += 1;
		buildings[11].stats["Programs Ran"] = minigames[11].vars.programs_ran;
		minigames[11].vars.program_1 = 1;
		minigames[11].vars.program_1_time = 60;
		buffs[8].activate(60);
		
		if (minigames[11].vars.programs_ran >= 4) {upgrades[153].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 10) {upgrades[154].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 20) {upgrades[155].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 30) {upgrades[156].makeAvailable();}
	}
	
	buildings[11].stats["Programs Ran"] = minigames[11].vars.programs_ran;
	updateBuildingEffects();
}
function program2() {
	var programs_running = 0;
	if (minigames[11].vars.program_1 != 0) {programs_running += 1}
	if (minigames[11].vars.program_2 != 0) {programs_running += 1}
	if (minigames[11].vars.program_3 != 0) {programs_running += 1}
	
	if (programs_running < 1 + upgrades[156].bought && minigames[11].vars.program_2 == 0) {
		if (upgrades[153].bought) {
			addClockTicks(5);
		}
		
		minigames[11].vars.programs_ran += 1;
		buildings[11].stats["Programs Ran"] = minigames[11].vars.programs_ran;
		minigames[11].vars.program_2 = 1;
		minigames[11].vars.program_2_time = 60;
		
		CREDITS += PRODUCTION * 20;
		
		if (minigames[11].vars.programs_ran >= 4) {upgrades[153].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 10) {upgrades[154].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 20) {upgrades[155].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 30) {upgrades[156].makeAvailable();}
	}
	
	buildings[11].stats["Programs Ran"] = minigames[11].vars.programs_ran;
	updateBuildingEffects();
}
function program3() {
	var programs_running = 0;
	if (minigames[11].vars.program_1 != 0) {programs_running += 1}
	if (minigames[11].vars.program_2 != 0) {programs_running += 1}
	if (minigames[11].vars.program_3 != 0) {programs_running += 1}
	
	if (programs_running < 1 + upgrades[156].bought && minigames[11].vars.program_3 == 0) {
		if (upgrades[153].bought) {
			addClockTicks(5);
		}
		
		minigames[11].vars.programs_ran += 1;
		buildings[11].stats["Programs Ran"] = minigames[11].vars.programs_ran;
		minigames[11].vars.program_3 = 1;
		minigames[11].vars.program_3_time = 60;
		
		addClockTicks(15);
		
		if (minigames[11].vars.programs_ran >= 4) {upgrades[153].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 10) {upgrades[154].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 20) {upgrades[155].makeAvailable();}
		if (minigames[11].vars.programs_ran >= 30) {upgrades[156].makeAvailable();}
	}
	
	buildings[11].stats["Programs Ran"] = minigames[11].vars.programs_ran;
	updateBuildingEffects();
}
function toggleComputerLoop() {
	minigames[11].vars.looping = !minigames[11].vars.looping;
	
	if (!minigames[11].vars.looping) {$("#computer_loop").attr("src", "images/misc_loop_inactive.png");}
	else if (minigames[11].vars.looping) {$("#computer_loop").attr("src", "images/misc_loop.png");}
}
function program1Tooltip(self) {
	var color = ["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"]
	color[minigames[11].vars.program_1] = "#96E5FF";
	
	tooltip(self, 5, 16, 'Program 1', '<span style="color:'+color[1]+'">1. Increases production by <span style="color:#00db0a;">20%</span> for 1 minute.</span><br><span style="color:'+color[2]+'">2. Decreases production by <span style="color:#ff1e2d;">20%</span> for 1 minute.</span><br><span style="color:'+color[3]+'">3. <span style="color:#00db0a;">Autoclicks</span> once per second for 1 minute.</span><br><span style="color:'+color[4]+'">4. Removes <span style="color:#ff1e2d;">10</span> seconds worth of time.</span><br><span style = \"font-size:10px;float:right\";>Hotkey: ' + hotkeys.activate_building_1.toUpperCase() + ' </span>', function () {}, true);
}
function program2Tooltip(self) {
	var color = ["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"]
	color[minigames[11].vars.program_2] = "#96E5FF";
	
	tooltip(self, 5, 16, 'Program 2', '<span style="color:'+color[1]+'">1. Grants <span style="color:#00db0a;">20</span> seconds worth of production.</span><br><span style="color:'+color[2]+'">2. Removes <span style="color:#ff1e2d;">15</span> seconds worth of production.</span><br><span style="color:'+color[3]+'">3. <span style="color:#00db0a;">Doubles</span> the value from clicks for 1 minute.</span><br><span style="color:'+color[4]+'">4. <span style="color:#ff1e2d;">Halves</span> the value from clicks for 1 minute.</span><br><span style = \"font-size:10px;float:right\";>Hotkey: ' + hotkeys.activate_building_2.toUpperCase() + ' </span>', function () {}, true);
}
function program3Tooltip(self) {
	var color = ["#DDDDDD", "#DDDDDD", "#DDDDDD", "#DDDDDD"]
	color[minigames[11].vars.program_3] = "#96E5FF";
	
	tooltip(self, 5, 16, 'Program 3', '<span style="color:'+color[1]+'">1. Grants <span style="color:#00db0a;">15</span> seconds worth of time.</span><br><span style="color:'+color[2]+'">2. Decreases production by <span style="color:#ff1e2d;">25%</span> for 1 minute.</span><br><span style="color:'+color[3]+'">3. Increases production by <span style="color:#00db0a;">15%</span> for 1 minute.</span><br><span style="color:'+color[4]+'">4. Removes <span style="color:#ff1e2d;">5</span> seconds worth of time.</span><br><span style = \"font-size:10px;float:right\";>Hotkey: ' + hotkeys.activate_building_3.toUpperCase() + ' </span>', function () {}, true);
}
function editPath() {
	if (minigames[8].vars.edit_path) {
		stopEdit();
	} else {
		minigames[8].vars.edit_path = true;
	}
}
function stopEdit() {
	minigames[8].vars.edit_path = false;
	$("#click_farm_display").empty();
}
function runPath() {
	if (!minigames[8].vars.run_path && minigames[8].vars.stored_clicks >= minigames[8].vars.click_path.length) {
		stopEdit();
		minigames[8].vars.run_path = true;
	}
}
function resetPath() {
	minigames[8].vars.click_path = [];
}
function accelTarget(target) {
	if (target != minigames[12].vars.accel_target) {
		minigames[12].vars.accel_target = target;
		if (upgrades[166].bought) {
			minigames[12].vars.accel_bonus *= 0.33;
		} else {
			minigames[12].vars.accel_bonus = 0;
		}
		minigames[12].vars.accel_time = 30;
	}
	
	$("#accel_price").attr("style", "display:inline;cursor:pointer;opacity:0.6");
	$("#accel_click").attr("style", "display:inline;cursor:pointer;opacity:0.6");
	$("#accel_production").attr("style", "display:inline;cursor:pointer;opacity:0.6");
	
	if (target == 0) {$("#accel_price").attr("style", "display:inline;cursor:pointer;opacity:1");}
	if (target == 1) {$("#accel_click").attr("style", "display:inline;cursor:pointer;opacity:1");}
	if (target == 2) {$("#accel_production").attr("style", "display:inline;cursor:pointer;opacity:1");}

}
function clone(target) {
	if (minigames[14].vars.clone_charges > 0 && !minigames[14].vars.clone_targets.includes(target)) {
		minigames[14].vars.clone_targets.push(target);
		minigames[14].vars.clone_times.push(tweaker.minigames.clone_duration);
		minigames[14].vars.clone_charges -= 1;
		minigames[14].vars.total_clones += 1;
		buildings[14].stats["Total Clones"] = minigames[14].vars.total_clones;
		UPDATE_BUILDINGS = true;
		popupText("Cloned", $("#building_clone").offset().left + $("#building_clone").width()/2, $("#building_clone").offset().top);	
	}
}
function calcWorkRate(building_id) {
	
	var tree_id = 18 + building_id;
	
	if (building_id == 6) {tree_id - 23}
	if (building_id == 5) {tree_id = 23}
	
	var temp_value = 1 * ( 1 + minigames[3].vars.powered_buildings.includes(building_id) * (.5 + upgrades[47].bought * .1)  ) * (1 + minigames[5].vars.research_tree[tree_id].bought * 0.01) * (building_id == alien_target ? 1.25 : 1) * (1 + assistants[2].level * 0.001) * (1 + minigames[14].vars.clone_targets.includes(building_id));
	
	//var temp_value = 100 + minigames[3].vars.powered_buildings.includes(building_id) * (50 + upgrades[47].bought * 10) + minigames[5].vars.research_tree[18 + building_id].bought;
	
	return Math.round(temp_value * 100) + "%";
}
function calcWorkRateTier2(building_id) {
	var temp_value = 1 * ( 1 - minigames[10].vars.powered_buildings.includes(building_id) * 0.25) * (building_id == alien_target ? 1.25 : 1) * (1 + assistants[2].level * 0.001) * (1 + minigames[14].vars.clone_targets.includes(building_id));
	
	return Math.round(temp_value * 100) + "%";
}
function flux() {
	switch (minigames[13].vars.next_flux) {
		case 0:
			buffs[15].activate(270);
			minigames[13].vars.flux_bonus_multiplier = 1.6 - Math.random() * .2;
			if (upgrades[176].bought) {minigames[13].vars.flux_bonus_multiplier = 1.6}
			popupText("<center>Fluctuation</center><br> +" + Math.round(minigames[13].vars.flux_bonus_multiplier * 100 - 100) + "% production", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
		break;
		case 1:
			var temp_add = Math.round(120 + Math.random() * 60);
			if (upgrades[176].bought) {temp_add = 180}
			addClockTicks(temp_add);
			popupText("<center>Fluctuation</center><br> +" + secondsToTime(temp_add) + "", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
		break;
		case 2:
			var temp_add = Math.round(230 + Math.random() * 40)
			if (upgrades[176].bought) {temp_add = 270}
			popupText("<center>Fluctuation</center><br> +" + temp_add + " instant clicks", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			for (var i = 0; i < temp_add; i++) {
				handleClick();
			}
		break;
		case 3:
			buffs[16].activate(150);
			minigames[13].vars.flux_bonus_multiplier = 1.6 - Math.random() * .2;
			popupText("<center>Fluctuation</center><br> -" + Math.round(minigames[13].vars.flux_bonus_multiplier * 100 - 100) + "% production", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
		break;
		case 4:
			var temp_add = Math.round(60 + Math.random() * 60)
			addClockTicks(-temp_add);
			if (CLOCK_TICKS < 0) {CLOCK_TICKS = 0}
			addClockTicks(0);
			popupText("<center>Fluctuation</center><br> " + secondsToTime(temp_add) + " removed", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
	}
	
	minigames[13].vars.next_flux = Math.floor(Math.random() * 5);
	
	minigames[13].vars.total_fluxes += 1;
	buildings[13].stats["Total Fluctuations"] = minigames[13].vars.total_fluxes;
	
	if (minigames[13].vars.total_fluxes >= 1) {upgrades[173].makeAvailable();}
	if (minigames[13].vars.total_fluxes >= 2) {upgrades[174].makeAvailable();}
	if (minigames[13].vars.total_fluxes >= 4) {upgrades[175].makeAvailable();}
	if (minigames[13].vars.total_fluxes >= 8) {upgrades[176].makeAvailable();}
}
function packageDelivery() {
	var package_type = Math.floor((Math.random() * 14))
	switch (package_type) {
		case 0:
			minigames[0].vars.blood = Math.min(minigames[0].vars.blood + 200, minigames[1].vars.max_blood);
			popupText("+200 Blood", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;
		case 1:
			minigames[1].vars.gold += 10;
			minigames[1].vars.gold_mined += 10;
			popupText("+10 Gold", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;		
		case 2:
			minigames[2].vars.draw_charges = minigames[2].vars.draw_charges_max;
			popupText("Draws Refilled", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;	
		case 3:
			minigames[3].vars.power = minigames[3].vars.max_power;
			popupText("Power Refilled", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;		
		case 4:
			minigames[4].vars.investment_time = -1;
			popupText("Investment Returned", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;		
		case 5:
			minigames[5].vars.research_points += 15;
			popupText("+15 Research Points", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;		
		case 6:
			var bonus = PRODUCTION * 30;
			popupText("30 Seconds of Production", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			break;
	}
}