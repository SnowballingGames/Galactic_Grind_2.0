function save() {
    var save = {};
	save.VERSION = VERSION;
    save.CREDITS = CREDITS;
    save.BUY_COUNT = BUY_COUNT;
    save.CURRENT_TIER = CURRENT_TIER;
    save.TIER_1_COUNT = TIER_1_COUNT;
    save.TIER_2_COUNT = TIER_2_COUNT;
    save.PRODUCTION = PRODUCTION;
	save.OFFLINE_PRODUCTION = OFFLINE_PRODUCTION;
    save.CLOCK_TICKS = CLOCK_TICKS;
    save.GAME_SPEED = GAME_SPEED;
    save.PRODUCTION_MULTIPLIER = PRODUCTION_MULTIPLIER
    save.HELPING_HANDS = HELPING_HANDS
	save.stored_bonuses = stored_bonuses;
	save.alien_target = alien_target;
	save.stored_bonuses_enabled = stored_bonuses_enabled;
	save.consumption_bonus = consumption_bonus;
	save.inertia = inertia;
    save.NOW = Date.now();
	save.stats = stats;
    
    
    save.buildings = [];
    for (var i = 0; i < buildings.length; i++) {
        var building = buildings[i];
        save.buildings[i] = [];
        save.buildings[i][0] = building.count;   
        save.buildings[i][1] = building.unlocked;
        save.buildings[i][2] = [];
        
        for (var j = 0; j < building.buffs.length; j++) {
            save.buildings[i][2][j] = [];
            save.buildings[i][2][j][0] = building.buffs[j].id;
            save.buildings[i][2][j][1] = building.buffs[j].time; 
        }
        
        var stat_keys = Object.keys(building.stats);   
        save.buildings[i][3] = [];
        for (var k = 0; k < stat_keys.length; k++) {
            save.buildings[i][3][k] = [];
            save.buildings[i][3][k][0] = stat_keys[k];
            save.buildings[i][3][k][1] = building.stats[stat_keys[k]];
        }
    }
    
    save.upgrades = [];
    for (var i = 0; i < upgrades.length; i++) {
        save.upgrades[i] = [];
        save.upgrades[i][0] = upgrades[i].available;
        save.upgrades[i][1] = upgrades[i].bought;
    }
    
    save.buffs = [];
    for (var i = 0; i < buffs.length; i++) {
        save.buffs[i] = [];
        save.buffs[i][0] = buffs[i].active;
        save.buffs[i][1] = buffs[i].time;
        save.buffs[i][2] = buffs[i].max_time;
		save.buffs[i][3] = buffs[i].stack_count;
    }
	
	save.achievements = [];
    for (var i = 0; i < achievements.length; i++) {
        save.achievements[i] = [];
        save.achievements[i][0] = achievements[i].available;
        save.achievements[i][1] = achievements[i].unlocked;
    }
    
	save.minigame_vars = [];
	for (var i = 0; i < minigames.length; i++) {
		if (i == 5) {			
			save.minigame_vars[5] = [[],[]]
			
			for (var j = 0; j < minigames[5].vars.research_tree.length; j++) {
				save.minigame_vars[5][0][j] = minigames[5].vars.research_tree[j].bought;
			}
			save.minigame_vars[5][1] = minigames[5].vars.research_points;
			save.minigame_vars[5][2] = minigames[5].vars.researches_made;
			save.minigame_vars[5][3] = minigames[5].vars.research_time;
			
			continue
		}
		save.minigame_vars[i] = minigames[i].vars;
	}
    
	save.unlocks = [];
	for (var i = 0; i < unlocks.length; i++) {
		save.unlocks[i] = unlocks[i].unlocked;
	}
	
	save.subgames = [];
	for (var i = 0; i < subgames.length; i++) {
		save.subgames[i] = {};
		save.subgames[i].unlocked = subgames[i].unlocked;
		save.subgames[i].credits = subgames[i].credits;
		save.subgames[i].production = subgames[i].production;
		save.subgames[i].click_value = subgames[i].click_value;
		save.subgames[i].reset_count = subgames[i].reset_count;
		
		save.subgames[i].buildings = [];
		for (var j = 0; j < subgames[0].buildings.length; j++) {
			save.subgames[i].buildings[j] = [];
			save.subgames[i].buildings[j][0] = subgames[i].buildings[j].count;
			save.subgames[i].buildings[j][1] = subgames[i].buildings[j].unlocked;
			save.subgames[i].buildings[j][2] = subgames[i].buildings[j].available;
			save.subgames[i].buildings[j][3] = Math.ceil(subgames[i].buildings[j].cost);
		}
		
		save.subgames[i].upgrades = [];
		for (var j = 0; j < subgames[0].upgrades.length; j++) {
			save.subgames[i].upgrades[j] = [];
			save.subgames[i].upgrades[j][0] = subgames[i].upgrades[j].available;
			save.subgames[i].upgrades[j][1] = subgames[i].upgrades[j].bought;
		}
		
		var var_keys = Object.keys(subgames[0].vars);  
		save.subgames[i].vars = [];
		for (var j = 0; j < var_keys.length; j++) {
			save.subgames[i].vars[j] = [];
			save.subgames[i].vars[j][0] = var_keys[j];
			save.subgames[i].vars[j][1] = subgames[0].vars[var_keys[j]];
		}
	}
	
	save.assistants = [];
	for (var i = 0; i < assistants.length; i++) {
		save.assistants[i] = [];
		save.assistants[i][0] = assistants[i].unlocked;
		save.assistants[i][1] = assistants[i].level;
		save.assistants[i][2] = assistants[i].xp;
		save.assistants[i][3] = assistants[i].next_xp;
		save.assistants[i][4] = [];
		for (var j = 0; j < assistants[i].abilities.length; j++) {
			save.assistants[i][4][j] = assistants[i].abilities[j].cd;
		}
	}
	
	save.automation = [];
	for (var i = 0; i < automation.length; i++) {
		save.automation[i] = [];
		save.automation[i][0] = automation[i].autobuy;
		save.automation[i][1] = automation[i].vars;
	}
	
	save.settings = settings;
	save.hotkeys = hotkeys;
	
    localStorage.setObject("save_file", save);
	
	SAVE_TIME = 0;
}

