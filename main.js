window.userWalletAddress = null
const signButton = document.getElementById('signButton')
const user = document.getElementById('user')

function toggleButton() {
    if (!window.ethereum) {
        signButton.innerText = 'MetaMask is not Installed'
        signButton.classList.remove('bg-indigo-900', 'text-white')
        signButton.classList.add('bg-red-500', 'text-red-100', 'cursor-not-allowed')
        return false;
    }
    signButton.addEventListener('click', () => { signIn() });
}

async function signIn() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
            console.error(e.message);
        });
    if (!accounts) { return }
    window.userWalletAddress = accounts[0];
    user.innerText = window.userWalletAddress

    signButton.removeEventListener('click', signIn)

    signButton.addEventListener('click', () => { signOut() })

}

function signOut() {

    window.userWalletAddress = null
    user.innerText = ''
    signButton.innerText = 'Login With MetaMask'

    signButton.removeEventListener('click', signOut)

    signButton.addEventListener('click', () => { signIn() })

}

window.addEventListener('DOMContentLoaded', () => {
    toggleButton();
});