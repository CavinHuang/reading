import homeController from './controller/home-controller'
import Github from './controller/githubController'

export default [
  {
    path: '/',
    method: 'get',
    action: homeController.hello
  }, {
    path: '/push',
    method: 'post',
    action: Github.push
  }, {
    path: '/readed',
    method: 'get',
    action: Github.readed
  }
];
