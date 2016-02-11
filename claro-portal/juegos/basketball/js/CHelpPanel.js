function CHelpPanel(){
    var _oText;
    var _oHelpBg;
    var _oButExit;
    var _oContainer;

    this._init = function(){
        _oHelpBg = new createBitmap(s_oSpriteLibrary.getSprite('bg_help')); 
        
        var szText;
        if(s_bMobile){
            szText = TEXT_HELP_MOBILE;
        }else{
            szText = TEXT_HELP;
        }
        
	_oText = new createjs.Text(szText,"48px impactregular", "#FFCC00");
        _oText.x = CANVAS_WIDTH/2;
        _oText.y = 260; 
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";
        _oText.lineWidth = 550;
        _oText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        
        var oTextPoint1 = new createjs.Text("10 "+TEXT_POINTS,"28px impactregular", "#FFCC00");
        oTextPoint1.x = 325;
        oTextPoint1.y = 520; 
        oTextPoint1.textAlign = "center";
        oTextPoint1.textBaseline = "alphabetic";
        oTextPoint1.shadow = new createjs.Shadow("#000", 2, 2, 2);
        
        var oTextPoint2 = new createjs.Text("20 "+TEXT_POINTS,"28px impactregular", "#FFCC00");
        oTextPoint2.x = 475;
        oTextPoint2.y = 520; 
        oTextPoint2.textAlign = "center";
        oTextPoint2.textBaseline = "alphabetic";
        oTextPoint2.shadow = new createjs.Shadow("#000", 2, 2, 2);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButExit = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -140,oSprite,TEXT_PLAY,"impactregular","#fff",60,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this); 

        _oContainer = new createjs.Container();
        _oContainer.addChild(_oHelpBg,_oText,_oButExit.getButtonImage(),oTextPoint1,oTextPoint2);
        s_oStage.addChild(_oContainer);

    };

    this.unload = function(){
        _oButExit.unload();
        _oContainer.removeAllChildren();
    };

    this._onExit = function(){
        this.unload();
        s_oGame.exitFromHelp();
    };

    this._init();

}