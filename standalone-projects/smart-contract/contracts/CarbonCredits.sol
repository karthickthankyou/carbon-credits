// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract CarbonCredits is Initializable {
    address payable public owner;
    uint256 public constant COMMISSION_PERCENT = 1;

    function initialize() public initializer {
        owner = payable(msg.sender);
    }

    struct Project {
        string name;
        address owner;
        bool verified;
        uint256 totalCredits;
        uint256 price;
    }

    struct Inventory {
        uint256 quantity;
        bool forSale;
        uint256 price;
    }

    Project[] public projects;
    mapping(uint256 => address[]) public projectVerifiers;
    mapping(address => bool) public verifiers;
    mapping(address => mapping(uint256 => Inventory)) public inventories;

    event ProjectCreated(uint256 projectId, string name, address owner);
    event ProjectVerified(uint256 projectId, address verifier);
    event CreditsTransferred(
        uint256 projectId,
        address from,
        address to,
        uint256 quantity
    );
    event CreditsRetired(uint256 projectId, address retiree, uint256 quantity);
    event InventoryUpdated(
        uint256 projectId,
        address user,
        uint256 balance,
        bool forSale
    );

    function createProject(string memory _name, uint256 _price) public {
        uint256 projectId = projects.length;
        projects.push(Project(_name, msg.sender, false, 0, _price));

        emit ProjectCreated(projectId, _name, msg.sender);
    }

    function verifyProject(uint256 projectId) public {
        require(
            verifiers[msg.sender],
            'Only registered verifiers can verify projects'
        );
        require(
            !projects[projectId].verified,
            'The project is already verified'
        );

        projects[projectId].verified = true;
        projectVerifiers[projectId].push(msg.sender);

        emit ProjectVerified(projectId, msg.sender);
    }

    function buyCredits(
        uint256 projectId,
        address from,
        uint256 quantity
    ) public payable {
        Inventory storage sellerInventory = inventories[from][projectId];
        require(
            sellerInventory.quantity >= quantity,
            'Not enough credits for sale'
        );
        require(sellerInventory.forSale, 'Credits are not for sale');

        uint256 commission = calculateCommission(quantity);
        uint256 totalCost = commission + quantity;
        require(
            msg.value >= totalCost,
            'Not enough Ether sent to cover cost and commission'
        );

        // Transfer the commission to the owner and the cost to the seller
        payable(owner).transfer(commission);
        payable(from).transfer(totalCost - commission);

        sellerInventory.quantity -= quantity;
        inventories[msg.sender][projectId].quantity += quantity;

        emit CreditsTransferred(projectId, from, msg.sender, quantity);
        emit InventoryUpdated(
            projectId,
            from,
            sellerInventory.quantity,
            sellerInventory.forSale
        );
        emit InventoryUpdated(
            projectId,
            msg.sender,
            inventories[msg.sender][projectId].quantity,
            inventories[msg.sender][projectId].forSale
        );
    }

    function retireCredits(uint256 projectId, uint256 quantity) public payable {
        Inventory storage senderInventory = inventories[msg.sender][projectId];
        require(
            senderInventory.quantity >= quantity,
            'Not enough credits to retire'
        );

        uint256 commission = calculateCommission(quantity);
        require(
            msg.value >= commission,
            'Not enough Ether to cover commission'
        );
        owner.transfer(commission);

        senderInventory.quantity -= quantity;

        emit CreditsRetired(projectId, msg.sender, quantity);
        emit InventoryUpdated(
            projectId,
            msg.sender,
            senderInventory.quantity,
            senderInventory.forSale
        );
    }

    function calculateCommission(
        uint256 quantity
    ) private pure returns (uint256) {
        return (quantity * COMMISSION_PERCENT) / 100;
    }
}
