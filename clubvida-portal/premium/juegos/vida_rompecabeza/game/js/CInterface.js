function CInterface(){
    var _bPreviewOn;
    
    var _oAudioToggle;
    var _oButTimer;
    var _oButExit;
    var _oButRestart;
    var _oButPreview;
    var _oTimePane;
    var _oTimeNum;
    
    var _oHelpPanel=null;
    var _oPreviewPanel;

    
    var _pStartPosExit;
    var _pStartPosAudio;
    
    
    this._init = function(){                
        var oExitX;        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2)- 120;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        var _oButPos = {x:1570, y: 220};

        var oSprite = s_oSpriteLibrary.getSprite('time_display');
        _oTimePane = createBitmap(oSprite);
        _oTimePane.x = _oButPos.x;
        _oTimePane.y = _oButPos.y;
        s_oStage.addChild(_oTimePane);

        _oTimeNum = new createjs.Text("00:00","bold 60px "+SECONDARY_FONT, "#ffffff");
        _oTimeNum.x = _oButPos.x + 25;
        _oTimeNum.y = _oButPos.y+65;
        _oTimeNum.textAlign = "left";
        _oTimeNum.textBaseline = "alphabetic";
        _oTimeNum.lineWidth = 200;
        s_oStage.addChild(_oTimeNum);

        var oSprite = s_oSpriteLibrary.getSprite('but_timer');
        _oButTimer = new CGfxButton(_oButPos.x + 100, _oButPos.y + 200, oSprite, s_oStage);
        _oButTimer.addEventListener(ON_MOUSE_UP, this._onTimer, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_restart');
        _oButRestart = new CGfxButton(_oButPos.x + 100, _oButPos.y + 400, oSprite, s_oStage);//x -83
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
       
        _bPreviewOn = false;
        var oSprite = s_oSpriteLibrary.getSprite('but_preview');
        _oButPreview = new CToggle(_oButPos.x + 100, _oButPos.y + 600, oSprite, s_oStage);
        _oButPreview.addEventListener(ON_MOUSE_DOWN, this._onPreview, this);
       
        this.setButVisible(false);
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        _oButTimer.unload();
        _oButExit.unload();
        _oButPreview.unload();
        _oButRestart.unload();
        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }        
    };
    
    this.setButVisible = function(bVal){

        _oButTimer.setVisible(bVal);

        _oButRestart.setVisible(bVal);
       
        _oButPreview.setVisible(bVal);

    };
    
    this.refreshTime = function(iValue){
        _oTimeNum.text = iValue;
    };

    this._onTimer = function(){
        s_oGame.onPause();
    };
    
    this._onRestart = function(){
        s_oGame.restartGame();
    };
    
    this._onPreview = function(){
        _bPreviewOn = !_bPreviewOn;
        if(_bPreviewOn){
            _oPreviewPanel = new CPreviewPanel();
        } else {
            _oPreviewPanel.unload();
        }       
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        $(s_oMain).trigger("restart_level",1);
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.restartGame();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        $(s_oMain).trigger("end_level",1);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
      s_oGame.onExit();  
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;