pragma solidity ^0.4.24;

import "./EmailRegex.sol";
import "./StringUtils.sol";

contract Accounts {
    
  address private owner;
  mapping (address => account) private accounts;
  address[] private verifiers;
  
  enum AccountType {Verifier, Requester}
    
  event Registered (address user);
  
  modifier isEmailValid(string _email) 
  {
    require(EmailRegex.matches(_email));
    _;
  }
  modifier addVerifier(AccountType _aType)
  {
      _;
      if(_aType == AccountType.Verifier){
        bool found = false;
        for (uint i=0; i<verifiers.length; i++) {
          if (msg.sender == verifiers[i]) {
              found = true;
              break; 
          }
        }
        if(!found){
            verifiers.push(msg.sender);   
        }
    }
  }
  struct account 
  {
    string name;
    string email;
    string logo;
    string description;
    AccountType aType;
    uint verificationPrice;
  }

  constructor() 
  public 
  {
    owner = msg.sender;
  }
  
  function register(string _name, string _email, string _logo, string _description, AccountType _aType, uint price) 
  public 
  payable
  isEmailValid(_email)
  addVerifier(_aType)
  {
    emit Registered(msg.sender);
    accounts[msg.sender] = account({
      name: _name, 
      email: _email, 
      logo: _logo, 
      description: _description,
      aType: _aType,
      verificationPrice: price
    });
  }
  
  function getAccount() 
  public 
  view 
  returns (string name, string email, string logo, string description, AccountType aType, uint price) 
  {
    name = accounts[msg.sender].name;
    email = accounts[msg.sender].email;
    logo = accounts[msg.sender].logo;
    description = accounts[msg.sender].description;
    aType = accounts[msg.sender].aType;
    price = accounts[msg.sender].verificationPrice;
    return (name, email, logo, description, aType, price);
  }
  
  function verifiersCount() 
  public 
  view 
  returns (uint total) {
      return verifiers.length;
  }
  
  function getVerifier(uint pIndex)
  public 
  view
  returns (address verifier, string name, string email, string logo, string description, AccountType aType, uint price) 
  {
    address verifierAddr = verifiers[pIndex];
    name = accounts[verifierAddr].name;
    email = accounts[verifierAddr].email;
    logo = accounts[verifierAddr].logo;
    description = accounts[verifierAddr].description;
    aType = accounts[verifierAddr].aType;
    price = accounts[verifierAddr].verificationPrice;
    return (verifierAddr, name, email, logo, description, aType, price);
  }

  function getPrice(address _account)
  public 
  view
  returns(uint price){
    return (accounts[_account].verificationPrice);
  }
  
}