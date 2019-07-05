var research_image;
var isDown = false;

function init() {
    $("#popup_text").css("opacity", 0);
    
    initBuildings();
    initUpgrades();
    initMinigames();
    initTips();
    initUnlocks();
	initSubgames();
	initAssistants();
	initBuffs();
	initHotkeys();
	initSubTutorials();
	initAchievements();
	initAutomation();
	//tutorial
	
	research_image = new Image();
    research_image.src = "images/research_sheet.png";
    
	load();

	updateUnlocks();
	updateSubgameButtons();
	updateAchievements();
    
    fastTick();
    slowTick();
	effectTick();
	
	//tutorial_list[0].trigger();
}
$(document).ready(function() { 
    init();
});
