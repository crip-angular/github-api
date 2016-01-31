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