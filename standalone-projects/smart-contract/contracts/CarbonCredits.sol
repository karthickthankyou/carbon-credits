// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract CarbonCredits is Initializable {
    address public owner;
    uint256 creditIdCounter;

    function initialize() public initializer {
        owner = msg.sender;
        creditIdCounter = 1;
    }

    struct Project {
        string name;
        address[] verifiers;
    }

    struct Credit {
        uint256 projectId;
        address currentOwner;
        bool retired;
    }

    struct Inventory {
        uint256 quantity;
        uint256 price;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Credit) public credits;
    mapping(address => bool) public verifiers;
    mapping(address => mapping(uint256 => Inventory)) public inventories;

    function createProject(
        string memory name
    ) public returns (uint256 projectId) {
        projectId = uint256(keccak256(abi.encodePacked(name, block.timestamp)));
        projects[projectId] = Project({
            name: name,
            verifiers: new address[](0)
        });
        return projectId;
    }

    function registerVerifier(address verifier) public {
        require(msg.sender == owner, 'Only the owner can register a verifier.');
        verifiers[verifier] = true;
    }

    function verifyProject(uint256 projectId) public {
        require(
            verifiers[msg.sender],
            'Only registered verifiers can verify projects'
        );

        projects[projectId].verifiers.push(msg.sender);
    }

    function withdrawVerification(uint256 projectId) public {
        require(
            verifiers[msg.sender],
            'Only registered verifiers can withdraw verification'
        );

        // Find the verifier's index
        uint256 index = projects[projectId].verifiers.length; // If verifier is not found, this will cause the function to revert
        for (uint256 i = 0; i < projects[projectId].verifiers.length; i++) {
            if (projects[projectId].verifiers[i] == msg.sender) {
                index = i;
                break;
            }
        }

        // Remove the verifier from the array by moving the last element to this index and decreasing the array length
        projects[projectId].verifiers[index] = projects[projectId].verifiers[
            projects[projectId].verifiers.length - 1
        ];
        projects[projectId].verifiers.pop();
    }

    function setPrice(uint256 projectId, uint256 price) public {
        Inventory storage inventory = inventories[msg.sender][projectId];
        require(
            inventory.quantity > 0,
            'Seller does not have any credits for this project'
        );

        inventory.price = price;
    }

    function buyCredits(
        uint256 projectId,
        address seller,
        uint256 quantity
    ) public payable {
        require(
            projects[projectId].verifiers.length > 0,
            'Project must be verified by at least one verifier'
        );

        Inventory storage inventory = inventories[seller][projectId];

        require(
            inventory.quantity >= quantity,
            'Seller does not have enough credits for this project'
        );
        require(
            msg.value >= inventory.price * quantity,
            'Not enough Ether sent to buy the credits'
        );

        payable(seller).transfer(inventory.price * quantity);
        inventory.quantity -= quantity;

        // Transfer the credits to the buyer
        for (uint256 i = 0; i < quantity; i++) {
            credits[creditIdCounter++] = Credit({
                projectId: projectId,
                currentOwner: msg.sender,
                retired: false
            });
        }
    }

    function retireCredit(uint256 creditId) public {
        Credit storage credit = credits[creditId];
        require(
            credit.currentOwner == msg.sender,
            'Only the credit owner can retire the credit'
        );
        require(!credit.retired, 'The credit is already retired');

        credit.retired = true;
    }
}
