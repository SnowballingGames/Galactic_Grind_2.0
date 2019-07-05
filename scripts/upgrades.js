var upgrades = [];


function Upgrade(display_name, name, description, flavor_text, x, y, price, effect, onBuy, evalTooltip) {
    this.display_name = display_name;
    this.name = name;
    this.price = price;
    this.description = description;
    this.flavor_text = flavor_text;
    this.effect = effect;
    this.onBuy = onBuy || function () {};
    this.evalTooltip = evalTooltip || function () {};
    this.available = false;
    this.bought = false;
    this.x = x * 48;
    this.y = y * 48;
    this.buy = function () {
        if (CREDITS >= this.price && !this.bought) {
            CREDITS -= this.price;
            this.bought = true;
            UPDATE_UPGRADES = true;
            hideTooltip();
			updateUnlocks();
			this.onBuy();
			
			if (upgrades[146].bought) {
				buildings[10].count += 1;
				UPDATE_BUILDINGS = true;
			}
			
			if (minigames[12].vars.accel_target == 2) {
				minigames[12].vars.accel_bonus = Math.min(minigames[12].vars.accel_bonus + 0.05 , 0.15);
				minigames[12].vars.accel_time = 30;
				if (minigames[12].vars.accel_bonus == 0.15) {
					upgrades[165].makeAvailable();
					if (upgrades[163].available && upgrades[164].available && upgrades[165].available) {
						upgrades[166].makeAvailable();
					}
				}
			}
			
			if (tutorial_list[1].running) {
				current_tutorial.stepForward();
			}
        }
    }
    this.makeAvailable = function () {
        if (!this.available) {
            this.available = true;
            UPDATE_UPGRADES = true;
        }
    }
    this.updateHTML = function () {
        if (this.available && !this.bought) {
            var upgrade = $(document.createElement("div"));
			var expanded_description = upgradeDescription(this);
            upgrade.attr("style", "cursor:pointer;float:left;height:48px;width:48px;background:url(images/upgrade_sheet.png) -"+this.x+"px -"+this.y+"px;");
            upgrade.attr("onmouseover","updateUpgradeColor("+this.price+", CREDITS);tooltip(this, -"+this.x/48+", -"+this.y/48+", '"+this.display_name+"', '"+expanded_description+"')");
            upgrade.attr("onmouseleave", "hideTooltip()");
            upgrade.attr("onclick", "upgrades["+upgrades.indexOf(this)+"].buy();");
			upgrade.attr("id", this.name);
            
            $("#upgrades_container").append(upgrade);
        }
    };
}

