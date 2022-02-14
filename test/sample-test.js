const {
  expect
} = require("chai");
const {
  ethers
} = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("MyNFT", function () {
  it("Should mint a nfs", async function () {
    const MyGeass = await ethers.getContractFactory("MyGeass");
    const myGeass = await MyGeass.deploy();

    await myGeass.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "robe"

    let balance = await myGeass.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintToken = await myGeass.toPayToMint(recipient,metadataURI,{value:ethers.utils.parseEther("0.54")})

    balance = await myGeass.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await myGeass.isContentOwned(metadataURI)).to.equal(true);
  })
})