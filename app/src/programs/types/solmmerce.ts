export type Solmmerce = {
  "version": "0.1.0",
  "name": "solmmerce",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawer",
          "type": "publicKey"
        },
        {
          "name": "fees",
          "type": {
            "array": [
              "u64",
              2
            ]
          }
        }
      ]
    },
    {
      "name": "setAuthority",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setWithdrawer",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setFees",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fees",
          "type": {
            "array": [
              "u64",
              2
            ]
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createStore",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setStoreMeta",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "createProduct",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setProductPrice",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setProductMeta",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "createOrder",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setOrderMeta",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "createReview",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rating",
          "type": "u8"
        },
        {
          "name": "comment",
          "type": "string"
        },
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setReviewRating",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rating",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setReviewComment",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    },
    {
      "name": "setReviewMeta",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "product",
            "type": "publicKey"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "store",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "review",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "order",
            "type": "publicKey"
          },
          {
            "name": "rating",
            "type": "u8"
          },
          {
            "name": "comment",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "store",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "withdrawer",
            "type": "publicKey"
          },
          {
            "name": "fees",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidVaultAuthority",
      "msg": "Invalid Vault Authority"
    },
    {
      "code": 6001,
      "name": "InvalidVaultWithdrawer",
      "msg": "Invalid Vault Withdrawer"
    },
    {
      "code": 6002,
      "name": "InvalidVaultWithdrawAmount",
      "msg": "Invalid Vault Withdraw Amount"
    },
    {
      "code": 6003,
      "name": "InsufficientVaultFunds",
      "msg": "Insufficient Vault Funds"
    },
    {
      "code": 6004,
      "name": "CannotWithdrawVaultAccountRent",
      "msg": "Cannot Withdraw Vault Account Rent"
    },
    {
      "code": 6005,
      "name": "InvalidOrderFee",
      "msg": "Invalid Order Fee"
    },
    {
      "code": 6006,
      "name": "InvalidReviewRating",
      "msg": "Invalid Review Rating"
    }
  ]
};

export const IDL: Solmmerce = {
  "version": "0.1.0",
  "name": "solmmerce",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawer",
          "type": "publicKey"
        },
        {
          "name": "fees",
          "type": {
            "array": [
              "u64",
              2
            ]
          }
        }
      ]
    },
    {
      "name": "setAuthority",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setWithdrawer",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setFees",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fees",
          "type": {
            "array": [
              "u64",
              2
            ]
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createStore",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setStoreMeta",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "createProduct",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setProductPrice",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setProductMeta",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "createOrder",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setOrderMeta",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "createReview",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rating",
          "type": "u8"
        },
        {
          "name": "comment",
          "type": "string"
        },
        {
          "name": "meta",
          "type": "string"
        }
      ]
    },
    {
      "name": "setReviewRating",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rating",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setReviewComment",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    },
    {
      "name": "setReviewMeta",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "store",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "review",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "meta",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "product",
            "type": "publicKey"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "store",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "review",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "order",
            "type": "publicKey"
          },
          {
            "name": "rating",
            "type": "u8"
          },
          {
            "name": "comment",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "store",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "withdrawer",
            "type": "publicKey"
          },
          {
            "name": "fees",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidVaultAuthority",
      "msg": "Invalid Vault Authority"
    },
    {
      "code": 6001,
      "name": "InvalidVaultWithdrawer",
      "msg": "Invalid Vault Withdrawer"
    },
    {
      "code": 6002,
      "name": "InvalidVaultWithdrawAmount",
      "msg": "Invalid Vault Withdraw Amount"
    },
    {
      "code": 6003,
      "name": "InsufficientVaultFunds",
      "msg": "Insufficient Vault Funds"
    },
    {
      "code": 6004,
      "name": "CannotWithdrawVaultAccountRent",
      "msg": "Cannot Withdraw Vault Account Rent"
    },
    {
      "code": 6005,
      "name": "InvalidOrderFee",
      "msg": "Invalid Order Fee"
    },
    {
      "code": 6006,
      "name": "InvalidReviewRating",
      "msg": "Invalid Review Rating"
    }
  ]
};
