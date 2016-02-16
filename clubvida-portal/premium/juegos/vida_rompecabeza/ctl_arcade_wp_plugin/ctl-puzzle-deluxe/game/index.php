<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="css/reset.css" type="text/css">
        <link rel="stylesheet" href="css/main.css" type="text/css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
	<meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="js/createjs-2014.12.12.min.js"></script>
        <script type="text/javascript" src="js/hammer.min.js"></script>
        <script type="text/javascript" src="js/ctl_utils.js"></script>
        <script type="text/javascript" src="js/sprite_lib.js"></script>
        <script type="text/javascript" src="js/settings.js"></script>
        <script type="text/javascript" src="js/CLang.js"></script>
        <script type="text/javascript" src="js/CPreloader.js"></script>
        <script type="text/javascript" src="js/CMain.js"></script>
        <script type="text/javascript" src="js/CTextButton.js"></script>
        <script type="text/javascript" src="js/CToggle.js"></script>
        <script type="text/javascript" src="js/CGfxButton.js"></script>
        <script type="text/javascript" src="js/CMenu.js"></script>
        <script type="text/javascript" src="js/CModeMenu.js"></script>
        <script type="text/javascript" src="js/CGame.js"></script>
        <script type="text/javascript" src="js/CInterface.js"></script>
        <script type="text/javascript" src="js/CEndPanel.js"></script>
        <script type="text/javascript" src="js/CPausePanel.js"></script>
        <script type="text/javascript" src="js/CPreviewPanel.js"></script>
        <script type="text/javascript" src="js/CPiece.js"></script>
        
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
	<div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
          <script>
            $(document).ready(function(){
                     var oMain = new CMain({
                                            
                                            num_shuffle_3x3: 20, //NUM SHUFFLE FOR 3X3 GAME MODE
                                            num_shuffle_4x4: 40, //NUM SHUFFLE FOR 4X4 GAME MODE
                                            num_shuffle_5x5: 60, //NUM SHUFFLE FOR 5X5 GAME MODE
                                            
                                            shuffle_speed_3x3: 150, //TIME SPEED (IN MS) OF 1 SHUFFLED, FOR 3X3 GAME MODE
                                            shuffle_speed_4x4: 100, //TIME SPEED (IN MS) OF 1 SHUFFLED, FOR 4X4 GAME MODE
                                            shuffle_speed_5x5: 75,  //TIME SPEED (IN MS) OF 1 SHUFFLED, FOR 5X5 GAME MODE
                                            
                                            bonus_time_3x3: 60000,   //TIME LIMIT (IN MS) TO COMPLETE THE GAME, FOR BONUS POINTS CALCULATION IN 3X3 GAME MODE 
                                            bonus_time_4x4: 120000,   //TIME LIMIT (IN MS) TO COMPLETE THE GAME, FOR BONUS POINTS CALCULATION IN 4X4 GAME MODE
                                            bonus_time_5x5: 180000   //TIME LIMIT (IN MS) TO COMPLETE THE GAME, FOR BONUS POINTS CALCULATION IN 5X5 GAME MODE
                                           });
                                           
                                           
                     $(oMain).on("start_session", function(evt) {
                            if(getParamValue('ctl-arcade') === "true"){
                                parent.__ctlArcadeStartSession();
                            }
                            //...ADD YOUR CODE HERE EVENTUALLY
                    });
                     
                    $(oMain).on("end_session", function(evt) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeEndSession();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("restart_level", function(evt, iLevel) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeRestartLevel({level:iLevel});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("save_score", function(evt,iScore, szMode) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeSaveScore({score:iScore, mode: szMode});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("start_level", function(evt, iLevel) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeStartLevel({level:iLevel});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("end_level", function(evt,iLevel) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeEndLevel({level:iLevel});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("show_interlevel_ad", function(evt) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeShowInterlevelAD();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });
                    
                    $(oMain).on("share_event", function(evt, iScore, szImage, szTitle, szMsg, szMsgShare) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeShareEvent({   img:szImage,
                                                                title:szTitle,
                                                                msg:szMsg,
                                                                msg_share:szMsgShare});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });
                     
                     if(isIphone()){ 
                        setTimeout(function(){sizeHandler();},200); 
                    }else{ 
                        sizeHandler(); 
                    }
           });

        </script>
        <canvas id="canvas" class='ani_hack' width="1920" height="1080"> </canvas>
        <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

    </body>
</html>
