function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
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
                createjs.Sound.registerSound("./sounds/press_button.ogg", "click");
                createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
                createjs.Sound.registerSound("./sounds/swoosh.ogg", "swoosh");

        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound("./sounds/press_button.mp3", "click");
                createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
                createjs.Sound.registerSound("./sounds/swoosh.mp3", "swoosh");
        }
        
        RESOURCE_TO_LOAD += 4;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_mode","./sprites/bg_mode.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("layout_3x3","./sprites/layout_3x3.png");
        s_oSpriteLibrary.addSprite("layout_4x4","./sprites/layout_4x4.png");
        s_oSpriteLibrary.addSprite("layout_5x5","./sprites/layout_5x5.png");      
        s_oSpriteLibrary.addSprite("image_1","./sprites/image_1.jpg");
        s_oSpriteLibrary.addSprite("image_2","./sprites/image_2.jpg");
        s_oSpriteLibrary.addSprite("image_3","./sprites/image_3.jpg");

        s_oSpriteLibrary.addSprite("logo","./sprites/logo_overlay.png");
        s_oSpriteLibrary.addSprite("time_display","./sprites/time_display.png");
        s_oSpriteLibrary.addSprite("but_timer","./sprites/but_timer.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_preview","./sprites/but_preview.png");
        
        
       
        
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
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
    
    
    this.gotoModeMenu = function(){
        _oModeMenu = new CModeMenu();
        _iState = STATE_MENU;
    };
    

    this.gotoGame = function(iMode, szImage, bNumActive){
        s_iMode = iMode;
        s_szImage = szImage;
        s_bNumActive = bNumActive;
        
        _oGame = new CGame(_oData);   						
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate=function(){
        _bUpdate = false;
        createjs.Ticker.paused= true;
        $("#block_game").css("display","block");
    };
        
    this.startUpdate = function(){
        s_iPrevTime = (new Date).getTime();
        _bUpdate= true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
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

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oCanvas;
var s_oSoundtrack;