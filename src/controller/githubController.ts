import GithubService from '../service/GithubService'

class GithubController { 
  private service: GithubService = new GithubService
  push = (ctx, next) => {
    this.service.transformIssue(ctx, next)
  }
}

export default new GithubController();
