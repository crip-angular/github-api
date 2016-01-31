(function (ng, crip) {
    'use strict';

    crip.githubApi = ng.module('crip.gitgub-api', [
        'ngResource',
        'crip.core'
    ]);

})(angular, window.crip || (window.crip = {}));