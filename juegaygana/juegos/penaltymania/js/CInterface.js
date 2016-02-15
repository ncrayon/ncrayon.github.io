function CInterface(iLevel){
    var _oAudioToggle;
    var _oButExit;
    
    var _oHelpPanel=null;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    
    var _oHelpContainer;
    var _oKickLeftContainer;
    
    var _oScoreText;
    var _oScoreTextStroke;
    var _oBonusText;
    var _oBonusTextStroke;
    var _oGoalScoredText;
    var _oGoalScoredTextStroke;
    var _oKickLeftSprite;
    var _oGoalSprite;
    
    var _oBonusPos          = {x: CANVAS_WIDTH/2-350, y: 50};
    var _oScorePos          = {x: CANVAS_WIDTH/2-300, y: CANVAS_HEIGHT -20};
    var _oKickLeftPos       = {x: CANVAS_WIDTH/2+180, y: CANVAS_HEIGHT-45};
    var _oGoalPos           = {x: CANVAS_WIDTH/2-10, y: CANVAS_HEIGHT -20};
    var _oGoalSpritePos     = {x: CANVAS_WIDTH/2-80, y: CANVAS_HEIGHT-50};
    var _oKickLeftSpritePos = {x: CANVAS_WIDTH/2+100, y: CANVAS_HEIGHT-50};
    
    var _oParent = this;
    
    var _oPosEndBall = {x:0, y:0};
    
    var _oTopBar;
    var _oRightBar;
    
    var _bUpdate;
    var _bCanPlay = true;
    var _iCurState = 0;
    
    var _iLevel = iLevel;
    
    var _oShapeKeyListener;
    
    this._init = function(){     
        _iCurState = 0;
        var oExitX;        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2)- 90;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        
        _oKickLeftContainer = new createjs.Container();
        s_oStage.addChild(_oKickLeftContainer)
        
        var iRange=TOP_BARX/RANGE_WIDTH;
        _oTopBar = new CShotIndicatorController(iRange, false);
        iRange = RIGHT_BARY/RANGE_HEIGHT;
        _oRightBar = new CShotIndicatorController(iRange, true);
        
        for(var i=0; i<_iLevel; i++){
            _oTopBar.increaseSpeed();
            _oRightBar.increaseSpeed();
        }
        
        _oShapeKeyListener = new createjs.Shape();
        _oShapeKeyListener.graphics.beginFill("Black").drawRect(0,160,CANVAS_WIDTH,CANVAS_HEIGHT-160);
        _oShapeKeyListener.alpha = 0.01;
        s_oStage.addChild(_oShapeKeyListener);
        _oShapeKeyListener.on("mousedown", this._handleClick, this);
        
        if(!s_bMobile){
            document.onkeydown = onKeyDown; 
        }
        
        this.controlState();
    };
    
    this._handleClick = function(e){
        if(_bCanPlay === true){
            switch(_iCurState){
                case 0:
                    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                        createjs.Sound.play("stop_indicator");
                    }
                    _oTopBar.endAnimation();
                     _oPosEndBall.x=_oTopBar.getPositionBallEnd();
                    _iCurState++;
                    _oParent.controlState();
                    break;
                case 1:
                    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                        createjs.Sound.play("stop_indicator");
                    }
                    _oRightBar.endAnimation();
                    _oPosEndBall.y = _oRightBar.getPositionBallEnd();
                    _iCurState++;
                    _oParent.controlState();
                    break;
            }
        }
    };	
    
    function onKeyDown(evt) { 
        if(_bCanPlay === true){
            if(evt.keyCode === SPACE_BAR) {
                _oParent._handleClick();
            }
        }
    }
    
    this.controlState = function(){
        switch(_iCurState){
            case 0:{
                    _oTopBar.startAnimation();
                    break;
            }
            case 1:{
                    _oRightBar.startAnimation();	
                    break;
            }
            case 2:{
                    _oTopBar.hide();
                    _oRightBar.hide();
                    s_oGame.animatePlayer(_oPosEndBall.x, _oPosEndBall.y);
                    break;
            }
        }
    };
    
    this.viewScoreBonus = function(iScore, iCreateText){
        if(iCreateText === 1){
            _oBonusTextStroke = new createjs.Text("BONUS x "+iScore," 25px "+TEXT, "#000000");
            _oBonusTextStroke.x = _oBonusPos.x;
            _oBonusTextStroke.y = _oBonusPos.y;
            _oBonusTextStroke.textAlign = "left";
            _oBonusTextStroke.textBaseline = "alphabetic";
            _oBonusTextStroke.lineWidth = 650;
            _oBonusTextStroke.outline = 3;
            s_oStage.addChild(_oBonusTextStroke); //Draws on canvas

            _oBonusText = new createjs.Text("BONUS x "+iScore," 25px "+TEXT, "#ffffff");
            _oBonusText.x = _oBonusPos.x;
            _oBonusText.y = _oBonusPos.y;
            _oBonusText.textAlign = "left";
            _oBonusText.textBaseline = "alphabetic";
            _oBonusText.lineWidth = 650;
            s_oStage.addChild(_oBonusText); //Draws on canvas
            
        }else{
            _oBonusTextStroke.text = "BONUS x "+iScore;
            _oBonusText.text = "BONUS x "+iScore;
        }
    };
    
    this.viewScore = function(iScore){
        _oScoreTextStroke = new createjs.Text("PUNTOS: "+iScore," 25px "+TEXT, "#000000");
        _oScoreTextStroke.x = _oScorePos.x;
        _oScoreTextStroke.y = _oScorePos.y;
        _oScoreTextStroke.textAlign = "left";
        _oScoreTextStroke.textBaseline = "alphabetic";
        _oScoreTextStroke.lineWidth = 650;
        _oScoreTextStroke.outline = 3;
        s_oStage.addChild(_oScoreTextStroke); //Draws on canvas

        _oScoreText = new createjs.Text("PUNTOS: "+iScore," 25px "+TEXT, "#ffffff");
        _oScoreText.x = _oScorePos.x;
        _oScoreText.y = _oScorePos.y;
        _oScoreText.textAlign = "left";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 650;
        s_oStage.addChild(_oScoreText); //Draws on canvas
        
    };
    
    this.viewGoalScored = function(iGoalScore, iGoalToScore){
        
        _oGoalSprite   = createBitmap(s_oSpriteLibrary.getSprite('icon_goal'));
        _oGoalSprite.x = _oGoalSpritePos.x;
        _oGoalSprite.y = _oGoalSpritePos.y;
        s_oStage.addChild(_oGoalSprite);
        
        _oGoalScoredTextStroke = new createjs.Text(iGoalScore+"/"+iGoalToScore," 25px "+TEXT, "#000000");
        _oGoalScoredTextStroke.x = _oGoalPos.x;
        _oGoalScoredTextStroke.y = _oGoalPos.y;
        _oGoalScoredTextStroke.textAlign = "left";
        _oGoalScoredTextStroke.textBaseline = "alphabetic";
        _oGoalScoredTextStroke.lineWidth = 650;
        _oGoalScoredTextStroke.outline = 3;
        s_oStage.addChild(_oGoalScoredTextStroke); //Draws on canvas

        _oGoalScoredText = new createjs.Text(iGoalScore+"/"+iGoalToScore," 25px "+TEXT, "#ffffff");
        _oGoalScoredText.x = _oGoalPos.x;
        _oGoalScoredText.y = _oGoalPos.y;
        _oGoalScoredText.textAlign = "left";
        _oGoalScoredText.textBaseline = "alphabetic";
        _oGoalScoredText.lineWidth = 650;
        s_oStage.addChild(_oGoalScoredText); //Draws on canvas
        
    };
    
    this.viewKickLeft = function(iKickLeft){
        var oBall;
        var ioffsetX = 0;
        _oKickLeftContainer.removeAllChildren();
        _oKickLeftContainer.y = _oKickLeftSpritePos.y;
        _oKickLeftSprite   = createBitmap(s_oSpriteLibrary.getSprite('icon_kick'));
        _oKickLeftSprite.x = _oKickLeftSpritePos.x;

        _oKickLeftSprite.y = 0;
        _oKickLeftContainer.addChild(_oKickLeftSprite);
        
        for(var i = 0; i < iKickLeft; i++, ioffsetX+=26){
            oBall = createBitmap(s_oSpriteLibrary.getSprite('ball_kick_left'));
            oBall.x = _oKickLeftPos.x+ioffsetX;

            oBall.y = 0;
            _oKickLeftContainer.addChild(oBall); 
        }
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        _oButExit.unload();
        
        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
        s_oInterface = null;
    };
    
    this.help = function(){
        _bCanPlay = false;
        _oHelpContainer = new createjs.Container();
        s_oStage.addChild(_oHelpContainer)
        
        var HelpPannel = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
            HelpPannel.x = CANVAS_WIDTH/2;
            HelpPannel.y = CANVAS_HEIGHT/2;
            HelpPannel.regX = MSG_BOX_WIDTH/2;
            HelpPannel.regY = MSG_BOX_HEIGHT/2;
            _oHelpContainer.addChild(HelpPannel); //Draws on canvas
        if(s_bMobile === false){
            var oHelpText = new createjs.Text(HELP_TEXT_DESKTOP," 25px "+TEXT, "#ffffff");
            oHelpText.x = CANVAS_WIDTH/2;
            oHelpText.y = 180;
            oHelpText.textAlign = "center";
            oHelpText.textBaseline = "alphabetic";
            oHelpText.lineWidth = 650;
            _oHelpContainer.addChild(oHelpText); //Draws on canvas
        }else{
            var oHelpText = new createjs.Text(HELP_TEXT_MOBILE," 25px "+TEXT, "#ffffff");
            oHelpText.x = CANVAS_WIDTH/2;
            oHelpText.y = 180;
            oHelpText.textAlign = "center";
            oHelpText.textBaseline = "alphabetic";
            oHelpText.lineWidth = 650;
            _oHelpContainer.addChild(oHelpText); //Draws on canvas
        }
        var oSprite = createBitmap(s_oSpriteLibrary.getSprite('high_bar'));
            oSprite.x = CANVAS_WIDTH/2;
            oSprite.y = 300;
            oSprite.regX = TOP_BARX/2;
            oSprite.regY = TOP_BARY/2;
            oSprite.scaleX = 0.8;
            oSprite.scaleY = 0.8;
            _oHelpContainer.addChild(oSprite); //Draws on canvas
            
            oSprite = createBitmap(s_oSpriteLibrary.getSprite('arrow_bar'));
            oSprite.x = CANVAS_WIDTH/2-130;
            oSprite.y = 290;
            oSprite.regX = CURSOR_X/2;
            oSprite.regY = CURSOR_Y/2;
            oSprite.scaleX = 0.8;
            oSprite.scaleY = 0.8;
            _oHelpContainer.addChild(oSprite); //Draws on canvas
            
        var oHelpTextContinue = new createjs.Text(HELP_TEXT," 25px "+TEXT, "#ffffff");
            oHelpTextContinue.x = CANVAS_WIDTH/2;
            oHelpTextContinue.y = 380;
            oHelpTextContinue.textAlign = "center";
            oHelpTextContinue.textBaseline = "alphabetic";
            oHelpTextContinue.lineWidth = 650;
            _oHelpContainer.addChild(oHelpTextContinue); //Draws on canvas
            
        _oHelpContainer.on("mousedown", this._onButHelpRelease);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }        
        
        _oBonusTextStroke.y = _oBonusPos.y+iNewY;
        _oBonusText.y = _oBonusPos.y+iNewY;
        _oScoreTextStroke.y = _oScorePos.y-iNewY;
        _oScoreText.y = _oScorePos.y-iNewY;
        _oGoalScoredTextStroke.y = _oGoalPos.y-iNewY;
        _oGoalScoredText.y = _oGoalPos.y-iNewY;
        _oGoalSprite.y = _oGoalSpritePos.y-iNewY;
        _oKickLeftContainer.y = _oKickLeftPos.y-iNewY;
        
    };

    this._onButHelpRelease = function(){
        s_oStage.removeChild(_oHelpContainer);
        _oHelpContainer.off("mousedown", this._onButHelpRelease);
        _bCanPlay = true;
        s_oGame.setUpdate();
    };
    
    this._onButRestartRelease = function(){
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
      s_oGame.onExit();  
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;