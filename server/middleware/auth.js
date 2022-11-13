let passport = require("passport");
let localStrategy = require("passport-local").Strategy;
let query = require("../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const mailler = require("../middleware/nodemailler");
const os = require("os");
const dns = require("dns");
const md5 = require('md5');
const sha = require('sha1');
module.exports = {
    decentralization : function(App){
        App.use(passport.initialize());
        App.use(passport.session());
        passport.serializeUser(function(user,done){
            done(null,user);
        });
        passport.deserializeUser(function(user,done){
            done(null,user);
        });
        passport.use(new localStrategy(
            function(username, password, done){
                try {
                    password = sha(md5(password))
                    process.nextTick(async()=>{
                        let sqlauth = squel.select()
                        .from("dangnhap")
                        .where("username = '"+username+"'")
                        .toString()
                        let user = await query(sqlauth);
                        if(user.rowCount >=1)
                        {
                            let ax = user.rows[0];
                            let cookie_init = {
                                hoten:ax.username,                       
                            }
                            if(password == ax.password)
                            {
                                return done(null, cookie_init);
                            }
                            if(password != ax.password)
                            {
                                return done(null, false,{message:'Sai mật khẩu'});
                            }
                            if(password != ax.password)
                            {
                                
                                return done(null, false,{message:'Sai mật khẩu'});
                            }
                        }
                        else
                        {
                            return done(null, false,{message: 'Tài khoản không tồn tại!'});
                        }
                    });
                } catch (error) {
                    console.log(error)
                    return done(null, false,{message: 'Lỗi đăng nhập!'});
                }
            }
        ));   
        App.route("/login").get(function(req,res){
            res.render("./login/index.ejs",{message:req.flash('error')});
        }).post(
            (req,res,next)=>{
                next();
        },passport.authenticate('local',{failureRedirect: "/login",successRedirect:"/",failureFlash : true}));
        App.get("/logout", function(req, res){
            req.flash('error','Bạn đã đăng xuất ra hệ thống');
            req.logout();
            res.redirect("/login");
        })
    },
    middleauth: async (req, res, next)=>{
        if(req.isAuthenticated()){
            //req.isAuthenticated() will return true if user is logged in
            // dns.lookup(os.hostname(),(err,add,fam) => {
            //     mailler("Đã có IP: "+add.toString()+" "+"login vào hệ thống !");
            // })
            res.locals.session = req.user ;
            let sqlauth = squel.select().from("dangnhap").fields(["stt","username","image_avatar","quyen"]).where("username = '"+req.user.hoten+"'").toString()
            let user = await query(sqlauth);
            res.locals.ahi_user=user.rows[0].username ;
            res.locals.avatar_ahi = user.rows[0].image_avatar ;
            res.locals.Role = user.rows[0].quyen;
            res.locals.id = user.rows[0].stt;
            next();
        } else{
            res.redirect("/login");
        }
    }
}