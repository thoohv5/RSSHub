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

// Deprecated: DO NOT ADD ROUTE HERE

module.exports = router;
