// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/** 
 * @title  BulldogTestyClubSeason1 contract, the only certificate that can be used to mint BulldogTestyClub
 * @dev Extends ERC20 Standard basic implementation
 */
contract BulldogTestyClubSeason1 is ERC20 , Ownable{
    
    address public bulldogTestyClub;
    mapping(address => uint8) private whitelistMemberUsed;
    event AddWhitelisted(address indexed member);
    
    struct TimeRange {
        uint startTime;
        uint endTime;
    }
    TimeRange public timeRange;

    constructor(
        string memory _name,
        string memory _symbol,
        address _bulldogTestyClub
    ) ERC20(_name,_symbol) public {
        bulldogTestyClub = _bulldogTestyClub;
        _setupDecimals(0);
    }

    /**
     * @notice add some members address 
     * @param  _members whitelisted address of member
     */
    function addWhitelistMember(address[] memory _members) external onlyOwner {
        for(uint16 i = 0; i < _members.length; i++){
            if(whitelistMemberUsed[_members[i]] == 0){
                whitelistMemberUsed[_members[i]] = 1;
            }            
        }
    }

    function getWhitelistMemberUsed(address _member) external view returns (uint8) {
        return whitelistMemberUsed[_member];
    }
    
    /**
     * @notice burn amount btcs1, only bulldogTestyClub can execute
     * @param account btcs1's owner 
     * @param amount btcs1 amount  
     */
    function burn(address account, uint256 amount) external {
        require(msg.sender == bulldogTestyClub);
        _burn(account,amount);
    }

    /**
     * @notice Within the set time range, member users can mint a token
     */
    function mint() external {
        require(now >= timeRange.startTime && now <= timeRange.endTime,"now is not in allow time range");
        require(whitelistMemberUsed[msg.sender] == 1,"member is illegal");
        _mint(msg.sender, 1); 
        whitelistMemberUsed[msg.sender] = whitelistMemberUsed[msg.sender]+1; 
    }

    function setTimeRange(TimeRange memory _timeRange) external onlyOwner {
        timeRange.startTime = _timeRange.startTime;
        timeRange.endTime = _timeRange.endTime;
    }

    function nowTime() external view returns(uint) {
        return now;
    }
    
}