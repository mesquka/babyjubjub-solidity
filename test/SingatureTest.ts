import { ethers } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('Signature Test', function () {
  /**
   * Deploy fixtures
   *
   * @returns fixtures
   */
  async function deploy() {
    const EdDSABabyJubJub = await ethers.getContractFactory('EdDSABabyJubJubSignatureExample');

    const edDSAbabyJubJub = await EdDSABabyJubJub.deploy();

    return {
      edDSAbabyJubJub,
    };
  }

  it('Add', async function () {
    const { edDSAbabyJubJub } = await loadFixture(deploy);

    console.log(edDSAbabyJubJub);
  });
});