function initUpgrades() {
    var upgrade_0 = new Upgrade( //{ Cultist Upgrades
        "Unorthodoxy",
        "unorthodoxy",
        "Increases the base production of all cultists by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        1,
        tweaker.upgrades.building_price_1,
        function () {buildings[0].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_1 = new Upgrade( //{
        "Cult Meeting",
        "cult_meeting",
        "Increases the base production of all cultists by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        1,
        tweaker.upgrades.building_price_2,
        function () {buildings[0].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_2 = new Upgrade( //{
        "Secret Rituals",
        "clandestine_rituals",
        "Increases the base production of all cultists by "+tweaker.upgrades.building_base_3+".",
        "",
        2,
        1,
		tweaker.upgrades.building_price_3,
        function () {buildings[0].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_3 = new Upgrade( //{
        "Occult Festivals",
        "occult_festivals",
        "Increases the base production of all cultists by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        1,
		tweaker.upgrades.building_price_4,
        function () {buildings[0].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_4 = new Upgrade( //{
        "Ritual Sacrifice",
        "ritual_sacrifice",
        "Increases the base production of all cultists by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        1,
		tweaker.upgrades.building_price_5,
        function () {buildings[0].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_5 = new Upgrade( //{
        "Blood Tithes",
        "blood_tithes",
        "Increases the base production of all cultists by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        1,
		tweaker.upgrades.building_price_6,
        function () {buildings[0].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}
    var upgrade_6 = new Upgrade( //{
        "Blood Debt",
        "blood_debt",
        "After activating a ritual, another one can be activated regardless of whether or not you have enough blood. This can reduce your blood into the negatives.",
        "",
        6,
        1,
		100000,
        function () {},
        function () {},
        function () {},
    ); //}
    var upgrade_7 = new Upgrade( //{
        "Occult Summoning",
        "occult_summoning",
        "Instantly grants 10 free cultists (their price increases accordingly).",
        "",
        7,
        1,
		5000000,
        function () {},
        function () {buildings[0].count += 10; buildings[0].unlockUpgrades();UPDATE_BUILDINGS = true;},
        function () {},
    ); //}
    var upgrade_8 = new Upgrade( //{
        "Blood Fast",
        "blood_fast",
        "Increases production by 10% when no bonuses are currently active.",
        "",
        8,
        1,
		5000000000,
        function () {if (BUFFLESS) {PRODUCTION_MULTIPLIER *= 1.1}},
        function () {},
        function () {},
    ); //}
    var upgrade_9 = new Upgrade( //{
        "Occult Oversight",
        "Occult Oversight",
        "Increases value from clicking based on how many rituals you have activated.",
        "",
        9,
        1,
		50000000000,
        function () {CLICK_PRODUCTION += 0.005 + (Math.sqrt(minigames[0].vars.rituals_performed/10)/10) * 0.01;},
        function () {},
        function () {return Math.round((0.005 + (Math.sqrt(minigames[0].vars.rituals_performed/10)/10) * 0.01) * 1000)/10 + "% of production";},
    ); //}	Occult Oversight
    var upgrade_10 = new Upgrade( //{ Mine Upgrades
        "Deeper Mines",
        "deeper_mines",
        "Increases the base production of all mines by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        2,
        tweaker.upgrades.building_price_1,
        function () {buildings[1].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_11 = new Upgrade( //{
        "Davy Lamps",
        "davy_lamps",
        "Increases the base production of all mines by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        2,
        tweaker.upgrades.building_price_2,
        function () {buildings[1].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_12 = new Upgrade( //{
        "Advanced Bores",
        "advanced_bores",
        "Increases the base production of all mines by "+tweaker.upgrades.building_base_3+".",
        "",
        2,
        2,
		tweaker.upgrades.building_price_3,
        function () {buildings[1].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_13 = new Upgrade( //{
        "Fools Gold",
        "",
        "Increases the base production of all mines by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        2,
		tweaker.upgrades.building_price_4,
        function () {buildings[1].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_14 = new Upgrade( //{
        "Refined Explosives",
        "refined_explosives",
        "Increases the base production of all mines by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        2,
		tweaker.upgrades.building_price_5,
        function () {buildings[1].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_15 = new Upgrade( //{
        "Synthetic Gold",
        "syntehtic_gold",
        "Increases the base production of all mines by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        2,
		tweaker.upgrades.building_price_6,
        function () {buildings[1].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}
    var upgrade_16 = new Upgrade( //{
        "Gold Rush",
        "gold_rush",
        "After Spending gold game speed is increased by 50% for 15 seconds.",
        "",
        6,
        2,
		100000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_17 = new Upgrade( //{
        "Golden Deeds",
        "golden_deeds",
        "Every Gold bar mined from now on permanently increases the production of mines by 0.2%. This persists through resets.",
        "",
        7,
        2,
		5000000,
        function () {buildings[1].production_multiplier *= 1 + minigames[1].vars.golden_deeds * 0.002},
        function () {},
        function () {return Math.round(minigames[1].vars.golden_deeds * 0.2 * 10) / 10 + "%"},
	)//}
    var upgrade_18 = new Upgrade( //{
        "Coin Clipping",
        "coin_clipping",
        "Decreases the time it takes to mine a gold bar by 10 seconds.",
        "",
        8,
        2,
		5000000000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_19 = new Upgrade( //{
        "Gold Reserves",
        "gold_reserves",
        "Instantly grants 100 gold bars.",
        "",
        9,
        2,
		10000000000,
        function () {},
        function () {minigames[1].vars.gold += 100;},
        function () {},
	)//}
    var upgrade_20 = new Upgrade( //{ Additive Click Upgrades
        "Improved Clicks",
        "improved_clicks",
        "Increases value of each click by 4.",
        "",
        0,
        3,
		20,
        function () {CLICK_BASE += 4},
        function () {},
        function () {},
	)//}
    var upgrade_21 = new Upgrade( //{
        "Improved Clicks II",
        "improved_clicks_ii",
        "Increases value of each click by 20.",
        "",
        1,
        3,
		500,
        function () {CLICK_BASE += 20},
        function () {},
        function () {},
	)//}
    var upgrade_22 = new Upgrade( //{
        "Improved Clicks III",
        "improved_clicks_iii",
        "Increases value of each click by 75.",
        "",
        2,
        3,
		3000,
        function () {CLICK_BASE += 75},
        function () {},
        function () {},
	)//}
	var upgrade_23 = new Upgrade( //{ 
        "Accelerated Clicking",
        "accelerated_clicking",
        "Increases the value from clicking by 70 per click + 0.7 for each previous click.",
        "",
        3,
        3,
		2000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_24 = new Upgrade( //{ 
        "Improved Clicks IV",
        "improved_clicks_iv",
        "Increases value of each click by 500.",
        "",
        4,
        3,
		50000,
        function () {CLICK_BASE += 500},
        function () {},
        function () {},
	)//}
	var upgrade_25 = new Upgrade( //{
        "Improved Clicks V",
        "improved_clicks_v",
        "Increases value of each click by 9000.",
        "",
        5,
        3,
		500000,
        function () {CLICK_BASE += 9000},
        function () {},
        function () {},
	)//}
	var upgrade_26 = new Upgrade( //{ Percentage Click Upgrades
        "Improved Clicks VI",
        "improved_clicks_VI",
        "Increases value of each click by 1% of total production.",
        "",
        6,
        3,
		1000000,
        function () {CLICK_PRODUCTION += 0.01},
        function () {},
        function () {},
	)//}
	var upgrade_27 = new Upgrade( //{
        "Improved Clicks VI",
        "improved_clicks_vi",
        "Increases value of each click by 1% of total production.",
        "",
        7,
        3,
		1000000000,
        function () {CLICK_PRODUCTION += 0.01},
        function () {},
        function () {},
	)//}
	var upgrade_28 = new Upgrade( //{
        "Improved Clicks VII",
        "improved_clicks_vii",
        "Increases value of each click by 1% of total production.",
        "",
        8,
        3,
		1000000000000,
        function () {CLICK_PRODUCTION += 0.01},
        function () {},
        function () {},
	)//}
	var upgrade_29 = new Upgrade( //{
        "Improved Clicks IX",
        "improved_clicks_ix",
        "Increases value of each click by 1% of total production.",
        "",
        9,
        3,
		1000000000000000,
        function () {CLICK_PRODUCTION += 0.01},
        function () {},
        function () {},
	)//}
    var upgrade_30 = new Upgrade( //{ Gambler Upgrades
        "Loaded Dice",
        "loaded_dice",
        "Increases the base production of all gamblers by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        4,
        tweaker.upgrades.building_price_1,
        function () {buildings[2].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_31 = new Upgrade( //{
        "Blackjack",
        "blackjack",
        "Increases the base production of all gamblers by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        4,
        tweaker.upgrades.building_price_2,
        function () {buildings[2].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_32 = new Upgrade( //{
        "21",
        "21",
        "Increases the base production of all gamblers by "+tweaker.upgrades.building_base_3+".",
        "It is not blackjack if we call it 21.",
        2,
        4,
		tweaker.upgrades.building_price_3,
        function () {buildings[2].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_33 = new Upgrade( //{
        "Hearts",
        "hearts",
        "Increases the base production of all gamblers by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        4,
		tweaker.upgrades.building_price_4,
        function () {buildings[2].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_34 = new Upgrade( //{
        "Spades",
        "spades",
        "Increases the base production of all gamblers by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        4,
		tweaker.upgrades.building_price_5,
        function () {buildings[2].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_35 = new Upgrade( //{
        "Euchre",
        "euchre",
        "Increases the base production of all gamblers by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        4,
		tweaker.upgrades.building_price_6,
        function () {buildings[2].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}
    var upgrade_36 = new Upgrade( //{
        "Redeal",
        "redeal",
        "Grants the ability to shuffle all the cards into the deck once only 3 or less cards are remaining.",
        "",
        6,
        4,
		100000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_37 = new Upgrade( //{
        "Marked Cards",
        "marked_cards",
        "Grants the ability to peek at the top card of the deck twice every 20 minutes.",
        "",
        7,
        4,
		5000000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_38 = new Upgrade( //{
        "Bowers",
        "bowers",
        "Adds two more cards with positive effects to the deck.",
        "",
        8,
        4,
		5000000000,
        function () {},
        function () {minigames[2].vars.deck.unshift(8);minigames[2].vars.deck.unshift(9);},
        function () {},
	)//}
    var upgrade_39 = new Upgrade( //{
        "Patience",
        "patience",
        "Doubles the maximum number of discards and draws that can be stored at one time.",
        "",
        9,
        4,
		50000000000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_40 = new Upgrade( //{ Power Plant Upgrades
        "Electric Discharge",
        "electric_discharge",
        "Increases the base production of all power plants by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        5,
        tweaker.upgrades.building_price_1,
        function () {buildings[3].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_41 = new Upgrade( //{
        "Tesla Coils",
        "tesla_coils",
        "Increases the base production of all power plants by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        5,
        tweaker.upgrades.building_price_2,
        function () {buildings[3].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_42 = new Upgrade( //{
        "Supercharge",
        "supercharge",
        "Increases the base production of all power plants by "+tweaker.upgrades.building_base_3+".",
        "",
        2,
        5,
		tweaker.upgrades.building_price_3,
        function () {buildings[3].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_43 = new Upgrade( //{
        "Storm&#39;s Eye",
        "storms_eye",
        "Increases the base production of all power plants by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        5,
		tweaker.upgrades.building_price_4,
        function () {buildings[3].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_44 = new Upgrade( //{
        "Lightning Rods",
        "lightning_rods",
        "Increases the base production of all power plants by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        5,
		tweaker.upgrades.building_price_5,
        function () {buildings[3].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_45 = new Upgrade( //{
        "Crow Storm",
        "crow_storm",
        "Increases the base production of all power plants by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        5,
		tweaker.upgrades.building_price_6,
        function () {buildings[3].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}
    var upgrade_46 = new Upgrade( //{
        "Batteries",
        "batteries",
        "Increases the maximum amount of power that can be stored by 50",
        "",
        6,
        5,
		100000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_47 = new Upgrade( //{
        "Turbo Charge",
        "turbo_charge",
        "The bonus granted to a powered building is increased from 50% to 60%",
        "",
        7,
        5,
		5000000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_48 = new Upgrade( //{
        "Gathering Storm",
        "gathering_storm",
        "Increases production based on the amount of power produced",
        "",
        8,
        5,
		5000000000,
        function () {PRODUCTION_MULTIPLIER *= 1 + (Math.pow(minigames[3].vars.power_generated, 0.25)*0.01)},
        function () {},
        function () {return (Math.pow(minigames[3].vars.power_generated, 0.25)).toFixed(2) + "%"},
	)//}
    var upgrade_49 = new Upgrade( //{
        "Static Charge",
        "Static Charge",
        "Increases power generation by 0.25 per second",
        "",
        9,
        5,
		10000000000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_50 = new Upgrade( //{ Bank Upgrades
        "Accrued Interest",
        "accrued_interest",
        "Increases the base production of all banks by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        6,
        tweaker.upgrades.building_price_1,
        function () {buildings[4].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_51 = new Upgrade( //{
        "Credit Cards",
        "credit_cards",
        "Increases the base production of all banks by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        6,
        tweaker.upgrades.building_price_2,
        function () {buildings[4].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_52 = new Upgrade( //{
        "Mortgages",
        "mortgages",
        "Increases the base production of all banks by "+tweaker.upgrades.building_base_3+".",
        "",
        2,
        6,
		tweaker.upgrades.building_price_3,
        function () {buildings[4].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_53 = new Upgrade( //{
        "Billing Errors",
        "billing_errors",
        "Increases the base production of all banks by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        6,
		tweaker.upgrades.building_price_4,
        function () {buildings[4].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_54 = new Upgrade( //{
        "Compound Interest",
        "compound_interest",
        "Increases the base production of all banks by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        6,
		tweaker.upgrades.building_price_5,
        function () {buildings[4].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_55 = new Upgrade( //{
        "Endless Fees",
        "endless_fees",
        "Increases the base production of all banks by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        6,
		tweaker.upgrades.building_price_6,
        function () {buildings[4].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}	
    var upgrade_56 = new Upgrade( //{
        "Hedge Funds",
        "hedge_funds",
        "In addition to the normal return on investment, investing will grant 20s seconds worth of current production after completing an investment.",
        "",
        6,
        6,
		100000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_57 = new Upgrade( //{
        "Economic Bubble",
        "economic_bubble",
        "Increases production by 12% for 1 minute after an investment is completed.",
        "",
        7,
        6,
		5000000,
        function () {},
        function () {},
        function () {return Math.round(minigames[4].vars.charity_counters) + "%"},
	)//}
    var upgrade_58 = new Upgrade( //{
        "Charity Investment",
        "charity_investment",
        "Increases production of banks by 1% for each investment activated from now on. This persists through resets.",
        "",
        8,
        6,
		5000000000,
        function () {PRODUCTION_MULTIPLIER *= 1 + (Math.pow(minigames[3].vars.power_generated, 0.25)*0.01)},
        function () {},
        function () {return (Math.pow(minigames[3].vars.power_generated, 0.25)).toFixed(2) + "%"},
	)//}
    var upgrade_59 = new Upgrade( //{
        "Lucky Investment",
        "lucky_investment",
        "Every Time an investment is completed is there is a chance to get a free bank",
        "",
        9,
        6,
		10000000000,
        function () {},
        function () {},
        function () {return Math.round(Math.pow(0.99, buildings[4].count) / 2 * 1000) / 10 + "% Chance"},
	)//}
    var upgrade_60 = new Upgrade( //{ Research Upgrades
        "Mad Scientists",
        "mad_scientists",
        "Increases the base production of all research centers  by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        7,
        tweaker.upgrades.building_price_1,
        function () {buildings[5].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_61 = new Upgrade( //{
        "Secret Laboratories",
        "secert_labrotories",
        "Increases the base production of all research centers  by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        7,
        tweaker.upgrades.building_price_2,
        function () {buildings[5].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_62 = new Upgrade( //{
        "Intelligence Booster",
        "intelligence_booster",
        "Increases the base production of all research centers  by "+tweaker.upgrades.building_base_3+".",
        "",
        2,
        7,
		tweaker.upgrades.building_price_3,
        function () {buildings[5].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_63 = new Upgrade( //{
        "Endless Experiments",
        "endless_experiments",
        "Increases the base production of all research centers  by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        7,
		tweaker.upgrades.building_price_4,
        function () {buildings[5].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_64 = new Upgrade( //{
        "Flynn Effect",
        "flynn_effect",
        "Increases the base production of all research centers  by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        7,
		tweaker.upgrades.building_price_5,
        function () {buildings[5].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_65 = new Upgrade( //{
        "Endless Epiphanies",
        "endless_epiphanies",
        "Increases the base production of all research centers by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        7,
		tweaker.upgrades.building_price_6,
        function () {buildings[5].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}
    var upgrade_66 = new Upgrade( //{ Factory Upgrades
        "Cheap Labor",
        "cheap_labor",
        "Increases the base production of all factories by "+tweaker.upgrades.building_base_1+".",
        "",
        0,
        8,
        tweaker.upgrades.building_price_1,
        function () {buildings[6].production += tweaker.upgrades.building_base_1;},
        function () {},
        function () {},
    ); //}
    var upgrade_67 = new Upgrade( //{
        "Lower Wages",
        "lower_wages",
        "Increases the base production of all factories by "+tweaker.upgrades.building_base_2+".",
        "",
        1,
        8,
        tweaker.upgrades.building_price_2,
        function () {buildings[6].production += tweaker.upgrades.building_base_2;},
        function () {},
        function () {},
    ); //}
    var upgrade_68 = new Upgrade( //{
        "Foreign Workers",
        "foreign_workers",
        "Increases the base production of all factories by "+tweaker.upgrades.building_base_3+".",
        "",
        2,
        8,
		tweaker.upgrades.building_price_3,
        function () {buildings[6].production += tweaker.upgrades.building_base_3;},
        function () {},
        function () {},
    ); //}
    var upgrade_69 = new Upgrade( //{
        "Child Labor",
        "child_labor",
        "Increases the base production of all factories by "+fancyNumber(tweaker.upgrades.building_base_4)+".",
        "",
        3,
        8,
		tweaker.upgrades.building_price_4,
        function () {buildings[6].production += tweaker.upgrades.building_base_4;},
        function () {},
        function () {},
    );//}
    var upgrade_70 = new Upgrade( //{
        "Improved Manufacturing",
        "improved_manufacturing",
        "Increases the base production of all factories by "+fancyNumber(tweaker.upgrades.building_base_5)+".",
        "",
        4,
        8,
		tweaker.upgrades.building_price_5,
        function () {buildings[6].production += tweaker.upgrades.building_base_5;},
        function () {},
        function () {},
    ); //}
    var upgrade_71 = new Upgrade( //{
        "Assembly Line",
        "assembly_line",
        "Increases the base production of all factories by "+fancyNumber(tweaker.upgrades.building_base_6)+".",
        "",
        5,
        8,
		tweaker.upgrades.building_price_6,
        function () {buildings[6].production += tweaker.upgrades.building_base_6;},
        function () {},
        function () {},
	)//}   
	var upgrade_72 = new Upgrade( //{ Beginning Rush Upgrades
        "Beginning Rush",
        "beginning_rush",
        "Grants 60 extra seconds, which can be used to speed up time. (Note this is a one time use upgrade)",
        "",
        6,
        7,
		10000,
        function () {},
        function () {addClockTicks(60)},
        function () {},
	)//}
	var upgrade_73 = new Upgrade( //{
        "Beginning Rush II",
        "beginning_rush_ii",
        "Grants 60 extra seconds, which can be used to speed up time. (Note this is a one time use upgrade)",
        "",
        7,
        7,
		1000000,
        function () {},
        function () {addClockTicks(60)},
        function () {},
	)//}
	var upgrade_74 = new Upgrade( //{
        "Beginning Rush III",
        "beginning_rush_iii",
        "Grants 90 extra seconds, which can be used to speed up time. (Note this is a one time use upgrade)",
        "",
        8,
        7,
		100000000,
        function () {},
        function () {addClockTicks(90)},
        function () {},
	)//}
	var upgrade_75 = new Upgrade( //{
        "Beginning Rush IV",
        "beginning_rush_iv",
        "Grants 300 extra seconds, which can be used to speed up time. (Note this is a one time use upgrade)",
        "",
        9,
        7,
		10000000000,
        function () {},
        function () {addClockTicks(300)},
        function () {},
	)//}
	var upgrade_76 = new Upgrade( //{ //Improved Production Upgrades
        "Improved Production",
        "improved_production",
        "Increases production of all buildings by 16",
        "",
        6,
        8,
		12000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_77 = new Upgrade( //{
        "Improved Production II",
        "improved_production_ii",
        "Increases production of all buildings by 300",
        "",
        7,
        8,
		80000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_78 = new Upgrade( //{
        "Improved Production III",
        "improved_production_iii",
        "Increases production of all buildings by 4500",
        "",
        8,
        8,
		15000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_79 = new Upgrade( //{
        "Improved Production IV",
        "improved_production_iv",
        "Increases production of all buildings by 100000",
        "",
        9,
        8,
		1500000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_80 = new Upgrade( //{ 25 Billion Building Upgrades
        "Blood Festival",
        "blood_festival",
        "Each cultist increases the base production of all cultists by 8000.",
        "",
        0,
        9,
		20000000000,
        function () {buildings[0].production += buildings[0].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[0].count) * 8000)},
	)//}
	var upgrade_81 = new Upgrade( //{
        "Forced Levy",
        "forced_levy",
        "Each mine increases the base production of all mine by 8000.",
        "",
        1,
        9,
		20000000000,
        function () {buildings[1].production += buildings[1].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[1].count) * 8000)},
	)//}
	var upgrade_82 = new Upgrade( //{
        "Eye Spy",
        "eye_spy",
        "Each gambler increases the base production of all gamblers by 8000.",
        "",
        2,
        9,
		20000000000,
        function () {buildings[2].production += buildings[2].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[2].count) * 8000)},
	)//}
	var upgrade_83 = new Upgrade( //{
        "Tesla Coils",
        "tesla_coils",
        "Each power plant increases the base production of all power plants by 8000.",
        "",
        3,
        9,
		20000000000,
        function () {buildings[3].production += buildings[3].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[3].count) * 8000)},
	)//}
	var upgrade_84 = new Upgrade( //{
        "Pyramid Scheme",
        "pyramid_scheme",
        "Each bank increases the base production of all banks by 8000.",
        "",
        4,
        9,
		20000000000,
        function () {buildings[4].production += buildings[4].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[4].count) * 8000)},
	)//}
	var upgrade_85 = new Upgrade( //{
        "Exponential Ideas",
        "exponential_ideas",
        "Each research center increases the base production of all research centers by 8000.",
        "",
        5,
        9,
		20000000000,
        function () {buildings[5].production += buildings[5].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[5].count) * 8000)},
	)//}
	var upgrade_86 = new Upgrade( //{
        "Factorials",
        "factorials",
        "Each factory increases the base production of all factories by 8000.",
        "",
        6,
        9,
		20000000000,
        function () {buildings[6].production += buildings[6].count * 8000},
        function () {},
        function () {return fancyNumber(Math.round(buildings[6].count) * 8000)},
	)//}
	var upgrade_87 = new Upgrade( //{ Time Based Building Upgrades
        "Time for Blood",
        "time_blood",
        "Increases the production of cultists by 0.5% for each real minute played.",
        "",
        0,
        10,
		100000000000,
        function () {buildings[0].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_88 = new Upgrade( //{
        "Time for Gold",
        "time_gold",
        "Increases the production of mines by 0.5% for each real minute played.",
        "",
        1,
        10,
		100000000000,
        function () {buildings[1].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_89 = new Upgrade( //{
        "Time for Euchre",
        "time_euchre",
        "Increases the production of gamblers by 0.5% for each real minute played.",
        "",
        2,
        10,
		100000000000,
        function () {buildings[2].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_90 = new Upgrade( //{
        "Time for Power",
        "time_power",
        "Increases the production of power plants by 0.5% for each real minute played.",
        "",
        3,
        10,
		100000000000,
        function () {buildings[3].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_91 = new Upgrade( //{
        "Time for Interest",
        "time_interest",
        "Increases the production of banks by 0.5% for each real minute played.",
        "",
        4,
        10,
		100000000000,
        function () {buildings[4].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_92 = new Upgrade( //{
        "Time for Knowledge",
        "time_knowledge",
        "Increases the production of research centers by 0.5% for each real minute played.",
        "",
        5,
        10,
		100000000000,
        function () {buildings[5].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_93 = new Upgrade( //{ 
        "Time for Production",
        "time_production",
        "Increases the production of factories by 0.5% for each real minute played.",
        "",
        6,
        10,
		100000000000,
        function () {buildings[6].production_multiplier *= 1 + 0.005 * stats.time_played_real / 60},
        function () {},
        function () {return Math.round(0.5 * stats.time_played_real / 60) + "%"},
	)//}
	var upgrade_94 = new Upgrade( //{ Percent Production Upgrades Tier 1
        "Basic Production",
        "basic_production",
        "Increases production of tier 1 buildings by 10% (the first 7 buildings bought).",
        "",
        7,
        9,
		250000000,
        function () {TIER_1_BONUS *= 1.1},
        function () {},
        function () {},
	)//}
	var upgrade_95 = new Upgrade( //{
        "Basic Production II",
        "basic_production_ii",
        "Increases production of tier 1 buildings by 10% (the first 7 buildings bought).",
        "",
        8,
        9,
		75000000000,
        function () {TIER_1_BONUS *= 1.1},
        function () {},
        function () {},
	)//}
	var upgrade_96 = new Upgrade( //{
        "Basic Production III",
        "basic_production_iii",
        "Increases production of tier 1 buildings by 10% (the first 7 buildings bought).",
        "",
        9,
        9,
		5000000000000,
        function () {TIER_1_BONUS *= 1.1},
        function () {},
        function () {},
	)//}
	var upgrade_97 = new Upgrade( //{
        "Improved Production V",
        "improved_production_v",
        "Increases production of all buildings by 10 Million",
        "",
        8,
        0,
		500000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_98 = new Upgrade( //{
        "Improved Production VI",
        "improved_production_vi",
        "Increases production of all buildings by 100 Million",
        "",
        9,
        0,
		50000000000000,
        function () {},
        function () {},
        function () {},
	)//}
    var upgrade_99 = new Upgrade( //{ //Tier 1 Buildings Upgrade 7
        "Blood Rain",
        "blood_rain",
        "Increases the base production of all cultists by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "",
        0,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[0].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}	
    var upgrade_100 = new Upgrade( //{
        "River of Gold",
        "river_gold",
        "Increases the base production of all mines by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "",
        1,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[1].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}	
    var upgrade_101 = new Upgrade( //{
        "Triple Double",
        "triple_double",
        "Increases the base production of all gamblers by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "Go to jail, directly to jail, do not pass go, do not collect $200",
        2,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[2].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}
    var upgrade_102 = new Upgrade( //{
        "Surge Storm",
        "surge_storm",
        "Increases the base production of all power plants by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "",
        3,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[3].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}
    var upgrade_103 = new Upgrade( //{
        "Money Printers",
        "money_printers",
        "Increases the base production of all banks by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "",
        4,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[4].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}
    var upgrade_104 = new Upgrade( //{
        "Brainstorms",
        "brainstorms",
        "Increases the base production of all research centers by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "",
        5,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[5].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}		
    var upgrade_105 = new Upgrade( //{
        "Pulley System",
        "pulley_system",
        "Increases the base production of all factories by "+fancyNumber(tweaker.upgrades.building_base_7)+".",
        "",
        6,
        11,
        tweaker.upgrades.building_price_7,
        function () {buildings[6].production += tweaker.upgrades.building_base_7;},
        function () {},
        function () {},
    ); //}	
	var upgrade_106 = new Upgrade( //{ Percent Production Upgrade Tier 1
        "Basic Production IV",
        "basic_production_iv",
        "Increases production of tier 1 buildings by 10% (the first 7 buildings bought).",
        "",
        7,
        10,
		150000000000000,
        function () {TIER_1_BONUS *= 1.1},
        function () {},
        function () {},
	)//}		
	var upgrade_107 = new Upgrade( //{ Warp Upgrades
        "Mechanical Superiority",
        "mechanical_superiority",
        "Increases base production of bonus factories by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        12,
		tweaker.upgrades.building_price_1 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_1 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_108 = new Upgrade( //{
        "Mechanical Superiority II",
        "mechanical_superiority_ii",
        "Increases base production of bonus factories by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        12,
		tweaker.upgrades.building_price_2 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_2 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_109 = new Upgrade( //{
        "Mechanical Superiority III",
        "mechanical_superiority_iii",
        "Increases base production of bonus factories by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        12,
		tweaker.upgrades.building_price_3 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_3 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_110 = new Upgrade( //{
        "Mechanical Superiority IV",
        "mechanical_superiority_iv",
        "Increases base production of bonus factories by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        12,
		tweaker.upgrades.building_price_4 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_4 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_111 = new Upgrade( //{
        "Mechanical Superiority V",
        "mechanical_superiority_v",
        "Increases base production of bonus factories by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        12,
		tweaker.upgrades.building_price_5 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_5 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_112 = new Upgrade( //{
        "Mechanical Superiority VI",
        "mechanical_superiority_vi",
        "Increases base production of bonus factories by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        12,
		tweaker.upgrades.building_price_6 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_6 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_113 = new Upgrade( //{
        "Faster Bonuses",
        "faster_bonuses",
        "Decreases the time between bonuses by 15 seconds for bonus factories.",
        "",
        6,
        12,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_114 = new Upgrade( //{
        "Less Defects",
        "less_defects",
        "Bonus factories will produce a negative effect every 5th time rather than every 4th time.",
        "",
        7,
        12,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_115 = new Upgrade( //{
        "Tireless Workers",
        "tireless_workers",
        "Increases production by 10% when no bonuses are active",
        "",
        8,
        12,
		5000000000000000000,
        function () {if (BUFFLESS) {PRODUCTION_MULTIPLIER *= 1.1}},
        function () {},
        function () {},
	)//}
	var upgrade_116 = new Upgrade( //{
        "Universal Improvement",
        "universal_improvement",
        "Reduces the duration of negative effects by 5%.",
        "",
        9,
        12,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_117 = new Upgrade( //{ Click farm Upgrades
        "Click Workers",
        "click_workers",
        "Increases base production of click farms by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        13,
		tweaker.upgrades.building_price_1 * 10000000000000,
        function () {buildings[8].production += tweaker.upgrades.building_base_1 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_118 = new Upgrade( //{
        "Click Workers II",
        "time_spiral",
        "Increases base production of click farms by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        13,
		tweaker.upgrades.building_price_2 * 10000000000000,
        function () {buildings[8].production += tweaker.upgrades.building_base_2 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_119 = new Upgrade( //{
        "Click Workers III",
        "stitch_time",
        "Increases base production of click farms by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        13,
		tweaker.upgrades.building_price_3 * 10000000000000,
        function () {buildings[8].production += tweaker.upgrades.building_base_3 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_120 = new Upgrade( //{
        "Click Workers IV",
        "telling_time",
        "Increases base production of click farms by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        13,
		tweaker.upgrades.building_price_4 * 10000000000000,
        function () {buildings[8].production += tweaker.upgrades.building_base_4 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_121 = new Upgrade( //{
        "Click Workers V",
        "stretching_time",
        "Increases base production of click farms by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        13,
		tweaker.upgrades.building_price_5 * 10000000000000,
        function () {buildings[8].production += tweaker.upgrades.building_base_5 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_122 = new Upgrade( //{
        "Click Workers VI",
        "temporal_mastery",
        "Increases base production of click farms by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        13,
		tweaker.upgrades.building_price_6 * 10000000000000,
        function () {buildings[8].production += tweaker.upgrades.building_base_6 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_123 = new Upgrade( //{
        "Click Storage",
        "click_storage",
        "Increases maximum of clicks able to be stored by 15.",
        "",
        6,
        13,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_124 = new Upgrade( //{
        "Quick Clicks",
        "quick_clicks",
        "Decreases the time between the auto-clicks of click farms from 0.5 seconds to 0.4.",
        "",
        7,
        13,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_125 = new Upgrade( //{
        "Click Recharge",
        "click_recharge",
        "Decreases the amount of time it takes to generate auto-clicks by 1 second.",
        "",
        8,
        13,
		5000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_126 = new Upgrade( //{
        "Endless Clicks",
        "endless_clicks",
        "Increases the value of clicking by 1% of total production.",
        "",
        9,
        13,
		50000000000000000000,
        function () {CLICK_PRODUCTION += 0.01},
        function () {},
        function () {},
	)//}
	var upgrade_127 = new Upgrade( //{ Cryogenic Labs Upgrades
        "Permafrost",
        "permafrost",
        "Increases base production of cryogenic labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        14,
		tweaker.upgrades.building_price_1 * 10000000000000,
        function () {buildings[9].production += tweaker.upgrades.building_base_1 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_128 = new Upgrade( //{
        "Flash Freeze",
        "flash_freeze",
        "Increases base production of cryogenic labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        14,
		tweaker.upgrades.building_price_2 * 10000000000000,
        function () {buildings[9].production += tweaker.upgrades.building_base_2 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_129 = new Upgrade( //{
        "Kelvin Scale",
        "kelvin_scale",
        "Increases base production of cryogenic labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        14,
		tweaker.upgrades.building_price_3 * 10000000000000,
        function () {buildings[9].production += tweaker.upgrades.building_base_3 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_130 = new Upgrade( //{
        "Cryogenic Processing",
        "telling_time",
        "Increases base production of cryogenic labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        14,
		tweaker.upgrades.building_price_4 * 10000000000000,
        function () {buildings[9].production += tweaker.upgrades.building_base_4 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_131 = new Upgrade( //{
        "Frozen Solid",
        "frozen_solid",
        "Increases base production of cryogenic labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        14,
		tweaker.upgrades.building_price_5 * 10000000000000,
        function () {buildings[9].production += tweaker.upgrades.building_base_5 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_132 = new Upgrade( //{
        "Absolute Zero",
        "absolute_zero",
        "Increases base production of cryogenic labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        14,
		tweaker.upgrades.building_price_6 * 10000000000000,
        function () {buildings[9].production += tweaker.upgrades.building_base_6 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_133 = new Upgrade( //{
        "Warp Storage",
        "warp_storage",
        "Increases maximum of warps able to be stored by 5.",
        "",
        6,
        12,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_134 = new Upgrade( //{
        "Temporal Anomaly",
        "temporal_anomaly",
        "Each time a warp is used 5 extra seconds worth of time are granted.",
        "",
        7,
        12,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_135 = new Upgrade( //{
        "Warp Recharge",
        "warp_recharge",
        "Decreases the amount of time it takes to generate another warp by 15 seconds.",
        "",
        8,
        12,
		5000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_136 = new Upgrade( //{
        "Great Leap Forward",
        "great_leap_forward",
        "Warp activations grant 35, rather than 30 seconds worth of production.",
        "",
        9,
        12,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_137 = new Upgrade( //{ Alien Labs Upgrades
        "Alien Enhancements",
        "alien_enhancements",
        "Increases base production of alien labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        15,
		tweaker.upgrades.building_price_1 * 10000000000000,
        function () {buildings[10].production += tweaker.upgrades.building_base_1 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_138 = new Upgrade( //{
        "Alien Enhancements II",
        "alien_enhancements_ii",
        "Increases base production of alien labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        15,
		tweaker.upgrades.building_price_2 * 10000000000000,
        function () {buildings[10].production += tweaker.upgrades.building_base_2 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_139 = new Upgrade( //{
        "Alien Enhancements III",
        "alien_enhancements_iii",
        "Increases base production of alien labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        15,
		tweaker.upgrades.building_price_3 * 10000000000000,
        function () {buildings[10].production += tweaker.upgrades.building_base_3 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_140 = new Upgrade( //{
        "Alien Enhancements IV",
        "alien_enhancements_iv",
        "Increases base production of alien labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        15,
		tweaker.upgrades.building_price_4 * 10000000000000,
        function () {buildings[10].production += tweaker.upgrades.building_base_4 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_141 = new Upgrade( //{
        "Alien Enhancements V",
        "alien_enhancements_v",
        "Increases base production of alien labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        15,
		tweaker.upgrades.building_price_5 * 10000000000000,
        function () {buildings[10].production += tweaker.upgrades.building_base_5 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_142 = new Upgrade( //{
        "Alien Enhancements VI",
        "alien_enhancements_vi",
        "Increases base production of alien labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        15,
		tweaker.upgrades.building_price_6 * 10000000000000,
        function () {buildings[10].production += tweaker.upgrades.building_base_6 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_143 = new Upgrade( //{
        "Extraterrestrial Storage",
        "extraterrestrial_storage",
        "Increases maximum amount of research able to be stored by 30.",
        "",
        6,
        15,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_144 = new Upgrade( //{
        "Alien Intelligence",
        "alien_intelligence",
        "Increases research generation by 0.4 per second.",
        "",
        7,
        15,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_145 = new Upgrade( //{
        "Alien Affinity",
        "alien_affinity",
        "Each time a temporary bonus is activated 5 seconds worth of research is generated.",
        "",
        8,
        15,
		5000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_146 = new Upgrade( //{
        "Extraterrestrial Expansion",
        "extraterrestrial_expansion",
        "Each time any other upgrade is bought 1 free alien research lab is granted (the price increases accordingly).",
        "",
        9,
        15,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_147 = new Upgrade( //{ Mainframe Computer Upgrades
        "Improved Processing",
        "improved_processing",
        "Increases base production of mainframe computers by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        16,
		tweaker.upgrades.building_price_1 * 10000000000000,
        function () {buildings[11].production += tweaker.upgrades.building_base_1 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_148 = new Upgrade( //{
        "Improved Processing II",
        "improved_processing_ii",
        "Increases base production of mainframe computers by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        16,
		tweaker.upgrades.building_price_2 * 10000000000000,
        function () {buildings[11].production += tweaker.upgrades.building_base_2 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_149 = new Upgrade( //{
        "Improved Processing III",
        "improved_processing_iii",
        "Increases base production of mainframe computers by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        16,
		tweaker.upgrades.building_price_3 * 10000000000000,
        function () {buildings[11].production += tweaker.upgrades.building_base_3 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_150 = new Upgrade( //{
        "Improved Processing IV",
        "improved_processing_iv",
        "Increases base production of mainframe computers by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        16,
		tweaker.upgrades.building_price_4 * 10000000000000,
        function () {buildings[11].production += tweaker.upgrades.building_base_4 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_151 = new Upgrade( //{
        "Improved Processing V",
        "improved_processing_v",
        "Increases base production of mainframe computers by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        16,
		tweaker.upgrades.building_price_5 * 10000000000000,
        function () {buildings[11].production += tweaker.upgrades.building_base_5 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_152 = new Upgrade( //{
        "Improved Processing VI",
        "improved_processing_vi",
        "Increases base production of mainframe computers by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        16,
		tweaker.upgrades.building_price_6 * 10000000000000,
        function () {buildings[11].production += tweaker.upgrades.building_base_6 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_153 = new Upgrade( //{
        "Hotkeys",
        "hotkeys",
        "Every time a program is ran 5 seconds worth of time are gained.",
        "",
        6,
        16,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_154 = new Upgrade( //{
        "Loops",
        "loops",
        "Grants the ability to cause programs to loop automatically.",
        "",
        7,
        16,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_155 = new Upgrade( //{
        "Assembler",
        "assembler",
        "Increases production by 3%.",
        "",
        8,
        16,
		5000000000000000000,
        function () {PRODUCTION_MULTIPLIER *= 1.03;},
        function () {},
        function () {},
	)//}
	var upgrade_156 = new Upgrade( //{
        "Dual Core Processing",
        "dual_core",
        "Allows you to run two programs at once.",
        "",
        9,
        16,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_157 = new Upgrade( //{ Acceleration Upgrades
        "Accelerated Acceleration",
        "accelerated_acceleration",
        "Increases base production of acceleration labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        17,
		tweaker.upgrades.building_price_1 * 10000000000000,
        function () {buildings[12].production += tweaker.upgrades.building_base_1 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_158 = new Upgrade( //{
        "Accelerated Acceleration II",
        "accelerated_acceleration_ii",
        "Increases base production of acceleration labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        17,
		tweaker.upgrades.building_price_2 * 10000000000000,
        function () {buildings[12].production += tweaker.upgrades.building_base_2 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_159 = new Upgrade( //{
        "Accelerated Acceleration III",
        "accelerated_acceleration_iii",
        "Increases base production of acceleration labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        17,
		tweaker.upgrades.building_price_3 * 10000000000000,
        function () {buildings[12].production += tweaker.upgrades.building_base_3 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_160 = new Upgrade( //{
        "Accelerated Acceleration IV",
        "accelerated_acceleration_iv",
        "Increases base production of acceleration labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        17,
		tweaker.upgrades.building_price_4 * 10000000000000,
        function () {buildings[12].production += tweaker.upgrades.building_base_4 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_161 = new Upgrade( //{
        "Accelerated Acceleration V",
        "accelerated_acceleration_v",
        "Increases base production of acceleration labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        17,
		tweaker.upgrades.building_price_5 * 10000000000000,
        function () {buildings[12].production += tweaker.upgrades.building_base_5 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_162 = new Upgrade( //{
        "Accelerated Acceleration VI",
        "accelerated_acceleration_vi",
        "Increases base production of acceleration labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        17,
		tweaker.upgrades.building_price_6 * 10000000000000,
        function () {buildings[12].production += tweaker.upgrades.building_base_6 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_163 = new Upgrade( //{
        "Mild Construction",
        "mild_construction",
        "Decreases the price of all buildings by 2%.",
        "",
        6,
        17,
		50000000000000000,
        function () {COST_REDUCTION *= 1.02},
        function () {},
        function () {},
	)//}
	var upgrade_164 = new Upgrade( //{
        "Mild Clicks",
        "mild_clicks",
        "Increases the value from clicks by 0.5% of production.",
        "",
        7,
        17,
		50000000000000000,
        function () {CLICK_PRODUCTION += 0.005},
        function () {},
        function () {},
	)//}
	var upgrade_165 = new Upgrade( //{
        "Mild Production",
        "mild_produciton",
        "Increases production by 3%.",
        "",
        8,
        17,
		50000000000000000,
        function () {PRODUCTION_MULTIPLIER *= 1.03;},
        function () {},
        function () {},
	)//}
	var upgrade_166 = new Upgrade( //{
        "Mild Synergy",
        "mild_synergy",
        "Switching between different acceleration modes, will reduce the bonus to one third of its prior value, rather than to 0.",
        "",
        9,
        17,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_167 = new Upgrade( //{ Fluctuation Upgrades
        "Instability",
        "instability",
        "Increases base production of fluctuation labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        18,
		tweaker.upgrades.building_price_1 * 10000000000000,
        function () {buildings[13].production += tweaker.upgrades.building_base_1 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_168 = new Upgrade( //{
        "Instability II",
        "instability_ii",
        "Increases base production of fluctuation labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        18,
		tweaker.upgrades.building_price_2 * 10000000000000,
        function () {buildings[13].production += tweaker.upgrades.building_base_2 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_169 = new Upgrade( //{
        "Instability III",
        "instability_iii",
        "Increases base production of fluctuation labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        18,
		tweaker.upgrades.building_price_3 * 10000000000000,
        function () {buildings[13].production += tweaker.upgrades.building_base_3 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_170 = new Upgrade( //{
        "Instability IV",
        "instability_iv",
        "Increases base production of fluctuation labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        18,
		tweaker.upgrades.building_price_4 * 10000000000000,
        function () {buildings[13].production += tweaker.upgrades.building_base_4 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_171 = new Upgrade( //{
        "Instability V",
        "instability_v",
        "Increases base production of fluctuation labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        18,
		tweaker.upgrades.building_price_5 * 10000000000000,
        function () {buildings[13].production += tweaker.upgrades.building_base_5 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_172 = new Upgrade( //{
        "Instability VI",
        "instability_vi",
        "Increases base production of fluctuation labs by " + fancyNumber(2000000000000 * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        18,
		tweaker.upgrades.building_price_6 * 10000000000000,
        function () {buildings[13].production += tweaker.upgrades.building_base_6 * 5000000000000;},
        function () {},
        function () {},
	)//}
	var upgrade_173 = new Upgrade( //{
        "Perfect Prediction",
        "perfect_prediction",
        "Displays the exact time until the next fluctuation.",
        "",
        6,
        18,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_174 = new Upgrade( //{
        "Beyond Perfect Prediction",
        "beyond_perfect_prediction",
        "Displays the effect of the next fluctuation.",
        "",
        7,
        18,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_175 = new Upgrade( //{
        "Faster Fluctuations",
        "faster_fluctuations",
        "Decreases time between fluctuations by 2 minutes.",
        "",
        8,
        18,
		5000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_176 = new Upgrade( //{
        "Extreme Fluctuations",
        "extreme_fluctuations",
        "All positive random values produced by fluctuations will be at their maximum possible value.",
        "",
        9,
        18,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_177 = new Upgrade( //{ Corruption Subgame
        "Shrine of Corruption",
        "shrine_corruption",
        "Unlocks an idle subgame, that is largely independent of the main game.",
        "",
        0,
        19,
		10000000000000000000000,
        function () {},
        function () {subgames[0].unlocked = true;updateSubgameButtons();},
        function () {},
	)//}	
	var upgrade_178 = new Upgrade( //{ Offline Building Refills Tier 1
        "Nocturnal Rituals",
        "nocturnal_rituals",
        "When this game is closed, cultists will produce 1 blood per minute.",
        "",
        0,
        21,
		10000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_179 = new Upgrade( //{
        "Nocturnal Gambling",
        "nocturnal_gambling",
        "When this game is closed, gamblers will produce 1 card draw per 30 minutes, and 1 discard per hour.",
        "",
        2,
        21,
		10000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_180 = new Upgrade( //{
        "Nocturnal Power",
        "nocturnal_power",
        "When this game is closed, power plants will produce 1 second worth of power per minute.",
        "",
        3,
        21,
		100000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_181 = new Upgrade( //{ 
        "Nocturnal Investments",
        "nocturnal_investments",
        "If there is an investment occurring when this game is closed, it will complete after an hour.",
        "",
        4,
        21,
		100000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_182 = new Upgrade( //{ 
        "Nocturnal Riches",
        "nocturnal_riches",
        "When this game is closed, mines will produce one gold bar every hour.",
        "",
        1,
        21,
		1000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_183 = new Upgrade( //{ 
        "Nocturnal Research",
        "nocturnal_research",
        "When this game is closed, research centers will produce one research point every hour.",
        "",
        5,
        21,
		1000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_184 = new Upgrade( //{ 
        "Nocturnal Production",
        "nocturnal_research",
        "Increases offline production by 1% of normal production.",
        "",
        6,
        21,
		10000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_185 = new Upgrade( //{ Offline Building Refills Tier 2
        "Nocturnal Bonus",
        "nocturnal_bonus",
        "Increases offline production by 0.5% of normal production.",
        "",
        0,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_186 = new Upgrade( //{
        "Nocturnal Clicks",
        "nocturnal_clicks",
        "When this game is closed, click farms store one click per 5 minutes.",
        "",
        1,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_187 = new Upgrade( //{
        "Nocturnal Frost",
        "nocturnal_frost",
        "Increases offline production by 0.5%.",
        "",
        2,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_188 = new Upgrade( //{
        "Nocturnal Research",
        "nocturnal_research",
        "When this game is closed, alien research labs produce one second worth of research every minute.",
        "",
        3,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_189 = new Upgrade( //{
        "Nocturnal Coding",
        "nocturnal_coding",
        "Increases offline production by 0.5%.",
        "",
        4,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}		
	var upgrade_190 = new Upgrade( //{
        "Nocturnal Acceleration",
        "nocturnal_acceleration",
        "Increases offline production by 0.5%.",
        "",
        5,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_191 = new Upgrade( //{
        "Nocturnal Fluctuation",
        "nocturnal_fluctuation",
        "Increases offline production by 0.5%.",
        "",
        6,
        22,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_192 = new Upgrade( //{
        "Unstoppable Flow",
        "unstoppable_flow",
        "Increases production by 3% when the amount of blood stored is the maximum possible.",
        "",
        0,
        23,
		1000000000000000000,
        function () {if (Math.abs(minigames[0].vars.blood - minigames[0].vars.max_blood) < 1) {PRODUCTION_MULTIPLIER *= 1.03}},
        function () {},
        function () {},
	)//}		
	var upgrade_193 = new Upgrade( //{
        "Intrinsic Variation",
        "intrinsic_variation",
        "Gold refills increase in price a stacking 8 times rather than 9.",
        "",
        1,
        23,
		1000000000000000000,
        function () {},
        function () {if (minigames[1].vars.stored_ids.length == 9) {minigames[1].vars.stored_ids.splice(0, 1)}},
        function () {},
	)//}		
	var upgrade_194 = new Upgrade( //{
        "Counting Cards",
        "counting_cards",
        "Increases maximum peeks able to be stored by 6.",
        "",
        2,
        23,
		1000000000000000000,
        function () {},
        function () {minigames[2].vars.peek_charges += 6},
        function () {},
	)//}	
	var upgrade_195 = new Upgrade( //{
        "Endless Electricity",
        "endless_electricity",
        "Increases power generation by 0.25 per second.",
        "",
        3,
        23,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_196 = new Upgrade( //{
        "Fiscal Irresponsibility",
        "fiscal_irresponsibility",
        "Investments can be made when less than 5 minutes worth of production is stored, but will put you into temporary debt.",
        "",
        4,
        23,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}		
	var upgrade_197 = new Upgrade( //{
        "Synergistic Research",
        "synergistic_research",
        "Each time a building is bought a research point is granted.",
        "",
        5,
        23,
		1000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}	
	var upgrade_198 = new Upgrade( //{
        "Experienced Workers",
        "experienced_workers",
        "Increases production by 2%.",
        "",
        6,
        23,
		1000000000000000000,
        function () {PRODUCTION_MULTIPLIER *= 1.02},
        function () {},
        function () {},
	)//}		
	var upgrade_199 = new Upgrade( //{ Angelic Assistant
        "Angelic Assistant",
        "angleic_assistant",
        "Unlocks an assistant that increases value from clicking, periodically autoclicks, and unlocks many unqiue abilities. The assistant grants larger bonuses and more abilities as time passes and each time a bonus is activated",
        "",
        2,
        20,
		500000000000000,
        function () {},
        function () {assistants[0].unlocked = true;updateSubgameButtons();},
        function () {},
	)//}	
	var upgrade_200 = new Upgrade( //{ Demonic Assistant
        "Demonic Assistant",
        "demonic_assistant",
        "Unlocks an assistant that increases production, increases resource collection while offline, and unlocks many unqiue abilities. The assistant grants larger bonuses and more abilities as time passes and each time a negative effect is activated",
        "",
        3,
        20,
		500000000000000000000,
        function () {},
        function () {assistants[1].unlocked = true;updateSubgameButtons();},
        function () {},
	)//}		
	var upgrade_201 = new Upgrade( //{ Demonic Assistant
        "Alien Assistant",
        "alien_assistant",
        "Unlocks an assistant that increases the work rate of all buildings, and unlocks many unqiue abilities. The assistant grants larger bonuses and more abilities as time passes.",
        "",
        4,
        20,
		500000000000000000000000000,
        function () {},
        function () {assistants[2].unlocked = true;updateSubgameButtons();},
        function () {},
	)//}		
	var upgrade_202 = new Upgrade( //{ Demonic Assistant
        "Helping Hands",
        "helping_hands",
        "Unlocks the ability to give and receive bonus to other people you know playing this game (Add Functionality).",
        "",
        9,
        19,
		0,
        function () {},
        function () {assistants[2].unlocked = true;updateSubgameButtons();},
        function () {},
	)//}	
	
	/*
	var upgrade_113 = new Upgrade( //{
        "Warp Storage",
        "warp_storage",
        "Increases maximum amount of warps able to be stored by 5.",
        "",
        6,
        12,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_114 = new Upgrade( //{
        "Temporal Anomaly",
        "temporal_anomaly",
        "Each time a warp is used 5 extra seconds worth of time are granted.",
        "",
        7,
        12,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_115 = new Upgrade( //{
        "Warp Recharge",
        "warp_recharge",
        "Decreases the amount of time it takes to generate another warp by 15 seconds.",
        "",
        8,
        12,
		5000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_116 = new Upgrade( //{
        "Great Leap Forward",
        "great_leap_forward",
        "Warp activations grant 35, rather than 30 seconds worth of production.",
        "",
        9,
        12,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	*/
	
	upgrades.push(upgrade_0);
    upgrades.push(upgrade_1);
    upgrades.push(upgrade_2);
    upgrades.push(upgrade_3);
    upgrades.push(upgrade_4);
    upgrades.push(upgrade_5);
    upgrades.push(upgrade_6);
    upgrades.push(upgrade_7);
    upgrades.push(upgrade_8);
    upgrades.push(upgrade_9);
    upgrades.push(upgrade_10);
    upgrades.push(upgrade_11);
    upgrades.push(upgrade_12);
    upgrades.push(upgrade_13);
    upgrades.push(upgrade_14);
    upgrades.push(upgrade_15);
    upgrades.push(upgrade_16);
    upgrades.push(upgrade_17);
    upgrades.push(upgrade_18);
    upgrades.push(upgrade_19);
    upgrades.push(upgrade_20);
    upgrades.push(upgrade_21);
    upgrades.push(upgrade_22);
    upgrades.push(upgrade_23);
    upgrades.push(upgrade_24);
    upgrades.push(upgrade_25);
    upgrades.push(upgrade_26);
    upgrades.push(upgrade_27);
    upgrades.push(upgrade_28);
    upgrades.push(upgrade_29);
    upgrades.push(upgrade_30);
    upgrades.push(upgrade_31);
    upgrades.push(upgrade_32);
    upgrades.push(upgrade_33);
    upgrades.push(upgrade_34);
    upgrades.push(upgrade_35);
    upgrades.push(upgrade_36);
    upgrades.push(upgrade_37);
    upgrades.push(upgrade_38);
    upgrades.push(upgrade_39);
    upgrades.push(upgrade_40);
    upgrades.push(upgrade_41);
    upgrades.push(upgrade_42);
    upgrades.push(upgrade_43);
    upgrades.push(upgrade_44);
    upgrades.push(upgrade_45);
    upgrades.push(upgrade_46);
    upgrades.push(upgrade_47);
    upgrades.push(upgrade_48);
    upgrades.push(upgrade_49);
    upgrades.push(upgrade_50);
    upgrades.push(upgrade_51);
    upgrades.push(upgrade_52);
    upgrades.push(upgrade_53);
    upgrades.push(upgrade_54);
    upgrades.push(upgrade_55);
    upgrades.push(upgrade_56);
    upgrades.push(upgrade_57);
    upgrades.push(upgrade_58);
    upgrades.push(upgrade_59);
    upgrades.push(upgrade_60);
    upgrades.push(upgrade_61);
    upgrades.push(upgrade_62);
    upgrades.push(upgrade_63);
    upgrades.push(upgrade_64);
    upgrades.push(upgrade_65);
    upgrades.push(upgrade_66);
    upgrades.push(upgrade_67);
    upgrades.push(upgrade_68);
    upgrades.push(upgrade_69);
    upgrades.push(upgrade_70);
    upgrades.push(upgrade_71);
    upgrades.push(upgrade_72);
    upgrades.push(upgrade_73);
    upgrades.push(upgrade_74);
    upgrades.push(upgrade_75);
    upgrades.push(upgrade_76);
    upgrades.push(upgrade_77);
    upgrades.push(upgrade_78);
    upgrades.push(upgrade_79);
    upgrades.push(upgrade_80);
    upgrades.push(upgrade_81);
    upgrades.push(upgrade_82);
    upgrades.push(upgrade_83);
    upgrades.push(upgrade_84);
    upgrades.push(upgrade_85);
    upgrades.push(upgrade_86);
    upgrades.push(upgrade_87);
    upgrades.push(upgrade_88);
    upgrades.push(upgrade_89);
    upgrades.push(upgrade_90);
    upgrades.push(upgrade_91);
    upgrades.push(upgrade_92);
    upgrades.push(upgrade_93);
    upgrades.push(upgrade_94);
    upgrades.push(upgrade_95);
    upgrades.push(upgrade_96);
    upgrades.push(upgrade_97);
    upgrades.push(upgrade_98);
    upgrades.push(upgrade_99);
    upgrades.push(upgrade_100);
    upgrades.push(upgrade_101);
    upgrades.push(upgrade_102);
    upgrades.push(upgrade_103);
    upgrades.push(upgrade_104);
    upgrades.push(upgrade_105);
    upgrades.push(upgrade_106);
    upgrades.push(upgrade_107);
    upgrades.push(upgrade_108);
    upgrades.push(upgrade_109);
    upgrades.push(upgrade_110);
    upgrades.push(upgrade_111);
    upgrades.push(upgrade_112);
    upgrades.push(upgrade_113);
    upgrades.push(upgrade_114);
    upgrades.push(upgrade_115);
    upgrades.push(upgrade_116);
    upgrades.push(upgrade_117);
    upgrades.push(upgrade_118);
    upgrades.push(upgrade_119);
    upgrades.push(upgrade_120);
    upgrades.push(upgrade_121);
    upgrades.push(upgrade_122);
    upgrades.push(upgrade_123);
    upgrades.push(upgrade_124);
    upgrades.push(upgrade_125);
    upgrades.push(upgrade_126);
    upgrades.push(upgrade_127);
    upgrades.push(upgrade_128);
    upgrades.push(upgrade_129);
    upgrades.push(upgrade_130);
    upgrades.push(upgrade_131);
    upgrades.push(upgrade_132);
    upgrades.push(upgrade_133);
    upgrades.push(upgrade_134);
    upgrades.push(upgrade_135);
    upgrades.push(upgrade_136);
    upgrades.push(upgrade_137);
    upgrades.push(upgrade_138);
    upgrades.push(upgrade_139);
    upgrades.push(upgrade_140);
    upgrades.push(upgrade_141);
    upgrades.push(upgrade_142);
    upgrades.push(upgrade_143);
    upgrades.push(upgrade_144);
    upgrades.push(upgrade_145);
    upgrades.push(upgrade_146);
    upgrades.push(upgrade_147);
    upgrades.push(upgrade_148);
    upgrades.push(upgrade_149);
    upgrades.push(upgrade_150);
    upgrades.push(upgrade_151);
    upgrades.push(upgrade_152);
    upgrades.push(upgrade_153);
    upgrades.push(upgrade_154);
    upgrades.push(upgrade_155);
    upgrades.push(upgrade_156);
    upgrades.push(upgrade_157);
    upgrades.push(upgrade_158);
    upgrades.push(upgrade_159);
    upgrades.push(upgrade_160);
    upgrades.push(upgrade_161);
    upgrades.push(upgrade_162);
    upgrades.push(upgrade_163);
    upgrades.push(upgrade_164);
    upgrades.push(upgrade_165);
    upgrades.push(upgrade_166);
    upgrades.push(upgrade_167);
    upgrades.push(upgrade_168);
    upgrades.push(upgrade_169);
    upgrades.push(upgrade_170);
    upgrades.push(upgrade_171);
    upgrades.push(upgrade_172);
    upgrades.push(upgrade_173);
    upgrades.push(upgrade_174);
    upgrades.push(upgrade_175);
    upgrades.push(upgrade_176);
    upgrades.push(upgrade_177);
    upgrades.push(upgrade_178);
    upgrades.push(upgrade_179);
    upgrades.push(upgrade_180);
    upgrades.push(upgrade_181);
    upgrades.push(upgrade_182);
    upgrades.push(upgrade_183);
    upgrades.push(upgrade_184);
    upgrades.push(upgrade_185);
    upgrades.push(upgrade_186);
    upgrades.push(upgrade_187);
    upgrades.push(upgrade_188);
    upgrades.push(upgrade_189);
    upgrades.push(upgrade_190);
    upgrades.push(upgrade_191);
    upgrades.push(upgrade_192);
    upgrades.push(upgrade_193);
    upgrades.push(upgrade_194);
    upgrades.push(upgrade_195);
    upgrades.push(upgrade_196);
    upgrades.push(upgrade_197);
    upgrades.push(upgrade_198);
    upgrades.push(upgrade_199);
    upgrades.push(upgrade_200);
    upgrades.push(upgrade_201);
    upgrades.push(upgrade_202);
}
function updateUpgrades() {
    if (!UPDATE_UPGRADES) {return;}
    
    $("#upgrades_container").empty();
    
    var len = upgrades.length;
    for (var i = 0; i < len; i++) {
        upgrades[i].updateHTML();
    }
    
    UPDATE_UPGRADES = false;
}
function testUpgradeUnlocks() {
	var click_credits = stats.click_credits
	if (stats.total_clicks >= 1) {upgrades[20].makeAvailable()}
	if (click_credits >= 100) {upgrades[21].makeAvailable()}
	if (click_credits >= 1000) {upgrades[22].makeAvailable()}
	if (click_credits >= 10000) {upgrades[24].makeAvailable()}
	if (click_credits >= 50000) {upgrades[25].makeAvailable()}
	if (click_credits >= 500000) {upgrades[26].makeAvailable()}
	if (click_credits >= 500000000) {upgrades[27].makeAvailable()}
	if (click_credits >= 500000000000) {upgrades[28].makeAvailable()}
	if (click_credits >= 500000000000000) {upgrades[29].makeAvailable()}
}
function upgradeDescription(upgrade) {
	var upgrade_tooltip_value = "";
	if (upgrade.evalTooltip()) {upgrade_tooltip_value = "<br/>(" +upgrade.evalTooltip() + ")"}
	var expanded_description = upgrade.description + upgrade_tooltip_value + "<br><span style = \\'' + UPGRADE_COLOR + 'font-size:18px;\\'>Price: " + fancyNumber(upgrade.price) + "</span><br><span style = \\'font-size:10px;float:right\\';>"+upgrade.flavor_text+"<span>";
	
	return expanded_description;
}
function updateUpgradeColor(price, currency) {
	if (currency >= price) {
		UPGRADE_COLOR = "color:#00db0a;text-shadow:0px 0px 2px #52d56a;"
	} else {
		UPGRADE_COLOR = "color:#e02900;text-shadow:0px 0px 8px #ff451c;";
	}
	
}
/*
	var upgrade_107 = new Upgrade( //{ Warp Upgrades
        "Temporal Wormholes",
        "temporal_wormholes",
        "Increases base production of warp facilities by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_1)  + ".",
        "",
        0,
        12,
		tweaker.upgrades.building_price_1 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_1 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_108 = new Upgrade( //{
        "Time Spiral",
        "time_spiral",
        "Increases base production of warp facilities by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_2)  + ".",
        "",
        1,
        12,
		tweaker.upgrades.building_price_2 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_2 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_109 = new Upgrade( //{
        "Stitch in Time",
        "stitch_time",
        "Increases base production of warp facilities by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_3)  + ".",
        "",
        2,
        12,
		tweaker.upgrades.building_price_3 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_3 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_110 = new Upgrade( //{
        "Telling Time",
        "telling_time",
        "Increases base production of warp facilities by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_4)  + ".",
        "",
        3,
        12,
		tweaker.upgrades.building_price_4 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_4 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_111 = new Upgrade( //{
        "Stretching Time",
        "stretching_time",
        "Increases base production of warp facilities by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_5)  + ".",
        "",
        4,
        12,
		tweaker.upgrades.building_price_5 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_5 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_112 = new Upgrade( //{
        "Temporal Mastery",
        "temporal_mastery",
        "Increases base production of warp facilities by " + fancyNumber(tweaker.upgrades.tier_2_base_multiplier * tweaker.upgrades.building_base_6)  + ".",
        "",
        5,
        12,
		tweaker.upgrades.building_price_6 * tweaker.upgrades.tier_2_price_multiplier,
        function () {buildings[7].production += tweaker.upgrades.building_base_6 * tweaker.upgrades.tier_2_base_multiplier;},
        function () {},
        function () {},
	)//}
	var upgrade_113 = new Upgrade( //{
        "Warp Storage",
        "warp_storage",
        "Increases maximum amount of warps able to be stored by 5.",
        "",
        6,
        12,
		50000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_114 = new Upgrade( //{
        "Temporal Anomaly",
        "temporal_anomaly",
        "Each time a warp is used 5 extra seconds worth of time are granted.",
        "",
        7,
        12,
		500000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_115 = new Upgrade( //{
        "Warp Recharge",
        "warp_recharge",
        "Decreases the amount of time it takes to generate another warp by 15 seconds.",
        "",
        8,
        12,
		5000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
	var upgrade_116 = new Upgrade( //{
        "Great Leap Forward",
        "great_leap_forward",
        "Warp activations grant 35, rather than 30 seconds worth of production.",
        "",
        9,
        12,
		50000000000000000000,
        function () {},
        function () {},
        function () {},
	)//}
*/