// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma abicoder v2;

import { BabyJubJub, Point } from "./LibBabyJubJub.sol";
import { PoseidonT6 } from "./Poseidon.sol";

contract BabyJubJubStub {
  function add(Point memory _point1, Point memory _point2) external view returns (Point memory) {
    return BabyJubJub.add(_point1, _point2);
  }

  function double(Point memory _point) external view returns (Point memory) {
    return BabyJubJub.double(_point);
  }

  function scalarMultiply(
    Point memory _point,
    uint256 _scalar
  ) external view returns (Point memory) {
    return BabyJubJub.scalarMultiply(_point, _scalar);
  }

  function subtract(
    Point memory _point1,
    Point memory _point2
  ) external view returns (Point memory) {
    return BabyJubJub.subtract(_point1, _point2);
  }

  function negate(Point memory _point) external pure returns (Point memory) {
    return BabyJubJub.negate(_point);
  }

  function isOnCurve(Point memory _point) external pure returns (bool) {
    return BabyJubJub.isOnCurve(_point);
  }

  function submod(uint256 _a, uint256 _b) external pure returns (uint256) {
    return BabyJubJub.submod(_a, _b);
  }

  function invmod(uint256 _a) external view returns (uint256) {
    return BabyJubJub.invmod(_a);
  }

  function expmod(uint256 _base, uint256 _exponent) external view returns (uint256) {
    return BabyJubJub.expmod(_base, _exponent);
  }

  function sqrtmod(uint256 _a) external view returns (uint256) {
    return BabyJubJub.sqrtmod(_a);
  }
}

struct Signature {
  Point R;
  uint256 s;
}

contract EdDSABabyJubJubSignatureExample {
   function verify(
    bytes32 _messageHash,
    Signature memory _signature,
    Point memory _publicKey
  ) internal view returns (bool) {
    // Validate inputs
    require(BabyJubJub.isOnCurve(_signature.R), "Signature R point not in curve");
    require(BabyJubJub.isOnCurve(_publicKey), "Public key point not in curve");
    require(_signature.s < BabyJubJub.Q / 3, "Signature scalar not in suborder");

    // Calculate signature hash
    bytes32 sigHash = PoseidonT6.poseidon(
      [
        bytes32(_signature.R.x),
        bytes32(_signature.R.y),
        bytes32(_publicKey.x),
        bytes32(_publicKey.y),
        _messageHash
      ]
    );

    // Calculate verification points
    Point memory left = BabyJubJub.scalarMultiply(BabyJubJub.generator(), _signature.s);
    Point memory right = BabyJubJub.scalarMultiply(_publicKey, uint256(sigHash));

    // Verify signature points
    if (left.x != right.x) return false;
    if (left.y != right.y) return false;
    return true;
  }
}
