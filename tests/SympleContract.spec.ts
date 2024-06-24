import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SympleContract } from '../wrappers/SympleContract';
import '@ton/test-utils';

describe('SympleContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sympleContract: SandboxContract<SympleContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sympleContract = blockchain.openContract(await SympleContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sympleContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sympleContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sympleContract are ready to use
    });
});