function load() {
    var load = localStorage.getObject('save_file');
	var temp_version = VERSION;
    
    if (load) {
		if (!load.VERSION) {
			VERSION = 0.1
		}
		
        CREDITS = load.CREDITS;
        BUY_COUNT = 1;
        CURRENT_TIER = 1;
        //TIER_1_COUNT = load.TIER_1_COUNT;
		OFFLINE_PRODUCTION = load.OFFLINE_PRODUCTION;
        PRODUCTION = load.PRODUCTION;
        GAME_SPEED = load.GAME_SPEED;
        PRODUCTION_MULTIPLIER = load.PRODUCTION_MULTIPLIER;
		if (load.HELPING_HANDS) {HELPING_HANDS = load.HELPING_HANDS;}
		if (load.stored_bonuses) {stored_bonuses = load.stored_bonuses;}
		if (load.alien_target) {alien_target = load.alien_target;}
		if (load.stats) {stats = load.stats;}
		if (load.stored_bonuses_enabled) {stored_bonuses_enabled = load.stored_bonuses_enabled}
		if (load.consumption_bonus) {consumption_bonus = load.consumption_bonus}
		if (load.inertia) {inertia = load.inertia}
		
        if (load.buildings) {
            for (var i = 0; i < load.buildings.length; i++) {
                buildings[i].count = load.buildings[i][0];   
                buildings[i].available = load.buildings[i][1];
                
                var temp_buffs = load.buildings[i][2];
                for (var j = 0; j < temp_buffs.length; j++) {
                    buildings[i].addBuff(building_buffs[load.buildings[i][2][j][0]])
                    buildings[i].buffs[j].time = load.buildings[i][2][j][1];
                }
                var temp_stats = load.buildings[i][3];
                for (var k = 0; k < temp_stats.length; k++) {
                    buildings[i].stats[temp_stats[k][0]] = temp_stats[k][1];   
                }
                
                if (buildings[i].count >= 1) {
                    buildings[i].createHTML();   
                    buildings[i].updateHTML();   
                }
				
				if (buildings[i].count != 0) {
					buildings[i].unlocked = true;
				}
            }
			
			for (var i = 0; i < 7; i++) {
				if (buildings[i].available) {
					TIER_1_COUNT += 1;
				}
			}
			for (var i = 7; i < 14; i++) {
				if (buildings[i].available) {
					TIER_2_COUNT += 1;
				}
			}
			testTierTwo();
			testTierThree();
        }
        
        if (load.upgrades) {
            for (var i = 0; i < load.upgrades.length; i++) {
                upgrades[i].available = load.upgrades[i][0];
                upgrades[i].bought = load.upgrades[i][1];
            }
            updateUpgrades();
        }
		
		if (load.achievements) {
            for (var i = 0; i < load.achievements.length; i++) {
                achievements[i].available = load.achievements[i][0];
                achievements[i].unlocked = load.achievements[i][1];
            }
            updateAchievements();
        }
        
        if (load.buffs) {
             for (var i = 0; i < load.buffs.length; i++) {
                buffs[i].active = load.buffs[i][0];
                buffs[i].time = load.buffs[i][1];
                buffs[i].max_time = load.buffs[i][2];
                buffs[i].stack_count = load.buffs[i][3];
				
				if (buffs[i].time >= 1) {
					buffs[i].createHTML();
				}
            }   
        }
		
		if (load.minigame_vars) {
			for (var i = 0; i < load.minigame_vars.length; i++) {
				if (i == 5) {
					for (var j = 0; j < load.minigame_vars[5][0].length; j++) {
						minigames[5].vars.research_tree[j].bought = load.minigame_vars[5][0][j];
						
						if (minigames[5].vars.research_tree[j].bought != 0 ) {
							minigames[5].vars.research_tree[j].researched = true;
						}
					}
					
					minigames[5].vars.research_points = load.minigame_vars[5][1];
					minigames[5].vars.researches_made = load.minigame_vars[5][2];
					minigames[5].vars.research_time = load.minigame_vars[5][3];
					
					continue
				}
				
				
				minigames[i].vars = load.minigame_vars[i];
			}
		}
		
		if (load.unlocks) {
			for (var i = 0; i < load.unlocks.length; i++) {
				unlocks[i].unlocked = load.unlocks[i];
			}	
		}
		
		if (load.settings) {
			settings = load.settings;
			
			changeSaveTime(null, settings.autosave_rate);
		}
		
		if (load.subgames) {
			for (var i = 0; i < load.subgames.length; i++) {
				subgames[i].unlocked = load.subgames[i].unlocked;
				subgames[i].credits = load.subgames[i].credits;
				subgames[i].production = load.subgames[i].production;
				subgames[i].click_value = load.subgames[i].click_value;
				subgames[i].reset_count = load.subgames[i].reset_count;
				
				for (var j = 0; j < load.subgames[i].buildings.length; j++) {
					subgames[i].buildings[j].count = load.subgames[i].buildings[j][0];
					subgames[i].buildings[j].unlocked = load.subgames[i].buildings[j][1];
					subgames[i].buildings[j].available = load.subgames[i].buildings[j][2];
					subgames[i].buildings[j].cost = load.subgames[i].buildings[j][3];
				}				
				
				for (var j = 0; j < load.subgames[i].upgrades.length; j++) {
					subgames[i].upgrades[j].available = load.subgames[i].upgrades[j][0];
					subgames[i].upgrades[j].bought = load.subgames[i].upgrades[j][1];
				}
				
				for (var j = 0; j < load.subgames[i].vars.length; j++) {
					subgames[i].vars[load.subgames[i].vars[j][0]] = load.subgames[i].vars[j][1];
				}
			}
		}
		
		if (load.assistants) {
			for (var i = 0; i < load.assistants.length; i++) {
				assistants[i].unlocked = load.assistants[i][0];
				assistants[i].level = load.assistants[i][1];
				assistants[i].xp = load.assistants[i][2];
				assistants[i].next_xp = load.assistants[i][3];
				for (var j = 0; j < load.assistants[i][4].length; j++) {
					assistants[i].abilities[j].cd = load.assistants[i][4][j];
				}
			}
		}
		
		if (load.hotkeys) {
			hotkeys = load.hotkeys;
		}
		
		if (load.automation) {
			for (var i = 0; i < load.automation.length; i++) {
				automation[i].autobuy = load.automation[i][0];
				automation[i].vars = load.automation[i][1];
			}
		}
		
		addClockTicks(load.CLOCK_TICKS);             
		updateClockDisplay();
		$("#speed_display").html(GAME_SPEED + "x");
		$("#time_remaining").html(secondsToTime(Math.round(CLOCK_TICKS)));
		
		//
		// Add Version Update Patches
		//
		if (settings.menu_close == undefined) {settings.menu_close = true}
		if (automation[4].vars.auto_gold_to_cash == undefined) {automation[4].vars.auto_gold_to_cash = false}
		if (automation[4].vars.auto_cash_to_gold == undefined) {automation[4].vars.auto_cash_to_gold = false}
		if (automation[8].vars.auto_path == undefined) {automation[4].vars.auto_path = false}
		

		if (load.NOW) {offlineProduction((Date.now() - load.NOW) / 1000);setTimeout(updateClockDisplay, 1000)}
    }
	
	UPDATE_UPGRADES = true;
	$("#tier_cost_display").html(fancyNumber(tierPrice(CURRENT_TIER)));
	
	changeTier(CURRENT_TIER);
	
	if (minigames[9].vars.target_buff != null) {
		var temp = minigames[9].vars.target_buff;
		minigames[9].vars.target_buff = null;
		buffs[temp].toggleFreeze();
	}
	

}

