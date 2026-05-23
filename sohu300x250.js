( function ()
{
    //    console.log("one-begin:",Date.now());
    let errlog = 1
    try
    {
        function wlog ( msg )
        {
            let request = new XMLHttpRequest()    // 创建新请求
            request.open( 'POST', 'https://stat.onemob.mobi/plgn/js_log.php', true )
            request.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded;" )
            request.onreadystatechange = () =>
            {    // 定义事件处理程序，如果事件处理完成，直接终止计时器
                if ( request.readyState === 4 && request.status === 200 )
                {    // 对回调函数的处理
                    console.log( 'success ' + request.responseText )
                    //} else {
                    //console.log('ready '+request.readyState+' status '+request.status);
                }
            }
            request.send( "co=sohu300X250&msg=" + msg )
        }

        //google引入
        let scriptGA = document.createElement( "script" )
        scriptGA.type = "text/javascript"
        scriptGA.src = 'https://www.googletagmanager.com/gtag/js?id=G-DFBWYFE6Q0'
        scriptGA.async = true
        document.getElementsByTagName( 'head' )[0].appendChild( scriptGA )
        //google引入结束

        function o_insertAfter ( newElement, targetElement )
        {
            let parent = targetElement.parentNode
            if ( parent.lastChild == targetElement )
            {
                // 如果最后的节点是目标元素，则直接添加。因为默认是最后
                parent.appendChild( newElement )
            } else
            {
                parent.insertBefore( newElement, targetElement.nextSibling )
                //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
            }
        }
        //RC-Adsense
        function o_rcAd ( node, ad, lc )
        {
            let script1 = document.createElement( "script" )
            script1.async = true
            script1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2894714012965030'
            script1.setAttribute( "crossorigin", 'anonymous' )
            node.parentNode.insertBefore( script1, node )

            let div = document.createElement( "ins" )
            div.setAttribute( "id", "onemob-ad" )
            div.setAttribute( "class", 'adsbygoogle' )
            div.setAttribute( "style", 'display:block' )
            div.setAttribute( "data-ad-client", 'ca-pub-2894714012965030' )
            div.setAttribute( "data-ad-slot", '4445597105' )
            div.setAttribute( "data-ad-format", 'auto' )
            div.setAttribute( "data-full-width-responsive", 'true' )
            node.parentNode.insertBefore( div, node )

            let script2 = document.createElement( "script" )
            script2.text = "(adsbygoogle = window.adsbygoogle || []).push({});"
            node.parentNode.insertBefore( script2, node )

            let SetType = o_browserRedirect()
            node.setAttribute( "SetType", SetType )

            if ( ad == false )
            {
                ad = 'adsense'
            }
            let pros = o_getProperties()
            let img = document.createElement( "img" )
            if ( SetType == 'pc' )
            {
                img.src = "https://pweapons.com/p.gif?s=sohu2&a=" + ad + "&t=p&_=" + Date.now() + pros
            } else
            {
                img.src = "https://pweapons.com/p.gif?s=sohu2m&a=" + ad + "m&t=p&_=" + Date.now() + pros
            }
            img.style.display = 'none'
            node.parentNode.insertBefore( img, node )

            o_report( node, SetType, 'rc_300X250', lc )

        }
        // rb模块：复用rc的Adsense广告代码，弹窗居中并独立统计pv和点击
        function o_rbAd ( node, ad, lc )
        {
            console.log("rb-begin:",Date.now());
            console.log("node:", node);
            if ( !node ) return
            if ( ad == false )
            {
                ad = 'adsense'
            }

            let SetType = o_browserRedirect()
            node.setAttribute( "SetType", SetType )
            let pros = o_getProperties()

            let rbMask = document.createElement( "div" )
            rbMask.setAttribute( "id", "onemob-rb-mask" )
            rbMask.setAttribute( "style", "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;overflow:hidden;" )
            document.body.appendChild( rbMask )

            let rbWrap = document.createElement( "div" )
            rbWrap.setAttribute( "id", "onemob-rb-wrap" )
            rbWrap.setAttribute( "style", "position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden;" )
            rbMask.appendChild( rbWrap )

            let script1 = document.createElement( "script" )
            script1.async = true
            script1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2894714012965030'
            script1.setAttribute( "crossorigin", 'anonymous' )
            rbWrap.appendChild( script1 )

            let div = document.createElement( "ins" )
            div.setAttribute( "id", "onemob-ad" )
            div.setAttribute( "class", 'adsbygoogle' )
            div.setAttribute( "style", 'display:block;width:100%;height:100%;min-width:300px;min-height:250px;' )
            div.setAttribute( "data-ad-client", 'ca-pub-2894714012965030' )
            div.setAttribute( "data-ad-slot", '4445597105' )
            div.setAttribute( "data-ad-format", 'auto' )
            div.setAttribute( "data-full-width-responsive", 'true' )
            rbWrap.appendChild( div )

            let script2 = document.createElement( "script" )
            script2.text = "(adsbygoogle = window.adsbygoogle || []).push({});"
            rbWrap.appendChild( script2 )

            let img = document.createElement( "img" )
            img.src = "https://pweapons.com/p.gif?s=rb&a=" + ad + "m&t=p&_=" + Date.now() + pros
            img.style.display = 'none'
            rbWrap.appendChild( img )

            let isOverAd = false
            let hasClickReport = false
            let reportClick = function ()
            {
                if ( hasClickReport ) return
                hasClickReport = true
                let img = document.createElement( "img" )
                img.src = "https://pweapons.com/p.gif?s=rb&a=" + ad + "m&t=c&_=" + Date.now() + pros
                img.style.display = 'none'
                rbWrap.appendChild( img )
            }

            rbWrap.onmouseover = function () { isOverAd = true }
            rbWrap.onmouseout = function () { isOverAd = false }
            rbWrap.ontouchstart = function () { isOverAd = true }
            window.addEventListener( 'blur', function ()
            {
                let activeElement = document.activeElement
                if ( isOverAd || ( activeElement && activeElement.tagName == 'IFRAME' && rbWrap.contains( activeElement ) ) ) reportClick()
            } )

            o_report( node, SetType, 'rb_300X250', lc )
        }
        //原生Taboola
        function o_taboolaAd ( node, co, flag, adid )
        {
            // 创建div
            let id = co + '-300x250-Taboola'
            let script1 = document.createElement( "script" )
            //script1.setAttribute("id", adid);
            script1.type = "text/javascript"
            let lc = flag.substr( 0, 2 ).toUpperCase()

            script1.src = 'https://web.nextword.me/onemob/js/onemob.bundle.apb.js'
            id = id + lc
            let div = document.createElement( "div" )
            div.setAttribute( "id", adid )
            div.appendChild( script1 )
            node.parentNode.insertBefore( div, node )
            //console.log("one-1:",Date.now());

            let SetType = o_browserRedirect()
            node.setAttribute( "SetType", SetType )

            let pros = o_getProperties()
            let img = document.createElement( "img" )
            if ( SetType == 'pc' )
            {
                img.src = "https://pweapons.com/p.gif?s=" + co + "&a=taboola_sohu&t=p&_=" + Date.now() + pros
            } else
            {
                img.src = "https://pweapons.com/p.gif?s=" + co + "m&a=taboola_sohum&t=p&_=" + Date.now() + pros
            }
            img.style.display = 'none'
            node.parentNode.insertBefore( img, node )

            o_report( node, SetType, 'taboola_300X250', lc )
        }
        function o_taboolaIfr ( node, url, name, co, lc, flag = 0 )
        {
            let ifrm = document.createElement( "iframe" )
            ifrm.setAttribute( "id", name )
            ifrm.setAttribute( "scrolling", "no" )
            ifrm.setAttribute( "frameborder", "0" )
            ifrm.setAttribute( "marginheight", "0" )
            ifrm.setAttribute( "marginwidth", "0" )
            ifrm.setAttribute( "topmargin", "0" )
            ifrm.setAttribute( "leftmargin", "0" )
            ifrm.setAttribute( "width", "300" )
            ifrm.setAttribute( "height", "250" )
            ifrm.src = 'https://' + url
            node.parentNode.insertBefore( ifrm, node )

            let SetType = o_browserRedirect()
            o_report( node, SetType, 'taboola_300X250', lc )

            let t = 'p'
            if ( flag ) t = 'pp'
            let pros = o_getProperties()
            let img1 = document.createElement( "img" )
            if ( SetType == 'pc' )
            {
                img1.src = "https://pweapons.com/p.gif?s=" + co + "&a=sohu&t=" + t + "&_=" + Date.now() + pros
            } else
            {
                img1.src = "https://pweapons.com/p.gif?s=" + co + "m&a=sohum&t=" + t + "&_=" + Date.now() + pros
            }
            img1.style.display = 'none'
            node.parentNode.insertBefore( img1, node )
        }
        function o_taboolaNewsIfr ( node, site, co, lc, flag = 0 )
        {
            let ifrm = document.createElement( "iframe" )
            ifrm.setAttribute( "id", "onemob-ad" )
            ifrm.setAttribute( "scrolling", "no" )
            ifrm.setAttribute( "frameborder", "0" )
            ifrm.setAttribute( "marginheight", "0" )
            ifrm.setAttribute( "marginwidth", "0" )
            ifrm.setAttribute( "topmargin", "0" )
            ifrm.setAttribute( "leftmargin", "0" )
            ifrm.setAttribute( "width", "350" )
            ifrm.setAttribute( "height", "530" )
            ifrm.src = 'https://' + site
            node.parentNode.insertBefore( ifrm, node )

            let SetType = o_browserRedirect()
            o_report( node, SetType, 'taboola_300X250', lc )

            let t = 'p'
            if ( flag ) t = 'pp'
            let pros = o_getProperties()
            let img1 = document.createElement( "img" )
            if ( SetType == 'pc' )
            {
                img1.src = "https://pweapons.com/p.gif?s=" + co + "&a=sohu&t=" + t + "&_=" + Date.now() + pros
            } else
            {
                img1.src = "https://pweapons.com/p.gif?s=" + co + "m&a=sohum&t=" + t + "&_=" + Date.now() + pros
            }
            img1.style.display = 'none'
            node.parentNode.insertBefore( img1, node )
        }
        function pysAd ( node, lc, radom )
        {
            // let random = Math.ceil( Math.random() * 2 )
            // let target = 'https://www.pys5.com?cp=sohu'
            // let img = 'pys300X250_' + random + '.' + 'jpg'
            let SetType = o_browserRedirect()
            o_report( node, SetType, 'PYS_300X250', lc )

            let img2 = document.createElement( "img" )
            if ( SetType == 'pc' )
            {
                img2.src = "https://gameistarz.com/g.gif?s=pys5&a=sohu_300X250&t=" + lc + "_" + radom + "&_=" + Date.now()
            } else
            {
                img2.src = "https://gameistarz.com/g.gif?s=pys5&a=sohu_300X250m&t=" + lc + "_" + radom + "&_=" + Date.now()
            }
            img2.style.display = 'none'
            node.parentNode.insertBefore( img2, node )
        }
        function o_report ( node, SetType, t, lc )
        {
            let scriptCrypto = document.createElement( "script" )
            scriptCrypto.type = "text/javascript"
            scriptCrypto.src = 'https://cdn-ali.onemob.mobi/img/crypto-js.min.js'
            scriptCrypto.async = true
            scriptCrypto.onload = function ()
            {
                // console.log( '脚本加载完成' )
                let a = 'sohu'
                if ( SetType == 'mobile' ) a = a + 'm'
                let ts = Date.now()
                let originalString = "js5" + a + t + ts + lc
                let sign = CryptoJS.MD5( originalString ).toString()
                let img1 = document.createElement( "img" )
                img1.src = "https://pweapons.com/p.gif?s=js5&a=" + a + "&t=" + t + "&_=" + ts + "&sign=" + sign + "&lc=" + lc
                img1.style.display = 'none'
                node.parentNode.insertBefore( img1, node )
            }
            document.getElementsByTagName( 'head' )[0].appendChild( scriptCrypto )
        }
        function demo ( node )
        {
            let target = 'https://headsline.com/?c=sohu'
            let img = 'news.png'
            let SetType = o_browserRedirect()
            // 创建div
            let ifrm = document.createElement( "div" )
            ifrm.innerHTML = '<a href="' + target + '" target="_blank"><img src="https://cdn-ali.onemob.mobi/img/' + img + '"></a>'
            node.parentNode.insertBefore( ifrm, node )
        }
        function o_getProperties ()
        {
            let sh = window.screen.height
            let sw = window.screen.width
            let vh = window.visualViewport.height
            let vw = window.visualViewport.width
            let dpr = window.devicePixelRatio
            let pf = navigator.platform
            let ua = encodeURIComponent( navigator.userAgent )
            let core = navigator.hardwareConcurrency || ''
            let mem = navigator.deviceMemory || ''
            let langs = navigator.languages
            let glv = ""
            let glr = ""
            let canvas = document.createElement( 'canvas' )
            canvas.id = 'webglCanvas'
            canvas.width = 1
            canvas.height = 1
            canvas.style.display = 'none' // 隐藏 canvas
            document.body.appendChild( canvas )
            let gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' )
            if ( gl )
            {
                let debugInfo = gl.getExtension( 'WEBGL_debug_renderer_info' )
                if ( debugInfo )
                {
                    glv = gl.getParameter( debugInfo.UNMASKED_VENDOR_WEBGL )
                    glr = gl.getParameter( debugInfo.UNMASKED_RENDERER_WEBGL )
                }
            }
            return '&sh=' + sh + '&sw=' + sw + '&vh=' + vh + '&vw=' + vw + '&dpr=' + dpr + '&pf=' + pf + '&core=' + core + '&mem=' + mem + '&langs=' + encodeURIComponent( langs ) + '&glv=' + encodeURIComponent( glv ) + '&glr=' + encodeURIComponent( glr )
        }
        function o_browserRedirect ()
        {
            //let sUserAgent = navigator.userAgent.toLowerCase();
            //console.log(sUserAgent);
            //if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
            if ( navigator.userAgent.match( /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i ) )
            {
                //跳转移动端页面
                return 'mobile'
            } else
            {
                //跳转pc端页面
                return 'pc'
            }
        }
        function o_osbrowserRedirect ()
        {
            let sUserAgent = navigator.userAgent.toLowerCase()
            //console.log(sUserAgent);
            if ( /android/.test( sUserAgent ) )
            {
                //跳转android移动端页面
                return 'android'
            } else
            {
                //跳转pc端页面
                return 'other'
            }
        }
        function o_getQueryVariable ( variable )
        {
            let query = window.location.search.substring( 1 )
            let vars = query.split( "&" )
            for ( let i = 0; i < vars.length; i++ )
            {
                let pair = vars[i].split( "=" )
                if ( pair[0] == variable ) { return pair[1] }
            }
            return ( false )
        }
        function o_getCookie ( name )
        {
            let ca = document.cookie.split( ';' )
            //console.log(ca);
            for ( let i = 0; i < ca.length; i++ )
            {
                let c = ca[i].trim().split( '=' )
                if ( name == c[0] )
                {
                    //console.log(c[0],'=',c[1]);
                    return decodeURIComponent( c[1] )
                }
            }
            return ( false )
        }
        //查询IP地区
        function o_getLC ()
        {
            o_timedGetLC( 'https://lc.j8me.com', 3000, o_getSuccessLC )
        }
        function o_timedGetLC ( url, timeout, callback )
        {
            let requestLC = new XMLHttpRequest()    // 创建新请求
            let timedoutLC = false    // 是否超时，设置标志
            // 启动计时器，在timeout毫秒后将终止请求
            let timerLC = setTimeout( () =>
            {    // 设置计时器，将在timeout时间之后执行该操作，不同于直接定义，是直接
                timedoutLC = true    // 设置标记
                requestLC.abort()    // 直接中止请求
                //console.log('LC abort');
            }, timeout )    // 直接终止请求
            requestLC.open( 'GET', url, true )
            requestLC.onreadystatechange = () =>
            {    // 定义事件处理程序，如果事件处理完成，直接终止计时器
                //console.log('LC readyState:'+requestLC.readyState+'|status:'+requestLC.status);
                if ( requestLC.readyState !== 4 )
                {
                    //console.log('LC ready');
                    return    // 如果此时仍然有没有下载完成的，直接忽视,等待计时器取消
                }
                if ( timedoutLC )
                {
                    //console.log('LC timedout');
                    o_getArea( '', 0 )
                    return    // 确定此时仍然没有超时,如果此时已经超时，等待计时器取消
                }
                clearTimeout( timerLC )    // 此时已经执行完成任务，取消计时器
                if ( requestLC.status === 200 )
                {    // 对回调函数的处理
                    //console.log('LC callback');
                    callback( requestLC.responseText )    // 如果请求成功，将会直接返回成功的文本，并调用回调函数
                }

            }
            requestLC.send()    // 直接发送请求（此请求为异步操作）
        }
        function o_getSuccessLC ( data )
        {
            let myArr = JSON.parse( data )
            //console.log('LC success:'+myArr.lc);
            o_getArea( myArr.lc, myArr.fraud )
        }
        function o_getResult ( lc, SetType, radom )
        {
            let obj = o_proportion[lc]
            if ( SetType == 'mobile' )
            {
                obj = o_proportion_m[lc]
            }
            if ( obj != undefined )
            {
                //let radom = Math.ceil( Math.random() * 10000 )
                //console.log( 'radom:' + radom )
                for ( let key in obj )
                {
                    let v = obj[key] * 100
                    if ( radom < v ) return key
                    else radom -= v
                }
            }
            return "pys5" + radom
        }
        //申明广告的数组（比例区间）
        let o_proportion = H5AD2_SOHU300X250OPC
        let o_proportion_m = H5AD2_SOHU300X250OM
        // let o_proportion = {
        //     "US": {
        //         'ume': 0,
        //         'b6mm': 0,
        //         'vynce': 5,
        //         'fyndr': 10,
        //         'gliderer': 0,
        //         'eagle': 5,
        //         'ecovibeo-sc-vw': 65,
        //         'youn': 5,
        //         'pixeo': 7,
        //         'pys5': 3
        //     },
        //     "CA": {
        //         'ume': 5,
        //         'b6mm': 20,
        //         'vynce': 12,
        //         'fyndr': 15,
        //         'gliderer': 40,
        //         'eagle': 0,
        //         'ecovibeo': 0,
        //         'youn': 0,
        //         'pixeo': 0,
        //         'pys5': 8
        //     },
        //     "AU": {
        //         'ume': 0,
        //         'b6mm': 0,
        //         'vynce': 0,
        //         'fyndr': 35,
        //         'gliderer': 65,
        //         'eagle': 0,
        //         'ecovibeo': 0,
        //         'youn': 0,
        //         'pixeo': 0,
        //         'pys5': 0
        //     },
        //     "GB": {
        //         'ume': 0,
        //         'b6mm': 0,
        //         'vynce': 0,
        //         'fyndr': 0,
        //         'gliderer': 0,
        //         'eagle': 0,
        //         'ecovibeo': 100,
        //         'youn': 0,
        //         'pixeo': 0,
        //         'pys5': 0
        //     }
        // }
        // let o_proportion_m = o_proportion
        function o_getArea ( lc, score )
        {
            // lc = 'US'
            // console.log( 'LC:' + lc )
            //console.log( 'score:' + score )
            let SetType = o_browserRedirect()
            let d = document.getElementById( "ONEMOB-sohu300x250" )
            let radom = Math.ceil( Math.random() * 10000 )
            console.log( 'radom:' + radom )
            let ad = o_getResult( lc, SetType, radom )
            // console.log('ad:' + ad)
            if ( ad == 'rc-sohu' )
            {
                o_rcAd( d, 'rc_sohu', lc )
            }
            if ( ad == 'rb' || ad == 'rb-sohu' )
            {
                o_rbAd( d, 'rb_sohu', lc )
            }
            if ( ad == 'ume-sohu-sc-apb' )
            {
                o_taboolaAd( d, 'sohu', lc, "o-taboola-ad" )
            }
            if ( ad == 'b6mm-sc-wfb' )
            {
                o_taboolaIfr( d, "b6mm.com/?c=sohu&preload=false", "o-taboola-ad", 'b6mm', lc, 1 )
            }
            if ( ad == 'eagle-sc-wst' )
            {
                //eagle.vin过滤pixalate
                //if ( score < 0.5 )
                //{
                o_taboolaIfr( d, "eagle.vin/content.html?c=sohu", "o-taboola-ad", 'eagle', lc, 1 )
                //} else
                //{
                //    ad = 'pys5e'+score
                //}
            }
            if ( ad == 'ecovibeo-sc-vw' )
            {
                o_taboolaIfr( d, "ecovibeo.com/?c=sohu&preload=false", "o-taboola-ad", 'ecovibeo', lc, 1 )
            }
            if ( ad == 'youn-us-en' )
            {
                o_taboolaNewsIfr( d, 'youn.fyi/swiper/', 'youn', lc )
            }
            if ( ad == 'vynce-us-en03' )
            {
                o_taboolaNewsIfr( d, "vynce.club/swiper/", 'vynce', lc )
            }
            if ( ad == 'pixeo-us-en02' )
            {
                o_taboolaNewsIfr( d, "pixeo.xyz/swiper/?c=sohu", 'pixeo', lc, 1 )
            }
            if ( ad == 'pixeo-ca' )
            {
                o_taboolaNewsIfr( d, "pixeo.xyz/swiper-ca/?c=sohu", 'pixeoca', lc, 1 )
            }
            if ( ad == 'fyndr-newsfeed01-us-en' )
            {
                o_taboolaNewsIfr( d, 'fyndr.net/swiper/', 'fyndr', lc )
            }
            if ( ad == 'fyndr-newsfeed01-ca' )
            {
                o_taboolaNewsIfr( d, 'fyndr.net/swiper-ca/', 'fyndrca', lc )
            }
            if ( ad == 'fyndr-newsfeed01-au' )
            {
                o_taboolaNewsIfr( d, 'fyndr.net/swiper-au/', 'fyndrau', lc )
            }
            if ( ad == 'gliderer-newsfeed02-us-en' )
            {
                o_taboolaNewsIfr( d, 'gliderer.com/swiper/', 'gliderer', lc )
            }
            if ( ad == 'gliderer-newsfeed02-ca' )
            {
                o_taboolaNewsIfr( d, 'gliderer.com/swiper-ca/', 'glidererca', lc )
            }
            if ( ad == 'gliderer-newsfeed02-au' )
            {
                o_taboolaNewsIfr( d, 'gliderer.com/swiper-au/', 'glidererau', lc )
            }
            if ( ad == 'gameframerate-yt-gf-us' )
            {
                o_taboolaNewsIfr( d, 'gameframerate.com/swiper/', 'gameframerate', lc )
            }
            if ( ad == 'gameframerate-yt-gf-ca' )
            {
                o_taboolaNewsIfr( d, 'gameframerate.com/swiper-ca/', 'gameframerateca', lc )
            }
            if ( ad == 'gameframerate-yt-gf-au' )
            {
                o_taboolaNewsIfr( d, 'gameframerate.com/swiper-au/', 'gameframerateau', lc )
            }
            if ( ad == 'gamecontentupdates-yt-gc-us' )
            {
                o_taboolaNewsIfr( d, 'gamecontentupdates.com/swiper/?c=sohu', 'gamecontentupdates', lc, 1 )
            }
            if ( ad == 'gamecontentupdates-yt-gc-ca' )
            {
                o_taboolaNewsIfr( d, 'gamecontentupdates.com/swiper-ca/?c=sohu', 'gamecontentupdatesca', lc, 1 )
            }
            if ( ad == 'gamemoddingcommunity-yt-gm-us' )
            {
                o_taboolaNewsIfr( d, 'gamemoddingcommunity.com/swiper/', 'gamemoddingcommunity', lc )
            }
            if ( ad == 'newsboyus-st-nwb-us' )
            {
                o_taboolaNewsIfr( d, 'newsboyus.com/swiper/?c=sohu', 'newsboyus', lc, 1 )
            }
            if ( ad == 'newsboyus-st-nwb-ca' )
            {
                o_taboolaNewsIfr( d, 'newsboyus.com/swiper-ca/?c=sohu', 'newsboyusca', lc, 1 )
            }
            if ( ad == 'newsboyus-st-nwb-au' )
            {
                o_taboolaNewsIfr( d, 'newsboyus.com/swiper-au/?c=sohu', 'newsboyusau', lc, 1 )
            }
            if ( ad == 'newsbreakhk-st-nwbr-us' )
            {
                o_taboolaNewsIfr( d, 'newsbreakhk.com/swiper/?c=sohu', 'newsbreakhk', lc, 1 )
            }
            if ( ad == 'newsbreakhk-st-nwbr-ca' )
            {
                o_taboolaNewsIfr( d, 'newsbreakhk.com/swiper-ca/?c=sohu', 'newsbreakhkca', lc, 1 )
            }
            if ( ad == 'newsbreakhk-st-nwbr-au' )
            {
                o_taboolaNewsIfr( d, 'newsbreakhk.com/swiper-au/?c=sohu', 'newsbreakhkau', lc, 1 )
            }
            if ( ad == 'newscasthk-st-nwc-us' )
            {
                o_taboolaNewsIfr( d, 'newscasthk.com/swiper/', 'newscasthk', lc )
            }
            if ( ad == 'newscasthk-st-nwc-ca' )
            {
                o_taboolaNewsIfr( d, 'newscasthk.com/swiper-ca/', 'newscasthkca', lc )
            }
            if ( ad == 'newscasthk-st-nwc-au' )
            {
                o_taboolaNewsIfr( d, 'newscasthk.com/swiper-au/', 'newscasthkau', lc )
            }
            if ( ad == 'headsline' )
            {
                if ( SetType == 'mobile' )
                {
                    o_taboolaIfr( d, "headsline.com/?c=sohu&preload=false", "o-taboola-ad", 'headsline', lc, 1 )
                } else
                {
                    ad = 'pys5h'
                }
            }
            if ( ad == 'fantasyrealmser' )
            {
                if ( SetType == 'mobile' )
                {
                    o_taboolaIfr( d, "fantasyrealmser.com/?c=sohu&preload=false", "o-taboola-ad", 'fantasyrealmser', lc, 1 )
                } else
                {
                    ad = 'pys5f'
                }
            }
            if ( ad == 'villainsy' )
            {
                o_taboolaIfr( d, "villainsy.com/?c=sohu&preload=false", "o-taboola-ad", 'villainsy', lc )
            }
            if ( ad == 'ismovement' )
            {
                o_taboolaIfr( d, "ismovement.com/?c=sohu&preload=false", "o-taboola-ad", 'ismovement', lc )
            }
            if ( ad == 'healinges' )
            {
                if ( SetType == 'mobile' )
                {
                    ad = 'pys5s'
                } else
                {
                    o_taboolaIfr( d, "healinges.com/?c=sohu&preload=false", "o-taboola-ad", 'healinges', lc )
                }
            }
            if ( ad.substr( 0, 4 ) == 'pys5' )
            {
                pysAd( d, lc, radom + "_" + ad.slice( 4 ) )
            }
        }
        //查询是否有多条广告接入
        //let UserUA = navigator.userAgent;
        //let d = document.getElementsByTagName("script");
        //let SetType = o_browserRedirect();
        //let osType = o_osbrowserRedirect();
        //console.log(SetType);
        let d = document.getElementById( "ONEMOB-sohu300x250" )
        //for(let i = 0,n=d.length; i < n; i++) {
        //console.log(i)
        //let id = d[i].id.slice(7);
        //if((id != '') && (d[i].id.indexOf('ONEMOB') != '-1')&&(d[i].id.indexOf('sohu300x250') != '-1')) {
        let t = o_getQueryVariable( '_t_' )
        let c = o_getQueryVariable( '_c_' )
        let tt = o_getCookie( 'onemob' )
        let f = o_getQueryVariable( '_f_' )
        if ( f != false || tt == 'b6mm' )
        {
            o_taboolaIfr( d, "b6mm.com/?preload=false", "onemob-ad", "b6mm", '' )
        } else if ( t == 'rc' || tt == 'rc' )
        {
            o_rcAd( d, c, '' )
        } else if ( t == 'rb' || tt == 'rb' )
        {
            o_rbAd( d, c, '' )
        } else if ( t != false )
        {
            o_taboolaAd( d, 'sohu', t, "onemob" )
        } else if ( tt != false )
        {
            o_taboolaAd( d, 'sohu', tt, "onemob" )
        } else
        {

            o_getLC()
        }
        //google引入调用
        window.dataLayer = window.dataLayer || []
        function gtag () { dataLayer.push( arguments ) }
        gtag( "js", new Date() )
        gtag( "config", "G-DFBWYFE6Q0" )
    } catch ( err )
    {
        console.log( 'errmsg', err.message )
        if ( errlog ) wlog( err.message )
    }
    //  console.log("one-end:",Date.now());
} )()
