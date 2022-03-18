const PerlToken = artifacts.require("PerlToken");

module.exports = function (deployer) {
    deployer.deploy(PerlToken);
};
