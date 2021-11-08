const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Iron Man", "Yoda", "SuperMan"],       // Names
      ["https://bbts1.azureedge.net/images/p/full/2020/12/ca80f9db-814f-40bf-9ceb-a74ef1e367b0.jpg", // Images
      "https://pbs.twimg.com/profile_images/689241085831319552/hxcb_rfA.jpg", 
      "https://assets.sport.ro/assets/protv/2018/09/13/image_galleries/59732/primul-superman-de-culoare-din-istorie-cine-l-ar-putea-inlocui-pe-henry-cavill_size24.jpg"],
      [400, 500, 300],                    // HP values
      [100, 150, 500],
      "Jeff Bezos",
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D627%26cropX2%3D1639%26cropY1%3D129%26cropY2%3D1142",
      100000,
      50
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();
    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
  };

  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();