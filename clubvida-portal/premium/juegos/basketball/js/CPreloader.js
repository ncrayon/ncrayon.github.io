function CPreloader(){
    var _iMaskWidth;
    var _oLoadingText;
    var _oProgressBar;
    var _oAnim;
    var _oMaskPreloader;
    var _oContainer;
    
    this._init = function(){
       s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
       s_oSpriteLibrary.addSprite("bg_preloader","./sprites/bg_preloader.jpg");
       s_oSpriteLibrary.addSprite("progress_bar","./sprites/progress_bar.png");
       s_oSpriteLibrary.addSprite("preloader_anim","./sprites/preloader_anim.png");

       s_oSpriteLibrary.loadSprites();
       
       _oContainer = new createjs.Container();
       s_oStage.addChild(_oContainer); 
    };
    
    this.unload = function(){
	_oContainer.removeAllChildren();
    };
    
    this._onImagesLoaded = function(){

    };
    
    this._onAllImagesLoaded = function(){
         
        this.attachSprites();
        
        s_oMain.preloaderReady();
    };
    
    this.attachSprites = function(){
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_preloader'));
        _oContainer.addChild(oBg);
       
       _oProgressBar  = createBitmap(s_oSpriteLibrary.getSprite('progress_bar'));
       _oProgressBar.x = 501;
       _oProgressBar.y = CANVAS_HEIGHT - 49;
       _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = 706;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(501, CANVAS_HEIGHT - 49, 1,30);
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       _oLoadingText = new createjs.Text("0%","30px impactregular", "#fff");
       _oLoadingText.x = 560;
       _oLoadingText.y = CANVAS_HEIGHT - 55;
       _oLoadingText.textAlign = "center"; 
       _oLoadingText.textBaseline = "middle";
       _oContainer.addChild(_oLoadingText);
       
       var oData = {   // image to use
                        images: [s_oSpriteLibrary.getSprite('preloader_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: 100, height: 100}, 
                        animations: {  anim: [0,21]}
                        
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oAnim =  createSprite(oSpriteSheet,"anim",0,0,100,100);
        _oAnim.x = 440;
        _oAnim.y = CANVAS_HEIGHT - 110;
        _oContainer.addChild(_oAnim);
    };
    
    this.refreshLoader = function(iPerc){
        _oLoadingText.text = iPerc+"%";
        
        var iNewMaskWidth = Math.floor((iPerc*_iMaskWidth)/100);
        _oMaskPreloader.graphics.clear();
        _oMaskPreloader.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(501, CANVAS_HEIGHT - 49, iNewMaskWidth,30);
    };
    
    this._init();   
}