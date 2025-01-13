// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    string private data;

    function setMessage(string memory _message) public {
        data = _message;
    }

    function getMessage() public view returns (string memory) {
        return data;
    }
}
