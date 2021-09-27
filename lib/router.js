const Router = require('@koa/router');
const router = new Router();

const RouterHandlerMap = new Map();

// 懒加载 Route Handler，Route 首次被请求时才会 require 相关文件
const lazyloadRouteHandler = (routeHandlerPath) => (ctx) => {
    if (RouterHandlerMap.has(routeHandlerPath)) {
        return RouterHandlerMap.get(routeHandlerPath)(ctx);
    }

    const handler = require(routeHandlerPath);
    RouterHandlerMap.set(routeHandlerPath, handler);
    return handler(ctx);
};

// Deprecated: DO NOT ADD ROUTE HERE

// RSSHub
router.get('/rsshub/rss', lazyloadRouteHandler('./routes/rsshub/routes')); // 弃用
router.get('/rsshub/routes', lazyloadRouteHandler('./routes/rsshub/routes'));
router.get('/rsshub/sponsors', lazyloadRouteHandler('./routes/rsshub/sponsors'));

// 微博
router.get('/weibo/user/:uid/:routeParams?', lazyloadRouteHandler('./routes/weibo/user'));
router.get('/weibo/keyword/:keyword/:routeParams?', lazyloadRouteHandler('./routes/weibo/keyword'));
router.get('/weibo/search/hot', lazyloadRouteHandler('./routes/weibo/search/hot'));
router.get('/weibo/super_index/:id/:routeParams?', lazyloadRouteHandler('./routes/weibo/super_index'));
router.get('/weibo/oasis/user/:userid', lazyloadRouteHandler('./routes/weibo/oasis/user'));

// 贴吧
router.get('/tieba/forum/:kw', lazyloadRouteHandler('./routes/tieba/forum'));
router.get('/tieba/forum/good/:kw/:cid?', lazyloadRouteHandler('./routes/tieba/forum'));
router.get('/tieba/post/:id', lazyloadRouteHandler('./routes/tieba/post'));
router.get('/tieba/post/lz/:id', lazyloadRouteHandler('./routes/tieba/post'));
router.get('/tieba/user/:uid', lazyloadRouteHandler('./routes/tieba/user'));

// 简书
router.get('/jianshu/home', lazyloadRouteHandler('./routes/jianshu/home'));
router.get('/jianshu/trending/:timeframe', lazyloadRouteHandler('./routes/jianshu/trending'));
router.get('/jianshu/collection/:id', lazyloadRouteHandler('./routes/jianshu/collection'));
router.get('/jianshu/user/:id', lazyloadRouteHandler('./routes/jianshu/user'));

// 掘金
router.get('/juejin/category/:category', lazyloadRouteHandler('./routes/juejin/category'));
router.get('/juejin/tag/:tag', lazyloadRouteHandler('./routes/juejin/tag'));
router.get('/juejin/trending/:category/:type', lazyloadRouteHandler('./routes/juejin/trending'));
router.get('/juejin/books', lazyloadRouteHandler('./routes/juejin/books'));
router.get('/juejin/pins/:type?', lazyloadRouteHandler('./routes/juejin/pins'));
router.get('/juejin/posts/:id', lazyloadRouteHandler('./routes/juejin/posts'));
router.get('/juejin/collections/:userId', lazyloadRouteHandler('./routes/juejin/favorites'));
router.get('/juejin/collection/:collectionId', lazyloadRouteHandler('./routes/juejin/collection'));
router.get('/juejin/shares/:userId', lazyloadRouteHandler('./routes/juejin/shares'));
router.get('/juejin/column/:id', lazyloadRouteHandler('./routes/juejin/column'));

// 知乎
router.get('/zhihu/collection/:id', lazyloadRouteHandler('./routes/zhihu/collection'));
router.get('/zhihu/people/activities/:id', lazyloadRouteHandler('./routes/zhihu/activities'));
router.get('/zhihu/people/answers/:id', lazyloadRouteHandler('./routes/zhihu/answers'));
router.get('/zhihu/posts/:usertype/:id', lazyloadRouteHandler('./routes/zhihu/posts'));
router.get('/zhihu/zhuanlan/:id', lazyloadRouteHandler('./routes/zhihu/zhuanlan'));
router.get('/zhihu/daily', lazyloadRouteHandler('./routes/zhihu/daily'));
router.get('/zhihu/daily/section/:sectionId', lazyloadRouteHandler('./routes/zhihu/daily_section'));
router.get('/zhihu/hotlist', lazyloadRouteHandler('./routes/zhihu/hotlist'));
router.get('/zhihu/pin/hotlist', lazyloadRouteHandler('./routes/zhihu/pin/hotlist'));
router.get('/zhihu/question/:questionId', lazyloadRouteHandler('./routes/zhihu/question'));
router.get('/zhihu/topic/:topicId', lazyloadRouteHandler('./routes/zhihu/topic'));
router.get('/zhihu/people/pins/:id', lazyloadRouteHandler('./routes/zhihu/pin/people'));
router.get('/zhihu/bookstore/newest', lazyloadRouteHandler('./routes/zhihu/bookstore/newest'));
router.get('/zhihu/pin/daily', lazyloadRouteHandler('./routes/zhihu/pin/daily'));
router.get('/zhihu/weekly', lazyloadRouteHandler('./routes/zhihu/weekly'));
router.get('/zhihu/timeline', lazyloadRouteHandler('./routes/zhihu/timeline'));
router.get('/zhihu/hot/:category?', lazyloadRouteHandler('./routes/zhihu/hot'));

