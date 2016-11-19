/*
 TODO: 1-MAKE POST OBJECTS {user:"poster name", liked:true/or false ...}    ***DONE***
 TODO: 2-MAKE USER OR PAGE OR GROUP PROFILE TYPE DETECTOR FUNCTION   ***DONE***
 TODO: 3-MAKE A COMENT LIKER  THAT RETURNS DONE ZHEN FINISHING LIKING ALL FILTERD COMMENTS OF A SPECIFIC POST
commentByComment


      changePost = true;
      if(changePost){
            var p = (isTherePosts())? filterdOnePost():false;
      }
 if (p){
     try{
     p.like();
     changePost = false;
     console.log("[?]a post has Been Liked :D ");
     if(p.hasComments())
     {}
     else{
           p.remove();
           console.log("[X]a post has Been Removed :D ")
           changePost = true;
     }

     }catch(e){
     p.remove();
 }


 }
            fetch it's comment
             expandThecomments
             if (thereIsaComment)
                 getAFilterdComment
                     likeIt
                     removeit
             else{
                changePost = true
                removepost
             }


 */


    function  postByPost(options){
        this.start = function(){

            var p = (isTherePosts())? filterdOnePost({liked:false, usersOut:"Tabri Radjalha Belhadj Chikh"}):false;
            if (p){
                try{
                    p.like();
                    console.log("[?]a post has Been Liked :D ");
                    p.remove();
                    delete p ;
                    console.log("[X]a post has Been Removed :D ");
                }catch(e){
                    p.remove();
                    delete p ;
                }


            }
            if(!isTherePosts())
            {
                console.log("[!]More Posts needed :D ");
                loadMore("posts");
                forceLoadMore();
            }
        }

        this.stop = clearInterval;
    }

    /*
     show current href
     window.location.href
     ----------------------
     homePage : postloader :document.getElementsByClassName("_5usd")[0].click();
     homePage : postloader :document.getElementsByClassName("uiMorePagerPrimary")[0].click();
     CloseChatWindows :
     for(i = 0; i<closeBtn.length; i++){
     console.log(closeBtn[i].click())
     }
     */
    /**
     * Add a class to An html Element
     * @param theClass
     */
    HTMLElement.prototype.addClass = function (theClass) {
        this.className += " " + theClass;
    }
    /**
     * Remove a class from an html element
     * @param theClass
     */
    HTMLElement.prototype.removeClass = function (theClass) {
        var classes = this.className.split(" ");
        var className = "";
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] != (theClass)) {
                className += classes[i];
                className += " ";
                ;
            }
        }
        this.className = className;
    }
    HTMLElement.prototype.toggleClass = function (theClass) {
        (this.className.indexOf(theClass) > -1) ? this.removeClass(theClass) : this.addClass(theClass);
    }
    /**
     * this is a special variable that refers to "this" instance of an Array.
     * returns true if needle is in the array, and false otherwise
     */
    Array.prototype.contains = function (needle) {
        for (var i in this) {
            if (this[i] == needle) return true;
        }
        return false;
    }
    /**
     * hasClass
     * @param element        is the target element to check if
     * @param className          it has a specific class then returns
     * @returns {boolean}    true otherwise false
     */
    function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
    /**
     * imOna is a function that returns whether if we are on a (page or group
     * user profile or home) by doing specific tests
     * @returns {string/false}
     */
    function imOnA() {
        if (hasClass(document.body, "pagesTimelineLayout")) {
            return "page";
        }
        if (hasClass(document.body, "home")) {
            if (document.getElementById("pagelet_group_pager")) {
                return "group";
            } else {
                return "home";
            }
        }
        if (hasClass(document.body, "_4lh")) {
            return "user";
        }
        return false;
    }
    function getLoadBtn() {
        var Mylocation = imOnA();
        switch (Mylocation) {
            case "home":
                return document.getElementsByClassName("_5usd")[0];
                break;
            case "user":
                return [document.getElementsByClassName("uiMorePagerPrimary")[0],
                    document.getElementsByClassName("forceLoad")[0]];
                break;
            case "group":
                return document.getElementById("pagelet_group_pager").getElementsByTagName("a")[0];
                break;
            case "page":
                return document.getElementsByClassName("uiMorePagerPrimary")[0];

                break;
            default :
                return false;
                break
        }
    }
    /**
     * @brief loads more posts/comments
     *
     *
     * @param of type of stuff to load it can be posts or comments
     */
    function loadMore(of) {
        of = (of == undefined) ? "posts" : of;
        switch (of) {
            case "posts":
                var btn = getLoadBtn();
                if (btn instanceof Array) {
                    for (var i = 0; i < btn.length; i++) {
                        btn[i].click();
                    }
                } else {
                    btn.click();
                }
                break;
        }

    }
    function forceLoadMore(){
        window.scrollTo(0,window.outerHeight)
    }
    /**
     * user class
     * @param user Users Dom Element
     * @constructor
     */
    var User = function (user) {
        this.current = user;
        this.name = user.getElementsByClassName("_55lr")[0].innerText;
        this.likeBtn = function () {
            return user.getElementsByTagName("a")[0];
        }
        this.open = function () {
            this.likeBtn().click();
        }

    };
    /**
     * @brief Chat class
     *
     * this class is dedicated for the chat bar
     * and all the functions that can be done for a message window
     * and everything related to the chat bar and chat windows
     * @constructor
     */
    var Chat = function () {
        this.chat = document.getElementsByClassName("fbChatOrderedList");    //< chat Dom Element
        /**
         * @brief stores  the list of the users that appears on the
         * @type {NodeList}
         */
        this.users = document.getElementsByClassName("_42fz");               //< Users Dom

        this.tabs = function () {
            return document.getElementById("ChatTabsPagelet");
        }
        /**
         * @brief returns all the users on the Chat Tab
         *
         *
         * @returns {NodeList|*} list of all the users on the Chat Tab
         */
        this.usersOnTab = function () {
            return this.tabs().getElementsByClassName("fbDockChatTabFlyout");
        };

        this.message = document.getElementsByClassName("_552m");            //<
        this.upperizer = function(string){
            var message = this.message;
            /*
            * options
            *   {upperizer:()}*/
            if(typeof string == "string" && message){
            var upperizerTimer = setInterval(function(){


                for (var i = 0;i<message.length; i++ ){
                    //step one check the options
                    if(message[i].value.match("{upperizer:(.+)}")){
                        string =message[i].value.match("{upperizer:(.+)}")[1];
                        message[i].value = message[i].value.replace("{upperizer:(.+)}","UPPERIZER : changed letters ");
                    }
                    if(message[i].value.match("{stopUpperizer}"))
                    {
                        message[i].value = message[i].value.replace("{stopUpperizer}","UPPERIZER STOPED ");
                        clearInterval(upperizerTimer);
                    }
                    console.log("step one done!")
                    //step two check upperize
                    for(var j =0; j<string.length; j++ ){
                        message[i].value = message[i].value.replace(string[j],string[j].toUpperCase());
                    }
                    console.log("step two done!")
                }
            },500)
            }
        }

        this.messagePrefix = function(symbole){
           symbole += " ";
            var k = this.message;
            var Prefixer = setInterval(function(){

                for (var i =0 ; i< k.length ;i++){
                    var value =""+k[i].value;
                    var option = value.match( "{prefix:(.+)}");

                    if(option){
                        symbole =  option[1];

                        k[i].value ="Prefix Changed";
                        break
                    }
                    if(value.match( "{stopPrefix}")){
                        clearInterval(Prefixer);
                        k[i].value ="stoped";
                        break
                    }

                    if(symbole.length>value.length){
                        k[i].value = symbole +" : ";continue;
                    }
                    for(var j =0 ;j<symbole.length;j++){
                        if(symbole[j] != value[j]){
                            k[i].value = symbole+" : "+value;break;
                        }
                    }

                }
            },2000)
        }


    };
    var i = 0;
    var doneWithPosts = false;
    cleverProcessor = function (arrayOfElements, i, speed) {
        doneWithPosts = false;
        arrayOfElements.length;
        i = (i) ? i : 0;
        speed = (speed) ? speed : 2000;
        if (i >= arrayOfElements.length)doneWithPosts = true;
        if (i < arrayOfElements.length) {
            setTimeout(function () {
                //things to do
                var current = arrayOfElements[i];
                current.like();
                current.toText();
                current.remove();
                //--------------------------------
                cleverProcessor(arrayOfElements, i + 1)
            }, 2000)
        }

    }

    var posts = document.getElementsByClassName("_5v3q");

    // check if there is a post currently
    function isTherePosts() {
        var posts = document.getElementsByClassName("_5v3q");
        return (posts.length) ? true : false;
    }

    var filterdOnePost = function (options) {
            var current = {};
            var condition = true;
            //default options of the filtering function
            var defaults = {
                liked: true              //fetch liked posts
                , usersIn: "all"         //posts of all users
                , "usersOut": "none"     //exclude users
            }

            if (typeof options === "object") {
                options["liked"] = (options["liked"] == undefined) ? defaults["liked"] : options["liked"];
                options["usersIn"] = (options["usersIn"] == undefined) ? defaults["usersIn"] : options["usersIn"];
                options["usersOut"] = (options["usersOut"] == undefined) ? defaults["usersOut"] : options["usersOut"];
            } else {
                options = defaults;
            }
            var posts = document.getElementsByClassName("_5v3q");
            //preparing the filtered array of posts
            for (var i = 0; i < posts.length; i++) {
                condition = true;
                try{
                    current = new Post(posts[i]);

                    if (options["liked"] === false) {
                        condition = ((current.isLiked()) ? false : true) && condition;
                    }

                    if (options["usersIn"] != "all") {
                        if (typeof options["usersIn"] === "string") {
                            condition = ((options["usersIn"] == current.user) ? true : false) && condition;

                        }
                        if (options["usersIn"] instanceof  Array) {
                            condition = ((options["usersIn"].contains(current.user)) ? true : false) && condition;
                        }
                    }

                    if (options["usersOut"] != "none") {
                        if (typeof options["usersOut"] === "string") {
                            condition = ((options["usersOut"] == current.user) ? false : true) && condition;
                        }
                        if (options["usersOut"] instanceof Array) {
                            condition = ((options["usersOut"].contains(current.user)) ? false : true) && condition;
                        }
                    }
                    if (condition) {
                        return current;
                    }
                    current.remove();
                }catch(e){
                    posts[i].remove();
                }
            }
        }

    var filterdPosts = function (options) {
        var current = {};
        var filterdPostsArray = [];
        var condition = true;
        //default options of the filtering function
        var defaults = {
            liked: true              //fetch liked posts
            , usersIn: "all"         //posts of all users
            , "usersOut": "none"     //exclude users
        }

        if (typeof options === "object") {
            options["liked"] = (options["liked"] == undefined) ? defaults["liked"] : options["liked"];
            options["usersIn"] = (options["usersIn"] == undefined) ? defaults["usersIn"] : options["usersIn"];
            options["usersOut"] = (options["usersOut"] == undefined) ? defaults["usersOut"] : options["usersOut"];
        } else {
            options = defaults;
        }
        var posts = document.getElementsByClassName("_5v3q");
        //preparing the filtered array of posts
        for (var i = 0; i < posts.length; i++) {
            condition = true;
            current = new Post(posts[i]);

            if (options["liked"] === false) {
                condition = ((current.isLiked()) ? false : true) && condition;
            }

            if (options["usersIn"] != "all") {
                if (typeof options["usersIn"] === "string") {
                    condition = ((options["usersIn"] == current.user) ? true : false) && condition;

                }
                if (options["usersIn"] instanceof  Array) {
                    condition = ((options["usersIn"].contains(current.user)) ? true : false) && condition;
                }
            }

            if (options["usersOut"] != "none") {
                if (typeof options["usersOut"] === "string") {
                    condition = ((options["usersOut"] == current.user) ? false : true) && condition;
                }
                if (options["usersOut"] instanceof Array) {
                    condition = ((options["usersOut"].contains(current.user)) ? false : true) && condition;
                }
            }
            if (condition) {
                filterdPostsArray.push(current)
            }

        }
        return filterdPostsArray;
    }
    function Post(post) {

        this.post = post;

        this.user = !(this.post && this.post.getElementsByClassName("fwb")[0])? false : this.post.getElementsByClassName("fwb")[0].innerText;

        this.likeBtn = function () {
            var btn = false; //< case the button is not found
            if (this.post && this.post.getElementsByClassName("UFILikeLink")[0] ) {
                btn = this.post.getElementsByClassName("UFILikeLink")[0]; // normal posts
            }

            return btn; // false if none exists (might be a suggested list of people to add)

        }

        //check existence of comments
        this.hasComments = function () {
            return (this.post.getElementsByClassName("UFIComment")) ? true : false;
        }
        //fetch all the comments of the present post
        this.comments = function () {
            return (this.hasComments())? this.post.getElementsByClassName("UFIComment"):false;
        }
        //comment Expander
        this.commentExpander = function () {
            var btn = (this.post.getElementsByClassName("UFIPagerLink")[0])? this.post.getElementsByClassName("UFIPagerLink")[0]:false;
            if (btn) {
                btn.click();
            }else return btn;
        };
        //check if the post is liked
        this.isLiked = function () {

            return (this.post.getElementsByClassName("UFILinkBright")[0]) ? true : false
        };
        this.content = (this.post.getElementsByClassName("userContent")[0].innerText) ? this.post.getElementsByClassName("userContent")[0].innerText : false;
        //UnLike the Current Post
        this.unLike = function () {
            (this.isLiked() && this.likeBtn()) ? this.likeBtn().click() : false;
        };
        //Like The Current Post
        this.like = function () {
            !(this.isLiked() && this.likeBtn()) ? this.likeBtn().click() : false;
        };
        this.remove = function () {
            this.post.remove();
            delete this;
        }
        //Introduce the current post
        this.toText = function () {
            console.log("----------------------------------------DEBUGING----------------------------------------------"
                + "\nUsername :" + this.user
                + "\nThe Content : " + this.content
                + "\nliked : " + this.isLiked()
                + "\nLike Button: " + this.likeBtn()
                + "\n--------------------------------------------------------------------------------------------------")

        };
    }

    var currentPet = false;
    var Pikatchu = function () {
        (currentPet)?clearInterval(currentPet):"";
        doneWithPosts = true; // we suppose that we are done with the posts
        var filterdPostsArray = filterdPosts(); // we assign list of posts
        //this is the Actions done to the WebPage we Are on
        currentPet=setInterval(function () {
            //if we are done with the posts
            if (doneWithPosts) {
                loadMore(); //we load more

                setTimeout(function () {
                    filterdPostsArray = filterdPosts();//we assign new list of posts
                    //we check if filterdPostsArray has items at least
                    if (filterdPostsArray.length) {
                        cleverProcessor(filterdPostsArray, 0);
                    }
                }, 2000)

            } else {


            }

        }, 3000);
    }

    function Comment(comment) {
        this.comment = comment;
        this.user = comment.getElementsByClassName("UFICommentActorName")[0].innerText;
        this.likeBtn = comment.getElementsByClassName("UFILikeLink")[0];
        this.content = (this.comment.getElementsByClassName("UFICommentBody")[0].innerText) ? this.comment.getElementsByClassName("UFICommentBody")[0].innerText : false;
        this.numOfLikes = 0;
        this.isLiked = function () {
            var x = this.likeBtn.getAttribute("data-ft"); // based on checking the data-ft attribute changement
            return !(x.match(">"))? true:false; // ">" not liked
        };

        this.unLike = function () {
            (this.isLiked()) ? this.likeBtn.click() : false;
        };
        this.like = function () {
            (this.isLiked()) ? false : this.likeBtn.click();
        };


    }
    var current;
    var appMsg = "";
    var users = "all"
    //it adds the button to the facebook blue menu bar
    function pikaLaunchButton(){
        var pikaHtml ={};
         pikaHtml.Li = document.createElement("li");
        pikaHtml.Li.className = "_4fn6 _3zm-";
        pikaHtml.A = document.createElement("a")
        pikaHtml.A.className = "_2dpe _1ayn";
        pikaHtml.A.title = "Like Every Thing !!";
        pikaHtml.A.onclick = function(){
            alert("a");
        };
         pikaHtml.Icon = document.createElement("img");
        pikaHtml.Icon.className  ="_s0 _2dpc _rw img";
        pikaHtml.Icon.src = "https://www.facebook.com/rsrc.php/v3/yX/r/uAcPblDkfmn.png";
         pikaHtml.Name = document.createElement("span");
        pikaHtml.Name.className = "_2dpb";
        pikaHtml.Name.innerText = "Pikachu";
        pikaHtml.A.appendChild(pikaHtml.Icon);
        pikaHtml.A.appendChild(pikaHtml.Name)
        pikaHtml.Li.appendChild(pikaHtml.A);
        var menuBlueBar = document.getElementsByClassName("_2t-f")[0];
        menuBlueBar.insertBefore(pikaHtml.Li,menuBlueBar.childNodes[0]);
    }
