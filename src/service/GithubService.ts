import fetch from 'node-fetch'
export default class GithubService {
  transformIssue (ctx, next) {
    const { request } = ctx
    const GITHUB_ACCESS_TOKEN = 'MnYbHscyiJoBCd9tqDwXfBaLULrtb71F3Q3bPuUSruzxTeMD21HrAzThLIV0C5W5-cn-n1'
    const ZENHUB_ACCESS_TOKEN = 'e9d21a5e11f9ca8e5e5048ae385c41593946f7b00f44932038b2b43e565212053bda8609879b40b5'
    const REPO_ID = '377724339'
    // const { GITHUB_ACCESS_TOKEN, ZENHUB_ACCESS_TOKEN } = req.webtaskContext.secrets
    const { action, issue } = request.body
    const { url, title, html_url, number, body } = issue

    console.info(`[BEGIN] issue updated with action: ${action}`)

    if (action === 'opened') {
        // // 保存数据到 lean
        // let read = new Read();
        // // const book = request.payload;
        // read.set('title', title);
        // read.set('number', number);
        // read.set('url', url);
        // read.set('body', pub.reconvert(body));
        // read.save().then(function (blog) {
        //     // 成功保存之后，执行其他逻辑.
        //     console.log('成功保存:New object created with objectId: ' + read.id);
        //     // reply(blog);
        // }, function (error) {
        //     // 失败之后执行其他逻辑
        //     console.log('Failed to create new object, with error message: ' + error.message);
        //     // return reply(Boom.wrap(error, 'error'));
        // });

        fetch(`${url}?access_token=${GITHUB_ACCESS_TOKEN}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ milestone: 1}),
        }).then(
            () => console.info(`[END] set milestone successful! ${html_url}`),
            (e) => ctx.body = e
        )
    } else if (action === 'milestoned') {
        fetch(`https://api.zenhub.io/p1/repositories/${REPO_ID}/issues/${number}/estimate?access_token=${ZENHUB_ACCESS_TOKEN}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estimate: 1 }),
        }).then(
            () => console.info(`[END] Set estimate successful! ${html_url}`),
            (e) => console.error(`[END] Failed to set estimate! ${html_url}`, e)
        )
    }

    ctx.body = { message: 'issue updated!' }
  }
}
