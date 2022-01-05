//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DearMonster is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;
    using Counters for Counters.Counter;

    uint256 public _tokenIds;
//    Counters.Counter public _tokenIds;

    IERC20 DMS;

    uint256 public MAX_SUPPLY = 30;
    uint256 maxSupply = 30;
    uint256 price = 14800;

    uint256 public constant MAX_PER_MINT = 1;

    bool public presaleActive = true;
    bool public isRevealed = false;

    uint256 private tokenPrice = 1 * 10000 * 10 ** 18; // 10000 DMS

    string public baseTokenURI;
    string public monsterImageURI;
    string public caveImageURI;

    string private baseImageExtension = ".png";
    string private baseExtension = ".json";


    struct Attribute {
        address owner;
        string name;
        string element;
        uint256 level;
        uint256 exp;
        uint256 star;
        uint256 energy;
    }

    Attribute [] public attributes;
    Attribute [] public returnAttributes;
    string [] public elementPath;
//    mapping(uint256 => Attribute) public attributes;


    constructor(
        string memory _monsterImageURI,
        string memory _caveImageURI,
        address _dmsAddress
    ) ERC721("DearMonsterCharacter", "DMC") {
        setMonsterImageURI(_monsterImageURI);
        setBaseURI(_monsterImageURI);
        setCaveImageURI(_caveImageURI);
        DMS = IERC20(_dmsAddress);
    }

    // function reserveNFTs() public onlyOwner {
    //     uint256 totalMinted = _tokenIds.current();
    //     require(totalMinted.add(10) < MAX_SUPPLY, "Not enough NFTs");
    //     for (uint256 i = 0; i < 10; i++) {
    //         _mintSingleNFT();
    //     }
    // }

    // Setting Image URIs
    function setMonsterImageURI(string memory _monsterImageURI) public onlyOwner {
        monsterImageURI = _monsterImageURI;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function getMaxSupply() public view returns(uint256) {
        return maxSupply;
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function getPrice() public view returns(uint256) {
        return price;
    }    

    function checkMaxSupply() public view returns(bool) {
        return totalSupply() >= maxSupply;
    }

    function setCaveImageURI(string memory _caveImageURI) public onlyOwner {
        caveImageURI = _caveImageURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (isRevealed == false) {
            return caveImageURI;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseImageExtension
                    )
                )
                : "";
    }

    function getTokenIds() public view returns(uint256){
        return _tokenIds;
    }
    function mintDearMonster(string [] memory element, uint[] memory ratings, uint256 amount) public{
        // uint256 totalMinted = totalSupply();
        // require(totalMinted.add(1) <= MAX_SUPPLY, "Not enough NFTs!");
        require(
            DMS.balanceOf(msg.sender) >= amount,
            "You have not enough balance."
        );

        require(
            DMS.transferFrom(msg.sender, address(this), amount ) == true,
            "transfer DMS failed"
        );

        //DMS.transfer(address(this), amount);
        _mintSingleNFT(msg.sender, element, ratings);
    }

    function _mintSingleNFT(address to, string [] memory element, uint [] memory ratings) private {
       // require(totalSupply() < MAX_SUPPLY, "All NFTs are minted already");
        // uint256 newTokenID = totalSupply();
        // _tokenIds.add(1);
        for (uint i = 0 ; i < element.length; i++ ){
            uint256 newTokenID = totalSupply();
            elementPath.push(element[i]);
            attributes.push(Attribute({ owner: to, name: "", element: element[i],  level : 1, exp: 0, star: ratings[i], energy: 0 }));
            _safeMint(to, newTokenID);
        }
        // _safeMint(to, newTokenID);
    }
    function getElementPath() public view returns(string [] memory){
        return elementPath;        
    }

    function getAttributes() public view returns(Attribute [] memory){

        // Attribute[] memory let1;
        // uint length = 0;
        // returnAttributes = [];
        // for(uint i = 0; i < totalSupply(); i++){
        //     if(attributes[i].owner == msg.sender)
        //     {
        //         // let1[length] = attributes[i];
        //         returnAttributes.push(attributes[i]);
        //         // length.add(1);
        //     }
        // }
        // return returnAttributes;
        return attributes;
    }

    function getOwner() public view returns(address) {
        return owner();
    }

    

    // function mintDearMonster(uint256 _count) public {
    //     uint256 totalMinted = totalSupply();
    //     require(_count == 1, "You can not mint more than 1 NFT");
    //     require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs!");
    //     require(
    //         DMS.balanceOf(msg.sender) >= tokenPrice * _count,
    //         "You have not enough balance."
    //     );

    //     DMS.transferFrom(msg.sender, address(this), tokenPrice);
    //     _mintSingleNFT(msg.sender);
    // }

    function randomImageId(uint256 limit) public view returns (uint256) {
        return
            uint8(
                uint256(keccak256(abi.encodePacked(block.timestamp))) % (limit)
            );
    }

    // function getAttributes(uint256 _tokenId) external view returns (Attributes memory) {
    //     return attributes[_tokenId];
    // }

    function setEnergy(uint256 _tokenId, uint256 _energy) public {
        attributes[_tokenId].energy = _energy;
    }

    function toggleReveal() external onlyOwner {
        isRevealed = !isRevealed;
    }

    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
}