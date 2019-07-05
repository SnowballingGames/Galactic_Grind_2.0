var assistants = [];
var assistant_levels = [5, 15, 25, 35, 50];
var assistant_opened = 0;


var stored_bonuses = [];
var stored_bonuses_enabled = true;
var angelic_release = false;
var angelic_protection = false;

var demonic_vengeance = 0;
var vengeance_bonus = 0;

var alien_target = -1;
var consumption_bonus = 0;
var inertia = 0;

function Assistant(name, description, icon, x, y) {
	this.description = description;
	this.name = name;
	this.icon = icon;
	this.x = x;
	this.y = y;
	this.unlocked = false;
	
	this.update = function (dt) {
		if (this.unlocked) {
			this.xp += dt * ASSISTANT_RATE;
		}
		
		if (this.xp >= this.next_xp) {
			this.levelUp();
		}
		for (var i = 0; i < this.abilities.length; i++) {
			this.abilities[i].update(dt);
		}
		if ($("#assistant_background").length && assitant_opened == assistants.indexOf(this)) {
			this.updateHTML();
		}
	}
	this.abilities = [];
	
	this.activate_ability = function (i) {
		if (this.level >= assistant_levels[i]) {
			this.abilities[i].handleClick();
		}
	}
	
	this.createHTML = function () {
		assitant_opened = assistants.indexOf(this);
		
		$("#assistant_background").remove();
		
		var background = $(document.createElement("div"));
			background.attr("class", "assistant_background");
			background.attr("id", "assistant_background");
			background.css("border", "3px solid black");
			background.css("border-radius", "10px");
			background.css("text-align", "center");
			background.on("click", function () {MENU_CLOSE = false;})
			
		var close_button = $(document.createElement("img"));
			close_button.attr("src", "images/button_x.png").attr("height", "48").attr("width", "48");
			close_button.attr("onclick", "$('#assistant_background').remove()");
			close_button.attr("style", "position:absolute;right:0px;top:0px;cursor:pointer");
			close_button.attr("onmouseover", "$(this).attr('src', 'images/button_x_hover.png')");
			close_button.attr("onmouseout", "$(this).attr('src', 'images/button_x.png')");
			
		var title = $(document.createElement("div"));
			title.html(this.name);
			title.css("font-size", "180%");
			title.attr("class", "detail_title");
			
		var img = $(document.createElement("img"));
		img.attr("src", this.icon);
		
		var description = $(document.createElement("div"));
			description.html(this.description() + (assistants.indexOf(this) == 0 ? ('<br><br>Bonus Storage ' + ((stored_bonuses_enabled && assistants[0].level > assistant_levels[3]) ? 'Enabled' : 'Disabled') + '<br>' + ((stored_bonuses.length > 0) ? buffs[stored_bonuses[0][0]].name + ' Stored <br>' : '') + ((stored_bonuses.length > 1) ? buffs[stored_bonuses[1][0]].name + ' Stored <br>' : '')) : ''));
			description.css("font-size", "100%");
			description.attr("id", "assistant_description");
		
		var level = $(document.createElement("div"));
			level.html("Level: " + this.level + "<br>Progress: " + Math.floor(this.xp) + " / " + this.next_xp);
			level.css("font-size", "110%");
			level.attr("id", "assistant_level");
		
		var ability_container = $(document.createElement("div"));
			ability_container.attr("id", "ability_container");
			
		for (var i = 0; i < this.abilities.length; i++) {
			var ability = this.abilities[i];
			var ability_span = $(document.createElement("span"));
			ability_span.css("position", "relative");
			ability_span.css("display", "inline-block");
			var ability_cd = $(document.createElement("div"));
			ability_cd.attr("id", "ability_cooldown_" + i);
			
			var distance = ability.cd/ability.base_cd * 48;
			var y = 48 - distance;
			if (ability.cd == ability.base_cd) {distance = 0;}
			ability_cd.attr("style", "pointer-events: none;border-radius:4px;position:absolute;left:0px;top:"+y+"px;height:"+distance+"px;width:48px;background-color:#000000;opacity:0.5");			
			
			var ability_ele = $(document.createElement("img"));
			ability_ele.attr("src", ability.icon);
			if (!ability.passive) {
				ability_ele.css("cursor", "pointer");
				ability_ele.attr("onclick", "assistants[" + assistants.indexOf(this) + "].activate_ability(" + i + ")")
			}
			
			if (this.level < assistant_levels[i]) {
				ability_ele.css("filter", "grayscale(100%)");
				ability_ele.attr("onmouseover","tooltip(this, 1, 0, 'Unavailable', 'Reach level ' + assistant_levels[" + i + "] +  ' of this assistant to unlock.')");
			} else {
				var cd = "";
				"Cooldown:" + secondsToTime(this.abilities[i].cd);
				ability_ele.attr("onmouseover","tooltip(this, "+ability.x+", "+ability.y+", '"+ability.name+"', '"+ability.description+"<br>' + ((assistants["+assistants.indexOf(this)+"].abilities["+i+"].cd != 0) ? (' Cooldown: ' + secondsToTime(assistants["+assistants.indexOf(this)+"].abilities["+i+"].cd) + '') : ''), function () {return '"+ability.description+"<br> ' + ((assistants["+assistants.indexOf(this)+"].abilities["+i+"].cd != 0) ? (' Cooldown: ' + secondsToTime(assistants["+assistants.indexOf(this)+"].abilities["+i+"].cd) + '') : '')}, true)");
			}
			// function () {return '"+this.abilities[i].description+"<br>Cooldown: ' + secondsToTime(assistants["+assistants.indexOf(this)+"].abilities["+i+"].cd + ''
			
			//ability_ele.attr("onmouseover","tooltip(this, 3, 2, 'Refill Blood', 'Increases your current amount of blood to the maximum value, for the cost of '+ Math.floor(20 * Math.pow(1.1, minigames[1].vars.stored_ids.count(0))) +' gold bars.<br>You currently own <span style=\"color:#FFFB1C\">' + minigames[1].vars.gold + '</span> gold bars.<br><span style = \"font-size:10px;float:right\";>Hotkey: ' + hotkeys.activateRefill.toUpperCase() + '</span>')");
			
			ability_ele.attr("onmouseleave", "hideTooltip()");
			
			ability_span.append(ability_ele);
			ability_span.append(ability_cd);
			ability_container.append(ability_span);
			ability_container.append(document.createTextNode(" "));
		}
		
		background.append(close_button);
		background.append(title);
		background.append(img);
		background.append($(document.createElement("br")));
		background.append(description);
		background.append($(document.createElement("br")));
		background.append(level);
		background.append($(document.createElement("br")));
		background.append($(document.createElement("br")));
		background.append(ability_container);
		
		$(document.body).append(background);
			
		MENU_CLOSE = false;
	}
	this.updateHTML = function () {
		for (var i = 0; i < this.abilities.length; i++) {
			ability = this.abilities[i];
			var distance = ability.cd/ability.base_cd * 48;
			var y = 48 - distance;
			if (ability.cd == ability.base_cd) {distance = 0;}
			$("#ability_cooldown_" + i).attr("style", "pointer-events: none;border-radius:4px;position:absolute;left:0px;top:"+y+"px;height:"+distance+"px;width:48px;background-color:#000000;opacity:0.5");	
		}
		
		$("#assistant_level").html("Level: " + this.level + "<br>Progress: " + Math.floor(this.xp) + " / " + this.next_xp);
	}
	this.levelUp = function () {
		this.xp -= this.next_xp;
		this.level += 1;
		this.next_xp = Math.ceil(this.next_xp * 1.12) + 20;
		
		if ($("#assistant_background").length && assitant_opened == assistants.indexOf(this)) {
			this.createHTML();
		}
	}
	
	this.xp = 0;
	this.level = 1;
	this.next_xp = 60;
}
function Ability(name, description, icon, x, y, passive, cd, activation) {
	this.name = name;
	this.description = description;
	this.icon = icon;
	this.x = x;
	this.y = y;
	this.passive = passive;
	this.cd = cd;
	this.base_cd = cd;
	this.activation = activation || function () {};
	this.update = function (dt) {
		if (this.cd != this.base_cd) {
			this.cd -= dt;
			if (this.cd < 0) {
				this.cd = this.base_cd;
			}
		}
	};
	this.available = function () {
		return this.cd == this.base_cd;
	}
	this.handleClick = function () {
		if (!this.passive && this.cd == this.base_cd) {
			this.activation();
			this.cd -= 1;
			if (assistants[0].abilities.indexOf(this) == 3 || assistants[0].abilities.indexOf(this) == 4) {
				popupText("Storage Toggled", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			} else {
				popupText(this.name + " Activated", $("#world_container").offset().left + $("#world_container").width()/2, $("#world_container").offset().top);
			}
		}
	}
}

function initAssistants() {
	angelic_assistant = new Assistant("Angelic Assistant", function () {return "Angelic Assistants increases value from clicking (" + this.level + "%) and autoclicks " + (1 + Math.floor(this.level/10)) + " times every 4 seconds. Over time and from bonuses being activated angelic assistants gain progress to higher levels, which can unlock new abilities"}, "images/assistant_angelic.png", 2, 20);
	
		var angelic_ability_1 = new Ability("Angel&apos;s Grace", "The next time a building&apos;s currency or total credits would be reduced to less than zero it is reduced to 1 instead.", "images/ability_angelic_1.png", 2, 20, true, 1800);
		var angelic_ability_2 = new Ability("Angel&apos;s Boost", "Increases the duration of all active effects by 15 seconds.", "images/ability_angelic_2.png", 2, 20, false, 300, function () {
			var len = buffs.length;
			for (var i = 0; i < len; i++) {
				if (buffs[i].active) {
					buffs[i].activate(15);
				}
			}
		});
		var angelic_ability_3 = new Ability("Purification", "Removes all negative effects.", "images/ability_angelic_3.png", 2, 20, false, 3600, function () {
			var len = buffs.length;
			for (var i = 0; i < len; i++) {
				if (buffs[i].negative && buffs[i].active) {
					buffs[i].time = 0.1;
				}
			}
		});
		var angelic_ability_4 = new Ability("Duality", "Each time a bonus would be activated, it will be stored or activated at the same time as the last stored bonus. Click to toggle bonus storage", "images/ability_angelic_4.png", 2, 20, false, 2, function () {
			stored_bonuses_enabled = !stored_bonuses_enabled;
			for (var i = stored_bonuses.length - 1; i >= 0; i--) {
				var bonus = stored_bonuses.pop();
				buffs[bonus[0]].activate(bonus[1]);
			}
			assistants[0].createHTML();
		});
		var angelic_ability_5 = new Ability("Trifecta", "Each time a bonus would be activated, it will be stored or activated at the same time as the last two stored bonus. Click to toggle bonus storage", "images/ability_angelic_5.png", 2, 20, false, 2, function () {
			stored_bonuses_enabled = !stored_bonuses_enabled;
			for (var i = stored_bonuses.length - 1; i >= 0; i--) {
				var bonus = stored_bonuses.pop();
				buffs[bonus[0]].activate(bonus[1])
			}
			assistants[0].createHTML();
		});
		
		angelic_assistant.abilities.push(angelic_ability_1);
		angelic_assistant.abilities.push(angelic_ability_2);
		angelic_assistant.abilities.push(angelic_ability_3);
		angelic_assistant.abilities.push(angelic_ability_4);
		angelic_assistant.abilities.push(angelic_ability_5);
	
	assistants.push(angelic_assistant);	
	
	demonic_assistant = new Assistant("Demonic Assistant", function () {return "Demonic Assistants increases production by (" + roundPlace(this.level * 0.1).toFixed(1) + "%) and offline building resource collection rate by (" + (5 + Math.floor(this.level/10) * 5) + "%). Over time and from negative effects being activated Demonic Assistants gain progress to higher levels, which can unlock new abilities"}, "images/assistant_demonic.png", 3, 20);
	
		var demonic_ability_1 = new Ability("Demonic Vengeance", "When the last negative effect wears off production is increased by 2% for each negative effect activated during that time frame (max 20%) for 30 seconds.", "images/ability_demonic_1.png", 3, 20, true, 0);
		var demonic_ability_2 = new Ability("Demonic Stewardship", "All assistant&apos;s abilities will recharge while offline.", "images/ability_demonic_2.png", 3, 20, true, 0);
		var demonic_ability_3 = new Ability("Demonic Fury", "Autoclicks 8 times a second for 8 seconds", "images/ability_demonic_3.png", 3, 20, false, 900, function () {buffs[18].activate(8)});
		var demonic_ability_4 = new Ability("Curse Defusion", "The next negative effect activated will be activated for half the time.", "images/ability_demonic_4.png", 3, 20, true, 720);
		var demonic_ability_5 = new Ability("Demonic Deal", "Causes two effects to activate, one increasing production by 15%, and the other decreasing production by 15% for one minute.", "images/ability_demonic_5.png", 3, 20, false, 600, function () {buffs[19].activate(60);buffs[20].activate(60);});
		
		demonic_assistant.abilities.push(demonic_ability_1);
		demonic_assistant.abilities.push(demonic_ability_2);
		demonic_assistant.abilities.push(demonic_ability_3);
		demonic_assistant.abilities.push(demonic_ability_4);
		demonic_assistant.abilities.push(demonic_ability_5);
		
	assistants.push(demonic_assistant);
		
	alien_assistant = new Assistant("Alien Assistant", function () {return "Alien Assistants increases all buildings&apos; work rate by (" + roundPlace(this.level * 0.1).toFixed(1) + "%). Over time Alien Assistants gain progress to higher levels, which can unlock new abilities <br>" + (this.level >= assistant_levels[1] ? "Next Intelligent Consumption: " + roundPlace((0.25/(1 + Math.pow(Math.E, -0.1 * (minigames[5].vars.research_points - 50)))) * 100).toFixed(2) + "%" : "") }, "images/assistant_alien.png", 4, 20);
	
		var alien_ability_1 = new Ability("Wild Experimentation", "Increases production and work rate of a random building by 25% until the next Wild Experimentation is activated. Also grants 60 progress to the next level.", "images/ability_alien_1.png", 4, 20, false, 60, function () {
			assistants[2].xp += 60;
			var found = false;
			while (!found) {
				var ran = Math.floor(Math.random() * buildings.length);
				if (buildings[ran].count >= 1) {
					found = true;
					alien_target = ran;
					UPDATE_BUILDINGS = true;
				}
			}
		});
		var alien_ability_2 = new Ability("Intelligent Consumption", "Consumes all research points and increases production for 120 seconds based on the total number of research points consumed this way.", "images/ability_alien_2.png", 4, 20, false, 3600, function () {
			consumption_bonus = (0.25/(1 + Math.pow(Math.E, -0.1 * (minigames[5].vars.research_points - 50))));
			buffs[21].activate(120);
			minigames[5].vars.research_points = 0;
		});
		var alien_ability_3 = new Ability("Inertia", "Activate to prevent production from changing for 20 seconds", "images/ability_alien_3.png", 4, 20, false, 3600, function () {buffs[22].activate(20);
		inertia = PRODUCTION;
		});
		var alien_ability_4 = new Ability("Alien Adaptation", "Increases the rate that assistants progress towards the next level by 50%.", "images/ability_alien_4.png", 4, 20, true, 0);
		var alien_ability_5 = new Ability("Temporal Gateway", "Resets the cooldowns of all other abilities for all assistants.", "images/ability_alien_5.png", 4, 20, false, 36000, function () {
			for (var i = 0; i < assistants.length; i++) {
				for (var j = 0; j < assistants[i].abilities.length; j++) {
					assistants[i].abilities[j].cd = assistants[i].abilities[j].base_cd
				}
			}
			assistants[2].abilities[4].cd -= 1;
		});
		
		alien_assistant.abilities.push(alien_ability_1);
		alien_assistant.abilities.push(alien_ability_2);
		alien_assistant.abilities.push(alien_ability_3);
		alien_assistant.abilities.push(alien_ability_4);
		alien_assistant.abilities.push(alien_ability_5);
	

	assistants.push(alien_assistant);
}