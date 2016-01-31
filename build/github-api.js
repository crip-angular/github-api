(function (ng, crip) {
    'use strict';

    crip.githubApi = ng.module('crip.gitgub-api', [
        'ngResource',
        'crip.core'
    ]);

})(angular, window.crip || (window.crip = {}));
(function (ng, crip) {
    'use strict';

    crip.githubApi
        .factory('GitHub', GitHub);

    GitHub.$inject = ['$q', 'GitHubReleases'];

    function GitHub($q, GitHubReleases) {
        var dataService = {
            config: {
                owner: false,
                repo: false
            },
            owner: owner,
            repo: repo,
            getReleases: getReleases,
            getLatestRelease: getLatestRelease
        };

        return dataService;

        function owner(owner) {
            dataService.config.owner = owner;

            return dataService;
        }

        function repo(repo) {
            dataService.config.repo = repo;

            return dataService;
        }

        function getResult(owner, repo, method) {
            var config = {
                    owner: owner || dataService.config.owner,
                    repo: repo || dataService.config.repo
                },
                result = GitHubReleases[method](config);

            ng.extend(result, {
                meta: meta
            });

            return result;
        }

        function getReleases(owner, repo) {
            return getResult(owner, repo, 'get')
        }

        function getLatestRelease(owner, repo) {
            return getResult(owner, repo, 'latest')
        }

        function meta() {
            var deferred = $q.defer(),
                meta = {
                    $promise: deferred.promise,
                    downloads: 0
                };

            this.$promise.then(function (data) {
                if (!ng.isArray(data)) {
                    meta.downloads = countAssetsDownloads(data.assets);

                    deferred.resolve(meta);
                }
                else {
                    data.map(function (val) {
                        meta.downloads += countAssetsDownloads(val.assets);
                    });

                    deferred.resolve(meta);
                }
            });

            return meta;
        }

        function countAssetsDownloads(assets) {
            var result = 0;
            assets.map(function (val) {
                result += val.download_count;

                return val;
            });

            return result;
        }
    }

})(angular, window.crip || (window.crip = {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImRhdGEtc2VydmljZXMvR2l0SHViLmpzIiwicHJvdmlkZXJzL2NyaXBHaXRIdWJDb25maWcuanMiLCJyZXNvdXJjZXMvUmVsZXNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdpdGh1Yi1hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKG5nLCBjcmlwKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgY3JpcC5naXRodWJBcGkgPSBuZy5tb2R1bGUoJ2NyaXAuZ2l0Z3ViLWFwaScsIFtcclxuICAgICAgICAnbmdSZXNvdXJjZScsXHJcbiAgICAgICAgJ2NyaXAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoYW5ndWxhciwgd2luZG93LmNyaXAgfHwgKHdpbmRvdy5jcmlwID0ge30pKTsiLCIoZnVuY3Rpb24gKG5nLCBjcmlwKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgY3JpcC5naXRodWJBcGlcclxuICAgICAgICAuZmFjdG9yeSgnR2l0SHViJywgR2l0SHViKTtcclxuXHJcbiAgICBHaXRIdWIuJGluamVjdCA9IFsnJHEnLCAnR2l0SHViUmVsZWFzZXMnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBHaXRIdWIoJHEsIEdpdEh1YlJlbGVhc2VzKSB7XHJcbiAgICAgICAgdmFyIGRhdGFTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgICAgIG93bmVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlcG86IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG93bmVyOiBvd25lcixcclxuICAgICAgICAgICAgcmVwbzogcmVwbyxcclxuICAgICAgICAgICAgZ2V0UmVsZWFzZXM6IGdldFJlbGVhc2VzLFxyXG4gICAgICAgICAgICBnZXRMYXRlc3RSZWxlYXNlOiBnZXRMYXRlc3RSZWxlYXNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGFTZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvd25lcihvd25lcikge1xyXG4gICAgICAgICAgICBkYXRhU2VydmljZS5jb25maWcub3duZXIgPSBvd25lcjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhU2VydmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlcG8ocmVwbykge1xyXG4gICAgICAgICAgICBkYXRhU2VydmljZS5jb25maWcucmVwbyA9IHJlcG87XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVNlcnZpY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRSZXN1bHQob3duZXIsIHJlcG8sIG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiBvd25lciB8fCBkYXRhU2VydmljZS5jb25maWcub3duZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbzogcmVwbyB8fCBkYXRhU2VydmljZS5jb25maWcucmVwb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEdpdEh1YlJlbGVhc2VzW21ldGhvZF0oY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIG5nLmV4dGVuZChyZXN1bHQsIHtcclxuICAgICAgICAgICAgICAgIG1ldGE6IG1ldGFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmVsZWFzZXMob3duZXIsIHJlcG8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFJlc3VsdChvd25lciwgcmVwbywgJ2dldCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRMYXRlc3RSZWxlYXNlKG93bmVyLCByZXBvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRSZXN1bHQob3duZXIsIHJlcG8sICdsYXRlc3QnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWV0YSgpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKSxcclxuICAgICAgICAgICAgICAgIG1ldGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHByb21pc2U6IGRlZmVycmVkLnByb21pc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRzOiAwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5nLmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhLmRvd25sb2FkcyA9IGNvdW50QXNzZXRzRG93bmxvYWRzKGRhdGEuYXNzZXRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShtZXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kb3dubG9hZHMgKz0gY291bnRBc3NldHNEb3dubG9hZHModmFsLmFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobWV0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1ldGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb3VudEFzc2V0c0Rvd25sb2Fkcyhhc3NldHMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgICAgIGFzc2V0cy5tYXAoZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHZhbC5kb3dubG9hZF9jb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoYW5ndWxhciwgd2luZG93LmNyaXAgfHwgKHdpbmRvdy5jcmlwID0ge30pKTsiLCIoZnVuY3Rpb24gKG5nLCBjcmlwKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgY3JpcC5naXRodWJBcGlcclxuICAgICAgICAucHJvdmlkZXIoJ2NyaXBHaXRIdWJDb25maWcnLCBjcmlwR2l0SHViQ29uZmlnKTtcclxuXHJcbiAgICBjcmlwR2l0SHViQ29uZmlnLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmlwR2l0SHViQ29uZmlnKCkge1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIG5nLmV4dGVuZChzZWxmLCB7XHJcbiAgICAgICAgICAgICRnZXQ6IFskZ2V0XSxcclxuICAgICAgICAgICAgYXBpVXJsOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gJGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFwaVVybDogc2VsZi5hcGlVcmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKGFuZ3VsYXIsIHdpbmRvdy5jcmlwIHx8ICh3aW5kb3cuY3JpcCA9IHt9KSk7IiwiKGZ1bmN0aW9uIChuZywgY3JpcCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGNyaXAuZ2l0aHViQXBpXHJcbiAgICAgICAgLnNlcnZpY2UoJ0dpdEh1YlJlbGVhc2VzJywgR2l0SHViUmVsZWFzZXMpO1xyXG5cclxuICAgIEdpdEh1YlJlbGVhc2VzLiRpbmplY3QgPSBbJyRyZXNvdXJjZScsICdjcmlwR2l0SHViQ29uZmlnJ107XHJcblxyXG4gICAgZnVuY3Rpb24gR2l0SHViUmVsZWFzZXMoJHJlc291cmNlLCBjcmlwR2l0SHViQ29uZmlnKSB7XHJcblxyXG4gICAgICAgIHZhciB1cmwgPSAne3Jvb3R9L3JlcG9zLzpvd25lci86cmVwby9yZWxlYXNlcy86b25seUxhdGVzdCdcclxuICAgICAgICAgICAgLnN1cHBsYW50KHtyb290OiBjcmlwR2l0SHViQ29uZmlnLmFwaVVybH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gJHJlc291cmNlKHVybCwge293bmVyOiAnQG93bmVyJywgcmVwbzogJ0ByZXBvJ30sIHtcclxuICAgICAgICAgICAgJ2dldCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcclxuICAgICAgICAgICAgJ2xhdGVzdCc6IHttZXRob2Q6ICdHRVQnLCBwYXJhbXM6IHtvbmx5TGF0ZXN0OiAnbGF0ZXN0J319XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KShhbmd1bGFyLCB3aW5kb3cuY3JpcCB8fCAod2luZG93LmNyaXAgPSB7fSkpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
