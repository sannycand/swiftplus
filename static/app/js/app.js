{
    angular.module('swiftplus', [
        'ui.router',
        'swiftplus.auth',
        ])
        .config(routes)
        .constant('TEMPLATE_URL', '/static/app/templates')
        .constant('AppConfig', {
            defaultTab: 'auth.dashboard'
          })
        .run(initScopeData)
        .config(function run($httpProvider, $locationProvider){
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        })
    ;
}

function routes($stateProvider, $urlRouterProvider, TEMPLATE_URL, AppConfig) {
    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        if ($state.current.name === '') {
            $state.go(AppConfig.defaultTab);
        }
    });
        
    $stateProvider
        .state('auth', {
            abstract: true,
            url: '',
            template: '<ui-view></ui-view>',
            title: 'Dashboard',
            controllerAs: 'ctrl'
        })
        .state('auth.dashboard', {
            url: '/dashboard',
            templateUrl: TEMPLATE_URL + '/dashboard.html',
            controllerAs: 'ctrl',
            controller: 'DashboardController',
            title: 'Dashboard'
        })
        .state('auth.register', {
            url: '/register',
            templateUrl: TEMPLATE_URL + '/auth/register.html',
            controllerAs: 'ctrl',
            controller: 'RegisterController',
            title: 'Register',
        })
        .state('auth.login', {
            url: '/login',
            templateUrl: TEMPLATE_URL + '/auth/login.html',
            controllerAs: 'ctrl',
            controller: 'LoginController',
            title: 'Login',
        });
}

function initScopeData($rootScope, $state, $stateParams, TEMPLATE_URL, AppConfig) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.TEMPLATE_URL = TEMPLATE_URL;
    $rootScope.AppConfig = AppConfig;
}



