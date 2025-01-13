window.addEventListener("load", async () => {
    if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Отримуємо адресу контракту через API
        const response = await fetch('/api/getContractAddress');
        const data = await response.json();
        const contractAddress = data.contractAddress;

        const contractABI = [
            {
                "inputs": [{"internalType": "string", "name": "_message", "type": "string"}],
                "name": "setMessage",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getMessage",
                "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();

        document.getElementById("setMessageButton").onclick = async () => {
            const message = document.getElementById("newMessage").value;
            try {
                await contract.methods.setMessage(message).send({ from: accounts[0] });
                alert("Повідомлення збережено!");
            } catch (err) {
                console.error(err);
                alert("Помилка при збереженні.");
            }
        };

        document.getElementById("getMessageButton").onclick = async () => {
            try {
                const message = await contract.methods.getMessage().call();
                document.getElementById("currentMessage").innerText = message;
            } catch (err) {
                console.error(err);
                alert("Помилка при отриманні повідомлення.");
            }
        };
    } else {
        alert("Будь ласка, установіть MetaMask!");
    }
});