// 今日头条
router.get('/jinritoutiao/keyword/:keyword', lazyloadRouteHandler('./routes/jinritoutiao/keyword'));

// v2ex
router.get('/v2ex/topics/:type', lazyloadRouteHandler('./routes/v2ex/topics'));
router.get('/v2ex/post/:postid', lazyloadRouteHandler('./routes/v2ex/post'));
router.get('/v2ex/tab/:tabid', lazyloadRouteHandler('./routes/v2ex/tab'));

// Telegram
router.get('/telegram/channel/:username/:searchQuery?', lazyloadRouteHandler('./routes/telegram/channel'));
router.get('/telegram/stickerpack/:name', lazyloadRouteHandler('./routes/telegram/stickerpack'));
router.get('/telegram/blog', lazyloadRouteHandler('./routes/telegram/blog'));

// GitHub
router.get('/github/repos/:user', lazyloadRouteHandler('./routes/github/repos'));
router.get('/github/trending/:since/:language?', lazyloadRouteHandler('./routes/github/trending'));
router.get('/github/issue/:user/:repo/:state?/:labels?', lazyloadRouteHandler('./routes/github/issue'));
router.get('/github/pull/:user/:repo', lazyloadRouteHandler('./routes/github/pulls'));
router.get('/github/user/followers/:user', lazyloadRouteHandler('./routes/github/follower'));
router.get('/github/stars/:user/:repo', lazyloadRouteHandler('./routes/github/star'));
router.get('/github/search/:query/:sort?/:order?', lazyloadRouteHandler('./routes/github/search'));
router.get('/github/branches/:user/:repo', lazyloadRouteHandler('./routes/github/branches'));
router.get('/github/file/:user/:repo/:branch/:filepath+', lazyloadRouteHandler('./routes/github/file'));
router.get('/github/starred_repos/:user', lazyloadRouteHandler('./routes/github/starred_repos'));
router.get('/github/contributors/:user/:repo/:order?/:anon?', lazyloadRouteHandler('./routes/github/contributors'));
router.get('/github/topics/:name/:qs?', lazyloadRouteHandler('./routes/github/topic'));

// 新闻联播
router.get('/cctv/xwlb', lazyloadRouteHandler('./routes/cctv/xwlb'));

// 央视新闻
router.get('/cctv/:category', lazyloadRouteHandler('./routes/cctv/category'));
router.get('/cctv/photo/jx', lazyloadRouteHandler('./routes/cctv/jx'));
router.get('/cctv-special/:id?', lazyloadRouteHandler('./routes/cctv/special'));

// wechat
router.get('/wechat/wemp/:id', lazyloadRouteHandler('./routes/tencent/wechat/wemp'));
router.get('/wechat/csm/:id', lazyloadRouteHandler('./routes/tencent/wechat/csm'));
router.get('/wechat/ce/:id', lazyloadRouteHandler('./routes/tencent/wechat/ce'));
router.get('/wechat/announce', lazyloadRouteHandler('./routes/tencent/wechat/announce'));
router.get('/wechat/miniprogram/plugins', lazyloadRouteHandler('./routes/tencent/wechat/miniprogram/plugins'));
router.get('/wechat/tgchannel/:id', lazyloadRouteHandler('./routes/tencent/wechat/tgchannel'));
router.get('/wechat/uread/:userid', lazyloadRouteHandler('./routes/tencent/wechat/uread'));
router.get('/wechat/ershicimi/:id', lazyloadRouteHandler('./routes/tencent/wechat/ershcimi'));
router.get('/wechat/wjdn/:id', lazyloadRouteHandler('./routes/tencent/wechat/wjdn'));
router.get('/wechat/wxnmh/:id', lazyloadRouteHandler('./routes/tencent/wechat/wxnmh'));
router.get('/wechat/mp/homepage/:biz/:hid/:cid?', lazyloadRouteHandler('./routes/tencent/wechat/mp'));
router.get('/wechat/mp/msgalbum/:biz/:aid', lazyloadRouteHandler('./routes/tencent/wechat/msgalbum'));
router.get('/wechat/feeds/:id', lazyloadRouteHandler('./routes/tencent/wechat/feeds'));

// 百度
router.get('/baidu/doodles', lazyloadRouteHandler('./routes/baidu/doodles'));
router.get('/baidu/topwords/:boardId?', lazyloadRouteHandler('./routes/baidu/topwords'));
router.get('/baidu/daily', lazyloadRouteHandler('./routes/baidu/daily'));

// 眉山人事考试网
router.get('/msrsks/civilservants', lazyloadRouteHandler('./routes/msrsks/civilservants'));
router.get('/msrsks/enterprise', lazyloadRouteHandler('./routes/msrsks/enterprise'));

// Deprecated: DO NOT ADD ROUTE HERE

module.exports = router;
