import GithubService from '../service/GithubService'

class GithubController { 

  private service: GithubService = new GithubService

  push = (ctx, next) => {
    this.service.transformIssue(ctx, next)
  }

  readed = (ctx, next) => {
    console.log('【归档】')
    this.service.closeIssue(ctx, next)
  }
}

export default new GithubController();
