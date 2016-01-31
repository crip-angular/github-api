(function (ng, crip) {
    'use strict';

    crip.githubApi
        .provider('cripGitHubConfig', cripGitHubConfig);

    cripGitHubConfig.$inject = [];

    function cripGitHubConfig() {

        var self = this;

        ng.extend(self, {
            $get: [$get],
            apiUrl: 'https://api.github.com'
        });

        function $get() {
            return {
                apiUrl: self.apiUrl
            }
        }
    }

})(angular, window.crip || (window.crip = {}));