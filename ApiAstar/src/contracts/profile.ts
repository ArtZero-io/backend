export const profile = {
	CONTRACT_ADDRESS: "YtApvbHd8cYrvhnbZMg72J2Zxu9Pvc6TjVutWkGrrEg1pX9",
	CONTRACT_ABI: {
	  "source": {
		"hash": "0x63b75a4c4ada69ed4b8e94330ef0e8f579de0745ea17bcbc0952a6bdcbd063b0",
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
		"name": "profile_manager",
		"version": "1.0.0",
		"authors": [
		  "ArtZero <admin@artzero.io>"
		]
	  },
	  "spec": {
		"constructors": [
		  {
			"args": [],
			"docs": [],
			"label": "new",
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink_primitives",
				"ConstructorResult"
			  ],
			  "type": 5
			},
			"selector": "0x9bae9d5e"
		  }
		],
		"docs": [],
		"events": [],
		"lang_error": {
		  "displayName": [
			"ink",
			"LangError"
		  ],
		  "type": 6
		},
		"messages": [
		  {
			"args": [
			  {
				"label": "attributes",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 7
				}
			  },
			  {
				"label": "values",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [
			  " Set multiple profile attributes"
			],
			"label": "set_multiple_attributes",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0x8119d25e"
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
				"label": "attributes",
				"type": {
				  "displayName": [
					"Vec"
				  ],
				  "type": 7
				}
			  }
			],
			"docs": [],
			"label": "get_attributes",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 16
			},
			"selector": "0x8d76b3fe"
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
			  "type": 17
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
			  "type": 17
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
			  "type": 19
			},
			"selector": "0x4fa43c8c"
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
				  "type": 20
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
			  "type": 9
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
				  "type": 24
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
			  "type": 9
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
				  "type": 24
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
			  "type": 9
			},
			"selector": "0x07573e99"
		  },
		  {
			"args": [
			  {
				"label": "code_hash",
				"type": {
				  "displayName": [
					"upgradabletrait_external",
					"SetCodeInput1"
				  ],
				  "type": 1
				}
			  }
			],
			"docs": [
			  " This function allow contract owner modifies the code which is used to execute calls to this contract address (`AccountId`)."
			],
			"label": "UpgradableTrait::set_code",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xa9e46760"
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
				  "name": "upgradable_data"
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
								  "key": "0x259aa0d2",
								  "ty": 4
								}
							  },
							  "root_key": "0x259aa0d2"
							}
						  },
						  "name": "attributes"
						}
					  ],
					  "name": "Manager"
					}
				  },
				  "name": "manager"
				}
			  ],
			  "name": "ProfileManager"
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
			  "sequence": {
				"type": 2
			  }
			}
		  }
		},
		{
		  "id": 5,
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
						"type": 6
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
				"type": 6
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 6,
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
		  "id": 7,
		  "type": {
			"def": {
			  "sequence": {
				"type": 8
			  }
			}
		  }
		},
		{
		  "id": 8,
		  "type": {
			"def": {
			  "primitive": "str"
			}
		  }
		},
		{
		  "id": 9,
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
						"type": 6
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
				"type": 6
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 10,
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
						"type": 11
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
				"type": 11
			  }
			],
			"path": [
			  "Result"
			]
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
						"type": 8,
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
						"type": 12,
						"typeName": "OwnableError"
					  }
					],
					"index": 48,
					"name": "OwnableError"
				  },
				  {
					"fields": [
					  {
						"type": 13,
						"typeName": "AccessControlError"
					  }
					],
					"index": 49,
					"name": "AccessControlError"
				  },
				  {
					"fields": [
					  {
						"type": 14,
						"typeName": "PSP22Error"
					  }
					],
					"index": 50,
					"name": "PSP22Error"
				  },
				  {
					"fields": [
					  {
						"type": 15,
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
		  "id": 12,
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
		  "id": 13,
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
		  "id": 14,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 4,
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
						"type": 4,
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
		  "id": 15,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 4,
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
						"type": 4,
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
		  "id": 16,
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
						"type": 6
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
				"type": 6
			  }
			],
			"path": [
			  "Result"
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
						"type": 6
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
				"type": 6
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
		  "id": 19,
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
						"type": 6
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
				"type": 6
			  }
			],
			"path": [
			  "Result"
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
						"type": 21,
						"typeName": "u16"
					  }
					],
					"index": 1,
					"name": "U16"
				  },
				  {
					"fields": [
					  {
						"type": 22,
						"typeName": "u32"
					  }
					],
					"index": 2,
					"name": "U32"
				  },
				  {
					"fields": [
					  {
						"type": 23,
						"typeName": "u64"
					  }
					],
					"index": 3,
					"name": "U64"
				  },
				  {
					"fields": [
					  {
						"type": 24,
						"typeName": "u128"
					  }
					],
					"index": 4,
					"name": "U128"
				  },
				  {
					"fields": [
					  {
						"type": 4,
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
		  "id": 21,
		  "type": {
			"def": {
			  "primitive": "u16"
			}
		  }
		},
		{
		  "id": 22,
		  "type": {
			"def": {
			  "primitive": "u32"
			}
		  }
		},
		{
		  "id": 23,
		  "type": {
			"def": {
			  "primitive": "u64"
			}
		  }
		},
		{
		  "id": 24,
		  "type": {
			"def": {
			  "primitive": "u128"
			}
		  }
		}
	  ],
	  "version": "4"
	}
  };