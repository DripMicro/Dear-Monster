const DMSToken = artifacts.require("DMSToken");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(DMSToken, { from: accounts[0] });
};
