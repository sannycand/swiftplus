{
    angular.module('swiftplus.auth', [
            'ui.router',
            'ngCookies'
        ])
        .factory('UserService', UserService)
        .controller('DashboardController', DashboardController)
        .controller('NavbarController', NavbarController)
        .controller('RegisterController', RegisterController)
        .controller('LoginController', LoginController)


    ;

    function DashboardController() {

    }
    
    function RegisterController(UserService, $state) {
        var self = this;
        self.UserService = UserService;
        self.$state = $state;
        self.register = register;
        
        function register() {
            self.UserService.register(self.email, self.password, self.username) 
        }
    }

    function LoginController(UserService, $scope,  $state) {
        var self = this;
        self.UserService = UserService;
        self.login = login;
        
        function login() {
            self.UserService.login(self.email, self.password);
        }
    }

    function NavbarController(UserService) {
        var self = this;
        self.UserService = UserService;
    }


    function UserService($cookies, $http, $state) {
        var service = {
            register: register,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getAuthenticatedAccount: getAuthenticatedAccount,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        }

        return service;

        function register(email, password, username){
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerErrorFn);
            function registerSuccessFn(data,status, headers, config) {
                console.log('success');
                window.location = '/login';
            }
            function registerErrorFn(data, status, headers, config) {
                console.log('Register failure!');
            }
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email, 
                password: password
            }).then(loginSuccessFn, loginErrorFn);
            function loginSuccessFn(response) {
                console.log(response,'response');
                service.setAuthenticatedAccount(response.data);
                window.location = '/dashboard';
            }
            function loginErrorFn(response) {
                return response;
            }
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccessFn, logoutErrorFn);
            function logoutSuccessFn(data, status, headers, config) {
                service.unauthenticate();
                window.location = '/login';
            }
            function logoutErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }


        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }

    }
}