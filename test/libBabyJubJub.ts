import { ethers } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('LibBabyJubJub', function () {
  /**
   * Deploy fixtures
   *
   * @returns fixtures
   */
  async function deploy() {
    const BabyJubJub = await ethers.getContractFactory('BabyJubJubStub');

    const babyJubJub = await BabyJubJub.deploy();

    return {
      babyJubJub,
    };
  }

  it('Add', async function () {
    const { babyJubJub } = await loadFixture(deploy);

    const result = await babyJubJub.add(
      {
        x: 17777552123799933955779906779655732241715742912184938656739573121738514868268n,
        y: 2626589144620713026669568689430873010625803728049924121243784502389097019475n,
      },
      {
        x: 17777552123799933955779906779655732241715742912184938656739573121738514868268n,
        y: 2626589144620713026669568689430873010625803728049924121243784502389097019475n,
      },
    );

    expect(result.x).to.equal(
      6890855772600357754907169075114257697580319025794532037257385534741338397365n,
    );
    expect(result.y).to.equal(
      4338620300185947561074059802482547481416142213883829469920100239455078257889n,
    );
  });

  it('Double', async function () {
    const { babyJubJub } = await loadFixture(deploy);

    const result = await babyJubJub.double({
      x: 17777552123799933955779906779655732241715742912184938656739573121738514868268n,
      y: 2626589144620713026669568689430873010625803728049924121243784502389097019475n,
    });

    expect(result.x).to.equal(
      6890855772600357754907169075114257697580319025794532037257385534741338397365n,
    );
    expect(result.y).to.equal(
      4338620300185947561074059802482547481416142213883829469920100239455078257889n,
    );
  });

  it('Scalar Multiply', async function () {
    const { babyJubJub } = await loadFixture(deploy);

    const result = await babyJubJub.scalarMultiply(
      {
        x: 17777552123799933955779906779655732241715742912184938656739573121738514868268n,
        y: 2626589144620713026669568689430873010625803728049924121243784502389097019475n,
      },
      31,
    );

    expect(result.x).to.equal(
      7622845806798279333008973964667360626508482363013971390840869953521351129788n,
    );
    expect(result.y).to.equal(
      120664075238337199387162984796177147820973068364675632137645760787230319545n,
    );
  });

  it('Check if on curve', async function () {
    const { babyJubJub } = await loadFixture(deploy);

    expect(
      await babyJubJub.isOnCurve({
        x: 17777552123799933955779906779655732241715742912184938656739573121738514868268n,
        y: 2626589144620713026669568689430873010625803728049924121243784502389097019475n,
      }),
    ).to.equal(true);
  });
});
