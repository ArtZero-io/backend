export const launchpad_psp34_nft_standard = {
	CONTRACT_ABI: {
	  "source": {
		"hash": "0xdfd3c64116b72cb3d3fa3120e37b59d49a9dc72eaf4b7913b7de389ddc5e12a7",
		"language": "ink! 4.0.1",
		"compiler": "rustc 1.70.0-nightly",
		"build_info": {
		  "build_mode": "Release",
		  "cargo_contract_version": "2.1.0",
		  "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
		  "wasm_opt_settings": {
			"keep_debug_symbols": false,
			"optimization_passes": "Z"
		  }
		}
	  },
	  "contract": {
		"name": "launchpad_psp34_nft_standard",
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
				"label": "launchpad_contract_address",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "limit_phase_count",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
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
				"label": "total_supply",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "project_info",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 10
				}
			  },
			  {
				"label": "code_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 11
				}
			  },
			  {
				"label": "is_public_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 12
				}
			  },
			  {
				"label": "public_minting_fee_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 13
				}
			  },
			  {
				"label": "public_minting_amount_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "public_max_minting_amount_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "start_time_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "end_time_phases",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 14
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
			  "type": 15
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
				"label": "value",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 7
				}
			  },
			  {
				"docs": [],
				"indexed": true,
				"label": "receiver",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Event emitted when withdrawing fee"
			],
			"label": "WithdrawFeeEvent"
		  },
		  {
			"args": [
			  {
				"docs": [],
				"indexed": false,
				"label": "mode",
				"type": {
				  "displayName": [
					"MintingMode"
				  ],
				  "type": 61
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "minter",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "mint_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "minting_fee",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 7
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "project_mint_fee",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [
			  " Event emitted when minting"
			],
			"label": "LaunchpadMintingEvent"
		  }
		],
		"lang_error": {
		  "displayName": [
			"ink",
			"LangError"
		  ],
		  "type": 16
		},
		"messages": [
		  {
			"args": [
			  {
				"label": "phase_code",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 10
				}
			  },
			  {
				"label": "is_public",
				"type": {
				  "displayName": [
					"bool"
				  ],
				  "type": 9
				}
			  },
			  {
				"label": "public_minting_fee",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 7
				}
			  },
			  {
				"label": "public_minting_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "public_max_minting_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "start_time",
				"type": {
				  "displayName": [
					"Timestamp"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "end_time",
				"type": {
				  "displayName": [
					"Timestamp"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [
			  "Add new phare"
			],
			"label": "add_new_phase",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0x72bcb3cf"
		  },
		  {
			"args": [
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "whitelist_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "whitelist_price",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [
			  " Update whitelist - Only Admin Role can change"
			],
			"label": "update_whitelist",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0xe32d5d92"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "accounts",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 24
				}
			  },
			  {
				"label": "whitelist_amounts",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "whitelist_prices",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 13
				}
			  }
			],
			"docs": [
			  " Add multi whitelists - Only Admin Role can change"
			],
			"label": "add_multi_whitelists",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0x40bc79f3"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "accounts",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 24
				}
			  }
			],
			"docs": [
			  " Add new whitelist - Only Admin Role can change"
			],
			"label": "clear_whitelist_phase",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0x149f3f30"
		  },
		  {
			"args": [
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "whitelist_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "whitelist_price",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [
			  " Add new whitelist - Only Admin Role can change"
			],
			"label": "add_whitelist",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0xcc9972d4"
		  },
		  {
			"args": [
			  {
				"label": "mint_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [
			  "Only Owner can mint new token"
			],
			"label": "mint",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0xcfdd9aa2"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "mint_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [],
			"label": "public_mint",
			"mutates": true,
			"payable": true,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0xf5331a91"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "mint_amount",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [
			  " Whitelisted User eates multiple"
			],
			"label": "whitelist_mint",
			"mutates": true,
			"payable": true,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0x2e50fe5f"
		  },
		  {
			"args": [],
			"docs": [
			  "Get Token Count"
			],
			"label": "get_last_token_id",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0x41e2a4d7"
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
			  "type": 26
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
			  "type": 26
			},
			"selector": "0x11f43efd"
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
			  "type": 28
			},
			"selector": "0x4fa43c8c"
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
				  "type": 29
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
			  "type": 31
			},
			"selector": "0x4790f55a"
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
			  "type": 32
			},
			"selector": "0xffa27a5f"
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
				  "type": 30
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
			  "type": 35
			},
			"selector": "0xcde7e55f"
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
				  "type": 29
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
			  "type": 36
			},
			"selector": "0x1932a8b0"
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
				  "type": 30
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
			  "type": 36
			},
			"selector": "0x3128d61b"
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
			  "type": 38
			},
			"selector": "0x628413fe"
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
				  "type": 30
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
			  "type": 39
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
			  "type": 41
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
			  "type": 41
			},
			"selector": "0xcd0340d0"
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
				  "type": 30
				}
			  },
			  {
				"label": "attributes",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"GetAttributesInput2"
				  ],
				  "type": 11
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
			  "type": 43
			},
			"selector": "0x18209102"
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
			  "type": 35
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
			  "type": 44
			},
			"selector": "0xfcfe34de"
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
			  "type": 25
			},
			"selector": "0x6f315836"
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
			  "type": 44
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
				  "type": 30
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
			  "type": 31
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
				  "type": 30
				}
			  },
			  {
				"label": "metadata",
				"type": {
				  "displayName": [
					"psp34traits_external",
					"SetMultipleAttributesInput2"
				  ],
				  "type": 45
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
			  "type": 17
			},
			"selector": "0x5bf8416b"
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
			  "type": 25
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
					"LockInput1"
				  ],
				  "type": 30
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
			  "type": 17
			},
			"selector": "0xa7245b9b"
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
			  "type": 28
			},
			"selector": "0x8e1d8d71"
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
			  "type": 17
			},
			"selector": "0x4de6850b"
		  },
		  {
			"args": [
			  {
				"label": "account_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetPhaseAccountPublicClaimedAmountInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetPhaseAccountPublicClaimedAmountInput2"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_phase_account_public_claimed_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 47
			},
			"selector": "0x72aba0b8"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"DeactivePhaseInput1"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::deactive_phase",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0x52cdb2a5"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_active_phase_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 49
			},
			"selector": "0x7ba813a1"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_owner_claimed_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0x35b3de88"
		  },
		  {
			"args": [
			  {
				"label": "project_info",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"EditProjectInformationInput1"
				  ],
				  "type": 10
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::edit_project_information",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 50
			},
			"selector": "0x9e743f06"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_current_phase",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 52
			},
			"selector": "0x5497a547"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetPhaseAccountLastIndexInput1"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_phase_account_last_index",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0xec17ad17"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetPhaseScheduleByIdInput1"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_phase_schedule_by_id",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 54
			},
			"selector": "0x420f90d6"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_total_supply",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0xee05257c"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_last_phase_id",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 49
			},
			"selector": "0x275c4b7d"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_public_minted_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0x1b456e7a"
		  },
		  {
			"args": [
			  {
				"label": "id_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput1"
				  ],
				  "type": 8
				}
			  },
			  {
				"label": "code_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput2"
				  ],
				  "type": 11
				}
			  },
			  {
				"label": "is_public_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput3"
				  ],
				  "type": 12
				}
			  },
			  {
				"label": "public_minting_fee_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput4"
				  ],
				  "type": 13
				}
			  },
			  {
				"label": "public_minting_amount_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput5"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "public_max_minting_amount_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput6"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "start_time_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput7"
				  ],
				  "type": 14
				}
			  },
			  {
				"label": "end_time_phases",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhasesInput8"
				  ],
				  "type": 14
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::update_schedule_phases",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0xe693f302"
		  },
		  {
			"args": [
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetWhitelistByAccountIdInput1"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetWhitelistByAccountIdInput2"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_whitelist_by_account_id",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 57
			},
			"selector": "0x41190a72"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_limit_phase_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 49
			},
			"selector": "0x2f91edb7"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput1"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "phase_code",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput2"
				  ],
				  "type": 10
				}
			  },
			  {
				"label": "is_public",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput3"
				  ],
				  "type": 9
				}
			  },
			  {
				"label": "public_minting_fee",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput4"
				  ],
				  "type": 7
				}
			  },
			  {
				"label": "public_minting_amount",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput5"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "public_max_minting_amount",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput6"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "start_time",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput7"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "end_time",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"UpdateSchedulePhaseInput8"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::update_schedule_phase",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 17
			},
			"selector": "0x4feeb03c"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_project_info",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 60
			},
			"selector": "0x9b077d27"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_whitelist_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 35
			},
			"selector": "0x8144fe44"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_available_token_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0x2daf169f"
		  },
		  {
			"args": [
			  {
				"label": "time",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"IsInSchedulePhaseInput1"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::is_in_schedule_phase",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 52
			},
			"selector": "0xb0d41a99"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_owner_available_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 25
			},
			"selector": "0xdecd4c1f"
		  },
		  {
			"args": [
			  {
				"label": "phase_id",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetPhaseAccountLinkInput1"
				  ],
				  "type": 2
				}
			  },
			  {
				"label": "account_index",
				"type": {
				  "displayName": [
					"psp34launchpadtraits_external",
					"GetPhaseAccountLinkInput2"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [],
			"label": "Psp34LaunchPadTraits::get_phase_account_link",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 33
			},
			"selector": "0x3147ee1a"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"GrantRoleInput1"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"GrantRoleInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Grants `role` to `account`.",
			  "",
			  " On success a `RoleGranted` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns with `MissingRole` error if caller can't grant the role.",
			  " Returns with `RoleRedundant` error `account` has `role`."
			],
			"label": "AccessControl::grant_role",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 50
			},
			"selector": "0x4ac062fd"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"RenounceRoleInput1"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"RenounceRoleInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Revokes `role` from the calling account.",
			  " Roles are often managed via `grant_role` and `revoke_role`: this function's",
			  " purpose is to provide a mechanism for accounts to lose their privileges",
			  " if they are compromised (such as when a trusted device is misplaced).",
			  "",
			  " On success a `RoleRevoked` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns with `InvalidCaller` error if caller is not `account`.",
			  " Returns with `MissingRole` error if `account` doesn't have `role`."
			],
			"label": "AccessControl::renounce_role",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 50
			},
			"selector": "0xeaf1248a"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"GetRoleAdminInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [
			  " Returns the admin role that controls `role`. See `grant_role` and `revoke_role`."
			],
			"label": "AccessControl::get_role_admin",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 35
			},
			"selector": "0x83da3bb2"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"RevokeRoleInput1"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"RevokeRoleInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Revokes `role` from `account`.",
			  "",
			  " On success a `RoleRevoked` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`."
			],
			"label": "AccessControl::revoke_role",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 50
			},
			"selector": "0x6e4f0991"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"HasRoleInput1"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "address",
				"type": {
				  "displayName": [
					"accesscontrol_external",
					"HasRoleInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Returns `true` if `account` has been granted `role`."
			],
			"label": "AccessControl::has_role",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 31
			},
			"selector": "0xc1d9ac18"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrolenumerable_external",
					"GetRoleMemberInput1"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "index",
				"type": {
				  "displayName": [
					"accesscontrolenumerable_external",
					"GetRoleMemberInput2"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [
			  " Returns one of the accounts that have `role`.",
			  "",
			  " Role bearers are not sorted in any particular way, and their",
			  " ordering may change at any point."
			],
			"label": "AccessControlEnumerable::get_role_member",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 33
			},
			"selector": "0x163469e0"
		  },
		  {
			"args": [
			  {
				"label": "role",
				"type": {
				  "displayName": [
					"accesscontrolenumerable_external",
					"GetRoleMemberCountInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [
			  " Returns the number of accounts that have `role`.",
			  " Can be used together with {get_role_member} to enumerate",
			  " all bearers of a role."
			],
			"label": "AccessControlEnumerable::get_role_member_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 35
			},
			"selector": "0xf1b1a9d7"
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
			  "type": 17
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
			  "type": 17
			},
			"selector": "0x07573e99"
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
				  "type": 30
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
			  "type": 17
			},
			"selector": "0xed1e1dfa"
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
				  "type": 30
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
			  "type": 36
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
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x6a2cd2b4",
								  "ty": 5
								}
							  },
							  "root_key": "0x6a2cd2b4"
							}
						  },
						  "name": "admin_roles"
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
										  "key": "0x6888e7ba",
										  "ty": 0
										}
									  },
									  "root_key": "0x6888e7ba"
									}
								  },
								  "name": "role_members"
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
							  "name": "Members"
							}
						  },
						  "name": "members"
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
				  "name": "access_control"
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
						  "name": "total_supply"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 2
							}
						  },
						  "name": "last_phase_id"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "whitelist_count"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x273a1053",
								  "ty": 6
								}
							  },
							  "root_key": "0x273a1053"
							}
						  },
						  "name": "phase_account_public_claimed_amount"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"struct": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x110e0c36",
										  "ty": 6
										}
									  },
									  "name": "whitelist_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x110e0c36",
										  "ty": 6
										}
									  },
									  "name": "claimed_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x110e0c36",
										  "ty": 7
										}
									  },
									  "name": "minting_fee"
									}
								  ],
								  "name": "Whitelist"
								}
							  },
							  "root_key": "0x110e0c36"
							}
						  },
						  "name": "phase_whitelists_link"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"struct": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 9
										}
									  },
									  "name": "is_active"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 8
										}
									  },
									  "name": "title"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 9
										}
									  },
									  "name": "is_public"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 7
										}
									  },
									  "name": "public_minting_fee"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "public_minting_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "public_max_minting_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "public_claimed_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "whitelist_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "claimed_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "total_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "start_time"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0x924ca706",
										  "ty": 6
										}
									  },
									  "name": "end_time"
									}
								  ],
								  "name": "Phase"
								}
							  },
							  "root_key": "0x924ca706"
							}
						  },
						  "name": "phases"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x211ebad6",
								  "ty": 0
								}
							  },
							  "root_key": "0x211ebad6"
							}
						  },
						  "name": "phase_account_link"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 2
							}
						  },
						  "name": "limit_phase_count"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 0
							}
						  },
						  "name": "launchpad_contract_address"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 8
							}
						  },
						  "name": "project_info"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "public_minted_count"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 2
							}
						  },
						  "name": "active_phase_count"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "available_token_amount"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "owner_claimed_amount"
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
				  "name": "manager_psp34_standard"
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
			  "name": "LaunchPadPsp34NftStandard"
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
			  "sequence": {
				"type": 10
			  }
			}
		  }
		},
		{
		  "id": 12,
		  "type": {
			"def": {
			  "sequence": {
				"type": 9
			  }
			}
		  }
		},
		{
		  "id": 13,
		  "type": {
			"def": {
			  "sequence": {
				"type": 7
			  }
			}
		  }
		},
		{
		  "id": 14,
		  "type": {
			"def": {
			  "sequence": {
				"type": 6
			  }
			}
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
		  "id": 16,
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
		  "id": 17,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 18
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
				"type": 18
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
		  "id": 18,
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
		  "id": 19,
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
						"type": 20,
						"typeName": "OwnableError"
					  }
					],
					"index": 48,
					"name": "OwnableError"
				  },
				  {
					"fields": [
					  {
						"type": 21,
						"typeName": "AccessControlError"
					  }
					],
					"index": 49,
					"name": "AccessControlError"
				  },
				  {
					"fields": [
					  {
						"type": 22,
						"typeName": "PSP22Error"
					  }
					],
					"index": 50,
					"name": "PSP22Error"
				  },
				  {
					"fields": [
					  {
						"type": 23,
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
		  "id": 20,
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
		  "id": 21,
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
		  "id": 22,
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
		  "id": 23,
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
		  "id": 24,
		  "type": {
			"def": {
			  "sequence": {
				"type": 0
			  }
			}
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
						"type": 6
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
				"type": 6
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
				"type": 27
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
		  "id": 27,
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
						"type": 20
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
				"type": 20
			  }
			],
			"path": [
			  "Result"
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
				"type": 0
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
		  "id": 29,
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
						"type": 30
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
				"type": 30
			  }
			],
			"path": [
			  "Option"
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
		  "id": 31,
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
				"type": 9
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
		  "id": 32,
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
				"type": 30
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
				"type": 34
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
						"type": 5
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
				"type": 5
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
		  "id": 36,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 37
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
				"type": 37
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
		  "id": 37,
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
						"type": 23
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
				"type": 23
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
						"type": 7
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
				"type": 7
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
		  "id": 39,
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
				"type": 40
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
		  "id": 40,
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
		  "id": 41,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 42
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
				"type": 42
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
		  "id": 42,
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
						"type": 23
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
				"type": 23
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 43,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 11
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
				"type": 11
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
		  "id": 44,
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
				"type": 10
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
		  "id": 45,
		  "type": {
			"def": {
			  "sequence": {
				"type": 46
			  }
			}
		  }
		},
		{
		  "id": 46,
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
		  "id": 47,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 48
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
				"type": 48
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
		  "id": 48,
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
						"type": 6
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
				"type": 6
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 49,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 2
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
				"type": 2
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
		  "id": 50,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 51
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
				"type": 51
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
		  "id": 51,
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
						"type": 21
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
				"type": 21
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 52,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 53
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
				"type": 53
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
		  "id": 53,
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
						"type": 2
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
				"type": 2
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 54,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 55
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
				"type": 55
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
		  "id": 55,
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
						"type": 56
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
				"type": 56
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 56,
		  "type": {
			"def": {
			  "composite": {
				"fields": [
				  {
					"name": "is_active",
					"type": 9,
					"typeName": "bool"
				  },
				  {
					"name": "title",
					"type": 8,
					"typeName": "Vec<u8>"
				  },
				  {
					"name": "is_public",
					"type": 9,
					"typeName": "bool"
				  },
				  {
					"name": "public_minting_fee",
					"type": 7,
					"typeName": "Balance"
				  },
				  {
					"name": "public_minting_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "public_max_minting_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "public_claimed_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "whitelist_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "claimed_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "total_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "start_time",
					"type": 6,
					"typeName": "Timestamp"
				  },
				  {
					"name": "end_time",
					"type": 6,
					"typeName": "Timestamp"
				  }
				]
			  }
			},
			"path": [
			  "artzero_project",
			  "impls",
			  "psp34_launchpad_standard",
			  "data",
			  "Phase"
			]
		  }
		},
		{
		  "id": 57,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 58
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
				"type": 58
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
		  "id": 58,
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
						"type": 59
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
				"type": 59
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 59,
		  "type": {
			"def": {
			  "composite": {
				"fields": [
				  {
					"name": "whitelist_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "claimed_amount",
					"type": 6,
					"typeName": "u64"
				  },
				  {
					"name": "minting_fee",
					"type": 7,
					"typeName": "Balance"
				  }
				]
			  }
			},
			"path": [
			  "artzero_project",
			  "impls",
			  "psp34_launchpad_standard",
			  "data",
			  "Whitelist"
			]
		  }
		},
		{
		  "id": 60,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 8
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
				"type": 8
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
		  "id": 61,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 0,
					"name": "Public"
				  },
				  {
					"index": 1,
					"name": "Whitelist"
				  }
				]
			  }
			},
			"path": [
			  "launchpad_psp34_nft_standard",
			  "launchpad_psp34_nft_standard",
			  "MintingMode"
			]
		  }
		}
	  ],
	  "version": "4"
  }
  };