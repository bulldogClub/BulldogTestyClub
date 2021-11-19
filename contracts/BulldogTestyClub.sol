// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IIERC20 {
    function balanceOf(address account) external view returns (uint256);
    function burn(address account, uint256 amount) external;
}

/** 
 * @title BulldogTestyClub contract
 * @dev Extends ERC721 Non-Fungible Token Standard basic implementation
 */
contract BulldogTestyClub is ERC721, Ownable {
    
    bool public saleIsActive = false;
    address public btcs1;
    uint256 public maxDogs;
    uint public constant maxDogsPurchase = 20;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256  _maxDogs
    ) ERC721(_name, _symbol) public {
        maxDogs = _maxDogs;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner{
        _setBaseURI(_baseURI);
    }

    /**
     * @notice Pause sale if active, make active if paused
     */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function setBtcs1(address _btcs1) public onlyOwner {
        btcs1 = _btcs1;
    }

    /**
     * @notice burn amount btcs1 to mint amount BTC NFT
     * @param _amount current want mint NFT number, should <= maxDogsPurchase
     */
    function mint(uint8 _amount) public{   
        require(saleIsActive, "Sale must be active to mint Dog");
        require(_amount <= maxDogsPurchase, "Can only mint 20 tokens at a time");
        require(totalSupply().add(_amount) <= maxDogs, "Purchase would exceed max supply of dogs");
        require(IIERC20(btcs1).balanceOf(msg.sender) >= _amount, "Btcs1 balance is not enough");
        
        IIERC20(btcs1).burn(msg.sender,_amount);

        for(uint i = 0; i < _amount; i++) {
            uint mintIndex = totalSupply();
            if (totalSupply() < maxDogs) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

}