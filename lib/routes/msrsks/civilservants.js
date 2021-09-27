const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const rootUrl = 'http://www.msrsks.com.cn';
    const currentUrl = `${rootUrl}/newsCenter/4.html`;
    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = cheerio.load(response.data);

    const list = $('.infos ul li a')
        .map((_, item) => {
            item = $(item);
            return {
                title: item.find('div.infosTitle').text(),
                link: item.attr('href'),
            };
        })
        .get();

    const items = await Promise.all(
        list.map((item) =>
            ctx.cache.tryGet(item.link, async () => {
                const detailResponse = await got({
                    method: 'get',
                    url: `${rootUrl}${item.link}`,
                });
                const content = cheerio.load(detailResponse.data);

                item.description = content('.detailContent').html();

                return item;
            })
        )
    );

    ctx.state.data = {
        title: '眉山人事考试网-公务员考试',
        link: currentUrl,
        item: items,
    };
};
