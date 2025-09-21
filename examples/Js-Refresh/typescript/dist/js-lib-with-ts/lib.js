"use strict";
function getUserMetric(metric) {
    return metric.map((u) => u.numberOfLoginActions);
}
module.exports = { getUserMetric };
