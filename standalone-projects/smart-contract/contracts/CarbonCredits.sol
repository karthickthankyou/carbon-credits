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
        address owner;
        string name;
        string about;
        string[] images;
        int256 lat;
        int256 lng;
    }

    struct Inventory {
        uint256 price;
        uint256 credits;
        bool forSale;
    }

    struct Verifier {
        string name;
        string imageUrl;
        address walletAddress;
        bool active;
    }

    Project[] public projects;
    mapping(uint256 => address[]) public projectVerifiers;
    mapping(address => Verifier) public verifiers;
    mapping(address => mapping(uint256 => Inventory)) public inventories;

    event ProjectCreated(
        address owner,
        uint256 projectId,
        string name,
        string about,
        string[] images,
        int256 lat,
        int256 lng
    );
    event VerifierAdded(
        string name,
        string imageUrl,
        address walletAddress,
        bool active
    );

    event ProjectVerified(uint256 projectId, address verifier);
    event CreditsAdded(
        uint256 projectId,
        address owner,
        uint256 quantity,
        uint256 price
    );
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
        uint256 price,
        uint256 balance,
        bool forSale
    );

    function createProject(
        string memory _name,
        string memory _about,
        string[] memory _images,
        int256 _lat,
        int256 _lng
    ) public {
        uint256 projectId = projects.length;
        projects.push(Project(msg.sender, _name, _about, _images, _lat, _lng));

        emit ProjectCreated(
            msg.sender,
            projectId,
            _name,
            _about,
            _images,
            _lat,
            _lng
        );
    }

    function addVerifier(
        address walletAddress,
        string memory name,
        string memory imageUrl
    ) public {
        require(
            msg.sender == owner,
            'Only the contract owner can add verifiers'
        );
        require(
            !verifiers[walletAddress].active,
            'The address is already a verifier'
        );

        verifiers[walletAddress] = Verifier(
            name,
            imageUrl,
            walletAddress,
            true
        );

        emit VerifierAdded(name, imageUrl, walletAddress, true);
    }

    function verifyProject(uint256 projectId) public {
        require(
            verifiers[msg.sender].active,
            'Only registered verifiers can verify projects'
        );
        address[] storage verifiersForProject = projectVerifiers[projectId];
        for (uint i = 0; i < verifiersForProject.length; i++) {
            require(
                verifiersForProject[i] != msg.sender,
                'This verifier has already verified this project'
            );
        }

        projectVerifiers[projectId].push(msg.sender);

        emit ProjectVerified(projectId, msg.sender);
    }

    function addCredits(
        uint256 projectId,
        uint256 quantity,
        uint256 price,
        bool forSale
    ) public {
        require(
            msg.sender == projects[projectId].owner,
            'Only the project owner can add credits'
        );
        require(
            projectVerifiers[projectId].length > 0,
            'The project must be verified'
        );

        Inventory storage senderInventory = inventories[msg.sender][projectId];
        senderInventory.credits += quantity;
        senderInventory.price = price;
        senderInventory.forSale = forSale;

        emit CreditsAdded(
            projectId,
            msg.sender,
            quantity,
            senderInventory.price
        );
        emit InventoryUpdated(
            projectId,
            msg.sender,
            senderInventory.price,
            senderInventory.credits,
            senderInventory.forSale
        );
    }

    function buyCredits(
        uint256 projectId,
        address from,
        uint256 quantity,
        bool forSale
    ) public payable {
        Inventory storage sellerInventory = inventories[from][projectId];
        require(
            sellerInventory.credits >= quantity,
            'Not enough credits for sale'
        );
        require(sellerInventory.forSale, 'Credits are not for sale');

        uint256 totalCost = sellerInventory.price * quantity;
        // uint256 commission = calculateCommission(totalCost);
        require(
            msg.value >= totalCost,
            'Not enough Ether sent to cover cost and commission'
        );

        // Transfer the commission to the owner and the cost to the seller
        // payable(owner).transfer(commission);
        payable(from).transfer(totalCost);

        sellerInventory.credits -= quantity;
        inventories[msg.sender][projectId].credits += quantity;
        inventories[msg.sender][projectId].forSale = forSale;

        emit CreditsTransferred(projectId, from, msg.sender, quantity);
        emit InventoryUpdated(
            projectId,
            from,
            sellerInventory.price,
            sellerInventory.credits,
            sellerInventory.forSale
        );
        emit InventoryUpdated(
            projectId,
            msg.sender,
            inventories[msg.sender][projectId].price,
            inventories[msg.sender][projectId].credits,
            inventories[msg.sender][projectId].forSale
        );
    }

    function retireCredits(uint256 projectId, uint256 quantity) public payable {
        Inventory storage senderInventory = inventories[msg.sender][projectId];
        require(
            senderInventory.credits >= quantity,
            'Not enough credits to retire'
        );

        uint256 commission = calculateCommission(
            quantity * senderInventory.price
        );
        require(
            msg.value >= commission,
            'Not enough Ether to cover commission'
        );
        owner.transfer(commission);

        senderInventory.credits -= quantity;

        emit CreditsRetired(projectId, msg.sender, quantity);
        emit InventoryUpdated(
            projectId,
            msg.sender,
            senderInventory.price,
            senderInventory.credits,
            senderInventory.forSale
        );
    }

    function calculateCommission(
        uint256 totalCost
    ) private pure returns (uint256) {
        return (totalCost * COMMISSION_PERCENT) / 100;
    }
}
