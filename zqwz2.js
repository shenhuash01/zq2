
/*
！


【MITM】
kandian.wkandian.com
【rewrite】
文章
https://kandian.wkandian.com/v5/article/info.json 重写目标 https://raw.githubusercontent.com/shenhuash01/zq/main/zqwz1.js
视频
https://kandian.wkandian.com/v5/article/detail.json 重写目标 https://raw.githubusercontent.com/shenhuash01/zq/main/zqwz1.js
时长
https://kandian.wkandian.com/v5/user/stay.json 重写目标 https://raw.githubusercontent.com/shenhuash01/zq/main/zqwz1.js

*/

const $ = new Env("中青看点阅读文章");
const notify = $.isNode() ? require('./sendNotify') : '';
message = ""


let zqwzbody2= $.isNode() ? (process.env.zqwzbody2 ? process.env.zqwzbody2 : "") : ($.getdata('zqwzbody2') ? $.getdata('zqwzbody2') : "")
let zqwzbody2Arr = []
let zqwzbody2s = ""

let zq_timebody2= $.isNode() ? (process.env.zq_timebody1 ? process.env.zq_timebody1 : "") : ($.getdata('zq_timebody1') ? $.getdata('zq_timebody1') : "")
let zq_timebody2Arr = []
let zq_timebody2s = ""
let zqwznum
let indexLast = $.getdata('zqbody_index')? $.getdata('zqbody_index'):0;
const zq_timeheader={
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1197',
    'Host': 'kandian.wkandian.com'
}
const wzheader = {
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1203',
    'Host': 'kandian.wkandian.com'
}

