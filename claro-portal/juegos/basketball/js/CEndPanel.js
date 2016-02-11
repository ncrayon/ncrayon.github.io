function CEndPanel(iTimeLeft,iScore,iShots,refGame){

    var _refGame;

    var _oSprPanel;
    var _oTextScore;
    var _oTextShots;
    var _oTextTime;
    var _oTextSuccessPerc;
    var _oButReplay;
    
    this._init = function(iTimeLeft,iScore,iShots,refGame){
        _refGame = refGame;

        _oSprPanel = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        s_oStage.addChild(_oSprPanel);

        var _szFinalScore = TEXT_FINALSCORE + " "+iScore;
        _oTextScore = new createjs.Text(_szFinalScore, "bold 52px impactregular", "#FFCC00");
        _oTextScore.x = CANVAS_WIDTH/2;
        _oTextScore.y = 225;
        _oTextScore.alpha = 0;
        _oTextScore.textBaseline = "alphabetic";
        _oTextScore.textAlign = "center";
        _oTextScore.shadow = new createjs.Shadow("#000000", 4, 4, 3);
        createjs.Tween.get(_oTextScore).to({x:CANVAS_WIDTH/2,y:(CANVAS_HEIGHT/2) - 110,alpha:1}, 1600,createjs.Ease.quadOut);
        var _szFinalShots = TEXT_FINALSHOTS + " "+iShots;
        _oTextShots = new createjs.Text(_szFinalShots, "bold 36px impactregular", "#FFCC00");
        _oTextShots.x = CANVAS_WIDTH/2 - 150;
        _oTextShots.y = (CANVAS_HEIGHT/2) - 49;
        _oTextShots.alpha = 0;
        _oTextShots.textBaseline = "alphabetic";
        _oTextShots.textAlign = "center";
        _oTextShots.shadow = new createjs.Shadow("#000000", 3, 3, 3);

        createjs.Tween.get(_oTextShots).wait(500).to({x:CANVAS_WIDTH/2,y:(CANVAS_HEIGHT/2) - 49,alpha:1}, 500,createjs.Ease.quadOut);
        
        if(iTimeLeft <= 0){
            iTimeLeft = 0;
        }else{
            iTimeLeft = formatTime(iTimeLeft);
        }
        
        var _szFinalTime = TEXT_FINALTIME + " "+ iTimeLeft;
        _oTextTime = new createjs.Text(_szFinalTime, "bold 36px impactregular", "#FFCC00");
        _oTextTime.x = CANVAS_WIDTH/2 + 150;
        _oTextTime.y = (CANVAS_HEIGHT/2 - 7);
        _oTextTime.alpha = 0;
        _oTextTime.textBaseline = "alphabetic";
        _oTextTime.textAlign = "center";
        _oTextTime.shadow = new createjs.Shadow("#000000", 3, 3, 3);

        createjs.Tween.get(_oTextTime).wait(750).to({x:CANVAS_WIDTH/2,y:(CANVAS_HEIGHT/2 - 7),alpha:1}, 500,createjs.Ease.quadOut)

        var succP;
        if (iShots === 0) {succP=0;} else{succP=(((iScore/iShots)*100)/10).toFixed(1);};
        var _szFinalSuccPerc = TEXT_FINALSUCCESSPERC + " "+succP + "%";
        _oTextSuccessPerc = new createjs.Text(_szFinalSuccPerc, "bold 36px impactregular", "#FFCC00");
        _oTextSuccessPerc.x = CANVAS_WIDTH/2 - 150;
        _oTextSuccessPerc.y = (CANVAS_HEIGHT/2 + 32);
        _oTextSuccessPerc.alpha = 0;
        _oTextSuccessPerc.textBaseline = "alphabetic";
        _oTextSuccessPerc.textAlign = "center";
        _oTextSuccessPerc.shadow = new createjs.Shadow("#000000", 3, 3, 3);

        var that = this; 
        createjs.Tween.get(_oTextSuccessPerc)
            .wait(1000)
            .to({x:CANVAS_WIDTH/2,y:(CANVAS_HEIGHT/2 + 32),alpha:1}, 500,createjs.Ease.quadOut)
            .call(function(){
                    var oSprite = s_oSpriteLibrary.getSprite('but_play');
                    _oButReplay = new CTextButton(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 105,oSprite,TEXT_PLAYAGAIN,"impactregular","#ffffff",30,s_oStage);
                    _oButReplay.addEventListener(ON_MOUSE_UP, that._onButPlayAgain, that); 
                },that);

        s_oStage.addChild(_oTextScore,_oTextShots,_oTextTime,_oTextSuccessPerc);
        
        $(s_oMain).trigger("save_score",[iScore]);
    };
    
    this.unload = function(){
        _oButReplay.unload(); 
        _oButReplay = null;
    };
    
    this._onButPlayAgain = function(){
        _refGame.unload();
    };
    
    this._init(iTimeLeft,iScore,iShots,refGame);
}