$.three_pos=function(t){var e={};return arr_obj=t.split(","),1==arr_obj.length?(e.x=parseFloat(arr_obj[0]),e.y=parseFloat(arr_obj[0]),e.z=parseFloat(arr_obj[0])):(e.x=parseFloat(arr_obj[0]),e.y=parseFloat(arr_obj[1]),e.z=parseFloat(arr_obj[2])),e},$.setVector=function(t){var e={};return e.pos={x:t.position.x,y:t.position.y,z:t.position.z},e.rot={x:t.rotation.x,y:t.rotation.y,z:t.rotation.z},e.scale={x:t.scale.x,y:t.scale.y,z:t.scale.z},e},$.orgFloor=function(t,e){return Math.floor(t*e)/e},$.checkThreeModel=function(t){if(TYRANO.kag.tmp.three.models[t])return!0;alert("model「"+t+"」は未定義です。宣言してください。")},tyrano.plugin.kag.tag["3d_init"]={vital:[],pm:{layer:"0",page:"fore",camera:"Perspective",near:"1",far:"5000",next:"true"},clock:{},start:function(t){var e=this,a=this.kag.layer.getLayer(t.layer,t.page);this.clock=new THREE.Clock;var o=$("<canvas id='three'></canvas>"),r=parseInt(this.kag.config.scWidth),n=parseInt(this.kag.config.scHeight);o.css({position:"absolute",width:r,height:n}),a.append(o);const i=new THREE.WebGLRenderer({canvas:document.querySelector("#three"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0});i.setPixelRatio(window.devicePixelRatio),i.setSize(r,n);const s=new THREE.Scene,l=t.camera+"Camera",p=new THREE[l](45,r/n,parseFloat(t.near),parseFloat(t.far));p.rotation.order="YXZ",p.position.set(0,0,1e3),this.kag.tmp.three.models.camera=new ThreeModel({name:"camera",model:p,mixer:null,gltf:null,pm:t},d),a.show();const m=new THREE.AmbientLight(16777215,1);s.add(m);const g=new THREE.DirectionalLight(16777215,1);s.add(g),this.kag.tmp.three.stat.is_load=!0,this.kag.tmp.three.stat.canvas_show=!0,this.kag.tmp.three.stat.init_pm=t,this.kag.tmp.three.camera=p,this.kag.tmp.three.scene=s,this.kag.tmp.three.renderer=i,this.kag.tmp.three.light_amb=m,this.kag.tmp.three.target_layer=a,this.kag.tmp.three.j_canvas=o;var d=this.kag.tmp.three;!function t(){d.orbit_controls&&d.orbit_controls.update();e.updateFrame();i.render(s,p);var a=requestAnimationFrame(t);0==d.stat.is_load&&window.cancelAnimationFrame(a)}();Math.random();this.initEvent(this.kag.tmp.three),"true"==t.next&&this.kag.ftag.nextOrder()},initEvent:function(t){var e=this,a=(t.renderer,t.target_layer,t.j_canvas),o=t.camera,r=t.scene;a.on("click",function(a){var n=a.clientX,i=a.clientY,s=new THREE.Vector2;s.x=n/window.innerWidth*2-1,s.y=-i/window.innerHeight*2+1;var l=new THREE.Raycaster;l.setFromCamera(s,o);var p=l.intersectObjects(r.children,!0);if(p.length>0){var m=p[0].object.userData.name;if(1==e.kag.stat.is_strong_stop&&t.evt[m])return e.kag.layer.showEventLayer(),void e.kag.ftag.startTag("jump",t.evt[m])}})},updateFrame:function(){var t=this.kag.tmp.three,e=t.camera,a=t.models,o=this.clock.getDelta();for(key in a)a[key].mixer&&a[key].update(o);1==t.stat.gyro.mode?(e.rotation.x=t.stat.gyro.x,e.rotation.y=t.stat.gyro.y):2==t.stat.gyro.mode&&(e.position.x=t.stat.gyro.x,e.position.y=t.stat.gyro.y)}},tyrano.plugin.kag.tag["3d_model_new"]={vital:["name","storage"],pm:{name:"",storage:"",pos:"0",rot:"0",scale:"100",tonemap:"true",motion:"",next:"true",folder:""},start:function(t){var e=this.kag.tmp.three,a="";a=""!=t.folder?t.folder:"others/3d/model";var o=$.getExt(t.storage);if("gltf"==o||"glb"==o){var r="./data/"+a+"/"+t.storage;(new THREE.GLTFLoader).load(r,a=>{var o=a,r=o.scene;let n=$.three_pos(t.pos),i=$.three_pos(t.scale),s=$.three_pos(t.rot);r.position.set(n.x,n.y,n.z),r.scale.set(i.x,i.y,i.z),r.rotation.set(s.x,s.y,s.z);const l=o.animations;let p=new THREE.AnimationMixer(r);if(l.length>0){let e=l[0];if(""!=t.motion)for(var m=0;m<l.length;m++){if(l[m].name==t.motion){e=l[m];break}}p.clipAction(e).play()}else p=void 0;this.kag.tmp.three.models[t.name]=new ThreeModel({name:t.name,model:r,mixer:p,gltf:o,pm:t},e),"true"==t.tonemap?this.kag.tmp.three.models[t.name].setToneMaped(!0):this.kag.tmp.three.models[t.name].setToneMaped(!1),"true"==t.next&&this.kag.ftag.nextOrder()})}else if("obj"==o){var n="./data/"+a+"/"+t.storage,i=n.replace(".obj",".mtl");(new THREE.MTLLoader).load(i,a=>{a.preload();var o=new THREE.OBJLoader;o.setMaterials(a),a.toneMaped=!1,o.load(n,a=>{var o=a;let r=$.three_pos(t.pos),n=$.three_pos(t.scale),i=$.three_pos(t.rot);o.position.set(r.x,r.y,r.z),o.scale.set(n.x,n.y,n.z),o.rotation.set(i.x,i.y,i.z),this.kag.tmp.three.models[t.name]=new ThreeModel({name:t.name,model:o,pm:t},e),"true"==t.tonemap?this.kag.tmp.three.models[t.name].setToneMaped(!0):this.kag.tmp.three.models[t.name].setToneMaped(!1),"true"==t.next&&this.kag.ftag.nextOrder()})})}else"mmd"==o||alert("エラー："+o+"はサポートしていないファイル形式です")}},tyrano.plugin.kag.tag["3d_sphere_new"]={vital:["name"],pm:{name:"",type:"SphereGeometry",texture:"",color:"0x00ff00",radius:"300",width:"30",height:"30",scale:"1",pos:"0",rot:"0",folder:""},start:function(t){t.arg1=t.radius,t.arg2=t.width,t.arg3=t.height,this.kag.ftag.startTag("obj_model_new",t)}},tyrano.plugin.kag.tag["3d_sprite_new"]={vital:["name","storage"],pm:{name:"",storage:"",scale:"",pos:"0",rot:"0",tonemap:"false",next:"true",folder:""},start:function(t){var e="./data/"+(""!=t.folder?t.folder:"others/3d/sprite")+"/"+t.storage;const a=new THREE.SpriteMaterial({map:(new THREE.TextureLoader).load(e),alphaTest:.01,transparent:!0});"true"==t.tonemap?a.toneMapped=!0:a.toneMapped=!1;var o=new THREE.Sprite(a);$("<img />").attr("src",e).on("load",e=>{var a=$(e.currentTarget).get(0).width,r=$(e.currentTarget).get(0).height;let n=$.three_pos(t.pos),i=$.three_pos(t.rot);if(o.position.set(n.x,n.y,n.z),o.rotation.set(i.x,i.y,i.z),""==t.scale)o.scale.set(1*parseInt(a),1*parseInt(r),1);else{let e=$.three_pos(t.scale);o.scale.set(e.x,e.y,e.z)}var s=this.kag.tmp.three;s.scene;this.kag.tmp.three.models[t.name]=new ThreeModel({name:t.name,model:o,pm:t},s),"true"==t.next&&this.kag.ftag.nextOrder()})}},tyrano.plugin.kag.tag["3d_event"]={vital:["name"],pm:{name:"",storage:"",target:""},start:function(t){var e=this.kag.tmp.three;e.stat.start_event=!0,e.evt[t.name]=t,this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_event_delete"]={vital:["name"],pm:{name:""},start:function(t){delete this.kag.tmp.three.evt[t.name],this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_event_start"]={vital:[],pm:{},start:function(t){this.kag.tmp.three.stat.start_event=!0,this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_event_stop"]={vital:[],pm:{},start:function(t){this.kag.tmp.three.stat.start_event=!1,this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_box_new"]={vital:["name"],pm:{name:"",type:"BoxGeometry",texture:"",color:"0x00ff00",width:"1",height:"1",depth:"1",scale:"1",pos:"0",rot:"0",folder:""},start:function(t){t.arg1=t.width,t.arg2=t.height,t.arg3=t.depth,this.kag.ftag.startTag("obj_model_new",t)}},tyrano.plugin.kag.tag["3d_image_new"]={vital:["name","width"],pm:{name:"",type:"PlaneGeometry",texture:"",width:"",height:"",scale:"1",pos:"0",rot:"0",doubleside:"false",tonemap:"false"},start:function(t){if(""==t.height){var e="./data/others/3d/texture/"+t.texture;$("<img />").attr("src",e).on("load",e=>{var a=$(e.currentTarget).get(0).width,o=$(e.currentTarget).get(0).height/a;t.height=parseInt(parseInt(t.width)*o),t.arg1=t.width,t.arg2=t.height,t.arg3=1,this.kag.ftag.startTag("obj_model_new",t)})}else t.arg1=t.width,t.arg2=t.height,t.arg3=1,this.kag.ftag.startTag("obj_model_new",t)}},tyrano.plugin.kag.tag.obj_model_new={vital:["name","type"],pm:{name:"",type:"",texture:"",color:"",arg1:0,arg2:0,arg3:0,scale:"",pos:"",rot:"",doubleside:"false",tonemap:"true",motion:"",folder:"",next:"true"},start:function(t){var e=this.kag.tmp.three;e.scene;const a=new THREE[t.type](parseFloat(t.arg1),parseFloat(t.arg2),parseFloat(t.arg3));let o;if(""!=t.texture)if("BoxGeometry"==t.type&&t.texture.split(",").length>1){var r=t.texture.split(","),n=[];const e=new THREE.TextureLoader;for(let t=0;t<r.length;t++){var i="./data/others/3d/texture/"+r[t];const a=e.load(i);n.push(new THREE.MeshStandardMaterial({map:a}))}o=n}else{i="./data/others/3d/texture/"+t.texture;const e=(new THREE.TextureLoader).load(i);o=new THREE.MeshStandardMaterial({map:e,alphaTest:.01,transparent:!0})}else o=new THREE.MeshStandardMaterial({color:parseInt(t.color.toLowerCase())});"true"==t.doubleside&&(o.side=THREE.DoubleSide),"true"==t.tonemap?o.toneMapped=!0:o.toneMapped=!1;const s=new THREE.Mesh(a,o);let l=$.three_pos(t.pos),p=$.three_pos(t.scale),m=$.three_pos(t.rot);s.position.set(l.x,l.y,l.z),s.scale.set(p.x,p.y,p.z),s.rotation.set(m.x,m.y,m.z),this.kag.tmp.three.models[t.name]=new ThreeModel({name:t.name,model:s,pm:t},e),"true"==t.next&&this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_show"]={vital:["name"],pm:{name:"",time:"500",scale:"",pos:"",rot:"",wait:"true"},start:function(t){var e=this.kag.tmp.three;if(0!=$.checkThreeModel(t.name)){var a=this.kag.tmp.three.models[t.name];e.scene.add(a.model);var o={duration:parseInt(t.time)};if(""!=t.pos){let e=$.three_pos(t.pos);a.setPosition(e.x,e.y,e.z)}if(""!=t.scale){let e=$.three_pos(t.scale);a.setScale(e.x,e.y,e.z)}if(""!=t.rot){let e=$.three_pos(t.rot);a.setRotation(e.x,e.y,e.z)}"true"==t.wait?a.fade("in",o,()=>{this.kag.ftag.nextOrder()}):(a.fade("in",o),this.kag.ftag.nextOrder())}}},tyrano.plugin.kag.tag["3d_hide"]={vital:["name"],pm:{name:"",time:"500",next:"true",wait:"true"},start:function(t){if(0!=$.checkThreeModel(t.name)){var e=this.kag.tmp.three,a={duration:parseInt(t.time)},o=this.kag.tmp.three.models[t.name];"true"==t.wait?o.fade("out",a,t=>{this.kag.ftag.nextOrder(),e.scene.remove(t)}):(o.fade("out",a,t=>{e.scene.remove(t)}),this.kag.ftag.nextOrder())}}},tyrano.plugin.kag.tag["3d_hide_all"]={vital:[],pm:{time:"500",wait:"true"},start:function(t){var e=this.kag.tmp.three,a={duration:parseInt(t.time)},o=this.kag.tmp.three.models,r=0,n=0;for(let i in o)"camera"!=i&&(r++,"true"==t.wait?o[i].fade("out",a,t=>{e.scene.remove(t),r==++n&&this.kag.ftag.nextOrder()}):(o[i].fade("out",a,t=>{e.scene.remove(t),n++}),this.kag.ftag.nextOrder()));0==r&&this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_delete"]={vital:["name"],pm:{name:""},start:function(t){if(0!=$.checkThreeModel(t.name)){var e=this.kag.tmp.three,a=this.kag.tmp.three.models[t.name];e.scene.remove(a.model),delete this.kag.tmp.three.models[t.name],this.kag.ftag.nextOrder()}}},tyrano.plugin.kag.tag["3d_delete_all"]={vital:[],pm:{},start:function(t){var e=this.kag.tmp.three,a=this.kag.tmp.three.models;for(let t in a)if("camera"!=t){var o=a[t];e.scene.remove(o.model),delete e.models[t]}this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_canvas_show"]={vital:[],pm:{time:"1000"},start:function(t){var e=this.kag.tmp.three;this.kag.tmp.three.stat.canvas_show=!0,e.j_canvas.fadeIn(parseInt(t.time),()=>{this.kag.ftag.nextOrder()})}},tyrano.plugin.kag.tag["3d_canvas_hide"]={vital:[],pm:{time:"1000"},start:function(t){var e=this.kag.tmp.three;this.kag.tmp.three.stat.canvas_show=!1,e.j_canvas.fadeOut(parseInt(t.time),()=>{this.kag.ftag.nextOrder()})}},tyrano.plugin.kag.tag["3d_close"]={vital:[],pm:{},start:function(t){var e=this.kag.tmp.three;e.stat.is_load=!1,e.stat.canvas_show=!1,e.j_canvas&&e.j_canvas.remove(),this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_anim"]={vital:["name"],pm:{name:"",time:"1000",effect:"linear",pos:"",rot:"",scale:"",lookat:"",wait:"true"},start:function(t){if(0!=$.checkThreeModel(t.name)){var e=this.kag.tmp.three,a={duration:parseInt(t.time),easing:t.effect},o={};if(""!=t.pos)if("camera"==t.name&&""!=t.lookat)if(e.models[t.lookat]){var r=e.models[t.lookat].model;(s={x:0,y:0,z:0}).x=r.position.x,s.y=r.position.y,s.z=r.position.z,o.position=s}else o.position=$.three_pos(t.lookat);else o.position=$.three_pos(t.pos);""!=t.rot&&(o.rotation=$.three_pos(t.rot)),""!=t.scale&&(o.scale=$.three_pos(t.scale));var n=0,i=Object.keys(o).length;for(let e in o){var s=o[e],l=e;this.kag.tmp.three.models[t.name].toAnim(l,s,a,()=>{++n>=i&&"true"==t.wait&&this.kag.ftag.nextOrder()})}"true"!=t.wait&&this.kag.ftag.nextOrder()}}},tyrano.plugin.kag.tag["3d_anim_stop"]={vital:["name"],pm:{name:"",finish:"true"},start:function(t){if(0!=$.checkThreeModel(t.name)){this.kag.tmp.three;this.kag.tmp.three.models[t.name].stopAnim(t.finish),this.kag.ftag.nextOrder()}}},tyrano.plugin.kag.tag["3d_scene"]={vital:[],pm:{tonemap:"",tonemap_value:"0.8",light_amb:"",fog:"",fog_range:"1,3000",fog_color:"0xFFFFFF",next:"true"},start:function(t){var e=this.kag.tmp.three,a=e.scene,o=(e.camera,e.renderer);if(""!=t.light_amb&&(e.stat.scene_pm.light_amb=t.light_amb,e.light_amb.intensity=parseFloat(t.light_amb)),""!=t.tonemap){e.stat.scene_pm.tonemap=t.tonemap,o.toneMapping=THREE[t.tonemap+"ToneMapping"],o.toneMappingExposure=parseFloat(t.tonemap_value);for(let t in e.models)e.models[t].needsUpdate()}if(""!=t.fog)if("true"==t.fog){e.stat.scene_pm.fog=t.fog,e.stat.scene_pm.fog_color=t.fog_color,e.stat.scene_pm.fog_range=t.fog_range;var r=t.fog_range.split(",");a.fog=new THREE.Fog(parseInt(t.fog_color),parseFloat(r[0]),parseFloat(r[1]))}else e.stat.scene_pm.fog,a.fog.near=.1,a.fog.far=0;"true"==t.next&&this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_camera"]={vital:[],pm:{pos:"",rot:"",lookat:"",next:"true"},start:function(t){var e=this.kag.tmp.three,a=e.camera;e.renderer;if(""!=t.pos){let e=$.three_pos(t.pos);a.position.set(e.x,e.y,e.z)}if(""!=t.rot){let e=$.three_pos(t.rot);a.rotation.set(e.x,e.y,e.z)}if(""!=t.lookat){var o={x:0,y:0,z:0};if(e.models[t.lookat]){var r=TYRANO.kag.tmp.three.models[t.lookat].model;o.x=r.position.x,o.y=r.position.y,o.z=r.position.z}else o=$.three_pos(t.lookat);a.lookAt(new THREE.Vector3(o.x,o.y,o.z))}"true"==t.next&&this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_gyro"]={vital:[],pm:{max_x:"30",max_y:"30",mode:"rotation",next:"true"},start:function(t){var e=this.kag.tmp.three,a=e.camera;e.renderer;{const o=o=>{var r=0,n=0,i=!0,s=parseFloat(t.max_y),l=parseFloat(t.max_x),p=a.rotation.y,m=a.rotation.x,g=a.position.y,d=a.position.x,c=0;parseInt(t.frame);e.stat.gyro.pm=t;const h=a=>{if(1==i&&(i=!1,r=a.beta,n=a.gamma,c=this.kag.tmp.angle,"rotation"==t.mode?e.stat.gyro.mode=1:e.stat.gyro.mode=2),c==this.kag.tmp.angle){if(0!=c)if(a.gamma<0)return;var o=r-a.beta,h=n-a.gamma;Math.abs(o)>s&&(o=o>0?s:-1*s),Math.abs(h)>l&&(h=h>0?l:-1*l);var u=0,v=0;1==e.stat.gyro.mode?0==c?(v=m-h*(Math.PI/180),u=p-o*(Math.PI/180)):(v=p+o*(Math.PI/180),u=m-h*(Math.PI/180)):2==e.stat.gyro.mode&&(v=g+h,u=d+o),e.stat.gyro.x=u,e.stat.gyro.y=v}else i=!0};var u=parseInt(this.kag.config.scWidth)/2,v=parseInt(this.kag.config.scHeight)/2;const f=a=>{var o=a.clientX,r=a.clientY,n=(o-=u)/u,s=(r=-1*(r-v))/v,l=parseFloat(t.max_x),c=parseFloat(t.max_y),h=0,f=0;1==i&&(i=!1,"rotation"==t.mode?e.stat.gyro.mode=1:e.stat.gyro.mode=2),1==e.stat.gyro.mode?(h=m+l*n*(Math.PI/180),f=p-c*s*(Math.PI/180)):2==e.stat.gyro.mode&&(f=d+l*n,h=g+c*s),e.stat.gyro.x=f,e.stat.gyro.y=h};"pc"==o?($(".tyrano_base").get(0).removeEventListener("mousemove",f),$(".tyrano_base").get(0).addEventListener("mousemove",f,!0)):(window.removeEventListener("deviceorientation",h),window.addEventListener("deviceorientation",h,!0))};(()=>{"pc"!=$.userenv()?DeviceMotionEvent&&("function"==typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then(t=>{"granted"===t&&o("sp")}).catch(console.error):o("sp")):o("pc")})()}"true"==t.next&&this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_gyro_stop"]={vital:[],pm:{max_x:"30",max_y:"30",frame:"1",next:"true"},start:function(t){var e=this.kag.tmp.three;e.camera,e.renderer;e.stat.gyro.mode=0,this.kag.ftag.nextOrder()}},tyrano.plugin.kag.tag["3d_debug_camera"]={vital:[],pm:{name:"camera",button_text:"カメラインスペクタを閉じる",menu:"true"},start:function(t){var e=this.kag.tmp.three,a=e.j_canvas,o=e.target_layer,r=o.css("z-index"),n=a.css("z-index");a.css("z-index",9999999),o.css("z-index",9999999);var i=this.kag.tmp.three.models[t.name].model,s=e.renderer,l=(e.camera,parseInt(this.kag.config.scWidth),parseInt(this.kag.config.scHeight),!1),p=0,m=(new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,$.setVector(i)),g=0,d=0,c=0,h=0,u=0;function v(t){t.wheelDelta<0?i.position.z+=5:i.position.z-=5,y(),t.preventDefault()}function f(t){0==t.button?(p=0,g=t.clientX,d=t.clientY,c=i.rotation.x,h=i.rotation.y):1==t.button?(p=1,d=t.clientY,u=i.position.z):2==t.button&&(p=2,g=t.clientX,d=t.clientY,c=i.position.x,h=i.position.y),l=!0}function x(t){if(l)if(0==p){var e=g-t.clientX;i.rotation.y=h+.005*e;var a=d-t.clientY;i.rotation.x=c+.005*a}else if(1==p){a=d-t.clientY;i.position.z=u+a}else if(2==p){e=g-t.clientX;i.position.x=c+1*e;a=d-t.clientY;i.position.y=h+-1*a,i.position.x=$.orgFloor(i.position.x,1),i.position.y=$.orgFloor(i.position.y,1)}}function y(t){if(g=0,d=0,0==p)$.orgFloor(i.rotation.x,100),$.orgFloor(i.rotation.y,100),i.rotation.z;var e='pos="'+(i.position.x+","+i.position.y+","+i.position.z)+'" rot="'+($.orgFloor(i.rotation.x,100)+","+$.orgFloor(i.rotation.y,100)+","+$.orgFloor(i.rotation.z,100))+'" scale="'+($.orgFloor(i.scale.x,100)+","+$.orgFloor(i.scale.y,100)+","+$.orgFloor(i.scale.z,100))+'" ';_.find("input").val(e),l=!1}s.domElement.addEventListener("mousewheel",v,!1),s.domElement.addEventListener("mousedown",f,!1),s.domElement.addEventListener("mouseup",y,!1),s.domElement.addEventListener("mousemove",x,!1);var k=$("<div style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>"+t.button_text+"</span></button></div>");k.draggable({scroll:!1,stop:(t,e)=>{}});var _=$("<div style='padding:5px'><input type='text' style='width:320px' /></div>"),w=$("<input type='button' value='コピー' />");w.on("click",t=>{y(),_.find("input").select(),document.execCommand("copy")});var E=$("<input type='button' value='リセット' />");E.on("click",t=>{i.position.set(m.pos.x,m.pos.y,m.pos.z),i.rotation.set(m.rot.x,m.rot.y,m.rot.z),i.scale.set(m.scale.x,m.scale.y,m.scale.z)}),k.find("button").on("click",t=>{k.remove(),a.css("z-index",n),o.css("z-index",r),s.domElement.removeEventListener("mousedown",f),s.domElement.removeEventListener("mouseup",y),s.domElement.removeEventListener("mousemove",x),s.domElement.removeEventListener("mousewheel",v),this.kag.ftag.nextOrder()}),"true"==t.menu&&(k.append("<span style='font-size:10px'>｜</span>"),k.append(w),k.append(E),k.append(_)),$("body").append(k)}},tyrano.plugin.kag.tag["3d_motion"]={vital:["name","motion"],pm:{name:"",motion:""},start:function(t){if(0!=$.checkThreeModel(t.name)){this.kag.tmp.three;this.kag.tmp.three.models[t.name].setMotion(t.motion),this.kag.ftag.nextOrder()}}},tyrano.plugin.kag.tag["3d_debug"]={vital:["name"],pm:{name:"",button_text:"3Dインスペクタを閉じる",menu:"true",overlap:"false",reset:"false"},start:function(t){var e=this.kag.tmp.three,a=e.j_canvas,o=e.target_layer,r=o.css("z-index"),n=a.css("z-index"),i=this.kag.tmp.three.models[t.name].model,s=(e.renderer,e.camera),l=(parseInt(this.kag.config.scWidth),parseInt(this.kag.config.scHeight),{}),p=!1,m=0,g=new THREE.Vector3,d=new THREE.Vector3,c=new THREE.Vector3,h={x:0,y:0,z:0},u=$.setVector(i),v=0,f=0;function x(t){t.wheelDelta<0?(i.scale.x-=.01*i.scale.x,i.scale.y-=.01*i.scale.y,i.scale.z-=.01*i.scale.z):(i.scale.x+=.01*i.scale.x,i.scale.y+=.01*i.scale.y,i.scale.z+=.01*i.scale.z),_(),t.preventDefault()}function y(t){if(0==t.button)m=0;else if(1==t.button)m=1,v=t.clientY,f=i.position.z;else if(2==t.button){m=2,g.set(t.clientX/window.innerWidth*2-1,-t.clientY/window.innerHeight*2+1,.5),g.unproject(s),g.sub(s.position).normalize();var e=0;e=s.position.z>0?-s.position.z/g.z:s.position.z/g.z,c.copy(s.position).add(g.multiplyScalar(e)),h.x=i.position.x-c.x,h.y=i.position.y-c.y}p=!0,l={x:t.clientX,y:t.clientY}}function k(t){if(p)if(0==m)moveDistance={x:l.x-t.clientX,y:l.y-t.clientY},i.rotation.x+=.01*moveDistance.y,i.rotation.y-=.01*moveDistance.x,l={x:t.clientX,y:t.clientY};else if(1==m){var e=v-t.clientY;i.position.z=f+e}else if(2==m){g.set(t.clientX/window.innerWidth*2-1,-t.clientY/window.innerHeight*2+1,.5),g.unproject(s),g.sub(s.position).normalize();var a=0;a=s.position.z>0?-s.position.z/g.z:s.position.z/g.z,d.copy(s.position).add(g.multiplyScalar(a)),i.position.x=$.orgFloor(h.x+d.x,1),i.position.y=$.orgFloor(h.y+d.y,1)}}function _(t){if(0==m)$.orgFloor(i.rotation.x,100),$.orgFloor(i.rotation.y,100),i.rotation.z;var e='pos="'+(i.position.x+","+i.position.y+","+i.position.z)+'" rot="'+($.orgFloor(i.rotation.x,100)+","+$.orgFloor(i.rotation.y,100)+","+$.orgFloor(i.rotation.z,100))+'" scale="'+($.orgFloor(i.scale.x,100)+","+$.orgFloor(i.scale.y,100)+","+$.orgFloor(i.scale.z,100))+'" ';b.find("input").val(e),p=!1}"true"==t.overlap&&(a.css("z-index",9999999),o.css("z-index",9999999));var w=$("<div style='width:100%;height:100%;position:absolute;z-index:9999999;'></div>");$(".tyrano_base").append(w);var E=w.get(0);E.addEventListener("mousewheel",x,!1),E.addEventListener("mousedown",y,!1),E.addEventListener("mouseup",_,!1),E.addEventListener("mousemove",k,!1);var z=$("<div style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>"+t.button_text+"</span></button></div>");z.draggable({scroll:!1,stop:(t,e)=>{}});var b=$("<div style='padding:5px'><input type='text' style='width:320px' /></div>"),T=$("<input type='button' value='コピー' />");T.on("click",t=>{_(),b.find("input").select(),document.execCommand("copy")});var F=$("<input type='button' value='リセット' />");F.on("click",t=>{i.position.set(u.pos.x,u.pos.y,u.pos.z),i.rotation.set(u.rot.x,u.rot.y,u.rot.z),i.scale.set(u.scale.x,u.scale.y,u.scale.z)}),z.find("button").on("click",e=>{w.remove(),"true"==t.reset&&F.trigger("click"),z.remove(),a.css("z-index",n),o.css("z-index",r),E.removeEventListener("mousedown",y),E.removeEventListener("mouseup",_),E.removeEventListener("mousemove",k),E.removeEventListener("mousewheel",x),this.kag.ftag.nextOrder()}),"true"==t.menu&&(z.append("<span>｜</span>"),z.append(T),z.append(F),z.append(b)),$("body").append(z)}};
