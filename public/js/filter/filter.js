'use strict';

var filterCategories = function($filter) {
    return function (collection, key) {
        if (collection === null) return;
        return uniqueItems(collection, key);
    };
};

mindanaoJobs.Filters.filter('filterCategories', filterCategories);
