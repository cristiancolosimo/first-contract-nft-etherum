// SPDX-License-Identifier: attaccatevi il cazzo
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyGeass is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    mapping(string => uint8) exitingURIs;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyGeass", "CODE") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function toPayToMint(address recipient,string memory metadataURI) public payable returns (uint256){
        require(exitingURIs[metadataURI] !=1, 'already minted');
        require(msg.value >= 0.5 ether, "More money bitchies");

        uint256 newItemID = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        exitingURIs[metadataURI] = 1;
        _mint(recipient,newItemID);
        _setTokenURI(newItemID,metadataURI);
        
        return newItemID;

    }

    function isContentOwned(string memory uri) public view returns (bool){
        return exitingURIs[uri] == 1;
    }

    function couter() public view returns (uint256){
        return _tokenIdCounter.current();
    }
}