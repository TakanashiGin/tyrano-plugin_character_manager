TYRANO.kag.stat.f.running_key_event = [];



TYRANO.kag.plugin_key_event = {



    methods: {



        pushEvent: function(pm){

            var TG = TYRANO.kag;
            var that = TG.plugin_key_event;

            if (pm.method == 'click' || pm.method == 'right_click' || pm.method == 'keydown' || pm.method == 'keyup') {
                pm.event = that.methods.onEvent[pm.method];
            } else {
                alert("[error]\nメソッドが正しく指定されていません");
            }

            TG.stat.f.running_key_event.push(pm);

            that.methods.allResetEvent();
            that.methods.allStartEvent();

        },



        onEvent: {

            click: function(pm){
                var that = TYRANO.kag.plugin_key_event;
                var ua = that.methods.userAgent();
                var event = {
                    click: 'click.' + pm.name,
                    mouseover: 'mouseover.' + pm.name,
                    mouseout: 'mouseout.' + pm.name
                };
                var event_sp = void(0);
                if (ua == 'sp' || ua == 'tab') {
                    event_sp = {
                        click: 'touchstart.' + pm.name,
                        mouseover: 'mouseover.' + pm.name,
                        mouseout: 'mouseout.' + pm.name
                    };
                }
                $(pm.element).on(event.click,function(){
                    that.methods.embJump(pm.exp,pm.preexp,pm.storage,pm.target,pm.sleepgame);
                });
                if (event_sp) {
                    $(pm.element).on(event.touchstart,function(){
                        that.methods.embJump(pm.exp,pm.preexp,pm.storage,pm.target,pm.sleepgame);
                    });
                }
                if (pm.mouseover_exp) {
                    $(pm.element).on(event.mouseover,function(){
                        that.methods.embScript(pm.mouseover_exp,pm.preexp);
                    });
                }
                if (pm.mouseout_exp) {
                    $(pm.element).on(event.mouseout,function(){
                        that.methods.embScript(pm.mouseout_exp,pm.preexp);
                    });
                }
            },

            right_click: function(pm){
                var that = TYRANO.kag.plugin_key_event;
                var event = {
                    contextmenu: 'contextmenu.' + pm.name,
                    mouseover: 'mouseover.' + pm.name,
                    mouseout: 'mouseout.' + pm.name
                };
                $(pm.element).on(event.contextmenu,function(){
                    that.methods.embJump(pm.exp,pm.preexp,pm.storage,pm.target,pm.sleepgame);
                });
                if (pm.mouseover_exp) {
                    $(pm.element).on(event.mouseover,function(){
                        that.methods.embScript(pm.mouseover_exp,pm.preexp);
                    });
                }
                if (pm.mouseout_exp) {
                    $(pm.element).on(event.mouseout,function(){
                        that.methods.embScript(pm.mouseout_exp,pm.preexp);
                    });
                }
            },

            keydown:function(pm){
                var that = TYRANO.kag.plugin_key_event;
                var event = {
                    keydown: 'keydown.' + pm.name,
                    mouseover: 'mouseover.' + pm.name,
                    mouseout: 'mouseout.' + pm.name
                };
                $(pm.element).on(event.keydown,function(kde){
                    if (kde.keyCode==pm.key_code) {
                        that.methods.embJump(pm.exp,pm.preexp,pm.storage,pm.target,pm.sleepgame);
                    }
                });
                if (pm.mouseover_exp) {
                    $(pm.element).on(event.mouseover,function(){
                        that.methods.embScript(pm.mouseover_exp,pm.preexp);
                    });
                }
                if (pm.mouseout_exp) {
                    $(pm.element).on(event.mouseout,function(){
                        that.methods.embScript(pm.mouseout_exp,pm.preexp);
                    });
                }
            },

            keyup: function(pm){
                var that = TYRANO.kag.plugin_key_event;
                var event = {
                    keyup: 'keyup.' + pm.name,
                    mouseover: 'mouseover.' + pm.name,
                    mouseout: 'mouseout.' + pm.name
                };
                $(pm.element).on(event.keyup,function(kue){
                    if (kue.keyCode==pm.key_code) {
                        that.methods.embJump(pm.exp,pm.preexp,pm.storage,pm.target,pm.sleepgame);
                    }
                });
                if (pm.mouseover_exp) {
                    $(pm.element).on(event.mouseover,function(){
                        that.methods.embScript(pm.mouseover_exp,pm.preexp);
                    });
                }
                if (pm.mouseout_exp) {
                    $(pm.element).on(event.mouseout,function(){
                        that.methods.embScript(pm.mouseout_exp,pm.preexp);
                    });
                }
            }

        },



        clearEvent: function(pm){
            var TG = TYRANO.kag;
            var that = TG.plugin_key_event;
            that.methods.allResetEvent();
            if (!pm.reset) {
                if (!pm.all || pm.name) {
                    if (pm.name) {
                        TG.stat.f.running_key_event = TG.stat.f.running_key_event.filter(function(value){
                            if (value.name != pm.name) return value;
                        });
                    } else {
                        alert("[error]\nnameが正しく指定されていません");
                    }
                } else {
                    TG.stat.f.running_key_event = TG.stat.f.running_key_event.filter(function(value){
                        if (!value.clear) return value;
                    });
                }
                that.methods.allStartEvent();
            } else {
                TG.stat.f.running_key_event = [];
            }
            console.log(TG.stat.f.running_key_event);
        },



        userAgent: function(){
            var ua = navigator.userAgent;
            if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
                return 'sp';
            }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
                return 'tab';
            }else{
                return 'pc';
            }
        },



        allResetEvent: function(){
            TYRANO.kag.stat.f.running_key_event.forEach(function(revent){
                $(revent.element).off();
            });
        },
        allStartEvent: function(){
            TYRANO.kag.stat.f.running_key_event.forEach(function(sevent){
                console.log(sevent);
                sevent.event(sevent)
            });
        },



        tyranoJump:function(storage,target,sleepgame){
            var TG = TYRANO.kag;
            if (storage || target) {
                if (sleepgame == true) {
                    TG.ftag.startTag('sleepgame', { storage : storage, target : target });
                } else {
                    TG.ftag.startTag('jump', { storage : storage, target : target });
                }
            }
        },

        embScript:function(exp,preexp){
            if (exp) tyrano.plugin.kag.embScript(exp, preexp);
        },

        embJump:function(exp,preexp,storage,target,sleepgame){
            var that = TYRANO.kag.plugin_key_event;
            that.methods.embScript(exp,preexp);
            that.methods.tyranoJump(storage,target,sleepgame);
        },


        boolean:function(val){
            if (val == 'true' || val == true) return true;
            else return false;
        },


    }



}
