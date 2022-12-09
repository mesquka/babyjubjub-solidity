import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-local-networks-config-plugin';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';

import { poseidonContract } from 'circomlibjs';
import { overwriteArtifact } from './hardhat.utils';
import mocharc from './.mocharc.json';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1600,
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  mocha: mocharc,
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
};

task(TASK_COMPILE).setAction(async (taskArguments, hre, runSuper) => {
  await runSuper();
  await overwriteArtifact(hre, 'contracts/Poseidon.sol:PoseidonT6', poseidonContract.createCode(5));
});

task('accounts', 'Prints the list of accounts', async (taskArguments, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach((account) => {
    console.log(account.address);
  });
});

export default config;