function saveTick(rt) {
	SAVE_TIME += rt;
	
	if (SAVE_TIME >= SAVE_MAX_TIME) {
		SAVE_TIME = 0;
		save();
	}

	$("#save_element").css('height', SAVE_TIME/SAVE_MAX_TIME*36 + "px")
	
}

function exportSave() {
	if (localStorage.getItem('save_file')) {
		$("#export_textarea").val(btoa(JSON.stringify(localStorage.getItem('save_file')).replace(/\\/g,'').slice(1, -1)));
		document.getElementById("export_textarea").focus();
		document.getElementById("export_textarea").setSelectionRange(0, 30000);
		$("#save_help").html("Copy this save, and import it when you wish to load this save");
	} else {
		$("#save_help").html("The game is currently not save, most likely you have auto-saving disabled");	
	}
}
function importSave() {
	//var load = JSON.parse(atob($("#export_textarea").html()));
	//console.log(load);
	localStorage.setItem('save_file', atob($("#export_textarea").val()));
	
	buildings = [];
	buffs = [];
	upgrades = [];
	unlocks = [];
	minigames = [];
	subgames = [];
	tutorial_list = [];
	achievements = [];
	assistants = [];
	automation = [];
	popup_log = [];
	tutorial_running = false;
	current_tutorial = null;
	CHANGE_HOTKEY = false;
	PRODUCTION = 0;
	CLOCK_TICKS = 0;
	var tip_queue = [];
	var pips = [];
	var tips = [];
	var queue_timer = 0;
	
	stored_bonuses = [];
	stored_bonuses_enabled = true;
	angelic_release = false;
	angelic_protection = false;
	demonic_vengeance = 0;
	vengeance_bonus = 0;
	alien_target = -1;
	consumption_bonus = 0;
	inertia = 0;
	
	TIER_1_COUNT = 0;
	TIER_2_COUNT = 0;
	TIER_3_COUNT = 0;
	
	TIER_2_UNLOCKED = false;
	TIER_3_UNLOCKED = false;
	
	TIER_ONE_COUNT = 0;
	
	stats = {
		time_played_offline : 0,
		time_played : 0,
		time_played_real : 0,
		time_extra_seconds : 0,
		total_clicks : 0,
		click_value : 0,
		click_credits : 0,
		credits_earned : 0,
		credits_earned : 0,
	}
	
	init();
	
	changeTier(2);
	changeTier(1);

	//load();
	
}

