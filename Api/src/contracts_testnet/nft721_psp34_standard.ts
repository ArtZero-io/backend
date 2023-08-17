export const nft721_psp34_standard = {
	CONTRACT_ABI: {
	  "source": {
		"hash": "0x2f64f82f62a48b477c86b73a8d70ad0f632682acd9fc49bbac87edf91e9dbde9",
		"language": "ink! 4.0.1",
		"compiler": "rustc 1.70.0-nightly",
		"build_info": {
		  "build_mode": "Release",
		  "cargo_contract_version": "2.0.2",
		  "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
		  "wasm_opt_settings": {
			"keep_debug_symbols": false,
			"optimization_passes": "Z"
		  }
		}
	  },
	  "contract": {
		"name": "psp34_nft",
		"version": "1.0.0",
		"authors": [
		  "ArtZero <admin@artzero.io>"
		]
	  },
	  "spec": {
		"constructors": [
		  {
			"args": [
			  {
				"label": "contract_owner",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "name",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 10
				}
			  },
			  {
				"label": "symbol",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 10
				}
			  }
			],
			"docs": [],
			"label": "new",
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink_primitives",
				"ConstructorResult"
			  ],
			  "type": 11
			},
			"selector": "0x9bae9d5e"
		  }
		],
		"docs": [],
		"events": [
		  {
			"args": [
			  {
				"docs": [],
				"indexed": true,
				"label": "from",
				"type": {
				  "displayName": [
					"Option"
				  ],
				  "type": 34
				}
			  },
			  {
				"docs": [],
				"indexed": true,
				"label": "to",
				"type": {
				  "displayName": [
					"Option"
				  ],
				  "type": 34
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "id",
				"type": {
				  "displayName": [
					"Id"
				  ],
				  "type": 27
				}
			  }
			],
			"docs": [
			  " - Specify transfer event."
			],
			"label": "Transfer"
		  },
		  {
			"args": [
			  {
				"docs": [],
				"indexed": true,
				"label": "from",
				"type": {
				  "displayName": [
					"Option"
				  ],
				  "type": 34
				}
			  },
			  {
				"docs": [],
				"indexed": true,
				"label": "to",
				"type": {
				  "displayName": [
					"Option"
				  ],
				  "type": 34
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "id",
				"type": {
				  "displayName": [
					"Id"
				  ],
				  "type": 27
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "approved",
				"type": {
				  "displayName": [
					"bool"
				  ],
				  "type": 9
				}
			  }
			],
			"docs": [
			  " - Specify approval event."
			],
			"label": "Approval"
		  }
		],
		"lang_error": {
		  "displayName": [
			"ink",
			"LangError"
		  ],
		  "type": 12
		},
		"messages": [
		  {
			"args": [],
			"docs": [
			  " This function let NFT Contract Owner to mint a new NFT without providing NFT Traits/Attributes"
			],
			"label": "mint",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0xcfdd9aa2"
		  },
		  {
			"args": [
			  {
				"label": "metadata",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 20
				}
			  }
			],
			"docs": [
			  " This function let NFT Contract Owner to mint a new NFT with NFT Traits/Attributes"
			],
			"label": "mint_with_attributes",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0xf90b8f61"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the address of the current owner."
			],
			"label": "Ownable::owner",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 22
			},
			"selector": "0x4fa43c8c"
		  },
		  {
			"args": [],
			"docs": [
			  " Leaves the contract without owner. It will not be possible to call",
			  " owner's functions anymore. Can only be called by the current owner.",
			  "",
			  " NOTE: Renouncing ownership will leave the contract without an owner,",
			  " thereby removing any functionality that is only available to the owner.",
			  "",
			  " On success a `OwnershipTransferred` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Panics with `CallerIsNotOwner` error if caller is not owner"
			],
			"label": "Ownable::renounce_ownership",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 23
			},
			"selector": "0x5e228753"
		  },
		  {
			"args": [
			  {
				"label": "new_owner",
				"type": {
				  "displayName": [
					"ownable_external",
					"TransferOwnershipInput1"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Transfers ownership of the contract to a `new_owner`.",
			  " Can only be called by the current owner.",
			  "",
			  " On success a `OwnershipTransferred` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Panics with `CallerIsNotOwner` error if caller is not owner.",
			  "",
			  " Panics with `NewOwnerIsZero` error if new owner's address is zero."
			],
			"label": "Ownable::transfer_ownership",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 23
			},
			"selector": "0x11f43efd"
		  },
		  {
			"args": [
			  {
				"label": "owner",
				"type": {
				  "displayName": [
					"psp34_external",
					"BalanceOfInput1"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Returns the balance of the owner.",
			  "",
			  " This represents the amount of unique tokens the owner has."
			],
			"label": "PSP34::balance_of",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0xcde7e55f"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the collection `Id` of the NFT token.",
			  "",
			  " This can represents the relationship between tokens/contracts/pallets."
			],
			"label": "PSP34::collection_id",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 26
			},
			"selector": "0xffa27a5f"
		  },
		  {
			"args": [
			  {
				"label": "operator",
				"type": {
				  "displayName": [
					"psp34_external",
					"ApproveInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "id",
				"type": {
				  "displayName": [
					"psp34_external",
					"ApproveInput2"
				  ],
				  "type": 28
				}
			  },
			  {
				"label": "approved",
				"type": {
				  "displayName": [
					"psp34_external",
					"ApproveInput3"
				  ],
				  "type": 9
				}
			  }
			],
			"docs": [
			  " Approves `operator` to withdraw the `id` token from the caller's account.",
			  " If `id` is `None` approves or disapproves the operator for all tokens of the caller.",
			  "",
			  " On success a `Approval` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `SelfApprove` error if it is self approve.",
			  "",
			  " Returns `NotApproved` error if caller is not owner of `id`."
			],
			"label": "PSP34::approve",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 29
			},
			"selector": "0x1932a8b0"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns current NFT total supply."
			],
			"label": "PSP34::total_supply",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 31
			},
			"selector": "0x628413fe"
		  },
		  {
			"args": [
			  {
				"label": "to",
				"type": {
				  "displayName": [
					"psp34_external",
					"TransferInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "id",
				"type": {
				  "displayName": [
					"psp34_external",
					"TransferInput2"
				  ],
				  "type": 27
				}
			  },
			  {
				"label": "data",
				"type": {
				  "displayName": [
					"psp34_external",
					"TransferInput3"
				  ],
				  "type": 8
				}
			  }
			],
			"docs": [
			  " Transfer approved or owned token from caller.",
			  "",
			  " On success a `Transfer` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `TokenNotExists` error if `id` does not exist.",
			  "",
			  " Returns `NotApproved` error if `from` doesn't have allowance for transferring.",
			  "",
			  " Returns `SafeTransferCheckFailed` error if `to` doesn't accept transfer."
			],
			"label": "PSP34::transfer",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 29
			},
			"selector": "0x3128d61b"
		  },
		  {
			"args": [
			  {
				"label": "owner",
				"type": {
				  "displayName": [
					"psp34_external",
					"AllowanceInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "operator",
				"type": {
				  "displayName": [
					"psp34_external",
					"AllowanceInput2"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "id",
				"type": {
				  "displayName": [
					"psp34_external",
					"AllowanceInput3"
				  ],
				  "type": 28
				}
			  }
			],
			"docs": [
			  " Returns `true` if the operator is approved by the owner to withdraw `id` token.",
			  " If `id` is `None`, returns `true` if the operator is approved to withdraw all owner's tokens."
			],
			"label": "PSP34::allowance",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 32
			},
			"selector": "0x4790f55a"
		  },
		  {
			"args": [
			  {
				"label": "id",
				"type": {
				  "displayName": [
					"psp34_external",
					"OwnerOfInput1"
				  ],
				  "type": 27
				}
			  }
			],
			"docs": [
			  " Returns the owner of the token if any."
			],
			"label": "PSP34::owner_of",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 33
			},
			"selector": "0x1168624d"
		  },
		  {
			"args": [
			  {
				"label": "id",
				"type": {
				  "displayName": [
					"psp34metadata_external",
					"GetAttributeInput1"
				  ],
				  "type": 27
				}
			  },
			  {
				"label": "key",
				"type": {
				  "displayName": [
					"psp34metadata_external",
					"GetAttributeInput2"
				  ],
				  "type": 8
				}
			  }
			],
			"docs": [
			  " Returns the attribute of `id` for the given `key`.",
			  "",
			  " If `id` is a collection id of the token, it returns attributes for collection."
			],
			"label": "PSP34Metadata::get_attribute",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 35
			},
			"selector": "0xf19d48d1"
		  },
		  {
			"args": [
			  {
				"label": "owner",
				"type": {
				  "displayName": [
					"psp34enumerable_external",
					"OwnersTokenByIndexInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "index",
				"type": {
				  "displayName": [
					"psp34enumerable_external",
					"OwnersTokenByIndexInput2"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [
			  " Returns a token `Id` owned by `owner` at a given `index` of its token list.",
			  " Use along with `balance_of` to enumerate all of ``owner``'s tokens.",
			  "",
			  " The start index is zero."
			],
			"label": "PSP34Enumerable::owners_token_by_index",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 37
			},
			"selector": "0x3bcfb511"
		  },
		  {
			"args": [
			  {
				"label": "index",
				"type": {
				  "displayName": [
					"psp34enumerable_external",
					"TokenByIndexInput1"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [
			  " Returns a token `Id` at a given `index` of all the tokens stored by the contract.",
			  " Use along with `total_supply` to enumerate all tokens.",
			  "",
			  " The start index is zero."
			],
			"label": "PSP34Enumerable::token_by_index",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 37
			},
			"selector": "0xcd0340d0"
		  },
		  {
			"args": [],
			"docs": [
			  " This function return the latest token ID, everytime new NFT is mint, last_token_id is increased by 1 in mint function. Note: This is not the same as the total supply return by the psp34 function as NFT can be burnt."
			],
			"label": "Psp34Traits::get_last_token_id",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 39
			},
			"selector": "0x6f315836"
		  },
		  {
			"args": [
			  {
				"label": "uri",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"SetBaseUriInput1"
				  ],
				  "type": 10
				}
			  }
			],
			"docs": [
			  " This function sets the baseURI for the NFT contract. Only Contract Owner can perform this function. baseURI is the location of the metadata files if the NFT collection use external source to keep their NFT artwork. ArtZero uses IPFS by default, the baseURI can have format like this: ipfs://<hash_ID>/"
			],
			"label": "Psp34Traits::set_base_uri",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0x4de6850b"
		  },
		  {
			"args": [
			  {
				"label": "token_id",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"GetAttributesInput1"
				  ],
				  "type": 27
				}
			  },
			  {
				"label": "attributes",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"GetAttributesInput2"
				  ],
				  "type": 40
				}
			  }
			],
			"docs": [
			  " This function returns all available attributes of each NFT"
			],
			"label": "Psp34Traits::get_attributes",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 41
			},
			"selector": "0x18209102"
		  },
		  {
			"args": [
			  {
				"label": "token_id",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"LockInput1"
				  ],
				  "type": 27
				}
			  }
			],
			"docs": [
			  " This function lets NFT owner to lock their NFT. Once locked, the NFT traits (attributes) can not be changed"
			],
			"label": "Psp34Traits::lock",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0xa7245b9b"
		  },
		  {
			"args": [],
			"docs": [
			  " This function returns how many NFTs have been locked by its owners"
			],
			"label": "Psp34Traits::get_locked_token_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 39
			},
			"selector": "0x8fe2ce73"
		  },
		  {
			"args": [
			  {
				"label": "token_id",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"TokenUriInput1"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [
			  " This function return the metadata location of an NFT. The format is baseURI/<token_id>.json"
			],
			"label": "Psp34Traits::token_uri",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 42
			},
			"selector": "0x249dfd4f"
		  },
		  {
			"args": [
			  {
				"label": "token_id",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"IsLockedNftInput1"
				  ],
				  "type": 27
				}
			  }
			],
			"docs": [
			  " This function check if an NFT is locked or not"
			],
			"label": "Psp34Traits::is_locked_nft",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 32
			},
			"selector": "0x59271420"
		  },
		  {
			"args": [
			  {
				"label": "token_id",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"SetMultipleAttributesInput1"
				  ],
				  "type": 27
				}
			  },
			  {
				"label": "metadata",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"SetMultipleAttributesInput2"
				  ],
				  "type": 20
				}
			  }
			],
			"docs": [
			  " This function set the attributes to each NFT. Only Contract Owner can perform this function. The metadata input is an array of [(attribute, value)]. The attributes in ArtZero platform are the NFT traits."
			],
			"label": "Psp34Traits::set_multiple_attributes",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0x5bf8416b"
		  },
		  {
			"args": [],
			"docs": [
			  " This function return how many unique attributes in the contract"
			],
			"label": "Psp34Traits::get_attribute_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0x61c50d69"
		  },
		  {
			"args": [
			  {
				"label": "index",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"GetAttributeNameInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [
			  " This function return the attribute name using attribute index. Beacause attributes of an NFT can be set to anything by Contract Owner, AztZero uses this function to get all attributes of an NFT"
			],
			"label": "Psp34Traits::get_attribute_name",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 42
			},
			"selector": "0xfcfe34de"
		  },
		  {
			"args": [],
			"docs": [
			  " This function return the owner of the NFT Contract"
			],
			"label": "Psp34Traits::get_owner",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 22
			},
			"selector": "0x8e1d8d71"
		  },
		  {
			"args": [
			  {
				"label": "nft_contract_address",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferNftInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "token_id",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferNftInput2"
				  ],
				  "type": 27
				}
			  },
			  {
				"label": "receiver",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferNftInput3"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " This function allow contract owner withdraw NFT to an account in case there is any NFT sent to contract by mistake"
			],
			"label": "AdminTrait::tranfer_nft",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0xed1e1dfa"
		  },
		  {
			"args": [
			  {
				"label": "psp22_contract_address",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferPsp22Input1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "amount",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferPsp22Input2"
				  ],
				  "type": 7
				}
			  },
			  {
				"label": "receiver",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferPsp22Input3"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake"
			],
			"label": "AdminTrait::tranfer_psp22",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0xd9aad284"
		  },
		  {
			"args": [
			  {
				"label": "value",
				"type": {
				  "displayName": [
					"admintrait_external",
					"WithdrawFeeInput1"
				  ],
				  "type": 7
				}
			  },
			  {
				"label": "receiver",
				"type": {
				  "displayName": [
					"admintrait_external",
					"WithdrawFeeInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " This function allows contract owner to withdraw contract balance to his account."
			],
			"label": "AdminTrait::withdraw_fee",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0x07573e99"
		  },
		  {
			"args": [
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"psp34burnable_external",
					"BurnInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "id",
				"type": {
				  "displayName": [
					"psp34burnable_external",
					"BurnInput2"
				  ],
				  "type": 27
				}
			  }
			],
			"docs": [],
			"label": "PSP34Burnable::burn",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 29
			},
			"selector": "0x63c9877a"
		  }
		]
	  },
	  "storage": {
		"root": {
		  "layout": {
			"struct": {
			  "fields": [
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x1cc80634",
								  "ty": 0
								}
							  },
							  "root_key": "0x1cc80634"
							}
						  },
						  "name": "token_owner"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x7e3fae6b",
								  "ty": 3
								}
							  },
							  "root_key": "0x7e3fae6b"
							}
						  },
						  "name": "operator_approvals"
						},
						{
						  "layout": {
							"struct": {
							  "fields": [
								{
								  "layout": {
									"root": {
									  "layout": {
										"enum": {
										  "dispatchKey": "0xca32a240",
										  "name": "Id",
										  "variants": {
											"0": {
											  "fields": [
												{
												  "layout": {
													"leaf": {
													  "key": "0xca32a240",
													  "ty": 2
													}
												  },
												  "name": "0"
												}
											  ],
											  "name": "U8"
											},
											"1": {
											  "fields": [
												{
												  "layout": {
													"leaf": {
													  "key": "0xca32a240",
													  "ty": 4
													}
												  },
												  "name": "0"
												}
											  ],
											  "name": "U16"
											},
											"2": {
											  "fields": [
												{
												  "layout": {
													"leaf": {
													  "key": "0xca32a240",
													  "ty": 5
													}
												  },
												  "name": "0"
												}
											  ],
											  "name": "U32"
											},
											"3": {
											  "fields": [
												{
												  "layout": {
													"leaf": {
													  "key": "0xca32a240",
													  "ty": 6
													}
												  },
												  "name": "0"
												}
											  ],
											  "name": "U64"
											},
											"4": {
											  "fields": [
												{
												  "layout": {
													"leaf": {
													  "key": "0xca32a240",
													  "ty": 7
													}
												  },
												  "name": "0"
												}
											  ],
											  "name": "U128"
											},
											"5": {
											  "fields": [
												{
												  "layout": {
													"leaf": {
													  "key": "0xca32a240",
													  "ty": 8
													}
												  },
												  "name": "0"
												}
											  ],
											  "name": "Bytes"
											}
										  }
										}
									  },
									  "root_key": "0xca32a240"
									}
								  },
								  "name": "enumerable"
								},
								{
								  "layout": {
									"enum": {
									  "dispatchKey": "0x00000000",
									  "name": "Option",
									  "variants": {
										"0": {
										  "fields": [],
										  "name": "None"
										},
										"1": {
										  "fields": [
											{
											  "layout": {
												"leaf": {
												  "key": "0x00000000",
												  "ty": 3
												}
											  },
											  "name": "0"
											}
										  ],
										  "name": "Some"
										}
									  }
									}
								  },
								  "name": "_reserved"
								}
							  ],
							  "name": "Balances"
							}
						  },
						  "name": "balances"
						},
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "psp34"
				},
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x9b2d2382",
								  "ty": 8
								}
							  },
							  "root_key": "0x9b2d2382"
							}
						  },
						  "name": "attributes"
						},
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "metadata"
				},
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 0
							}
						  },
						  "name": "owner"
						},
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "ownable"
				},
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "last_token_id"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "attribute_count"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x90fe8c00",
								  "ty": 8
								}
							  },
							  "root_key": "0x90fe8c00"
							}
						  },
						  "name": "attribute_names"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x385e99c1",
								  "ty": 9
								}
							  },
							  "root_key": "0x385e99c1"
							}
						  },
						  "name": "is_attribute"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x89dbb226",
								  "ty": 9
								}
							  },
							  "root_key": "0x89dbb226"
							}
						  },
						  "name": "locked_tokens"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "locked_token_count"
						},
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Manager"
					}
				  },
				  "name": "manager"
				},
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "admin_data"
				}
			  ],
			  "name": "Psp34Nft"
			}
		  },
		  "root_key": "0x00000000"
		}
	  },
	  "types": [
		{
		  "id": 0,
		  "type": {
			"def": {
			  "composite": {
				"fields": [
				  {
					"type": 1,
					"typeName": "[u8; 32]"
				  }
				]
			  }
			},
			"path": [
			  "ink_primitives",
			  "types",
			  "AccountId"
			]
		  }
		},
		{
		  "id": 1,
		  "type": {
			"def": {
			  "array": {
				"len": 32,
				"type": 2
			  }
			}
		  }
		},
		{
		  "id": 2,
		  "type": {
			"def": {
			  "primitive": "u8"
			}
		  }
		},
		{
		  "id": 3,
		  "type": {
			"def": {
			  "tuple": []
			}
		  }
		},
		{
		  "id": 4,
		  "type": {
			"def": {
			  "primitive": "u16"
			}
		  }
		},
		{
		  "id": 5,
		  "type": {
			"def": {
			  "primitive": "u32"
			}
		  }
		},
		{
		  "id": 6,
		  "type": {
			"def": {
			  "primitive": "u64"
			}
		  }
		},
		{
		  "id": 7,
		  "type": {
			"def": {
			  "primitive": "u128"
			}
		  }
		},
		{
		  "id": 8,
		  "type": {
			"def": {
			  "sequence": {
				"type": 2
			  }
			}
		  }
		},
		{
		  "id": 9,
		  "type": {
			"def": {
			  "primitive": "bool"
			}
		  }
		},
		{
		  "id": 10,
		  "type": {
			"def": {
			  "primitive": "str"
			}
		  }
		},
		{
		  "id": 11,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 3
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 3
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 12,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 1,
					"name": "CouldNotReadInput"
				  }
				]
			  }
			},
			"path": [
			  "ink_primitives",
			  "LangError"
			]
		  }
		},
		{
		  "id": 13,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 14
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 14
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 14,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 3
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 3
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 15,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 10,
						"typeName": "String"
					  }
					],
					"index": 0,
					"name": "Custom"
				  },
				  {
					"index": 1,
					"name": "OnlyOwner"
				  },
				  {
					"index": 2,
					"name": "OnlyAdmin"
				  },
				  {
					"index": 3,
					"name": "InvalidCaller"
				  },
				  {
					"index": 4,
					"name": "InvalidFee"
				  },
				  {
					"index": 5,
					"name": "TokenOwnerNotMatch"
				  },
				  {
					"index": 6,
					"name": "NotApproved"
				  },
				  {
					"index": 7,
					"name": "CannotTransfer"
				  },
				  {
					"index": 8,
					"name": "CannotMint"
				  },
				  {
					"index": 9,
					"name": "NotPublicMint"
				  },
				  {
					"index": 10,
					"name": "NotEnoughBalance"
				  },
				  {
					"index": 11,
					"name": "MaxSupply"
				  },
				  {
					"index": 12,
					"name": "AlreadyInit"
				  },
				  {
					"index": 13,
					"name": "NotOwner"
				  },
				  {
					"index": 14,
					"name": "NotTokenOwner"
				  },
				  {
					"index": 15,
					"name": "ProjectNotExist"
				  },
				  {
					"index": 16,
					"name": "ProjectOwnerAndAdmin"
				  },
				  {
					"index": 17,
					"name": "InvalidStartTimeAndEndTime"
				  },
				  {
					"index": 18,
					"name": "InvalidPhaseCount"
				  },
				  {
					"index": 19,
					"name": "CollectionOwnerAndAdmin"
				  },
				  {
					"index": 20,
					"name": "CollectionNotActive"
				  },
				  {
					"index": 21,
					"name": "CollectionNotExist"
				  },
				  {
					"index": 22,
					"name": "InvalidInput"
				  },
				  {
					"index": 23,
					"name": "InvalidType"
				  },
				  {
					"index": 24,
					"name": "ClaimedAll"
				  },
				  {
					"index": 25,
					"name": "TokenLimitReached"
				  },
				  {
					"index": 26,
					"name": "UpdatePhase"
				  },
				  {
					"index": 27,
					"name": "PhaseNotExist"
				  },
				  {
					"index": 28,
					"name": "PhaseExpired"
				  },
				  {
					"index": 29,
					"name": "PhaseDeactivate"
				  },
				  {
					"index": 30,
					"name": "WhitelistNotExist"
				  },
				  {
					"index": 31,
					"name": "WithdrawFeeError"
				  },
				  {
					"index": 32,
					"name": "WithdrawNFTError"
				  },
				  {
					"index": 33,
					"name": "WithdrawPSP22Error"
				  },
				  {
					"index": 34,
					"name": "NotListed"
				  },
				  {
					"index": 35,
					"name": "BidAlreadyExist"
				  },
				  {
					"index": 36,
					"name": "BidNotExist"
				  },
				  {
					"index": 37,
					"name": "NotInMarket"
				  },
				  {
					"index": 38,
					"name": "NotForSale"
				  },
				  {
					"index": 39,
					"name": "NotInSaleList"
				  },
				  {
					"index": 40,
					"name": "InvalidBidLength"
				  },
				  {
					"index": 41,
					"name": "InvalidCollectionOwner"
				  },
				  {
					"index": 42,
					"name": "InvalidTime"
				  },
				  {
					"index": 43,
					"name": "RewardStarted"
				  },
				  {
					"index": 44,
					"name": "RewardNotStarted"
				  },
				  {
					"index": 45,
					"name": "RewardNotAdded"
				  },
				  {
					"index": 46,
					"name": "ClaimMustBeFalse"
				  },
				  {
					"index": 47,
					"name": "HoldAmountBidderNotExist"
				  },
				  {
					"fields": [
					  {
						"type": 16,
						"typeName": "OwnableError"
					  }
					],
					"index": 48,
					"name": "OwnableError"
				  },
				  {
					"fields": [
					  {
						"type": 17,
						"typeName": "AccessControlError"
					  }
					],
					"index": 49,
					"name": "AccessControlError"
				  },
				  {
					"fields": [
					  {
						"type": 18,
						"typeName": "PSP22Error"
					  }
					],
					"index": 50,
					"name": "PSP22Error"
				  },
				  {
					"fields": [
					  {
						"type": 19,
						"typeName": "PSP34Error"
					  }
					],
					"index": 51,
					"name": "PSP34Error"
				  },
				  {
					"index": 52,
					"name": "CheckedOperations"
				  }
				]
			  }
			},
			"path": [
			  "artzero_project",
			  "traits",
			  "error",
			  "Error"
			]
		  }
		},
		{
		  "id": 16,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 0,
					"name": "CallerIsNotOwner"
				  },
				  {
					"index": 1,
					"name": "NewOwnerIsZero"
				  }
				]
			  }
			},
			"path": [
			  "openbrush_contracts",
			  "traits",
			  "errors",
			  "ownable",
			  "OwnableError"
			]
		  }
		},
		{
		  "id": 17,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 0,
					"name": "InvalidCaller"
				  },
				  {
					"index": 1,
					"name": "MissingRole"
				  },
				  {
					"index": 2,
					"name": "RoleRedundant"
				  }
				]
			  }
			},
			"path": [
			  "openbrush_contracts",
			  "traits",
			  "errors",
			  "access_control",
			  "AccessControlError"
			]
		  }
		},
		{
		  "id": 18,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 8,
						"typeName": "String"
					  }
					],
					"index": 0,
					"name": "Custom"
				  },
				  {
					"index": 1,
					"name": "InsufficientBalance"
				  },
				  {
					"index": 2,
					"name": "InsufficientAllowance"
				  },
				  {
					"index": 3,
					"name": "ZeroRecipientAddress"
				  },
				  {
					"index": 4,
					"name": "ZeroSenderAddress"
				  },
				  {
					"fields": [
					  {
						"type": 8,
						"typeName": "String"
					  }
					],
					"index": 5,
					"name": "SafeTransferCheckFailed"
				  }
				]
			  }
			},
			"path": [
			  "openbrush_contracts",
			  "traits",
			  "errors",
			  "psp22",
			  "PSP22Error"
			]
		  }
		},
		{
		  "id": 19,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 8,
						"typeName": "String"
					  }
					],
					"index": 0,
					"name": "Custom"
				  },
				  {
					"index": 1,
					"name": "SelfApprove"
				  },
				  {
					"index": 2,
					"name": "NotApproved"
				  },
				  {
					"index": 3,
					"name": "TokenExists"
				  },
				  {
					"index": 4,
					"name": "TokenNotExists"
				  },
				  {
					"fields": [
					  {
						"type": 8,
						"typeName": "String"
					  }
					],
					"index": 5,
					"name": "SafeTransferCheckFailed"
				  }
				]
			  }
			},
			"path": [
			  "openbrush_contracts",
			  "traits",
			  "errors",
			  "psp34",
			  "PSP34Error"
			]
		  }
		},
		{
		  "id": 20,
		  "type": {
			"def": {
			  "sequence": {
				"type": 21
			  }
			}
		  }
		},
		{
		  "id": 21,
		  "type": {
			"def": {
			  "tuple": [
				10,
				10
			  ]
			}
		  }
		},
		{
		  "id": 22,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 0
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 0
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 23,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 24
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 24
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 24,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 3
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 16
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 3
			  },
			  {
				"name": "E",
				"type": 16
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 25,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 5
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 5
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 26,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 27
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 27
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 27,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 2,
						"typeName": "u8"
					  }
					],
					"index": 0,
					"name": "U8"
				  },
				  {
					"fields": [
					  {
						"type": 4,
						"typeName": "u16"
					  }
					],
					"index": 1,
					"name": "U16"
				  },
				  {
					"fields": [
					  {
						"type": 5,
						"typeName": "u32"
					  }
					],
					"index": 2,
					"name": "U32"
				  },
				  {
					"fields": [
					  {
						"type": 6,
						"typeName": "u64"
					  }
					],
					"index": 3,
					"name": "U64"
				  },
				  {
					"fields": [
					  {
						"type": 7,
						"typeName": "u128"
					  }
					],
					"index": 4,
					"name": "U128"
				  },
				  {
					"fields": [
					  {
						"type": 8,
						"typeName": "Vec<u8>"
					  }
					],
					"index": 5,
					"name": "Bytes"
				  }
				]
			  }
			},
			"path": [
			  "openbrush_contracts",
			  "traits",
			  "types",
			  "Id"
			]
		  }
		},
		{
		  "id": 28,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 0,
					"name": "None"
				  },
				  {
					"fields": [
					  {
						"type": 27
					  }
					],
					"index": 1,
					"name": "Some"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 27
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 29,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 30
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 30
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 30,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 3
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 19
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 3
			  },
			  {
				"name": "E",
				"type": 19
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 31,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 7
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 7
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 32,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 9
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 9
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 33,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 34
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 34
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 34,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 0,
					"name": "None"
				  },
				  {
					"fields": [
					  {
						"type": 0
					  }
					],
					"index": 1,
					"name": "Some"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 0
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 35,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 36
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 36
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 36,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 0,
					"name": "None"
				  },
				  {
					"fields": [
					  {
						"type": 8
					  }
					],
					"index": 1,
					"name": "Some"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 8
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 37,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 38
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 38
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 38,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 27
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 19
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 27
			  },
			  {
				"name": "E",
				"type": 19
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 39,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 6
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 6
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 40,
		  "type": {
			"def": {
			  "sequence": {
				"type": 10
			  }
			}
		  }
		},
		{
		  "id": 41,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 40
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 40
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 42,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 10
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
					  }
					],
					"index": 1,
					"name": "Err"
				  }
				]
			  }
			},
			"params": [
			  {
				"name": "T",
				"type": 10
			  },
			  {
				"name": "E",
				"type": 12
			  }
			],
			"path": [
			  "Result"
			]
		  }
		}
	  ],
	  "version": "4"
	}
};