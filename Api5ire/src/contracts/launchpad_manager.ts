import dotenv from "dotenv";

dotenv.config();
export const launchpad_manager = (process.env.IS_TESTNET == "true") ? {
    CONTRACT_ADDRESS: "5FT4bHq9rqS7CcRPTnBmsdpwSWZ2WMrDhhPhG3TLrtNktHvy",
    CONTRACT_ABI: {
  "source": {
    "hash": "0xe9e8ab9c3f32989ebf17474186207c796616e7971fe2c11481aab50c19acbdc9",
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
    "name": "artzero_launchpad_psp34",
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
            "label": "max_phases_per_project",
            "type": {
              "displayName": [
                "u8"
              ],
              "type": 2
            }
          },
          {
            "label": "admin_address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "label": "standard_nft_hash",
            "type": {
              "displayName": [
                "Hash"
              ],
              "type": 5
            }
          },
          {
            "label": "project_adding_fee",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 9
            }
          },
          {
            "label": "project_mint_fee_rate",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 4
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
          "type": 10
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
            "indexed": false,
            "label": "project_id",
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
            "label": "nft_contract_address",
            "type": {
              "displayName": [
                "Option"
              ],
              "type": 33
            }
          }
        ],
        "docs": [],
        "label": "AddNewProjectEvent"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 11
    },
    "messages": [
      {
        "args": [
          {
            "label": "max_phases_per_project",
            "type": {
              "displayName": [
                "u8"
              ],
              "type": 2
            }
          },
          {
            "label": "standard_nft_hash",
            "type": {
              "displayName": [
                "Hash"
              ],
              "type": 5
            }
          },
          {
            "label": "project_adding_fee",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 9
            }
          },
          {
            "label": "project_mint_fee_rate",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 4
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
            "label": "admin_address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "initialize",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xf2f6dba3"
      },
      {
        "args": [
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
          },
          {
            "label": "project_info",
            "type": {
              "displayName": [
                "String"
              ],
              "type": 15
            }
          },
          {
            "label": "code_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 21
            }
          },
          {
            "label": "is_public_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 22
            }
          },
          {
            "label": "public_minting_fee_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 23
            }
          },
          {
            "label": "public_minting_amount_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 24
            }
          },
          {
            "label": "public_max_minting_amount_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 24
            }
          },
          {
            "label": "start_time_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 24
            }
          },
          {
            "label": "end_time_phases",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 24
            }
          }
        ],
        "docs": [
          " Add new project"
        ],
        "label": "add_new_project",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x4b0a448e"
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
              "type": 4
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
          "type": 25
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
                "GrantRoleInput1"
              ],
              "type": 4
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
          "type": 25
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
                "RevokeRoleInput1"
              ],
              "type": 4
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
          "type": 25
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
                "GetRoleAdminInput1"
              ],
              "type": 4
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
          "type": 27
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
                "HasRoleInput1"
              ],
              "type": 4
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
          "type": 28
        },
        "selector": "0xc1d9ac18"
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
          "type": 29
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
          "type": 31
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
          "type": 29
        },
        "selector": "0x5e228753"
      },
      {
        "args": [
          {
            "label": "project_adding_fee",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "UpdateProjectAddingFeeInput1"
              ],
              "type": 9
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::update_project_adding_fee",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xc932d984"
      },
      {
        "args": [
          {
            "label": "contract_address",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "EditProjectInput1"
              ],
              "type": 0
            }
          },
          {
            "label": "start_time",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "EditProjectInput2"
              ],
              "type": 6
            }
          },
          {
            "label": "end_time",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "EditProjectInput3"
              ],
              "type": 6
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::edit_project",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x2c4eb9af"
      },
      {
        "args": [
          {
            "label": "is_active",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "UpdateIsActiveProjectInput1"
              ],
              "type": 7
            }
          },
          {
            "label": "contract_address",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "UpdateIsActiveProjectInput2"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::update_is_active_project",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xb395585e"
      },
      {
        "args": [
          {
            "label": "id",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "GetProjectByIdInput1"
              ],
              "type": 6
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_project_by_id",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 32
        },
        "selector": "0xfd610fb5"
      },
      {
        "args": [],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_project_count",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 34
        },
        "selector": "0x2ae57a80"
      },
      {
        "args": [],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_active_project_count",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 34
        },
        "selector": "0x484e6fd3"
      },
      {
        "args": [],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_standard_nft_hash",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 35
        },
        "selector": "0xdcca1337"
      },
      {
        "args": [
          {
            "label": "standard_nft_hash",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "UpdateStandardNftHashInput1"
              ],
              "type": 5
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::update_standard_nft_hash",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xfb1a74f1"
      },
      {
        "args": [
          {
            "label": "nft_contract_address",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "GetProjectByNftAddressInput1"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_project_by_nft_address",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 36
        },
        "selector": "0xc5d7222e"
      },
      {
        "args": [
          {
            "label": "project_mint_fee_rate",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "UpdateProjectMintFeeRateInput1"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::update_project_mint_fee_rate",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 25
        },
        "selector": "0x0767a5d1"
      },
      {
        "args": [],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_max_phases_per_project",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 39
        },
        "selector": "0x9a44210a"
      },
      {
        "args": [],
        "docs": [
          " This function returns the maximal amount of NFT that one can mint each time"
        ],
        "label": "ArtZeroLaunchPadTrait::get_public_max_minting_amount",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 34
        },
        "selector": "0x5cae8061"
      },
      {
        "args": [
          {
            "label": "public_max_minting_amount",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "UpdatePublicMaxMintingAmountInput1"
              ],
              "type": 6
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::update_public_max_minting_amount",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 25
        },
        "selector": "0x18c1c337"
      },
      {
        "args": [
          {
            "label": "owner_address",
            "type": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "GetProjectsByOwnerInput1"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_projects_by_owner",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 40
        },
        "selector": "0x833c0ebf"
      },
      {
        "args": [],
        "docs": [],
        "label": "ArtZeroLaunchPadTrait::get_project_adding_fee",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 41
        },
        "selector": "0x287c9ab9"
      },
      {
        "args": [],
        "docs": [
          " This function returns the rate in % that the launchpad will collect for each NFT minting"
        ],
        "label": "ArtZeroLaunchPadTrait::get_project_mint_fee_rate",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 27
        },
        "selector": "0x87b065fe"
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
              "type": 4
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
          "type": 27
        },
        "selector": "0xf1b1a9d7"
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
              "type": 4
            }
          },
          {
            "label": "index",
            "type": {
              "displayName": [
                "accesscontrolenumerable_external",
                "GetRoleMemberInput2"
              ],
              "type": 4
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
          "type": 32
        },
        "selector": "0x163469e0"
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
              "type": 9
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
          "type": 12
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
              "type": 9
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
          "type": 12
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
              "type": 42
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
          "type": 12
        },
        "selector": "0xed1e1dfa"
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
          "type": 12
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
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x6a2cd2b4",
                              "ty": 4
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
                          "ty": 5
                        }
                      },
                      "name": "standard_nft_hash"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "project_count"
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
                                      "key": "0x6d7a0502",
                                      "ty": 7
                                    }
                                  },
                                  "name": "is_active"
                                },
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x6d7a0502",
                                      "ty": 0
                                    }
                                  },
                                  "name": "project_owner"
                                },
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x6d7a0502",
                                      "ty": 6
                                    }
                                  },
                                  "name": "total_supply"
                                },
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x6d7a0502",
                                      "ty": 6
                                    }
                                  },
                                  "name": "start_time"
                                },
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x6d7a0502",
                                      "ty": 6
                                    }
                                  },
                                  "name": "end_time"
                                }
                              ],
                              "name": "Project"
                            }
                          },
                          "root_key": "0x6d7a0502"
                        }
                      },
                      "name": "projects"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x259cf427",
                              "ty": 0
                            }
                          },
                          "root_key": "0x259cf427"
                        }
                      },
                      "name": "projects_by_id"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xf757bf6e",
                              "ty": 8
                            }
                          },
                          "root_key": "0xf757bf6e"
                        }
                      },
                      "name": "projects_by_owner"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "active_project_count"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 2
                        }
                      },
                      "name": "max_phases_per_project"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 9
                        }
                      },
                      "name": "project_adding_fee"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "project_mint_fee_rate"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "public_max_minting_amount"
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
            }
          ],
          "name": "ArtZeroLaunchPadPSP34"
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
          "primitive": "u32"
        }
      }
    },
    {
      "id": 5,
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
          "Hash"
        ]
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
          "primitive": "bool"
        }
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "sequence": {
            "type": 0
          }
        }
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "primitive": "u128"
        }
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
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 13
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
            "type": 13
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
      "id": 13,
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
                    "type": 14
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
            "type": 14
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
                    "type": 15,
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
                    "type": 20,
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
      "id": 15,
      "type": {
        "def": {
          "primitive": "str"
        }
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
                    "type": 19,
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
                    "type": 19,
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
          "sequence": {
            "type": 2
          }
        }
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
                    "type": 19,
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
                    "type": 19,
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
      "id": 21,
      "type": {
        "def": {
          "sequence": {
            "type": 15
          }
        }
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "sequence": {
            "type": 7
          }
        }
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "sequence": {
            "type": 9
          }
        }
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "sequence": {
            "type": 6
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
                    "type": 26
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
            "type": 26
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
      "id": 26,
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
                    "type": 17
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
            "type": 17
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
                    "type": 4
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
            "type": 4
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
      "id": 28,
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
            "type": 7
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
            "type": 30
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
      "id": 31,
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
            "type": 0
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
      "id": 32,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 33
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
            "type": 33
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
      "id": 33,
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
      "id": 34,
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
            "type": 6
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
            "type": 5
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
            "type": 37
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
      "id": 37,
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
                    "type": 38
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
            "type": 38
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 38,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "is_active",
                "type": 7,
                "typeName": "bool"
              },
              {
                "name": "project_owner",
                "type": 0,
                "typeName": "AccountId"
              },
              {
                "name": "total_supply",
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
          "launchpad_manager",
          "data",
          "Project"
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
                    "type": 2
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
            "type": 2
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
      "id": 40,
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
            "type": 8
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
      "id": 41,
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
            "type": 9
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
      "id": 42,
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
                    "type": 43,
                    "typeName": "u16"
                  }
                ],
                "index": 1,
                "name": "U16"
              },
              {
                "fields": [
                  {
                    "type": 4,
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
                    "type": 9,
                    "typeName": "u128"
                  }
                ],
                "index": 4,
                "name": "U128"
              },
              {
                "fields": [
                  {
                    "type": 19,
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
      "id": 43,
      "type": {
        "def": {
          "primitive": "u16"
        }
      }
    }
  ],
  "version": "4"
}
} : {
    CONTRACT_ADDRESS: "5HMESPUZfCmo3KWXY2TVJ2SvHDogjmaYKC5Y9rfrfkrDyiFP",
    CONTRACT_ABI: {
        "source": {
            "hash": "0xe9e8ab9c3f32989ebf17474186207c796616e7971fe2c11481aab50c19acbdc9",
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
            "name": "artzero_launchpad_psp34",
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
                            "label": "max_phases_per_project",
                            "type": {
                                "displayName": [
                                    "u8"
                                ],
                                "type": 2
                            }
                        },
                        {
                            "label": "admin_address",
                            "type": {
                                "displayName": [
                                    "AccountId"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "standard_nft_hash",
                            "type": {
                                "displayName": [
                                    "Hash"
                                ],
                                "type": 5
                            }
                        },
                        {
                            "label": "project_adding_fee",
                            "type": {
                                "displayName": [
                                    "Balance"
                                ],
                                "type": 9
                            }
                        },
                        {
                            "label": "project_mint_fee_rate",
                            "type": {
                                "displayName": [
                                    "u32"
                                ],
                                "type": 4
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
                        "type": 10
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
                            "indexed": false,
                            "label": "project_id",
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
                            "label": "nft_contract_address",
                            "type": {
                                "displayName": [
                                    "Option"
                                ],
                                "type": 33
                            }
                        }
                    ],
                    "docs": [],
                    "label": "AddNewProjectEvent"
                }
            ],
            "lang_error": {
                "displayName": [
                    "ink",
                    "LangError"
                ],
                "type": 11
            },
            "messages": [
                {
                    "args": [
                        {
                            "label": "max_phases_per_project",
                            "type": {
                                "displayName": [
                                    "u8"
                                ],
                                "type": 2
                            }
                        },
                        {
                            "label": "standard_nft_hash",
                            "type": {
                                "displayName": [
                                    "Hash"
                                ],
                                "type": 5
                            }
                        },
                        {
                            "label": "project_adding_fee",
                            "type": {
                                "displayName": [
                                    "Balance"
                                ],
                                "type": 9
                            }
                        },
                        {
                            "label": "project_mint_fee_rate",
                            "type": {
                                "displayName": [
                                    "u32"
                                ],
                                "type": 4
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
                            "label": "admin_address",
                            "type": {
                                "displayName": [
                                    "AccountId"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "docs": [],
                    "label": "initialize",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0xf2f6dba3"
                },
                {
                    "args": [
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
                        },
                        {
                            "label": "project_info",
                            "type": {
                                "displayName": [
                                    "String"
                                ],
                                "type": 15
                            }
                        },
                        {
                            "label": "code_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 21
                            }
                        },
                        {
                            "label": "is_public_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 22
                            }
                        },
                        {
                            "label": "public_minting_fee_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 23
                            }
                        },
                        {
                            "label": "public_minting_amount_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 24
                            }
                        },
                        {
                            "label": "public_max_minting_amount_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 24
                            }
                        },
                        {
                            "label": "start_time_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 24
                            }
                        },
                        {
                            "label": "end_time_phases",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 24
                            }
                        }
                    ],
                    "docs": [
                        " Add new project"
                    ],
                    "label": "add_new_project",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0x4b0a448e"
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
                                "type": 4
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
                        "type": 25
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
                                    "GrantRoleInput1"
                                ],
                                "type": 4
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
                        "type": 25
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
                                    "RevokeRoleInput1"
                                ],
                                "type": 4
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
                        "type": 25
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
                                    "GetRoleAdminInput1"
                                ],
                                "type": 4
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
                        "type": 27
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
                                    "HasRoleInput1"
                                ],
                                "type": 4
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
                        "type": 28
                    },
                    "selector": "0xc1d9ac18"
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
                        "type": 29
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
                        "type": 31
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
                        "type": 29
                    },
                    "selector": "0x5e228753"
                },
                {
                    "args": [
                        {
                            "label": "project_adding_fee",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "UpdateProjectAddingFeeInput1"
                                ],
                                "type": 9
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::update_project_adding_fee",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0xc932d984"
                },
                {
                    "args": [
                        {
                            "label": "contract_address",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "EditProjectInput1"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "start_time",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "EditProjectInput2"
                                ],
                                "type": 6
                            }
                        },
                        {
                            "label": "end_time",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "EditProjectInput3"
                                ],
                                "type": 6
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::edit_project",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0x2c4eb9af"
                },
                {
                    "args": [
                        {
                            "label": "is_active",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "UpdateIsActiveProjectInput1"
                                ],
                                "type": 7
                            }
                        },
                        {
                            "label": "contract_address",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "UpdateIsActiveProjectInput2"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::update_is_active_project",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0xb395585e"
                },
                {
                    "args": [
                        {
                            "label": "id",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "GetProjectByIdInput1"
                                ],
                                "type": 6
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_project_by_id",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 32
                    },
                    "selector": "0xfd610fb5"
                },
                {
                    "args": [],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_project_count",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 34
                    },
                    "selector": "0x2ae57a80"
                },
                {
                    "args": [],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_active_project_count",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 34
                    },
                    "selector": "0x484e6fd3"
                },
                {
                    "args": [],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_standard_nft_hash",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 35
                    },
                    "selector": "0xdcca1337"
                },
                {
                    "args": [
                        {
                            "label": "standard_nft_hash",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "UpdateStandardNftHashInput1"
                                ],
                                "type": 5
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::update_standard_nft_hash",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0xfb1a74f1"
                },
                {
                    "args": [
                        {
                            "label": "nft_contract_address",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "GetProjectByNftAddressInput1"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_project_by_nft_address",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 36
                    },
                    "selector": "0xc5d7222e"
                },
                {
                    "args": [
                        {
                            "label": "project_mint_fee_rate",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "UpdateProjectMintFeeRateInput1"
                                ],
                                "type": 4
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::update_project_mint_fee_rate",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 25
                    },
                    "selector": "0x0767a5d1"
                },
                {
                    "args": [],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_max_phases_per_project",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 39
                    },
                    "selector": "0x9a44210a"
                },
                {
                    "args": [],
                    "docs": [
                        " This function returns the maximal amount of NFT that one can mint each time"
                    ],
                    "label": "ArtZeroLaunchPadTrait::get_public_max_minting_amount",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 34
                    },
                    "selector": "0x5cae8061"
                },
                {
                    "args": [
                        {
                            "label": "public_max_minting_amount",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "UpdatePublicMaxMintingAmountInput1"
                                ],
                                "type": 6
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::update_public_max_minting_amount",
                    "mutates": true,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 25
                    },
                    "selector": "0x18c1c337"
                },
                {
                    "args": [
                        {
                            "label": "owner_address",
                            "type": {
                                "displayName": [
                                    "artzerolaunchpadtrait_external",
                                    "GetProjectsByOwnerInput1"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_projects_by_owner",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 40
                    },
                    "selector": "0x833c0ebf"
                },
                {
                    "args": [],
                    "docs": [],
                    "label": "ArtZeroLaunchPadTrait::get_project_adding_fee",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 41
                    },
                    "selector": "0x287c9ab9"
                },
                {
                    "args": [],
                    "docs": [
                        " This function returns the rate in % that the launchpad will collect for each NFT minting"
                    ],
                    "label": "ArtZeroLaunchPadTrait::get_project_mint_fee_rate",
                    "mutates": false,
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 27
                    },
                    "selector": "0x87b065fe"
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
                                "type": 4
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
                        "type": 27
                    },
                    "selector": "0xf1b1a9d7"
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
                                "type": 4
                            }
                        },
                        {
                            "label": "index",
                            "type": {
                                "displayName": [
                                    "accesscontrolenumerable_external",
                                    "GetRoleMemberInput2"
                                ],
                                "type": 4
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
                        "type": 32
                    },
                    "selector": "0x163469e0"
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
                                "type": 9
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
                        "type": 12
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
                                "type": 9
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
                        "type": 12
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
                                "type": 42
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
                        "type": 12
                    },
                    "selector": "0xed1e1dfa"
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
                        "type": 12
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
                                                    "root": {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x6a2cd2b4",
                                                                "ty": 4
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
                                                        "ty": 5
                                                    }
                                                },
                                                "name": "standard_nft_hash"
                                            },
                                            {
                                                "layout": {
                                                    "leaf": {
                                                        "key": "0x00000000",
                                                        "ty": 6
                                                    }
                                                },
                                                "name": "project_count"
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
                                                                                "key": "0x6d7a0502",
                                                                                "ty": 7
                                                                            }
                                                                        },
                                                                        "name": "is_active"
                                                                    },
                                                                    {
                                                                        "layout": {
                                                                            "leaf": {
                                                                                "key": "0x6d7a0502",
                                                                                "ty": 0
                                                                            }
                                                                        },
                                                                        "name": "project_owner"
                                                                    },
                                                                    {
                                                                        "layout": {
                                                                            "leaf": {
                                                                                "key": "0x6d7a0502",
                                                                                "ty": 6
                                                                            }
                                                                        },
                                                                        "name": "total_supply"
                                                                    },
                                                                    {
                                                                        "layout": {
                                                                            "leaf": {
                                                                                "key": "0x6d7a0502",
                                                                                "ty": 6
                                                                            }
                                                                        },
                                                                        "name": "start_time"
                                                                    },
                                                                    {
                                                                        "layout": {
                                                                            "leaf": {
                                                                                "key": "0x6d7a0502",
                                                                                "ty": 6
                                                                            }
                                                                        },
                                                                        "name": "end_time"
                                                                    }
                                                                ],
                                                                "name": "Project"
                                                            }
                                                        },
                                                        "root_key": "0x6d7a0502"
                                                    }
                                                },
                                                "name": "projects"
                                            },
                                            {
                                                "layout": {
                                                    "root": {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x259cf427",
                                                                "ty": 0
                                                            }
                                                        },
                                                        "root_key": "0x259cf427"
                                                    }
                                                },
                                                "name": "projects_by_id"
                                            },
                                            {
                                                "layout": {
                                                    "root": {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0xf757bf6e",
                                                                "ty": 8
                                                            }
                                                        },
                                                        "root_key": "0xf757bf6e"
                                                    }
                                                },
                                                "name": "projects_by_owner"
                                            },
                                            {
                                                "layout": {
                                                    "leaf": {
                                                        "key": "0x00000000",
                                                        "ty": 6
                                                    }
                                                },
                                                "name": "active_project_count"
                                            },
                                            {
                                                "layout": {
                                                    "leaf": {
                                                        "key": "0x00000000",
                                                        "ty": 2
                                                    }
                                                },
                                                "name": "max_phases_per_project"
                                            },
                                            {
                                                "layout": {
                                                    "leaf": {
                                                        "key": "0x00000000",
                                                        "ty": 9
                                                    }
                                                },
                                                "name": "project_adding_fee"
                                            },
                                            {
                                                "layout": {
                                                    "leaf": {
                                                        "key": "0x00000000",
                                                        "ty": 4
                                                    }
                                                },
                                                "name": "project_mint_fee_rate"
                                            },
                                            {
                                                "layout": {
                                                    "leaf": {
                                                        "key": "0x00000000",
                                                        "ty": 6
                                                    }
                                                },
                                                "name": "public_max_minting_amount"
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
                            }
                        ],
                        "name": "ArtZeroLaunchPadPSP34"
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
                        "primitive": "u32"
                    }
                }
            },
            {
                "id": 5,
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
                        "Hash"
                    ]
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
                        "primitive": "bool"
                    }
                }
            },
            {
                "id": 8,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 0
                        }
                    }
                }
            },
            {
                "id": 9,
                "type": {
                    "def": {
                        "primitive": "u128"
                    }
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
                "id": 12,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 13
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
                            "type": 13
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
                "id": 13,
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
                                            "type": 14
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
                            "type": 14
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
                                            "type": 15,
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
                                            "type": 20,
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
                "id": 15,
                "type": {
                    "def": {
                        "primitive": "str"
                    }
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
                                            "type": 19,
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
                                            "type": 19,
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
                        "sequence": {
                            "type": 2
                        }
                    }
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
                                            "type": 19,
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
                                            "type": 19,
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
                "id": 21,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 15
                        }
                    }
                }
            },
            {
                "id": 22,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 7
                        }
                    }
                }
            },
            {
                "id": 23,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 9
                        }
                    }
                }
            },
            {
                "id": 24,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 6
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
                                            "type": 26
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
                            "type": 26
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
                "id": 26,
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
                                            "type": 17
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
                            "type": 17
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
                                            "type": 4
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
                            "type": 4
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
                "id": 28,
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
                            "type": 7
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
                            "type": 30
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
                "id": 31,
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
                            "type": 0
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
                "id": 32,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 33
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
                            "type": 33
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
                "id": 33,
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
                "id": 34,
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
                            "type": 6
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
                            "type": 5
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
                            "type": 37
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
                "id": 37,
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
                                            "type": 38
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
                            "type": 38
                        }
                    ],
                    "path": [
                        "Option"
                    ]
                }
            },
            {
                "id": 38,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "name": "is_active",
                                    "type": 7,
                                    "typeName": "bool"
                                },
                                {
                                    "name": "project_owner",
                                    "type": 0,
                                    "typeName": "AccountId"
                                },
                                {
                                    "name": "total_supply",
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
                        "launchpad_manager",
                        "data",
                        "Project"
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
                                            "type": 2
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
                            "type": 2
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
                "id": 40,
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
                            "type": 8
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
                "id": 41,
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
                            "type": 9
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
                "id": 42,
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
                                            "type": 43,
                                            "typeName": "u16"
                                        }
                                    ],
                                    "index": 1,
                                    "name": "U16"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 4,
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
                                            "type": 9,
                                            "typeName": "u128"
                                        }
                                    ],
                                    "index": 4,
                                    "name": "U128"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 19,
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
                "id": 43,
                "type": {
                    "def": {
                        "primitive": "u16"
                    }
                }
            }
        ],
        "version": "4"
    }
};