import Web3 from "web3";
import HMSabi from './abi/abi.json'

const web3 = new Web3('http://127.0.0.1:8545');
const conAdd = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const contract = new web3.eth.Contract(HMSabi,conAdd);
let account;

export const connectWallet = async() => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
            account = accounts[0];
            console.log(`account is ${account}`);
            return nav('/login')
        } catch (error) {
            return false
        }
    }else{
        alert("Please install MetaMask");
    }
    return false
}

export async function check(){
    const acc = await web3.eth.getAccounts()
    console.log(acc)
}

export async function getInPatientCount(){
    try{
        const count = await contract.methods.ipc().call(); 
        return count
    }catch(e){
        console.log(e);
    }
}

export async function regIp(pid,form){
    try{
        console.log(typeof(pid),form)
        await contract.methods.RegisterIp1(pid,form.fullname,Number(form.age),form.gender,form.address,Number(form.phone),form.email,form.doctorid,form.doctornote,form.wardtype,form.wardno).send({from:account});
        const res = await contract.methods.RegisterIp2(pid,Number(form.noofaddmitteddays),form.admittedDate,form.dischargeDate,form.labname,form.testres,form.prescribtion).send({from:account});
        alert(res.events.message.returnValues.message)
    }catch(e){
        console.log(e)
    }
}

export async function getIp(pid){
    try{
        const p = await contract.methods.ViewIp(pid).call();
        return p;
    }catch(e){
        console.log(e)
    }
}

export async function getOutPatientCount(){
    try{
        const count = await contract.methods.opc().call(); 
        return count
    }catch(e){
        console.log(e);
    }
}

export async function regOp(pid,form){
    try{
        console.log(typeof(pid),form)
        const res = await contract.methods.RegisterOp(pid,form.fullname,Number(form.age),form.gender,form.address,Number(form.phone),form.email,Number(form.doctorid),form.doctornote,form.prescribtion).send({from:account});
        alert(res.events.message.returnValues.message)
    }catch(e){
        console.log(e)
    }
}

export async function getOp(pid){
    try{
        const p = await contract.methods.ViewOp(pid).call();
        return p;
    }catch(e){
        console.log(e)
    }
}

export async function getDoctorCount(){
    try{
        const count = await contract.methods.docount().call(); 
        return count
    }catch(e){
        console.log(e);
    }
}

export async function regDoc(docid,form){
    try{
        console.log(typeof(docid),form)
        const res = await contract.methods.RegisterDoc(docid,form.fullname,Number(form.age),form.gender,form.address,Number(form.phone),form.email,form.qualification,form.speciality).send({from:account});
        alert(res.events.message.returnValues.message)
    }catch(e){
        console.log(e)
    }
}

export async function viewDoc(docid){
    try{
        const p = await contract.methods.ViewDoc(docid).call();
        return p;
    }catch(e){
        console.log(e)
    }
}