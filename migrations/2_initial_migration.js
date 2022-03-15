const AppleToken = artifacts.require("AppleToken");

module.exports = function (deployer) {
    deployer.deploy(AppleToken);
};
