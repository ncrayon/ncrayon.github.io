function CSelectTeam(){
    
    var _bNumActive;
    
    var _iTeamSelected = 0;
    
    var _oTeamText;
    var _oPlayerContainer;
    var _oPlayer;
    
    var _oButContinue;
    var _oButtonArgentina;
    var _oButtonBrazil;
    var _oButtonEngland;
    var _oButtonFrance;
    var _oButtonGermany;
    var _oButtonItaly;
    
    var _oBg;
    var _oButExit;
    
    var _pStartPosExit;
    var _pStartPosContinue;
    
    this._init = function(){
        
        _bNumActive = false;
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_select_team'));
        s_oStage.addChild(_oBg);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_continue');
        _pStartPosContinue = {x: (CANVAS_WIDTH/2+300), y: CANVAS_HEIGHT -110};
        _oButContinue = new CGfxButton( _pStartPosContinue.x, _pStartPosContinue.y, oSprite, s_oStage );
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButNextRelease, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        _oPlayerContainer= new createjs.Container();
        s_oStage.addChild(_oPlayerContainer);
        
        _oPlayer = new CPlayer(_oPlayerContainer);
        _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, s_szTeamSelectedSprite);
        
        var _oSpriteArgentina = s_oSpriteLibrary.getSprite('argentina');        
        _oButtonArgentina= new CToggle((CANVAS_WIDTH/2)-150,(CANVAS_HEIGHT/2)-125, _oSpriteArgentina, false);
        _oButtonArgentina.addEventListenerWithParams(ON_MOUSE_UP, this._onModeToggle, this, ARGENTINA);
        
        var _oSpriteBrazil = s_oSpriteLibrary.getSprite('brazil');        
        _oButtonBrazil= new CToggle((CANVAS_WIDTH/2)+120,(CANVAS_HEIGHT/2)-125, _oSpriteBrazil, true);
        _oButtonBrazil.addEventListenerWithParams(ON_MOUSE_UP, this._onModeToggle, this, BRAZIL);
        
        var _oSpriteGermany = s_oSpriteLibrary.getSprite('germany');      
        _oButtonGermany= new CToggle((CANVAS_WIDTH/2)-210,(CANVAS_HEIGHT/2), _oSpriteGermany, true);
        _oButtonGermany.addEventListenerWithParams(ON_MOUSE_UP, this._onModeToggle, this, GERMANY);
        
        var _oSpriteEngland = s_oSpriteLibrary.getSprite('england');        
        _oButtonEngland= new CToggle((CANVAS_WIDTH/2)+180,(CANVAS_HEIGHT/2), _oSpriteEngland, true);
        _oButtonEngland.addEventListenerWithParams(ON_MOUSE_UP, this._onModeToggle, this, ENGLAND);
        
        var _oSpriteItaly = s_oSpriteLibrary.getSprite('italy');        
        _oButtonItaly= new CToggle((CANVAS_WIDTH/2)-175,(CANVAS_HEIGHT/2)+125, _oSpriteItaly, true);
        _oButtonItaly.addEventListenerWithParams(ON_MOUSE_UP, this._onModeToggle, this, ITALY);
        
        var _oSpriteFrance = s_oSpriteLibrary.getSprite('france');        
        _oButtonFrance= new CToggle((CANVAS_WIDTH/2)+150,(CANVAS_HEIGHT/2)+125, _oSpriteFrance, true);
        _oButtonFrance.addEventListenerWithParams(ON_MOUSE_UP, this._onModeToggle, this, FRANCE);
        
        _oTeamText = new createjs.Text("ARGENTINA"," 25px "+TEXT, "#080863");
        _oTeamText.x = CANVAS_WIDTH/2-10;
        _oTeamText.y = CANVAS_HEIGHT/2+150;
        _oTeamText.textAlign = "center";
        _oTeamText.textBaseline = "alphabetic";
        s_oStage.addChild(_oTeamText);
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };  
    
    this._onModeToggle = function(iData){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("select_team");
        }
        switch(iData){
            
            case 0: {
                    _oButtonArgentina.setActive(false);
                    _oButtonBrazil.setActive(true);
                    _oButtonGermany.setActive(true);
                    _oButtonEngland.setActive(true);
                    _oButtonItaly.setActive(true);
                    _oButtonFrance.setActive(true);
                    _iTeamSelected = ARGENTINA;
                    _oTeamText.text = "ARGENTINA";
                    _oPlayer.unload();
                    _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "argentina");
                    break;
            }
            case 1: {
                    _oButtonArgentina.setActive(true);
                    _oButtonBrazil.setActive(false);
                    _oButtonGermany.setActive(true);
                    _oButtonEngland.setActive(true);
                    _oButtonItaly.setActive(true);
                    _oButtonFrance.setActive(true);
                    _iTeamSelected = BRAZIL;
                    _oTeamText.text = "BRAZIL";
                    _oPlayer.unload();
                    _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "brazil");
                    break;                    
            }
            case 2: {
                    _oButtonArgentina.setActive(true);
                    _oButtonBrazil.setActive(true);
                    _oButtonGermany.setActive(false);
                    _oButtonEngland.setActive(true);
                    _oButtonItaly.setActive(true);
                    _oButtonFrance.setActive(true);
                    _iTeamSelected = GERMANY;
                    _oTeamText.text = "GERMANY";
                    _oPlayer.unload();
                    _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "germany");
                    break;
            }      
            case 3: {
                    _oButtonArgentina.setActive(true);
                    _oButtonBrazil.setActive(true);
                    _oButtonGermany.setActive(true);
                    _oButtonEngland.setActive(false);
                    _oButtonItaly.setActive(true);
                    _oButtonFrance.setActive(true);
                    _iTeamSelected = ENGLAND;
                    _oTeamText.text = "ENGLAND";
                    _oPlayer.unload();
                    _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "england");
                    break;
            }      
            case 4: {
                    _oButtonArgentina.setActive(true);
                    _oButtonBrazil.setActive(true);
                    _oButtonGermany.setActive(true);
                    _oButtonEngland.setActive(true);
                    _oButtonItaly.setActive(false);
                    _oButtonFrance.setActive(true);
                    _iTeamSelected = ITALY;
                    _oTeamText.text = "ITALY";
                    _oPlayer.unload();
                    _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "italy");
                    break;
            }      
            case 5: {
                    _oButtonArgentina.setActive(true);
                    _oButtonBrazil.setActive(true);
                    _oButtonGermany.setActive(true);
                    _oButtonEngland.setActive(true);
                    _oButtonItaly.setActive(true);
                    _oButtonFrance.setActive(false);
                    _iTeamSelected = FRANCE;
                    _oTeamText.text = "FRANCE";
                    _oPlayer.unload();
                    _oPlayer.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "france");
                    break;
            }      
        }
        s_iTeamSelected = _iTeamSelected;
    };
    
    this._onExit = function(){
        s_oMain.gotoMenu();  
    };
    
    this.unload = function(){
        _oButtonArgentina.unload();
        _oButtonBrazil.unload();
        _oButtonGermany.unload();
        _oButtonEngland.unload();
        _oButtonItaly.unload();
        _oButtonFrance.unload();
        
        _oPlayer.unload();
        
        s_oSelectTeam = null;
        s_oStage.removeAllChildren();        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        _oButContinue.setPosition(_pStartPosContinue.x,_pStartPosContinue.y - iNewY);
    };
          
    this._onButNextRelease = function(){
        this.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }
        var szTeamSelected;
        switch(_iTeamSelected){
            case 0:
                szTeamSelected = "argentina";
                break;
            case 1:
                szTeamSelected = "brazil";
                break;
            case 2:
                szTeamSelected = "germany";
                break;
            case 3:
                szTeamSelected = "england";
                break;
            case 4:
                szTeamSelected = "italy";
                break;
            case 5:
                szTeamSelected = "france";
                break;
                
        }
        s_oMain.gotoGame(szTeamSelected);
    };        
    
    s_oSelectTeam = this;        
    this._init();
    
    
};

var s_oSelectTeam = null;