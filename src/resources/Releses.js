(function (ng, crip) {
    'use strict';

    crip.githubApi
        .service('GitHubReleases', GitHubReleases);

    GitHubReleases.$inject = ['$resource', 'cripGitHubConfig'];

    function GitHubReleases($resource, cripGitHubConfig) {

        var url = '{root}/repos/:owner/:repo/releases/:onlyLatest'
            .supplant({root: cripGitHubConfig.apiUrl});

        return $resource(url, {owner: '@owner', repo: '@repo'}, {
            'get': {method: 'GET', isArray: true},
            'latest': {method: 'GET', params: {onlyLatest: 'latest'}}
        });
    }

})(angular, window.crip || (window.crip = {}));