function wipeSave() {
	localStorage.removeItem('save_file');
	
	
	CREDITS = 0;
	PRODUCTION = 0;
	OFFLINE_PRODUCTION = 0;
	CLOCK_TICKS = 0;
	SAVE_TIME = 0;
	UNDO_BUILDING = -1;
	COST_REDUCTION = 1;
	GAME_SPEED = 1;
	WORLD_TIME = 0;
	SHOWN_TAB = -1;
	TIER_2_UNLOCKED = false;
	TIER_3_UNLOCKED = false;
	
	tutorial_list = [];
	popup_log = [];
	tutorial_running = false;
	current_tutorial = null;
	buildings = [];
	buffs = [];
	upgrades = [];
	unlocks = [];
	minigames = [];
	subgames = [];
	achievements = [];
	assistants = [];
	automation = [];
	
	stored_bonuses = [];
	stored_bonuses_enabled = true;
	angelic_release = false;
	angelic_protection = false;
	demonic_vengeance = 0;
	vengeance_bonus = 0;
	alien_target = -1;
	consumption_bonus = 0;
	inertia = 0;
	
	var tip_queue = [];
	var pips = [];
	var tips = [];
	var queue_timer = 0;
	
	TIER_1_COUNT = 0;
	TIER_2_COUNT = 0;
	TIER_3_COUNT = 0;
	
	TIER_ONE_COUNT = 0;
	
	stats = {
		time_played_offline : 0,
		time_played : 0,
		time_played_real : 0,
		time_extra_seconds : 0,
		total_clicks : 0,
		click_value : 0,
		click_credits : 0,
		credits_earned : 0,
		credits_earned : 0,
	}
	
	init();
	
	changeTier(2);
	changeTier(1);
	changeBuyCount(1);
	
	$("#tooltip").hide();
	$("#save_popup").hide();
	$("#wipe_popup").hide();
	$("#click_farm_clicker").hide();
	$("#detail_container").hide();
	$("#global_container").hide();
	$("#fullscreen_research").hide();
	$("#close_fullscreen").hide();
	$("#buff_container").hide();
	
	$("#subgame_background").remove();
	$("#subgame_reset_background").remove();
	$(".building_tab").remove();
	
}


Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}