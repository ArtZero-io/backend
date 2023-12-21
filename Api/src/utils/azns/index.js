const {ContractPromise} = require('@polkadot/api-contract');
const b = require('loglevel');
const {bnToBn, BN, stringCamelCase} = require('@polkadot/util');
const {HttpProvider, WsProvider, ApiPromise} = require('@polkadot/api');

var Z = Object.create;
var O = Object.defineProperty;
var U = Object.getOwnPropertyDescriptor;
var W = Object.getOwnPropertyNames;
var B = Object.getPrototypeOf,
  H = Object.prototype.hasOwnProperty;
var V = (e, a) => () => (a || e((a = {exports: {}}).exports, a), a.exports);
var j = (e, a, t, r) => {
  if ((a && typeof a == 'object') || typeof a == 'function')
    for (let n of W(a))
      !H.call(e, n) &&
        n !== t &&
        O(e, n, {get: () => a[n], enumerable: !(r = U(a, n)) || r.enumerable});
  return e;
};
var J = (e, a, t) => (
  (t = e != null ? Z(B(e)) : {}),
  j(
    a || !e || !e.__esModule ? O(t, 'default', {value: e, enumerable: !0}) : t,
    e,
  )
);
var D = V((de, X) => {
  X.exports = {
    source: {
      hash: '0xda29dd46a262c10728439c0435ad89ec2f36c76da662adcb887a61fa5adfc05f',
      language: 'ink! 4.2.0',
      compiler: 'rustc 1.68.0-nightly',
      build_info: {
        build_mode: 'Release',
        cargo_contract_version: '2.1.0',
        rust_toolchain: 'nightly-aarch64-apple-darwin',
        wasm_opt_settings: {keep_debug_symbols: !1, optimization_passes: 'Z'},
      },
    },
    contract: {
      name: 'azns_router',
      version: '1.0.0',
      authors: ['AZERO.ID <hello@azero.id>'],
    },
    spec: {
      constructors: [
        {
          args: [{label: 'admin', type: {displayName: ['AccountId'], type: 0}}],
          default: !1,
          docs: [],
          label: 'new',
          payable: !1,
          returnType: {
            displayName: ['ink_primitives', 'ConstructorResult'],
            type: 4,
          },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: {displayName: ['AccountId'], type: 0},
        balance: {displayName: ['Balance'], type: 22},
        blockNumber: {displayName: ['BlockNumber'], type: 25},
        chainExtension: {displayName: ['ChainExtension'], type: 26},
        hash: {displayName: ['Hash'], type: 23},
        maxEventTopics: 4,
        timestamp: {displayName: ['Timestamp'], type: 24},
      },
      events: [],
      lang_error: {displayName: ['ink', 'LangError'], type: 6},
      messages: [
        {
          args: [
            {label: 'tld', type: {displayName: ['Vec'], type: 7}},
            {
              label: 'registry_addr',
              type: {displayName: ['AccountId'], type: 0},
            },
          ],
          default: !1,
          docs: [],
          label: 'add_registry',
          mutates: !0,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 9},
          selector: '0xc997efe3',
        },
        {
          args: [
            {label: 'tld', type: {displayName: ['Vec'], type: 7}},
            {
              label: 'registry_addr',
              type: {displayName: ['AccountId'], type: 0},
            },
          ],
          default: !1,
          docs: [],
          label: 'update_registry',
          mutates: !0,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 9},
          selector: '0x562de86b',
        },
        {
          args: [],
          default: !1,
          docs: [],
          label: 'get_all_registry',
          mutates: !1,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 12},
          selector: '0x91cf4131',
        },
        {
          args: [{label: 'tld', type: {displayName: ['String'], type: 8}}],
          default: !1,
          docs: [],
          label: 'get_registry',
          mutates: !1,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 13},
          selector: '0x15a5d20a',
        },
        {
          args: [{label: 'domain', type: {displayName: ['String'], type: 8}}],
          default: !1,
          docs: [],
          label: 'get_address',
          mutates: !1,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 15},
          selector: '0xd259f7ba',
        },
        {
          args: [
            {label: 'account', type: {displayName: ['AccountId'], type: 0}},
            {label: 'tld', type: {displayName: ['Option'], type: 17}},
          ],
          default: !1,
          docs: [
            ' @returns list of (registry-address, primary-domain) for given account',
          ],
          label: 'get_primary_domains',
          mutates: !1,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 18},
          selector: '0xdf3a358e',
        },
        {
          args: [],
          default: !1,
          docs: [],
          label: 'get_admin',
          mutates: !1,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 21},
          selector: '0x57b8a8a7',
        },
        {
          args: [],
          default: !1,
          docs: [],
          label: 'get_pending_admin',
          mutates: !1,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 13},
          selector: '0xbcd31d76',
        },
        {
          args: [{label: 'account', type: {displayName: ['Option'], type: 14}}],
          default: !1,
          docs: [],
          label: 'transfer_ownership',
          mutates: !0,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 9},
          selector: '0x107e33ea',
        },
        {
          args: [],
          default: !1,
          docs: [],
          label: 'accept_ownership',
          mutates: !0,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 9},
          selector: '0xb55be9f0',
        },
        {
          args: [{label: 'code_hash', type: {displayName: [], type: 1}}],
          default: !1,
          docs: [],
          label: 'upgrade_contract',
          mutates: !0,
          payable: !1,
          returnType: {displayName: ['ink', 'MessageResult'], type: 4},
          selector: '0x1345543d',
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {layout: {leaf: {key: '0x00000000', ty: 0}}, name: 'admin'},
              {
                layout: {
                  enum: {
                    dispatchKey: '0x00000000',
                    name: 'Option',
                    variants: {
                      0: {fields: [], name: 'None'},
                      1: {
                        fields: [
                          {
                            layout: {leaf: {key: '0x00000000', ty: 0}},
                            name: '0',
                          },
                        ],
                        name: 'Some',
                      },
                    },
                  },
                },
                name: 'pending_admin',
              },
              {layout: {leaf: {key: '0x00000000', ty: 3}}, name: 'registry'},
              {
                layout: {
                  root: {
                    layout: {leaf: {key: '0x00000064', ty: 0}},
                    root_key: '0x00000064',
                  },
                },
                name: 'routes',
              },
            ],
            name: 'Router',
          },
        },
        root_key: '0x00000000',
      },
    },
    types: [
      {
        id: 0,
        type: {
          def: {composite: {fields: [{type: 1, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'AccountId'],
        },
      },
      {id: 1, type: {def: {array: {len: 32, type: 2}}}},
      {id: 2, type: {def: {primitive: 'u8'}}},
      {id: 3, type: {def: {sequence: {type: 0}}}},
      {
        id: 4,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 5}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 5},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {id: 5, type: {def: {tuple: []}}},
      {
        id: 6,
        type: {
          def: {variant: {variants: [{index: 1, name: 'CouldNotReadInput'}]}},
          path: ['ink_primitives', 'LangError'],
        },
      },
      {id: 7, type: {def: {sequence: {type: 8}}}},
      {id: 8, type: {def: {primitive: 'str'}}},
      {
        id: 9,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 10}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 10},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {
        id: 10,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 5}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 5},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 11,
        type: {
          def: {
            variant: {
              variants: [
                {index: 0, name: 'NotAdmin'},
                {index: 1, name: 'InvalidRegistryAddress'},
                {
                  fields: [{type: 8, typeName: 'String'}],
                  index: 2,
                  name: 'TldAlreadyInUse',
                },
                {
                  fields: [{type: 8, typeName: 'String'}],
                  index: 3,
                  name: 'TldNotFound',
                },
                {index: 4, name: 'CouldNotResolveDomain'},
                {index: 5, name: 'InvalidDomainName'},
              ],
            },
          },
          path: ['azns_router', 'azns_router', 'Error'],
        },
      },
      {
        id: 12,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 3}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 3},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {
        id: 13,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 14}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 14},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {
        id: 14,
        type: {
          def: {
            variant: {
              variants: [
                {index: 0, name: 'None'},
                {fields: [{type: 0}], index: 1, name: 'Some'},
              ],
            },
          },
          params: [{name: 'T', type: 0}],
          path: ['Option'],
        },
      },
      {
        id: 15,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 16}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 16},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {
        id: 16,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 0}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 17,
        type: {
          def: {
            variant: {
              variants: [
                {index: 0, name: 'None'},
                {fields: [{type: 8}], index: 1, name: 'Some'},
              ],
            },
          },
          params: [{name: 'T', type: 8}],
          path: ['Option'],
        },
      },
      {
        id: 18,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 19}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 19},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {id: 19, type: {def: {sequence: {type: 20}}}},
      {id: 20, type: {def: {tuple: [0, 8]}}},
      {
        id: 21,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 0}], index: 0, name: 'Ok'},
                {fields: [{type: 6}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 6},
          ],
          path: ['Result'],
        },
      },
      {id: 22, type: {def: {primitive: 'u128'}}},
      {
        id: 23,
        type: {
          def: {composite: {fields: [{type: 1, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      {id: 24, type: {def: {primitive: 'u64'}}},
      {id: 25, type: {def: {primitive: 'u32'}}},
      {
        id: 26,
        type: {
          def: {variant: {}},
          path: ['ink_env', 'types', 'NoChainExtension'],
        },
      },
    ],
    version: '4',
  };
});
var g = (r => (
    (r.AlephZero = 'alephzero'),
    (r.AlephZeroTestnet = 'alephzero-testnet'),
    (r.Development = 'development'),
    r
  ))(g || {}),
  G = {
    network: 'alephzero',
    name: 'Aleph Zero',
    ss58Prefix: 42,
    rpcUrls: ['wss://ws.azero.dev'],
  },
  q = {
    network: 'alephzero-testnet',
    name: 'Aleph Zero Testnet',
    ss58Prefix: 42,
    rpcUrls: ['wss://ws.test.azero.dev'],
    testnet: !0,
  },
  F = {
    network: 'development',
    name: 'Local Development',
    ss58Prefix: 42,
    rpcUrls: ['ws://127.0.0.1:9944'],
    testnet: !0,
  },
  _ = [G, q, F],
  k = (r => ((r.AZERO = 'azero'), (r.A0 = 'a0'), (r.TZERO = 'tzero'), r))(
    k || {},
  ),
  R = (s => (
    (s.Router = 'azns_router'),
    (s.Registry = 'azns_registry'),
    (s.FeeCalculator = 'azns_fee_calculator'),
    (s.MerkleVerifier = 'azns_merkle_verifier'),
    (s.NameChecker = 'azns_name_checker'),
    s
  ))(R || {}),
  w = {
    ['alephzero']: {
      ['azns_router']: '5FfRtDtpS3Vcr7BTChjPiQNrcAKu3VLv4E1NGF6ng6j3ZopJ',
    },
    ['alephzero-testnet']: {
      ['azns_router']: '5HXjj3xhtRMqRYCRaXTDcVPz3Mez2XBruyujw6UEkvn8PCiA',
    },
  };
var S = e =>
    ({['alephzero']: ['azero', 'a0'], ['alephzero-testnet']: ['tzero']}[e] ||
    []),
  Q = async e =>
    await {['azns_router']: Promise.resolve().then(() => J(D(), 1))}[e],
  ee = (e, a, t) => t?.[a] ?? w[e]?.[a],
  h = async (e, a, t, r) => {
    let n = await Q(t);
    if (!n) throw new Error(`No metadata found for contract '${t}'.`);
    let s = ee(a, t, r);
    if (!s)
      throw new Error(`No address found for contract '${t}' on chain '${a}'.`);
    let i = new ContractPromise(e, n, s);
    return (
      b.debug(`Initialized contract '${t}' at address '${s}'`),
      {abi: n, address: s, contract: i}
    );
  };
var m = class extends Error {
  name;
  message;
  cause;
  constructor({name: a, message: t, cause: r}) {
    super(), (this.name = a), (this.message = t), (this.cause = r);
  }
};
var P = (e, a) => {
  let t = e.abi.messages.find(
    r => stringCamelCase(r.method) === stringCamelCase(a),
  );
  if (!t) throw new Error(`"${a}" not found in Contract`);
  return t;
};
function M(e) {
  return typeof e == 'object' && e !== null && 'Err' in e;
}
function z(e) {
  return typeof e == 'object' && e !== null && 'Ok' in e;
}
function te(e) {
  return e?.lookupName || e?.type || '';
}
function x({result: e}, a, t) {
  let r,
    n = '',
    s = !0;
  if (e.isOk) {
    s = e.asOk.flags.toHuman().includes('Revert');
    let d = P(a, t).returnType,
      l = te(d),
      p = a.abi.registry,
      o = d ? p.createTypeUnsafe(l, [e.asOk.data]).toHuman() : '()';
    r = z(o) ? o.Ok : M(o) ? o.Err : o;
    let f = M(r)
        ? typeof r.Err == 'object'
          ? JSON.stringify(r.Err, null, 2)
          : r.Err?.toString() ?? 'Error'
        : (r !== 'Ok' && r?.toString()) || 'Error',
      $ = z(o)
        ? typeof r == 'object'
          ? JSON.stringify(r, null, '	')
          : r?.toString() ?? '()'
        : JSON.stringify(r, null, '	') ?? '()';
    n = s ? f : $;
  }
  return {output: r, decodedOutput: n, isError: s};
}
var N,
  L,
  v = async (e, a) => {
    if (N && L?.network === e) return N;
    let t = _.find(i => i.network === e),
      r = t?.rpcUrls?.[0];
    if (!t || !r) throw new Error(`Given chain '${e}' not supported.`);
    let n = r.startsWith('http') ? new HttpProvider(r) : new WsProvider(r),
      s = await ApiPromise.create({provider: n, noInitWarn: !0, ...a});
    return (
      await s.isReadyOrError,
      b.debug(`Initialized API for chain '${e}'`),
      (N = s),
      (L = t),
      s
    );
  };
var oe = (e, a, t) => {
    let r = bnToBn(a),
      n = bnToBn(t);
    return e.registry.createType('WeightV2', {refTime: r, proofSize: n});
  },
  T = (e, a = 0.8) => {
    let r =
        e.consts.system.blockWeights.toPrimitive()?.perClass?.normal
          ?.maxExtrinsic,
      n = r?.refTime
        ? bnToBn(r.refTime)
            .mul(new BN(a * 100))
            .div(new BN(100))
        : new BN(0),
      s = r?.proofSize
        ? bnToBn(r.proofSize)
            .mul(new BN(a * 100))
            .div(new BN(100))
        : new BN(0);
    return oe(e, n, s);
  };
var C = class extends m {},
  Pe = async (e, a) => {
    try {
      let t = Object.assign({chainId: 'alephzero'}, a);
      b.setLevel(t.debug ? 'DEBUG' : 'WARN');
      let r = t?.customApi || (await v(t.chainId)),
        {contract: n} = await h(
          r,
          t.chainId,
          'azns_router',
          t.customContractAddresses,
        ),
        s = await n.query.getPrimaryDomains('', {gasLimit: T(r)}, e, null),
        i = [],
        {
          output: c,
          isError: d,
          decodedOutput: l,
        } = x(s, n, 'get_primary_domains');
      if (d) {
        let o = `Contract error while resolving address '${e}': ${l}`;
        return (
          b.error(o),
          {
            primaryDomain: void 0,
            allPrimaryDomains: void 0,
            error: new C({name: 'CONTRACT_ERROR', message: o, cause: l}),
          }
        );
      } else d || (i = (c || []).map(([, o]) => o));
      let p = i?.length ? i[0] : null;
      return (
        b.debug(
          p
            ? `Resolved primary domain for address '${e}': ${p}`
            : `No primary domain found for address '${e}'`,
        ),
        {primaryDomain: p, allPrimaryDomains: i, error: void 0}
      );
    } catch (t) {
      return (
        b.debug(`Error while resolving address '${e}':`, t),
        {
          primaryDomain: void 0,
          allPrimaryDomains: void 0,
          error: new C({
            name: 'OTHER_ERROR',
            message: t?.message || 'Unexpected error while resolving address',
            cause: t,
          }),
        }
      );
    }
  };
var y = class extends m {},
  Ve = async (e, a) => {
    try {
      let t = Object.assign({chainId: 'alephzero'}, a);
      b.setLevel(t.debug ? 'DEBUG' : 'WARN');
      let r = e.split('.').pop();
      if (e.split('.').length < 2 || !r)
        return {
          address: void 0,
          error: new y({
            name: 'INVALID_DOMAIN_FORMAT',
            message: "Domain must be in format 'name.tld'",
          }),
        };
      if (!S(t.chainId).includes(r) && t.chainId !== 'development')
        return {
          address: void 0,
          error: new y({
            name: 'UNSUPPORTED_TLD',
            message: `Unsupported TLD '${r}' on '${t.chainId}'`,
          }),
        };
      let s = t?.customApi || (await v(t.chainId)),
        {contract: i} = await h(
          s,
          t.chainId,
          'azns_router',
          t.customContractAddresses,
        ),
        c = await i.query.getAddress('', {gasLimit: T(s)}, e),
        {output: d, isError: l, decodedOutput: p} = x(c, i, 'get_address'),
        o = null;
      if (l && p !== 'CouldNotResolveDomain') {
        let f = `Contract error while resolving domain '${e}': ${p}`;
        return (
          b.error(f),
          {
            address: void 0,
            error: new y({name: 'CONTRACT_ERROR', message: f, cause: p}),
          }
        );
      } else l || (o = d.Ok);
      return (
        b.debug(
          o
            ? `Resolved address for domain '${e}': ${o}`
            : `Domain '${e}' not found`,
        ),
        {address: o, error: void 0}
      );
    } catch (t) {
      return (
        b.debug(`Error while resolving domain '${e}':`, t),
        {
          address: void 0,
          error: new y({
            name: 'OTHER_ERROR',
            message: t?.message || 'Unexpected error while resolving domain',
            cause: t,
          }),
        }
      );
    }
  };

const ex = {
  w,
  R,
  C,
  y,
  g,
  k,
  G,
  q,
  _,
  F,
  h,
  Q,
  ee,
  S,
  Pe,
  Ve,
};
// const ex = {
//   w as CONTRACT_ADDRESSES,
//   R as ContractId,
//   C as ResolveAddressError,
//   y as ResolveDomainError,
//   g as SupportedChainId,
//   k as SupportedTLD,
//   G as alephzero,
//   q as alephzeroTestnet,
//   _ as allChains,
//   F as development,
//   h as getContract,
//   Q as getContractAbi,
//   ee as getContractAddress,
//   S as getSupportedTLDs,
//   Pe as resolveAddressToDomain,
//   Ve as resolveDomainToAddress,
// };

module.exports = ex;