if (zq_timebody1) {
    if (zq_timebody1.indexOf("&") == -1) {
        zq_timebody2Arr.push(zq_timebody1)
    } else if (zq_timebody1.indexOf("&") > -1) {
        zq_timebody2s = zq_timebody2.split("&")
    } else if (process.env.zq_timebody1 && process.env.zq_timebody1.indexOf('&') > -1) {
        zq_timebody2Arr = process.env.zq_timebody1.split('&');
        console.log(`您选择的是用"&"隔开\n`)
    }
} else if($.isNode()) {
    var fs = require("fs");
    zq_timebody2 = fs.readFileSync("zq_timebody1.txt", "utf8");
    if (zq_timebody1 !== `undefined`) {
        zq_timebody2s = zq_timebody2.split("\n");
    } else {
        $.msg($.name, '【提示】请点击文章阅读1分钟获取timebody，再跑一次脚本', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
    }
}
Object.keys(zq_timebody1s).forEach((item) => {
    if (zq_timebody1s[item] && !zq_timebody1s[item].startsWith("#")) {
        zq_timebody2Arr.push(zq_timebody1s[item])
    }
})

if (zqwzbody2) {
    if (zqwzbody2.indexOf("&") == -1) {
        zqwzbody2Arr.push(zqwzbody2)
    } else if (zqwzbody2.indexOf("&") > -1) {
        zqwzbody2s = zqwzbody2.split("&")
    } else if (process.env.zqwzbody2 && process.env.zqwzbody2.indexOf('&') > -1) {
        zqwzbody2Arr = process.env.zqwzbody2.split('&');
        console.log(`您选择的是用"&"隔开\n`)
    }
} else if($.isNode()) {
    var fs = require("fs");
    zqwzbody2 = fs.readFileSync("zqwzbody2.txt", "utf8");
    if (zqwzbody2 !== `undefined`) {
        zqwzbody2s = zqwzbody2.split("\n");
    } else {
        $.msg($.name, '【提示】请点击文章获取body，再跑一次脚本', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
    }
}
Object.keys(zqwzbody2s).forEach((item) => {
    if (zqwzbody2s[item] && !zqwzbody2s[item].startsWith("#")) {
        zqwzbody2Arr.push(zqwzbody2s[item])
    }
})

!(async () => {
    if (typeof $request !== "undefined") {
     getzqwzbody2()
     getzq_timebody1()
     $.done()
 }else {

        console.log(`共${zqwzbody2Arr.length}个阅读body`)
        index1 = indexLast * 1
        for (let k =  index1 ? index1 : 0; k < zqwzbody2Arr.length; k++) {
            // $.message = ""
            zqwzbody21 = zqwzbody2Arr[k];
            // console.log(`${zqwzbody21}`)
            console.log(`--------第 ${k + 1} 次阅读任务执行中--------\n`)
            await wzjl()
            zqwznum = k+2
            $.setdata(zqwznum, 'zqbody_index');
            await $.wait(60000);
            for (let k = 0; k < zq_timebody2Arr.length; k++) {
                zq_timebody21 = zq_timebody2Arr[k];
                await timejl()
            }
            console.log("\n\n")
        }
        $.setdata(0, 'zqbody_index');
    }



        // date = new Date()
        // if ($.isNode() &&date.getHours() == 11 && date.getMinutes()<10) {
        //     if (message.length != 0) {
        //            await notify.sendNotify("晶彩看点文章阅读", `${message}\n\n shaolin-kongfu`);
        //     }
        // } else {
        //     $.msg($.name, "",  message)
        // }

    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


function getzqwzbody2() {
    if ($request.url.match(/\/kandian.wkandian.com\/v5\/article\/info.json/)||$request.url.match(/\/kandian.wkandian.com\/v5\/article\/detail.json/)) {
          bodyVal1 = $request.url.split('p=')[1]
          console.log(encodeURIComponent(bodyVal1))
          bodyVal = 'p='+encodeURIComponent(bodyVal1)
            console.log(bodyVal)

        if (zqwzbody2) {
            if (zqwzbody2.indexOf(bodyVal) > -1) {
                $.log("此阅读请求已存在，本次跳过")
            } else if (zqwzbody2.indexOf(bodyVal) == -1) {
                zqwzbody2s = zqwzbody2 + "&" + bodyVal;
                $.setdata(zqwzbody2s, 'zqwzbody2');
                $.log(`${$.name}获取阅读: 成功, zqwzbody2s: ${bodyVal}`);
                bodys = zqwzbody2s.split("&")
                 $.msg($.name, "获取第" + bodys.length + "个阅读请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'zqwzbody2');
            $.log(`${$.name}获取阅读: 成功, zqwzbody2s: ${bodyVal}`);
            $.msg($.name, `获取第一个阅读请求: 成功🎉`, ``)
        }
    }

  }
//阅读文章奖励
function wzjl(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v5/article/complete.json',
            headers : wzheader,
            body : zqwzbody21,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.items.read_score !== "undefined" ){
                    console.log('\n浏览文章成功，获得：'+result.items.read_score + '金币')
                    
                }else{
                    console.log('\n看太久了，换一篇试试')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}


function getzq_timebody1() {
    if ($request.url.match(/\/kandian.wkandian.com\/v5\/user\/stay.json/)) {
          bodyVal=$request.body
            console.log(bodyVal)
        if (zq_timebody1) {
            if (zq_timebody1.indexOf(bodyVal) > -1) {
                $.log("此阅读请求已存在，本次跳过")
            } else if (zq_timebody1.indexOf(bodyVal) == -1) {
                zq_timebody2s = zq_timebody2 + "&" + bodyVal;
                $.setdata(zq_timebody1s,'zq_timebody1');
                $.log(`${$.name}获取阅读: 成功, zq_timebody2s: ${bodyVal}`);
                bodys = zq_timebody2s.split("&")
                // $.msg($.name, "获取第" + bodys.length + "个阅读请求: 成功🎉", ``)
            }
        } else {
            $.setdata($request.body,'zq_timebody1');
            $.log(`${$.name}获取阅读: 成功, zq_timebody2s: ${bodyVal}`);
            $.msg($.name, `获取第一个阅读请求: 成功🎉`, ``)
        }
    }
}

function timejl(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v5/user/stay.json',
            headers : zq_timeheader,
            body : zq_timebody21,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.success === true ){
                    console.log('\n阅读时长：'+result.time + '秒')
                }else{
                    console.log('\n更新阅读时长失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
