function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oSelectTeam;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oCrowd = createjs.Sound.play("crowd",{ loop:-1});
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound("./sounds/press_but.ogg", "click");
                createjs.Sound.registerSound("./sounds/applause.ogg", "applause");
                createjs.Sound.registerSound("./sounds/crowd.ogg", "crowd");
                createjs.Sound.registerSound("./sounds/goal.ogg", "goal");
                createjs.Sound.registerSound("./sounds/keeper_save.ogg", "keeper_save");
                createjs.Sound.registerSound("./sounds/kick.ogg", "kick");
                createjs.Sound.registerSound("./sounds/miss_goal.ogg", "miss_goal");
                createjs.Sound.registerSound("./sounds/select_team.ogg", "select_team");
                createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
                createjs.Sound.registerSound("./sounds/stop_indicator.ogg", "stop_indicator");

        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound("./sounds/press_but.mp3", "click");
                createjs.Sound.registerSound("./sounds/applause.mp3", "applause");
                createjs.Sound.registerSound("./sounds/crowd.mp3", "crowd");
                createjs.Sound.registerSound("./sounds/goal.mp3", "goal");
                createjs.Sound.registerSound("./sounds/keeper_save.mp3", "keeper_save");
                createjs.Sound.registerSound("./sounds/kick.mp3", "kick");
                createjs.Sound.registerSound("./sounds/miss_goal.mp3", "miss_goal");
                createjs.Sound.registerSound("./sounds/select_team.mp3", "select_team");
                createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
                createjs.Sound.registerSound("./sounds/stop_indicator.mp3", "stop_indicator");
        }
        
        RESOURCE_TO_LOAD += 11;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_team","./sprites/bg_select_team.jpg");
        s_oSpriteLibrary.addSprite("bg_next_level","./sprites/bg_next_level.jpg");
        s_oSpriteLibrary.addSprite("bg_win","./sprites/bg_win.jpg");
        s_oSpriteLibrary.addSprite("you_win","./sprites/you_win.png");
        s_oSpriteLibrary.addSprite("game_over","./sprites/game_over.png");
        
        s_oSpriteLibrary.addSprite("ball_kick_left","./sprites/ball_kick_left.png");
        s_oSpriteLibrary.addSprite("_oButNext","./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("arrow_bar","./sprites/arrow_bar.png");
        s_oSpriteLibrary.addSprite("but_continue","./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_continue_small","./sprites/but_continue_small.png");
        
        s_oSpriteLibrary.addSprite("argentina","./sprites/flag_argentina.png");
        s_oSpriteLibrary.addSprite("brazil","./sprites/flag_brazil.png");
        s_oSpriteLibrary.addSprite("germany","./sprites/flag_germany.png");
        s_oSpriteLibrary.addSprite("england","./sprites/flag_england.png");
        s_oSpriteLibrary.addSprite("italy","./sprites/flag_italy.png");
        s_oSpriteLibrary.addSprite("france","./sprites/flag_france.png");
        
        s_oSpriteLibrary.addSprite("goal","./sprites/goal.png");
        s_oSpriteLibrary.addSprite("high_bar","./sprites/high_bar.png");
        s_oSpriteLibrary.addSprite("right_bar","./sprites/right_bar.png");

        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        
        s_oSpriteLibrary.addSprite("icon_goal","./sprites/icon_goal.png");
        s_oSpriteLibrary.addSprite("icon_kick","./sprites/icon_kick.png");
        
        s_oSpriteLibrary.addSprite("goal_text","./sprites/goal_text.png");
        s_oSpriteLibrary.addSprite("missed_text","./sprites/missed_text.png");
        s_oSpriteLibrary.addSprite("out_text","./sprites/out_text.png");
        
        s_oSpriteLibrary.addSprite("argentina_idle","./sprites/players/argentina_idle.png");
        s_oSpriteLibrary.addSprite("brazil_idle","./sprites/players/brazil_idle.png");
        s_oSpriteLibrary.addSprite("germany_idle","./sprites/players/germany_idle.png");
        s_oSpriteLibrary.addSprite("england_idle","./sprites/players/england_idle.png");
        s_oSpriteLibrary.addSprite("italy_idle","./sprites/players/italy_idle.png");
        s_oSpriteLibrary.addSprite("france_idle","./sprites/players/france_idle.png");
        
        s_oSpriteLibrary.addSprite("argentina_shot","./sprites/players/argentina_shot.png");
        s_oSpriteLibrary.addSprite("brazil_shot","./sprites/players/brazil_shot.png");
        s_oSpriteLibrary.addSprite("germany_shot","./sprites/players/germany_shot.png");
        s_oSpriteLibrary.addSprite("england_shot","./sprites/players/england_shot.png");
        s_oSpriteLibrary.addSprite("italy_shot","./sprites/players/italy_shot.png");
        s_oSpriteLibrary.addSprite("france_shot","./sprites/players/france_shot.png");
        
        s_oSpriteLibrary.addSprite("goalkeeper_idle","./sprites/players/goalkeeper_idle.png");
        s_oSpriteLibrary.addSprite("goalkeeper_center","./sprites/players/goalkeeper_center.png");
        s_oSpriteLibrary.addSprite("goalkeeper_center_high","./sprites/players/goalkeeper_center_high.png");
        s_oSpriteLibrary.addSprite("goalkeeper_down_left","./sprites/players/goalkeeper_down_left.png");
        s_oSpriteLibrary.addSprite("goalkeeper_down_right","./sprites/players/goalkeeper_down_right.png");
        s_oSpriteLibrary.addSprite("goalkeeper_high_left","./sprites/players/goalkeeper_high_left.png");
        s_oSpriteLibrary.addSprite("goalkeeper_high_right","./sprites/players/goalkeeper_high_right.png");
        s_oSpriteLibrary.addSprite("goalkeeper_med_left","./sprites/players/goalkeeper_med_left.png");
        s_oSpriteLibrary.addSprite("goalkeeper_med_right","./sprites/players/goalkeeper_med_right.png");
        
        
        s_oSpriteLibrary.addSprite("wall_idle","./sprites/players/wall_idle.png");
        s_oSpriteLibrary.addSprite("wall_jump","./sprites/players/wall_jump.png");
        
        s_oSpriteLibrary.addSprite("ball","./sprites/ball.png");
        
        for(var i=0; i< NUM_CROWD; i++){
            s_oSpriteLibrary.addSprite("supporters_"+i,"./sprites/supporters/supporters_"+i+".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    
    this.gotoSelectTeam = function(){
        _oSelectTeam = new CSelectTeam();
        _iState = STATE_MENU;
    };
    

    this.gotoGame = function(szTeam){
                
        _oGame = new CGame(_oData, szTeam);   						
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
            _bUpdate = false;
    };

    this.startUpdate = function(){
            _bUpdate = true;
    };
    
    this._update = function(event){
		if(_bUpdate === false){
			return;
		}
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iMode;
var s_szImage;
var s_bNumActive;
var s_iTeamSelected = ARGENTINA;
var s_szTeamSelectedSprite = "argentina";

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oCrowd;
var s_oCanvas;
